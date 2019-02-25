# atlas

![](https://img.shields.io/npm/v/vue-atlas.svg?colorA=57D9A3&colorB=666666)

Documentation and examples at [https://vue-atlas.com](https://vue-atlas.com)

## Installation and usage

```bash
$ yarn add vue-atlas
# or
$ npm install vue-atlas
```

You can either import all of the components into your project or, to decrease bundle size, import only the components you require.

## 📦 Importing components

### As a whole

```javascript
import Vue from 'vue'

import Va from 'vue-atlas'
import 'vue-atlas/dist/vue-atlas.css'

Vue.use(Va, 'en')
```

### Individually

For now, component stylesheets have not been modularized, so you will need to import the entire CSS bundle.

```javascript
import Vue from 'vue'

import { VaButton } from 'vue-atlas/src/Button'
import { VaSelect } from 'vue-atlas/src/Select'
import { VaDropdown } from 'vue-atlas/src/Dropdown'
import 'vue-atlas/dist/vue-atlas.css'

Vue.use(VaButton)
Vue.use(VaSelect)
Vue.use(VaDropdown)
```

## 🎉 Contributors

If you would like to contribute, please read [CONTRIBUTING.md](https://github.com/nvms/vue-atlas/blob/master/.github/CONTRIBUTING.md).

Many thanks to those of you who have taken an interest in this project and have decided to make contributions. Significant contribution will get you added to the list!

- [SamuelRiversMoore](https://github.com/SamuelRiversMoore)
- [marvinrabe](https://github.com/marvinrabe)
- [rejifald](https://github.com/rejifald)
