# Contributing to pi-ask-tool

Fixes and reports are welcome. You do not need to ask before opening a pull request for a bug fix.

## Before you start

- **A wrong answer:** open an [issue](https://github.com/elfenomenokim/pi-ask-tool/issues/new/choose)
  with the parameters you passed, what the dialog showed, and the text the tool returned.
  Quote the return string exactly: callers match on it.
- **A dialog change:** describe the case that fails today. Selection bounds, fallback text and
  dismissal are one design, not three independent knobs.
- **A security problem:** do not open a public issue. See [SECURITY.md](SECURITY.md).

## Set up

```sh
git clone https://github.com/elfenomenokim/pi-ask-tool
cd pi-ask-tool
npm install
npm test
```

`npm test` runs the suite with a synthetic UI; no Pi runtime is needed. Node 22.18 or newer is
required. `typebox` is the only dependency. There is no build step.

## What a good patch has

- **The parameters and the returned text** that show the bug, before and after the fix.
- **No changed return strings** unless the README reference table and both READMEs change
  in the same patch.
- **A line under Unreleased** in [CHANGELOG.md](CHANGELOG.md) when a user will notice.
- **The platforms you did not test** written in the pull request. macOS on Node 22.23.5
  has been exercised.

## Review

Every pull request runs an automatic OpenCode review. Ask for another pass with `@codex review` or
`@claude review` in a comment. If a finding looks wrong, say why in the pull request.

## Style

Keep the tool to one file and one dependency. Keep demo answers canned and the owner's words
out of committed files.

## Licence

Contributions are licensed under the MIT licence in [LICENSE](LICENSE).
