# Security policy

## Supported versions

Security fixes go into the latest release. Upgrade before reporting, in case the problem is
already fixed.

| Version | Supported |
| --- | --- |
| 0.1.0 | Yes |
| Older | No |

## Reporting a vulnerability

Report it privately, not in a public issue: use the
[Report a vulnerability](https://github.com/elfenomenokim/pi-ask-tool/security/advisories/new) form on
the repository's Security tab.

Include the parameters you passed, the Pi version, and what an attacker could do with the result.
You get a reply within a few days.

## In scope

- A dialog shown to the wrong owner, or an answer returned to the wrong session.
- The tool asking for, logging or storing anything beyond the one question and its answer.
- A dismissed dialog or a headless run returning anything other than `cancelled` or the
  documented fallback string.

## Not a vulnerability

- The owner's answer appearing in the agent's context. The tool returns what you were told.
- A dialog with no timeout. Dismiss it instead; that path returns `cancelled`.

## Disclosure

Once a fix is released, the advisory is published with credit to the reporter unless they prefer
otherwise.
