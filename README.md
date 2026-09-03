# PWA Prototype Boilerplate

A reusable React and Vite starter for private mobile prototype presentations. It includes a lightweight access gate, interactive prototype shell, stakeholder showcase, runtime configuration panel, theme presets, device previews, and installable PWA metadata.

> The access gate is a presentation deterrent implemented in client-side code. It is not authentication and must not protect sensitive data.

## Start a project

Use GitHub's **Use this template** action or clone the repository, then run:

```sh
npm install
npm run dev
```

Local development uses access code `1337` when `VITE_ACCESS_CODE` is unset. Create `.env.local` to use another code:

```sh
VITE_ACCESS_CODE=your-code
```

Production builds require the variable explicitly:

```sh
VITE_ACCESS_CODE=your-production-code npm run build
```

## Included routes

- `/access` — access-code entry.
- `/prototype` — Home, Detail, and Success placeholder walkthrough.
- `/showcase` — generic three-slide presentation.
- `/config` — protected identity, theme, accent, and device settings.

All example screens are intentionally grey and display their configured logical resolution. Replace `PlaceholderScreen` with the real prototype while retaining the presentation shell.

## Configure the shell

Open `/config` after entering the access code. Changes are saved in the current browser for live preview. Use **Copy config**, then replace `DEFAULT_SHELL_CONFIG` in `src/config.ts` with the copied object to make it the checked-in default.

The starter includes `neutral` and `yellow` themes. Add future presets with CSS custom properties under a new `data-theme` selector, then add the theme ID to `THEME_PRESETS`.

## PWA behavior

The static manifest and Apple mobile metadata make the app installable as a standalone shell. The starter deliberately has no service worker or offline cache. Add those only when a prototype requires offline behavior.

For local HTTPS, place certificates at `.cert/dev-cert.pem` and `.cert/dev-key.pem`; Vite detects them automatically.

## Validation

```sh
npm test
npm run lint
VITE_ACCESS_CODE=test-code npm run build
```
