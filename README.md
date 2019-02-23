# atlas

<div align="center">
![](https://img.shields.io/npm/v/vue-atlas.svg?colorA=57D9A3&colorB=666666) ![](https://img.shields.io/npm/dm/vue-atlas.svg?colorA=57D9A3&colorB=666666)
</div>
---

A library of [Vue.js](https://vuejs.org) 2.x components.

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

## Contributing

Please see [CONTRIBUTING.md](https://github.com/nvms/vue-atlas/blob/master/.github/CONTRIBUTING.md).

## 🎉 Contributors

Many thanks to those of you who have taken an interest in this project and have decided to make contributions. Significant contribution will get you added to the list!

- [SamuelRiversMoore](https://github.com/SamuelRiversMoore)
- [marvinrabe](https://github.com/marvinrabe)
- [rejifald](https://github.com/rejifald)

)