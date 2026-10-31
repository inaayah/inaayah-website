# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.


## Vigilante Red City pages

The dedicated game overview is `/games/vigilante-red-city/`, with `/privacy`,
`/terms` and `/delete-data` beneath it. The overview links the public Inaayah
Games trailer, screenshots and launcher-only desktop installation. Android
distribution is Google Play only; no APK link is shown before the store listing is available. YouTube is contacted only after the trailer Play button
is selected. The release label refreshes from the game catalog.

The game repository owns the legal source and document-version manifest.
To review its static policy pages locally, run this from the website checkout:

```sh
python3 /path/to/vigilante-red-city/scripts/build_legal_documents.py --output .legal-preview
npm run dev -- --host 127.0.0.1 --port 8771 --strictPort
```

The Vite middleware serves only the three allowlisted document routes from this
ignored directory, with `noindex` and `no-store`. It works in both dev and local
`vite preview`, preserves legacy URL redirects and requires no JavaScript for
reading a policy. Review files and internal legal evidence never enter the
normal production build.

Before deploying these policy pages, finish their documented review and use the
game repository's approved export:

```sh
python3 /path/to/vigilante-red-city/scripts/build_legal_documents.py --release --website /path/to/inaayah-website
npm run build
npm run lint
```

This places reviewed static HTML in `public/games/vigilante-red-city/` and
maintains the legal redirect block before the broad Games SPA rewrite.
The old `/privacy/vigilante-red-city.html#delete-data` link keeps working through
an HTTP redirect and the preserved anchor. The overview itself uses the React
route and the policy links use full-page navigation to the static documents.

Publishing is separate from a local build: use this repository's existing
Git/Cloudflare deployment, then verify all four public routes, the old links,
assets and actual document content. Do not treat draft preview pages or a
successful SPA fallback as a live privacy policy.
