# Neopic

Neopic is an image browser with focus on organizing, tagging, captioning, sorting of images. With a special focus on families (groups) of images.

## Development

[Development Notes](./docs/DEVELOPMENT.md)


### Testing

I am using vitest ( [config](https://vitest.dev/config/) | [guide](https://vitest.dev/guide/) ), no more mocha (too much cjs vs. ES6 trouble).

    npm run test -- test/selftest.spec.ts

    npm run test:watch -- test/selftest.spec.ts

    npm run test:debug -- test/selftest.spec.ts

### Update

    npm version minor

### build + test with circleci

    npm run circleci

or if you don't mind some pending changes

    npm run circleci -- nocheck

This command will set and push a new tag 'circleci-<shorthash>', which will trigger a new circleci build. Benefit: Not _every_ commit triggering the pipeline and deducting from monthly free tier

Running single tests:

    npm run test -- test/selftest.spec.ts
    npm run test:watch -- test/selftest.spec.ts
    npm run test:debug -- test/selftest.spec.ts

Tests may be in `test/` folder or in `src/` alongside application code

    npm run test -- src\main\handlers\ipcHandlers.spec.ts

