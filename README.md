# Neopic

Neopic is an image browser with focus on organizing, tagging, captioning, sorting of images. With a special focus on families (groups) of images.

## Development

[Development Notes](./docs/DEVELOPMENT.md)

### Updating

    npm version minor

### testing with circleci

  npm run circleci

or if you don't mind pending changes

  npm run circleci -- nocheck

This will set and push a new tag 'circleci-<shorthash>', which will trigger a new circleci build. (Benefit being not _every_ commit triggering the pipeline and deducting from monthly free tier).
