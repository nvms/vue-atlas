# atlas

![](https://img.shields.io/npm/v/vue-atlas.svg?colorA=57D9A3&colorB=666666)

Documentation and examples at [https://vue-atlas.com](https://vue-atlas.com)

## Installation and usage

```bash
$ yarn add vue-atlas
# or
$ npm install vue-atlas
```

## Usage

### Import everything

The minified stylesheet is roughly 200kb (~30kb gzipped). If this worries you, please see below how to import
only the components you require for a smaller bundle.

```javascript
// Wherever your Vue entrypoint is.
import Va from 'vue-atlas'
import 'vue-atlas/dist/vue-atlas.css'

Vue.use(Va, 'en') // or 'es', 'fr', 'ru'
```

### Import something specific

```javascript
// You will need sass-loader and node-sass for this.
import { VaDatepicker } from 'vue-atlas/src/Datepicker'

Vue.use(VaDatepicker)

// The Datepicker component will check for the presence
// of the VaLocale prototype to decide how to display content.
Vue.prototype.VaLocale = 'fr' // default 'en'
```

Create or modify your project's `vue.config.js` and point `css.loaderOptions.sass.prependData`
to `node_modules/vue-atlas/src/variables.scss`. This will provide imported
components with the color definitions that they need. It's just color definitions.
It's a small file. It will also give *your* components access to

If you want access to
the [atlas color variables](https://github.com/nvms/vue-atlas/blob/master/src/style/_colors.scss)
in your own project's components, modify your project's `vue.config.js` and point
`css.loaderOptions.sass.prependData` to `node_modules/vue-atlas/src/style/_colors.scss`.

`vue.config.js`

```javascript
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/../node_modules/vue-atlas/src/style/_colors.scss";`
      }
    }
  }
}
```
