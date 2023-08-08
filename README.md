# TiniJS Meta

The Meta module for TiniJS apps.

## Install

To manually install the module: `npm i @tinijs/core`

It is recommended to download the [Skeleton](https://github.com/tinijs/skeleton) for a ready-to-use structured project.

For more, please visit: <https://tinijs.dev> (TODO)

## Usage

- Create the `metas.ts`

```ts
import {AppMetas} from '@tinijs/meta';

// null = use the extracted values from index.html
export default null as unknown as AppMetas;
```

- Init the module in `app.ts`

```ts
import {initMetas} from '@tinijs/meta';

import metas from './metas';

@App()
export class AppRoot extends TiniComponent {
  readonly $meta = initMetas({metas});
}
```

- Use in pages

```ts
import {UseMeta, Meta, PageMetas} from '@tinijs/meta';

const metas: PageMetas = {
  title: 'Oops',
  description: 'Error 404, not found!',
  // ...
};

@Page('app-page-404')
export class AppPage404 extends TiniComponent {
  @UseMeta() meta!: Meta;

  onReady() {
    this.meta.setPageMetas(metas);
  }
}
```

## API

// TODO

## Developement

- Create a home for TiniJS: `mkdir TiniJS && cd TiniJS`
- Fork the repo: `git clone https://github.com/tinijs/meta.git`
- Install dependencies: `cd meta && npm i`
- Make changes & preview locally: `npm run build && npm pack`
- Push changes & create a PR 👌

## License

**@tinijs/meta** is released under the [MIT](https://github.com/tinijs/meta/blob/master/LICENSE) license.
