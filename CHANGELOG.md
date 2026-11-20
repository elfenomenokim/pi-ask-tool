# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses `MAJOR.MINOR.PATCH`.

## [Unreleased]

## [0.1.0] - 2026-11-20

### Fixed

- The `typebox` dependency asked for `^0.34.0`, a version that does not exist; it now asks for `^1.0.0`, the line Pi ships.
- `npm test` pointed `node --test` at a folder; it now names the suite file.

### Added

- Initial release: the `ask` Pi extension (`index.ts`) with `select`, `confirm`
  and `input` dialogs, the no-UI fallback and the `cancelled` path.
- Suite (`tests/ask-tool.test.mjs`), demo (`docs/demo/ask.mjs`) and flow
  diagrams (`docs/diagrams/ask.mmd`, `ask.ko.mmd`).
- English and Korean READMEs, AGENTS.md and community files.
