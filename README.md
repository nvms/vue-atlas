# vue-atlas

![](https://img.shields.io/npm/v/vue-atlas.svg?colorA=57D9A3&colorB=666666) ![](https://img.shields.io/npm/dm/vue-atlas.svg?colorA=57D9A3&colorB=666666) ![](https://img.shields.io/node/v/vue-atlas.svg?colorA=57D9A3&colorB=666666)

---

A library of [Vue.js](https://vuejs.org) 2.x components.

Documentation and examples at [https://vue-atlas.com](https://vue-atlas.com)

## Installation

[https://www.npmjs.com/package/vue-atlas](https://www.npmjs.com/package/vue-atlas)

```bash
# npm
npm install vue-atlas
```

```bash
# yarn
yarn add vue-atlas
```

## Usage

You can either import all of the components into your project or, to decrease bundle size, import only the components you require.

### Import all components

```javascript
import Vue from 'vue'

import Va from 'vue-atlas'
import 'vue-atlas/dist/vue-atlas.css'

Vue.use(Va, 'en')
```

### Import individual components

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

Please visit the documentation page linked above for more detailed examples of each component.

## Contributors

Thanks to those of you who have taken an interest in this project and decided to make contributions.

- [SamuelRiversMoore](https://github.com/SamuelRiversMoore)
- [marvinrabe](https://github.com/marvinrabe)

