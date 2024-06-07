# Neopic

![CircleCI](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fnocke%2F97a83e6cf7b344163697f59ed3758713%2Fraw%2F87270dcf55b4b2e02824b81528890c08e440ffb4%2Fneopic-status.json)

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


