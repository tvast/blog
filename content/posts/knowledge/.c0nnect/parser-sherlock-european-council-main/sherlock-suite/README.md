# Sherlock Suite

New Vite + Vue + TypeScript project merging:

- the parser controls,
- the new parsed-output display,
- the Sherlock runner interface.

## Run

Start the local API:

```bash
npm run api
```

Start the Vite UI in another terminal:

```bash
npm run dev
```

Open `http://127.0.0.1:5174`.

The API writes Sherlock output to `runs/` and also reads the old
`eu-osint/sherlock_dgtrad_servicedesk.txt` as fallback display data.
