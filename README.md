<p align="center">
  <img src="https://vue-atlas.com/branding_github.png">
</p>

---

A library of [Vue.js](https://vuejs.org) 2.x components based on the [Atlassian&trade; Design Guidelines](https://atlassian.design/).

![](https://img.shields.io/npm/v/vue-atlas.svg)

[Documentation](https://vue-atlas.com)

## Installation

[https://www.npmjs.com/package/vue-atlas](https://www.npmjs.com/package/vue-atlas)

```bash
npm install vue-atlas --save-dev
```

## Quickstart

``` javascript
import Vue from 'vue'
import Va from 'vue-atlas'
import 'vue-atlas/dist/index.min.css'

Vue.use(Va, 'en')
```

Please visit the documentation page for more detailed examples of each component.

## Want to use this with VuePress?

In your VuePress project folder, install `vue-atlas` as well as `node-sass` and `sass-loader`:

```bash
npm install vue-atlas
npm install node-sass
npm install sass-loader
```

If you haven't already, in your VuePress project folder create a folder named `.vuepress` and another folder named `theme` inside of it. Create a file named `Layout.vue` in that location.

```bash
mkdir -p .vuepress/theme
touch .vuepress/theme/Layout.vue
```

In `Layout.vue`, import Vue and vue-atlas. When you import vue-atlas this way, you don't have to directly import the css.

```javascript
import Vue from 'vue'
import Va from '../../node_modules/vue-atlas/src/index.js'
Vue.use(Va, 'en')
```