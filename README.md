# Neopic
[![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fnocke%2Fneopic%2Fmaster%2Fpackage.json&query=version&label=neopic%20version&color=%232ae)](https://github.com/nocke/neopic/releases/latest)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fnocke%2Fneopic%2Fmaster%2Fpackage.json&query=%24.devDependencies%5B%22%40electron-forge%2Fcli%22%5D&label=electron%20forge&color=%2325f)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fnocke%2Fneopic%2Fmaster%2Fpackage.json&query=%24.devDependencies%5B%22vite%22%5D&label=vite&color=%23c2c)




![Endpoint Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fnocke%2F435d13deb82fabccdfffa1df7db49269%2Fraw%2F8771f82d81ec27e6d03025588cd22552dd03b97a%2Fneopic-status-linux.json)
[![Endpoint Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fnocke%2F435d13deb82fabccdfffa1df7db49269%2Fraw%2F8771f82d81ec27e6d03025588cd22552dd03b97a%2Fneopic-status-macos.json)
](https://gist.githubusercontent.com/nocke/435d13deb82fabccdfffa1df7db49269/raw/64d4e68dc922b74e4fc4f7caf5a89156c99e14a2/neopic-status-macos.json)
![Endpoint Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fnocke%2F435d13deb82fabccdfffa1df7db49269%2Fraw%2F5d70516eb25b250e73b0d7af533b5329158c44af%2Fneopic-status-windows.json)


<img src="./docs/img/preview.png" style="width: 100%; max-width:800px">

Neopic is an image browser with focus on organizing, tagging, captioning, sorting of images. With a special focus on families (groups) of images.

WORK IN PROGRESS.


## Development

[Development Notes](./docs/DEVELOPMENT.md)


### Testing

I am using vitest ( [config](https://vitest.dev/config/) | [guide](https://vitest.dev/guide/) ). (much faster than mocha in this environment and a lot „cjs vs. ES6“ trouble…).

    npm run test -- test/selftest.spec.ts

    npm run test:watch -- test/selftest.spec.ts

    npm run test:debug -- test/selftest.spec.ts

### Update

    npm version minor

## testing

    npm run test

Running single tests:

    npm run test -- test/selftest.spec.ts
    npm run test:watch -- test/selftest.spec.ts
    npm run test:debug -- test/selftest.spec.ts

Tests may be in `test/` folder or in `src/` alongside application code

    npm run test -- src\main\handlers\ipcHandlers.spec.ts

## Advice on forking (, building, releasing)

For testing and releasing, you will want to set up a [circleci](https://app.circleci.com/) pipeline and cerate a “secret” (aka private url, but it doesn't matter) github gist, containing:

    { "schemaVersion": 1, "label": "label to be", "message": "message to be", "color": "orange" }

Also set the following environment variables in your circleci project settings:

    CIRCLE_IS_GITHUB  true
    GITHUB_GIST	      the hash of your 'secret' gist
    GITHUB_TOKEN      ‘classic’ github authorization token (only if you plan to release)

To build for mac+win+linux

    npm run circleci

This command will set and push a new tag 'circleci-<shorthash>', which will trigger a new circleci build. Benefit: Not _every_ commit triggering the pipeline and deducting from monthly free tier

So, Indeed build is not triggered on every commit. With this measure, the free tier usually suffices... You can **download** your three platform builds (installers) in the respective artifacts tab.

If you don't mind some open pending changes, skip the specific check against that: (and yes, there is a space after `--`)

    npm run circleci -- nocheck

And then there is

    npm run release [-- nocheck]

doing the same thing _and_ releasing to github.

## Acknowledgments

This project incorporates components from other open-source projects. The details of these will be found in the respective directories along with their licenses.

### Golden Layout SCSS
- **Source**: [golden-layout](https://github.com/golden-layout/golden-layout)
- **License**: MIT License (see [`src/goldenLayout/LICENSE.txt`](./src/renderer/goldenLayout/css/LICENSE) for the full license text)
- **Purpose**: easier adaption (besides using their package)

### Inspiration, and a few subroutines
- **Source**: [golden-layout-svelte](https://github.com/SillyFreak/svelte-golden-layout)
- **License**: MIT License (see  https://github.com/SillyFreak/svelte-golden-layout/blob/main/LICENSE  ) for the full license text)
- **Purpose**: Tying Svelte Components into a Golden Layout

Thanks you for your great work!


