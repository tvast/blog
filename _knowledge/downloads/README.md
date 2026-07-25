# Rolls-Royce Nvim — Elihpoeht edition

A full IDE-grade Neovim config tuned for your stack:
**TypeScript · Vue 3 / Quasar · NestJS · Three.js + GLSL · Prisma · Docker · Tailwind**.

Modular (`lazy.nvim`), native LSP (Neovim 0.11+), `blink.cmp` completion,
Telescope, Treesitter, DAP debugging, lazygit, cyberpunk tokyonight theme.

---

## 1. Prerequisites

```bash
# Neovim 0.11+ (you need a recent one)
brew install neovim

# Tooling the config relies on
brew install ripgrep fd lazygit
# fzf you already have. node/git too.
```

A **Nerd Font** is required for icons (e.g. JetBrainsMono Nerd Font, FiraCode Nerd Font).
Set it as your terminal font.

> Your `.zshrc` already exports `truecolor` + `xterm-256color`, so colors are fine.

## 2. Install

```bash
# Back up any existing config first
mv ~/.config/nvim ~/.config/nvim.bak 2>/dev/null
mv ~/.local/share/nvim ~/.local/share/nvim.bak 2>/dev/null

# Extract this archive into ~/.config
tar -xzf nvim-config.tar.gz -C ~/.config
# -> creates ~/.config/nvim/

# Launch — first start auto-installs lazy.nvim, all plugins, LSPs & formatters
nvim
```

First launch: let Mason finish installing servers (watch `:Mason`). Then `:checkhealth`
and `:checkhealth lazy` to confirm everything is green. Restart once.

## 3. zsh: point `v` at nvim

In your `.zshrc`, you currently have `alias v="vim"`. Add nvim:

```zsh
alias v="nvim"
alias vi="nvim"
alias vim="nvim"          # optional: hijack vim entirely
export EDITOR="nvim"
# keep VISUAL="pulsar" if you still want the GUI for git
```

Your existing `fuzzy_vim_open` (Ctrl+V) will then open files in nvim too.

---

## 4. Keymap cheatsheet  (leader = `Space`)

Press `<Space>` and wait — **which-key** shows everything live. Highlights:

### Files & search
| Key | Action |
|-----|--------|
| `<space><space>` | Find files |
| `<space>fg` | Live grep (project-wide) |
| `<space>fw` | Grep word under cursor |
| `<space>fb` | Open buffers |
| `<space>fr` | Recent files |
| `<space>f/` | Fuzzy search in current buffer |
| `<space>ft` | Find TODO/FIXME |
| `<space>e`  | Toggle file explorer |

### LSP / code
| Key | Action |
|-----|--------|
| `gd` `gr` `gi` `gy` | Definition / references / impl / type |
| `K` | Hover docs |
| `<space>ca` | Code action |
| `<space>cr` | Rename symbol |
| `<space>cf` | Format buffer |
| `<space>ch` | Toggle inlay hints |
| `<space>cd` | Line diagnostics |
| `[d` `]d` | Prev / next diagnostic |
| `<space>xx` | Diagnostics list (Trouble) |

### Git
| Key | Action |
|-----|--------|
| `<space>gg` | Lazygit |
| `<space>gs` | Git status (Telescope) |
| `<space>gc` | Git commits |
| `]h` `[h` | Next / prev hunk |
| `<space>hs` `<space>hr` | Stage / reset hunk |
| `<space>hb` | Blame line |
| `<space>hp` | Preview hunk |

### Debug (DAP)
| Key | Action |
|-----|--------|
| `<space>db` | Toggle breakpoint |
| `<space>dc` | Continue / start |
| `<space>do` `<space>di` `<space>dO` | Step over / into / out |
| `<space>du` | Toggle debug UI |

For NestJS: run `nest start --debug` (or `node --inspect`), then `<space>dc`
→ choose **"Attach to :9229"**.

### Windows / buffers
| Key | Action |
|-----|--------|
| `Ctrl+h/j/k/l` | Move between splits |
| `Shift+h` / `Shift+l` | Prev / next buffer |
| `<space>sv` / `<space>sh` | Split vertical / horizontal |
| `Alt+j` / `Alt+k` | Move line(s) down / up |

---

## 5. Vue 3 note (important)

This uses **hybrid mode** (Volar v3 dropped take-over):
`vue_ls` handles the template/CSS, `vtsls` handles TypeScript via the
`@vue/typescript-plugin`. It's wired automatically in `lua/plugins/lsp.lua`.

If a Vue project shows weird TS errors, make sure the project's own
`typescript` + `@vue/...` versions are installed (`npm i`), then `:LspRestart`.

For Quasar, the Tailwind LSP also lints classes in `.vue` files.

---

## 6. Customising

- **Theme**: edit `lua/plugins/colorscheme.lua`. Try `:colorscheme catppuccin-mocha`.
- **Add an LSP**: add it to the `servers` list + `mason-tool-installer` list in `lua/plugins/lsp.lua`.
- **Formatters**: `lua/plugins/formatting.lua`.
- **Disable format-on-save** temporarily: `:FormatDisable` / re-enable `:FormatEnable`.
- **Update everything**: `:Lazy sync` and `:Mason`.

## 7. Structure

```
~/.config/nvim/
├── init.lua
└── lua/
    ├── config/{options,keymaps,autocmds,lazy}.lua
    └── plugins/
        ├── colorscheme.lua   lsp.lua          completion.lua
        ├── treesitter.lua    telescope.lua    neo-tree.lua
        ├── git.lua           ui.lua           formatting.lua
        ├── editor.lua        dap.lua
```

Everything in `lua/plugins/` is auto-loaded. Drop a new file there to add plugins.
