# Portfolio source

React + TypeScript + Vite + Tailwind CSS, with hand-authored shadcn/ui-style
primitives in `src/components/ui/` (the `shadcn` CLI's registry at
ui.shadcn.com wasn't reachable when this was set up, so the components were
written directly instead of pulled via `npx shadcn add`).

## Why the build output lives at the repo root

GitHub Pages serves this repo from the `main` branch root (see `CNAME`), and
Pages is configured for "deploy from a branch," not a GitHub Actions build.
Rather than change that configuration, the compiled output of this app is
committed directly to the repo root (`index.html`, `assets/*`, etc.) as the
published site. This folder (`app/`) is the actual source of truth for
anything under `src/`.

## Making changes

```sh
cd app
npm install         # first time only
npm run dev          # local dev server with HMR
npm run build         # type-checks and builds to app/dist
```

After building, publish the new output by copying it over the repo root and
committing both the source and the build output together:

```sh
cd app && npm run build && cd ..
git rm -rf assets    # old hashed bundle filenames change on every build
cp -r app/dist/. .
git add app assets index.html favicon.svg CNAME robots.txt sitemap.xml
git commit -m "..."
```

`app/dist` itself is gitignored — only the copied-out files at the repo root
are tracked.
