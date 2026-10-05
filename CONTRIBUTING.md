# Contributing

Create a branch or fork, make a focused change, then open a pull request. Explain the problem, changed behavior, and validation. Keep Thai, Traditional Chinese, and English text consistent. For clinical questions include primary references and preceptor review. Preserve source attribution and LICENSE.txt.

Run `npm ci`, `npm run build`, `npm test`, `node verify-history.mjs`, `node verify-admin.mjs`, and `node verify-participant.mjs` with Node.js >=22.13. A passing test suite does not certify clinical content. Check visible dialogue, keyboard input, mobile layout, and log persistence for the changed flow.

PR approval and merge do not publish the live Site. The owner or an authorized Sites editor publishes reviewed source into the existing project. Never commit runtime secrets or student exports. Never expose instructor APIs without their server-side password/session checks. Keep database migrations additive and review data preservation before deployment.
