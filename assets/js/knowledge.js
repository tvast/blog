/* Knowledge-base navigation: lazy tree expansion, sidebar filtering, the
   command palette, the table of contents, and the mobile drawer.

   The whole corpus lives in one JSON index that is fetched at most once per
   page and shared by every feature below. Nothing here runs until the user
   actually reaches for it. */
(function () {
  "use strict";

  var CONFIG = window.DK_CONFIG || {};
  var MAX_RESULTS = 30;

  /* ---------------------------------------------------------------- index */

  var indexPromise = null;

  // Resolves to { entries, bySection }. Callers must tolerate rejection; the
  // no-JS fallbacks stay in the DOM until a build succeeds.
  function loadIndex() {
    if (indexPromise) return indexPromise;

    indexPromise = fetch(CONFIG.indexUrl, { credentials: "same-origin" })
      .then(function (response) {
        if (!response.ok) throw new Error("index HTTP " + response.status);
        return response.json();
      })
      .then(function (data) {
        var entries = (data && data.entries) || [];
        var bySection = Object.create(null);

        entries.forEach(function (entry) {
          var key = entry.s || "";
          (bySection[key] || (bySection[key] = [])).push(entry);
          // Precomputed once; every keystroke would otherwise re-lowercase.
          entry._h = (entry.t + " " + entry.s + "/" + entry.p).toLowerCase();
        });

        return { entries: entries, bySection: bySection };
      })
      .catch(function (error) {
        // Let a later interaction retry rather than caching the failure.
        indexPromise = null;
        throw error;
      });

    return indexPromise;
  }

  /* ----------------------------------------------------------------- tree */

  // Folds ["a/b/c.md", ...] into nested { name, children, entry } nodes.
  function buildTree(entries) {
    var root = { dirs: Object.create(null), files: [] };

    entries.forEach(function (entry) {
      var parts = entry.p.split("/");
      var leaf = parts.pop();
      var node = root;

      parts.forEach(function (part) {
        if (!node.dirs[part]) {
          node.dirs[part] = { dirs: Object.create(null), files: [] };
        }
        node = node.dirs[part];
      });

      node.files.push({ label: entry.t || leaf, url: entry.u });
    });

    return root;
  }

  function renderTree(node, depth, currentPath) {
    var fragment = document.createDocumentFragment();

    Object.keys(node.dirs)
      .sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      })
      .forEach(function (name) {
        var child = node.dirs[name];
        var li = document.createElement("li");

        var details = document.createElement("details");
        details.className = "dk-tree__group";

        var summary = document.createElement("summary");
        summary.className = "dk-tree__summary";
        summary.style.paddingLeft = 0.25 + depth * 0.75 + "rem";
        summary.innerHTML =
          '<svg class="dk-tree__caret" viewBox="0 0 24 24" aria-hidden="true">' +
          '<path d="M9 6l6 6-6 6"/></svg>';

        var label = document.createElement("span");
        label.className = "dk-tree__label";
        label.textContent = name;
        summary.appendChild(label);

        var badge = document.createElement("span");
        badge.className = "dk-tree__badge";
        badge.textContent = countLeaves(child);
        summary.appendChild(badge);

        var ul = document.createElement("ul");
        ul.appendChild(renderTree(child, depth + 1, currentPath));

        details.appendChild(summary);
        details.appendChild(ul);
        // Reveal the branch containing the page being viewed.
        if (ul.querySelector('[aria-current="page"]')) details.open = true;

        li.appendChild(details);
        fragment.appendChild(li);
      });

    node.files
      .sort(function (a, b) {
        return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
      })
      .forEach(function (file) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.className = "dk-tree__link";
        a.href = file.url;
        a.textContent = file.label;
        a.style.setProperty("--dk-depth", depth + 1);
        if (samePath(file.url, currentPath)) a.setAttribute("aria-current", "page");
        li.appendChild(a);
        fragment.appendChild(li);
      });

    return fragment;
  }

  function countLeaves(node) {
    var total = node.files.length;
    Object.keys(node.dirs).forEach(function (key) {
      total += countLeaves(node.dirs[key]);
    });
    return total;
  }

  function samePath(href, current) {
    try {
      return new URL(href, location.origin).pathname === current;
    } catch (e) {
      return href === current;
    }
  }

  /* -------------------------------------------------------------- sidebar */

  var tree = document.querySelector("[data-dk-tree]");

  function initSidebar() {
    if (!tree) return;

    var currentPath = location.pathname;

    tree.querySelectorAll("[data-dk-section]").forEach(function (details) {
      var body = details.querySelector("[data-dk-section-body]");
      if (!body) return;

      var populate = function () {
        if (details.dataset.dkLoaded) return;
        details.dataset.dkLoaded = "pending";

        loadIndex()
          .then(function (index) {
            var entries = index.bySection[details.dataset.dkSection] || [];
            body.textContent = "";
            body.appendChild(renderTree(buildTree(entries), 0, currentPath));
            details.dataset.dkLoaded = "done";
          })
          .catch(function () {
            // Leave the "Browse …" link in place so the section stays usable.
            delete details.dataset.dkLoaded;
          });
      };

      details.addEventListener("toggle", function () {
        if (details.open) populate();
        persistOpenState();
      });

      if (details.open) populate();
    });

    restoreOpenState();
    initFilter();
    scrollActiveIntoView();
  }

  // Remembering which sections are expanded keeps the sidebar stable across
  // navigations, which is the main thing that makes a 4,000-page tree usable.
  function persistOpenState() {
    if (!tree) return;
    var open = [];
    tree.querySelectorAll("[data-dk-section]").forEach(function (details) {
      if (details.open) open.push(details.dataset.dkSection);
    });
    try {
      sessionStorage.setItem("dk-open", JSON.stringify(open));
    } catch (e) {}
  }

  function restoreOpenState() {
    var saved;
    try {
      saved = JSON.parse(sessionStorage.getItem("dk-open") || "[]");
    } catch (e) {
      return;
    }
    if (!Array.isArray(saved)) return;

    saved.forEach(function (slug) {
      var details = tree.querySelector('[data-dk-section="' + cssEscape(slug) + '"]');
      if (details) details.open = true;
    });
  }

  function scrollActiveIntoView() {
    var active = tree.querySelector('[aria-current="page"]');
    if (!active) return;
    var box = active.getBoundingClientRect();
    if (box.top < 0 || box.bottom > window.innerHeight) {
      active.scrollIntoView({ block: "center" });
    }
  }

  function cssEscape(value) {
    return window.CSS && CSS.escape ? CSS.escape(value) : value.replace(/"/g, '\\"');
  }

  /* --------------------------------------------------------------- filter */

  function initFilter() {
    var input = document.querySelector("[data-dk-filter]");
    if (!input) return;

    var run = debounce(function () {
      var query = input.value.trim().toLowerCase();

      if (!query) {
        tree.classList.remove("is-empty");
        tree.querySelectorAll("[hidden]").forEach(function (node) {
          node.hidden = false;
        });
        return;
      }

      // Filtering needs every section's children present, not just the
      // expanded ones, so pull the index before matching.
      loadIndex().then(function (index) {
        var anyVisible = false;

        tree.querySelectorAll("[data-dk-section]").forEach(function (details) {
          var slug = details.dataset.dkSection;
          var entries = index.bySection[slug] || [];
          var matches = entries.filter(function (entry) {
            return entry._h.indexOf(query) !== -1;
          });

          var sectionMatches = slug.toLowerCase().indexOf(query) !== -1;
          var visible = matches.length > 0 || sectionMatches;

          details.parentElement.hidden = !visible;
          if (!visible) return;

          anyVisible = true;
          details.open = true;

          var body = details.querySelector("[data-dk-section-body]");
          body.textContent = "";
          body.appendChild(
            renderTree(
              buildTree(sectionMatches && !matches.length ? entries : matches),
              0,
              location.pathname
            )
          );
          details.dataset.dkLoaded = "done";
        });

        tree.classList.toggle("is-empty", !anyVisible);
      });
    }, 140);

    input.addEventListener("input", run);
    input.addEventListener("search", run);
  }

  /* -------------------------------------------------------------- palette */

  function initPalette() {
    var palette = document.querySelector("[data-dk-palette]");
    var input = document.querySelector("[data-dk-palette-input]");
    var list = document.querySelector("[data-dk-palette-results]");
    var empty = document.querySelector("[data-dk-palette-empty]");
    var openers = document.querySelectorAll("[data-dk-search-open]");
    if (!palette || !input || !list) return;

    var activeIndex = -1;
    var results = [];
    var lastFocus = null;

    var kbd = document.querySelector("[data-dk-kbd]");
    var isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    if (kbd) kbd.textContent = isMac ? "⌘K" : "Ctrl K";

    function open() {
      lastFocus = document.activeElement;
      palette.hidden = false;
      palette.classList.add("is-open");
      input.value = "";
      render([]);
      input.focus();
      loadIndex().catch(function () {});
    }

    function close() {
      palette.classList.remove("is-open");
      palette.hidden = true;
      input.setAttribute("aria-expanded", "false");
      if (lastFocus) lastFocus.focus();
    }

    function render(items) {
      results = items;
      activeIndex = items.length ? 0 : -1;
      list.textContent = "";

      items.forEach(function (item, i) {
        var li = document.createElement("li");
        li.className = "dk-palette__item" + (i === 0 ? " is-active" : "");
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", i === 0 ? "true" : "false");

        var a = document.createElement("a");
        a.href = item.u;

        var title = document.createElement("span");
        title.className = "dk-palette__title";
        title.textContent = item.t;

        var path = document.createElement("span");
        path.className = "dk-palette__path";
        path.textContent = (item.s ? item.s + "/" : "") + item.p;

        a.appendChild(title);
        a.appendChild(path);
        li.appendChild(a);

        li.addEventListener("mouseenter", function () {
          setActive(i);
        });

        list.appendChild(li);
      });

      if (empty) empty.hidden = items.length > 0 || !input.value.trim();
      input.setAttribute("aria-expanded", items.length ? "true" : "false");
    }

    function setActive(i) {
      var nodes = list.children;
      if (!nodes.length) return;
      activeIndex = (i + nodes.length) % nodes.length;

      for (var n = 0; n < nodes.length; n++) {
        var on = n === activeIndex;
        nodes[n].classList.toggle("is-active", on);
        nodes[n].setAttribute("aria-selected", on ? "true" : "false");
      }
      nodes[activeIndex].scrollIntoView({ block: "nearest" });
    }

    var search = debounce(function () {
      var query = input.value.trim().toLowerCase();
      if (!query) return render([]);

      loadIndex()
        .then(function (index) {
          render(rank(index.entries, query));
        })
        .catch(function () {
          render([]);
        });
    }, 110);

    input.addEventListener("input", search);

    input.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive(activeIndex + 1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive(activeIndex - 1);
      } else if (event.key === "Enter") {
        var current = list.children[activeIndex];
        if (current) {
          event.preventDefault();
          current.querySelector("a").click();
        }
      } else if (event.key === "Escape") {
        close();
      }
    });

    palette.addEventListener("mousedown", function (event) {
      if (event.target === palette) close();
    });

    openers.forEach(function (button) {
      button.addEventListener("click", open);
    });

    document.addEventListener("keydown", function (event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        palette.hidden ? open() : close();
      } else if (event.key === "Escape" && !palette.hidden) {
        close();
      }
    });
  }

  // Substring match, ordered by how early and how prominently the query lands:
  // a title hit outranks a path hit, and a prefix outranks a mid-word match.
  function rank(entries, query) {
    var scored = [];

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      var at = entry._h.indexOf(query);
      if (at === -1) continue;

      var title = entry.t.toLowerCase();
      var inTitle = title.indexOf(query);
      var score = at;

      if (inTitle === 0) score -= 1000;
      else if (inTitle > 0) score -= 500;
      if (title === query) score -= 5000;

      scored.push({ entry: entry, score: score });
      // Bail out once there is plenty to sort; the corpus is large and the
      // palette only ever shows MAX_RESULTS.
      if (scored.length > MAX_RESULTS * 20) break;
    }

    scored.sort(function (a, b) {
      return a.score - b.score;
    });

    return scored.slice(0, MAX_RESULTS).map(function (s) {
      return s.entry;
    });
  }

  /* ------------------------------------------------------------------ toc */

  function initToc() {
    var toc = document.querySelector("[data-dk-toc]");
    var prose = document.querySelector("[data-dk-prose]");
    if (!toc || !prose) return;

    var list = toc.querySelector("[data-dk-toc-list]");
    var headings = prose.querySelectorAll("h2, h3");
    if (headings.length < 2) return;

    var links = [];

    headings.forEach(function (heading, i) {
      if (!heading.id) {
        heading.id =
          heading.textContent
            .trim()
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .slice(0, 60) || "section-" + i;
      }

      var li = document.createElement("li");
      if (heading.tagName === "H3") li.className = "dk-toc__l3";

      var a = document.createElement("a");
      a.href = "#" + heading.id;
      a.textContent = heading.textContent;
      li.appendChild(a);
      list.appendChild(li);
      links.push(a);

      var anchor = document.createElement("a");
      anchor.className = "dk-anchor";
      anchor.href = "#" + heading.id;
      anchor.textContent = "#";
      anchor.setAttribute("aria-label", "Link to this section");
      heading.appendChild(anchor);
    });

    toc.hidden = false;

    // Scroll spy. rootMargin pins the "active" band just under the sticky
    // header so the highlighted entry matches what is actually being read.
    var visible = new Set();
    var observer = new IntersectionObserver(
      function (records) {
        records.forEach(function (record) {
          if (record.isIntersecting) visible.add(record.target.id);
          else visible.delete(record.target.id);
        });

        var first = null;
        headings.forEach(function (heading) {
          if (!first && visible.has(heading.id)) first = heading.id;
        });

        links.forEach(function (link) {
          link.classList.toggle(
            "is-active",
            first !== null && link.getAttribute("href") === "#" + first
          );
        });
      },
      { rootMargin: "-72px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach(function (heading) {
      observer.observe(heading);
    });
  }

  /* --------------------------------------------------------------- drawer */

  function initDrawer() {
    var toggle = document.querySelector("[data-dk-sidebar-toggle]");
    var sidebar = document.querySelector("[data-dk-sidebar]");
    var scrim = document.querySelector("[data-dk-scrim]");
    if (!toggle || !sidebar) return;

    function setOpen(open) {
      sidebar.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (scrim) {
        scrim.hidden = false;
        scrim.classList.toggle("is-open", open);
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(!sidebar.classList.contains("is-open"));
    });

    if (scrim) {
      scrim.addEventListener("click", function () {
        setOpen(false);
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  /* --------------------------------------------------------------- polish */

  // Wide tables are the main source of horizontal page overflow in imported
  // notes; give each one its own scroll container.
  function wrapTables() {
    document.querySelectorAll(".dk-prose table").forEach(function (table) {
      if (table.parentElement.classList.contains("dk-table-wrap")) return;
      var wrap = document.createElement("div");
      wrap.className = "dk-table-wrap";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
  }

  function debounce(fn, wait) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, wait);
    };
  }

  /* ----------------------------------------------------------------- boot */

  initSidebar();
  initPalette();
  initToc();
  initDrawer();
  wrapTables();
})();
