# AGENTS.md — pi-ask-tool

Instructions for a coding agent working in this repository.

## Layout

- `index.ts` — the whole tool: one Pi extension registering the `ask` tool.
- `tests/ask-tool.test.mjs` — the suite; synthetic UI only, no Pi runtime needed.
- `docs/demo/ask.mjs` — the demo behind the README quick start; canned answers only.
- `docs/diagrams/ask.mmd`, `ask.ko.mmd` — the flow diagram sources.

## Build and test

```sh
npm install
npm test
```

`npm test` runs `node --test tests/ask-tool.test.mjs`. Node 22.18 or newer is
required (it strips the types in `index.ts` natively). The only runtime
dependency is `typebox`. There is no build step and no linter.

## Style

- Keep the tool dependency-free apart from `typebox` and `ctx.ui`.
- Keep the four return strings byte-identical: `answer: <value>`,
  `answer: true` / `answer: false`, `cancelled`, and the no-UI fallback.
  Callers match on them.
- Keep the parameter schema (`question`, 2–6 `options`, `kind`) unchanged;
  Pi validates it.
- English user-facing strings; the Korean README translates, never the code.

## Do not

- Never add a permission or approval flow around assigned work. The tool asks
  only for choices the task cannot settle alone.
- Never add a timeout or a default answer. A dismissed dialog stays `cancelled`.
- Never open a dialog when `hasUI` is false. Return the fallback string.
- Never log the question or the answer. The owner's words stay in the dialog.

## Verify before you attach

1. `npm test` passes: 5 tests, 0 failures.
2. `node docs/demo/ask.mjs` prints the five README lines in order.

## Code Review Rules

A change is a real defect when it:

- opens a dialog without a genuine unresolved choice, or asks permission for
  already-assigned work.
- changes a return string so an existing caller misreads the answer.
- accepts fewer than 2 or more than 6 options into `select`.
- opens any dialog when `hasUI` is false, or throws instead of returning
  the fallback.
- adds a runtime dependency beyond `typebox`, or breaks `npm test` on
  Node 22.18+.

Not defects: wording, formatting, comment style, or a requested extra test.
