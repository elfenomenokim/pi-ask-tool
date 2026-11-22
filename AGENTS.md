# AGENTS.md — pi-ask-tool

Instructions for a coding agent working in this repository.

## Set up for a user

Goal: Pi can call an `ask` tool that opens a dialog for the user. Run these steps in order.

1. Check what is present.
   - `node --version` prints `v22.18` or newer. If not: `brew install node` (macOS) or `curl -fsSL https://fnm.vercel.app/install | bash` then `fnm install 22`.
   - `pi --version` prints a version. If not: `npm install -g @earendil-works/pi-coding-agent`.
2. Install the extension: `pi install npm:pi-ask-tool` ends with `Installed npm:pi-ask-tool`; `pi list` shows it under "User packages". Pi installs `typebox` with it.
   (Release 0.1.0 has no `pi` manifest and Pi does not load it; install 0.1.1 or newer, or copy the file: `mkdir -p ~/.pi/agent/extensions/ask-tool && curl -fsSL https://raw.githubusercontent.com/elfenomenokim/pi-ask-tool/main/index.ts -o ~/.pi/agent/extensions/ask-tool/index.ts`.)
3. Only the person can do this. If Pi has no model login (`pi auth check --provider <name>` does not print `ready`), say exactly: "Pi에서 쓸 AI 서비스(예: anthropic, openai)를 알려주세요. 브라우저가 열리면 로그인하거나 API 키를 붙여 넣어 주세요." Then run `pi auth login <provider>`.
4. Prove it: start `pi` in any folder, ask it to "use the ask tool to ask me whether to continue, options yes and no". A dialog opens in the terminal; the person picks an option and Pi repeats `answer: <their choice>`. Tell the person first: "질문 창이 뜨면 아무거나 골라 주세요."
   Without a screen: `node docs/demo/ask.mjs` in a clone prints five lines, the first `answer: codex`.
5. If it fails, in this order:
   - Pi answers that it has no `ask` tool: the package was not loaded. Run `pi list`; if it is missing, repeat step 2; if it is listed, the installed version lacks the manifest (step 2 note).
   - `pi: command not found`: the npm global bin directory is not on PATH (`npm prefix -g`, then add its `bin`).
   - Pi starts but cannot call a model: step 3 was not finished; run `pi auth check --provider <name>`.
   - The tool answers `no one to ask; proceed with your best judgment ...`: Pi ran without a screen (`pi -p` or a worker); that is the designed fallback, not a bug.

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
