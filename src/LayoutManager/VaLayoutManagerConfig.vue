<template>
  <div>
    <va-button
      :style="styleObj"
      type="primary"
      round
      ref="cfgbtn"
      size="md"
      @click.native="showConfigModal">
      <va-icon type="sliders-h" icon-style="solid"></va-icon>
    </va-button>
    <va-modal ref="configModal" title="LayoutManagerConfig" :width="800" :backdrop="false">
      <div slot="body" class="themeModalBody">
        <va-mobile>
          <p>
            The LayoutManagerConfig is meant to be used on a desktop. If you're on a desktop, try increasing your resolution.
          </p>
        </va-mobile>
        <va-desktop>
          <va-tabs>
            <va-tab name="Options">
              <p style="margin-bottom: 10px;">There are hundreds of combinations of layouts that you can build using the vue-atlas LayoutManager.</p>
              <h3>Built-in themes</h3>
              <hr/>
              <va-row :gutter="10">
                <va-column :xs="4">
                  <p>
                    Minibar<br/>
                    <va-select v-model="minibarTheme" no-uncheck>
                      <va-option value="default">Default</va-option>
                      <va-option value="white">White</va-option>
                      <va-option value="blue">Blue</va-option>
                      <va-option value="dark">Dark</va-option>
                      <va-option value="darker">Darker</va-option>
                      <va-option value="purple">Purple</va-option>
                    </va-select>
                  </p>
                </va-column>
                <va-column :xs="4">
                  <p>
                    Sidebar<br/>
                    <va-select v-model="sidebarTheme" no-uncheck>
                      <va-option value="default">Default</va-option>
                      <va-option value="white">White</va-option>
                      <va-option value="blue">Blue</va-option>
                      <va-option value="dark">Dark</va-option>
                      <va-option value="darker">Darker</va-option>
                      <va-option value="purple">Purple</va-option>
                    </va-select>
                  </p>
                </va-column>
                <va-column :xs="4">
                  <p>
                    Topbar<br/>
                    <va-select v-model="topbarTheme" no-uncheck>
                      <va-option value="default">Default</va-option>
                      <va-option value="white">White</va-option>
                      <va-option value="blue">Blue</va-option>
                      <va-option value="dark">Dark</va-option>
                      <va-option value="darker">Darker</va-option>
                      <va-option value="purple">Purple</va-option>
                    </va-select>
                  </p>
                </va-column>
              </va-row>

              <va-row :gutter="10">
                <h3>Background colors</h3>
                <hr/>
                <va-column :xs="6">
                  <p>
                    Document<br/>
                    <va-input v-model="bgColor"></va-input>
                  </p>
                </va-column>
                <va-column :xs="6">
                  <p>
                    Page (content)<br/>
                    <va-input v-model="pageBgColor"></va-input>
                  </p>
                </va-column>
              </va-row>

              <va-row :gutter="10">
                <h3>Page</h3>
                <hr/>
                <va-column :xs="12">
                  <p>
                    Page size<br/>
                    <va-select v-model="pageSize" no-uncheck>
                      <va-option value="sm">Small</va-option>
                      <va-option value="md">Medium</va-option>
                      <va-option value="lg">Large</va-option>
                    </va-select>
                  </p>
                </va-column>
              </va-row>

              <va-row :gutter="10">
                <h3>Misc. layout manager props</h3>
                <hr/>
                <va-column :xs="4">
                  <p>
                    <va-checkbox v-model="sidebarPriority">sidebarPriority</va-checkbox>
                  </p>
                  <p>
                    <va-checkbox v-model="minibarPriority">minibarPriority</va-checkbox>
                  </p>
                  <p>
                    <va-tooltip
                      trigger="hover"
                      content="Disabled unless !topbarPriority, !minibarPriority and desktopMargin !== 0"
                      placement="right"
                      effect="tooltip-fade-right">
                      <va-checkbox v-model="topbarPriority" :disabled="shouldTopbarPriorityBeDisabled">topbarPriority</va-checkbox>
                    </va-tooltip>
                  </p>
                  <p>
                    <va-tooltip
                      trigger="hover"
                      content="Disabled unless topbarPriority and desktopMargin !== 0"
                      placement="right"
                      effect="tooltip-fade-right">
                      <va-checkbox v-model="topbarPadded" :disabled="shouldTopbarPaddedBeDisabled">topbarPadded</va-checkbox>
                    </va-tooltip>
                  </p>
                </va-column>
                <va-column :xs="4">
                  <p>
                    <va-checkbox v-model="rtl">rtl</va-checkbox>
                  </p>
                  <p>
                    <va-checkbox v-model="reverse">reverse</va-checkbox>
                  </p>
                  <p>
                    <va-checkbox v-model="split">split</va-checkbox>
                  </p>
                </va-column>
                <va-column :xs="4">
                  <p>
                    <va-checkbox v-model="showToggle">showToggle</va-checkbox>
                  </p>
                  <p>
                    <va-checkbox v-model="compact">compact</va-checkbox>
                  </p>
                  <p>
                    <va-checkbox v-model="textLinks">textLinks</va-checkbox>
                  </p>
                </va-column>
              </va-row>

              <va-row :gutter="10">
                <h3>Content margin and minimum width</h3>
                <hr/>
                <va-column :xs="4">
                  <p>
                    Desktop margin: {{desktopMargin}}<br/>
                    <va-range :min="0" :max="1000" :step="1" v-model="desktopMargin" ref="desktopMarginRange"></va-range>
                  </p>
                </va-column>
                <va-column :xs="4">
                  <p>
                    Desktop minimum width: {{desktopMinimumWidth}}<br/>
                    <va-range :min="0" :max="1024" :step="1" v-model="desktopMinimumWidth" ref="desktopMinimumWidthRange"></va-range>
                  </p>
                </va-column>
                <va-column :xs="4">
                  <p>
                    &nbsp;
                  </p>
                </va-column>
              </va-row>

              <va-row :gutter="10">
                <h3>Desktop bar dimensions</h3>
                <hr/>
                <va-column :xs="4">
                  <p>
                    Sidebar width: {{desktopSidebarWidth}}<br/>
                    <va-range :min="0" :max="400" :step="1" v-model="desktopSidebarWidth" ref="desktopSidebarWidthRange"></va-range>
                  </p>
                </va-column>
                <va-column :xs="4">
                  <p>
                    Minibar width: {{desktopMinibarWidth}}<br/>
                    <va-range :min="0" :max="150" :step="1" v-model="desktopMinibarWidth" ref="desktopMinibarWidthRange"></va-range>
                  </p>
                </va-column>
                <va-column :xs="4">
                  <p>
                    Topbar height: {{desktopTopbarHeight}}<br/>
                    <va-range :min="0" :max="150" :step="1" v-model="desktopTopbarHeight" ref="desktopTopbarHeightRange"></va-range>
                  </p>
                </va-column>
              </va-row>

              <va-row :gutter="10">
                <h3>Mobile bar dimensions</h3>
                <hr/>
                <va-column :xs="4">
                  <p>
                    Sidebar width: {{mobileSidebarWidth}}<br/>
                    <va-range :min="0" :max="400" :step="1" v-model="mobileSidebarWidth" ref="mobileSidebarWidthRange"></va-range>
                  </p>
                </va-column>
                <va-column :xs="4">
                  <p>
                    Minibar width: {{mobileMinibarWidth}}<br/>
                    <va-range :min="0" :max="150" :step="1" v-model="mobileMinibarWidth" ref="mobileMinibarWidthRange"></va-range>
                  </p>
                </va-column>
                <va-column :xs="4">
                  <p>
                    Topbar height: {{mobileTopbarHeight}}<br/>
                    <va-range :min="0" :max="150" :step="1" v-model="mobileTopbarHeight" ref="mobileTopbarHeightRange"></va-range>
                  </p>
                </va-column>
              </va-row>

            </va-tab>
            <!-- This is a test -->
            <va-tab name="Source">
              <code>
              <pre class="back"><span class="blue">&lt;template&gt;</span>
    <span class="comment">&lt;!-- https://vue-atlas.com/documentation/layoutmanager --&gt;</span>
    <span class="blue">&lt;va-layout-manager</span>
      <span class="yellow">bg-color</span>=<span class="green">"{{bgColor}}"</span>
      <span class="yellow">page-bg-color</span>=<span class="green">"{{pageBgColor}}"</span>
      <span class="yellow">desktop-margin</span>=<span class="green">"{{desktopMargin}}"</span>
      <span class="yellow">desktop-minimum-width</span>=<span class="green">"{{desktopMinimumWidth}}"</span>
      <span class="yellow">desktop-sidebar-width</span>=<span class="green">"{{desktopSidebarWidth}}"</span>
      <span class="yellow">desktop-minibar-width</span>=<span class="green">"{{desktopMinibarWidth}}"</span>
      <span class="yellow">desktop-topbar-height</span>=<span class="green">"{{desktopTopbarHeight}}"</span>
      <span class="yellow">mobile-sidebar-width</span>=<span class="green">"{{mobileSidebarWidth}}"</span>
      <span class="yellow">mobile-minibar-width</span>=<span class="green">"{{mobileMinibarWidth}}"</span>
      <span class="yellow">mobile-topbar-height</span>=<span class="green">"{{mobileTopbarHeight}}"</span>
      <span class="yellow">:rtl</span>=<span class="green">"{{rtl}}"</span>
      <span class="yellow">:reverse</span>=<span class="green">"{{reverse}}"</span>
      <span class="yellow">:split</span>=<span class="green">"{{split}}"</span>
      <span class="yellow">:sidebar-priority</span>=<span class="green">"{{sidebarPriority}}"</span>
      <span class="yellow">:minibar-priority</span>=<span class="green">"{{minibarPriority}}"</span>
      <span class="yellow">:topbar-priority</span>=<span class="green">"{{topbarPriority}}"</span>
      <span class="yellow">:topbar-padded</span>=<span class="green">"{{topbarPadded}}"</span><span class="blue">&gt;</span>

      <span class="comment">&lt;!-- https://vue-atlas.com/documentation/topbar --&gt;</span>
      <span class="blue">&lt;va-topbar</span> <span class="yellow">theme</span>=<span class="green">"{{topbarTheme}}"</span><span class="blue">&gt;</span>
        <span class="blue">&lt;div</span> <span class="yellow">slot</span>=<span class="green">"left"</span><span class="blue">&gt;</span> L <span class="blue">&lt;/div&gt;</span>
        <span class="blue">&lt;div</span> <span class="yellow">slot</span>=<span class="green">"center"</span><span class="blue">&gt;</span> C <span class="blue">&lt;/div&gt;</span>
        <span class="blue">&lt;div</span> <span class="yellow">slot</span>=<span class="green">"right"</span><span class="blue">&gt;</span> R <span class="blue">&lt;/div&gt;</span>
      <span class="blue">&lt;/va-topbar&gt;</span>

      <span class="comment">&lt;!-- https://vue-atlas.com/documentation/minibar --&gt;</span>
      <span class="blue">&lt;va-minibar</span>
        <span class="yellow">:top-items</span>=<span class="green">"[{icon:'home'},{icon:'search'},{icon:'user'}]"</span>
        <span class="yellow">:bottom-items</span>=<span class="green">"[{icon:'question'}]"</span>
        <span class="yellow">theme</span>=<span class="green">"{{minibarTheme}}"</span> <span class="blue">/&gt;</span>

      <span class="comment">&lt;!-- https://vue-atlas.com/documentation/sidebar --&gt;</span>
      <span class="blue">&lt;va-sidebar</span>
        <span class="yellow">theme</span>=<span class="green">"{{sidebarTheme}}"</span>
        <span class="yellow">:compact</span>=<span class="green">"{{compact}}"</span>
        <span class="yellow">:text-links</span>=<span class="green">"{{textLinks}}"</span><span class="blue">&gt;</span>
        <span class="blue">&lt;va-sidebar-scrollarea&gt;</span>
          <span class="blue">&lt;va-sidebar-group</span>
            <span class="yellow">:items</span>=<span class="green">"[{name:'Item1'}]"</span>
            <span class="yellow">title</span>=<span class="green">"Category 1"</span>
            <span class="yellow">:show-toggle</span>=<span class="green">"{{showToggle}}"</span> <span class="blue">/&gt;</span>
          <span class="blue">&lt;va-sidebar-group</span>
            <span class="yellow">:items</span>=<span class="green">"[{name:'Item1'}]"</span>
            <span class="yellow">title</span>=<span class="green">"Category 2"</span>
            <span class="yellow">:show-toggle</span>=<span class="green">"{{showToggle}}"</span> <span class="blue">/&gt;</span>
        <span class="blue">&lt;/va-sidebar-scrollarea&gt;</span>
      <span class="blue">&lt;/va-sidebar&gt;</span>

      <span class="comment">&lt;!-- https://vue-atlas.com/documentation/page --&gt;</span>
      <span class="blue">&lt;va-page</span> <span class="yellow">size</span>=<span class="green">"{{pageSize}}"</span><span class="blue">&gt;</span>
        <span class="blue">&lt;transition&gt;</span>
          <span class="blue">&lt;router-view&gt;</span>
            ...
          <span class="blue">&lt;/router-view&gt;</span>
        <span class="blue">&lt;/transition&gt;</span>
      <span class="blue">&lt;/va-page&gt;</span>

    <span class="blue">&lt;/va-layout-manager&gt;</span>
  <span class="blue">&lt;/template&gt;</span></pre>
              </code>
            </va-tab>
          </va-tabs>
        </va-desktop>
      </div>
      <!-- end body slot -->
      <div slot="footer">
        <div style="text-align:right;">
          <va-button type="primary" @click.native="$refs.configModal.close()">
            Close
          </va-button>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import events from '../utils/events'

export default {
  name: 'VaLayoutManagerConfig',
  mixins: [events],
  props: {
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      /**
       * Config button placement
       */
      btnPosition: {},

      /**
       * Sensible defaults, but will be overwritten by
       * VaLayoutManager when it broadcasts initial values.
       * See broadcastDefaultsToConfig()
       */
      minibarTheme: 'default',
      sidebarTheme: 'default',
      topbarTheme: 'blue',

      showToggle: false,
      compact: false,
      textLinks: false,

      desktopSidebarWidth: 210,
      desktopMinibarWidth: 50,
      desktopTopbarHeight: 48,
      desktopMargin: 0,
      desktopMinimumWidth: 1024,
      mobileSidebarWidth: 0,
      mobileMinibarWidth: 0,
      mobileTopbarHeight: 50,
      sidebarPriority: false,
      minibarPriority: false,
      topbarPriority: false,
      topbarPadded: false,
      rtl: false,
      reverse: false,
      split: false,
      pageSize: 'md',
      bgColor: '#f4f5f7',
      pageBgColor: '#ffffff'
    }
  },
  watch: {
    desktopSidebarWidth (val) { this.dispatch('VaLayoutManager', 'Va@configDesktopSidebarWidthChange', val) },
    desktopTopbarHeight (val) { this.dispatch('VaLayoutManager', 'Va@configDesktopTopbarHeightChange', val) },
    desktopMinibarWidth (val) { this.dispatch('VaLayoutManager', 'Va@configDesktopMinibarWidthChange', val) },
    desktopMargin (val) { this.dispatch('VaLayoutManager', 'Va@configDesktopMarginChange', val) },
    desktopMinimumWidth (val) { this.dispatch('VaLayoutManager', 'Va@configDesktopMinimumWidthChange', val) },
    mobileSidebarWidth (val) { this.dispatch('VaLayoutManager', 'Va@configMobileSidebarWidthChange', val) },
    mobileTopbarHeight (val) { this.dispatch('VaLayoutManager', 'Va@configMobileTopbarHeightChange', val) },
    mobileMinibarWidth (val) { this.dispatch('VaLayoutManager', 'Va@configMobileMinibarWidthChange', val) },
    sidebarPriority (val) { this.dispatch('VaLayoutManager', 'Va@configSidebarPriorityChange', val) },
    minibarPriority (val) { this.dispatch('VaLayoutManager', 'Va@configMinibarPriorityChange', val) },
    topbarPriority (val) { this.dispatch('VaLayoutManager', 'Va@configTopbarPriorityChange', val) },
    topbarPadded (val) { this.dispatch('VaLayoutManager', 'Va@configTopbarPaddedChange', val) },
    rtl (val) { this.dispatch('VaLayoutManager', 'Va@configRtlChange', val) },
    split (val) { this.dispatch('VaLayoutManager', 'Va@configSplitChange', val) },
    reverse (val) { this.dispatch('VaLayoutManager', 'Va@configReverseChange', val) },
    compact (val) { this.dispatch('VaLayoutManager', 'Va@configCompactChange', val) },
    showToggle (val) { this.dispatch('VaLayoutManager', 'Va@configShowToggleChange', val) },
    textLinks (val) { this.dispatch('VaLayoutManager', 'Va@configTextLinksChange', val) },
    pageSize (val) { this.dispatch('VaLayoutManager', 'Va@configPageSizeChange', val) },

    topbarTheme (val) { this.dispatch('VaLayoutManager', 'Va@configTopbarThemeChange', val) },
    minibarTheme (val) { this.dispatch('VaLayoutManager', 'Va@configMinibarThemeChange', val) },
    sidebarTheme (val) { this.dispatch('VaLayoutManager', 'Va@configSidebarThemeChange', val) },

    bgColor (val) { this.dispatch('VaLayoutManager', 'Va@configBgColorChange', val) },
    pageBgColor (val) { this.dispatch('VaLayoutManager', 'Va@configPageBgColorChange', val) }
  },
  methods: {
    showConfigModal () {
      this.$refs.configModal.open()

      setTimeout(() => {
        this.$refs.desktopSidebarWidthRange.update()
        this.$refs.desktopMinibarWidthRange.update()
        this.$refs.desktopTopbarHeightRange.update()
        this.$refs.mobileSidebarWidthRange.update()
        this.$refs.mobileMinibarWidthRange.update()
        this.$refs.mobileTopbarHeightRange.update()
        this.$refs.desktopMarginRange.update()
        this.$refs.desktopMinimumWidthRange.update()
      }, 10)
    },
    getPosition (el) {
      let rect = el.getBoundingClientRect()
      return {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y
      }
    },
    _handleResize () {
      this.btnPosition = this.getPosition(this.$refs.cfgbtn.$el)
    }
  },
  mounted () {
    window.addEventListener('resize', this._handleResize, false)
    /**
     * Call the handler function directly instead of instantiating a resize
     * event like so: window.dispatchEvent(new Event('resize'))
     *
     * Benefit is.. ?
     */
    this._handleResize()
  },
  created () {
    /**
     * Here we set up receiver events so that if we pass defaults to a
     * LayoutManager, we can send them over to the config component.
     */
    this.$on('Va@configReceiveDesktopTopbarHeight', (val) => { this.desktopTopbarHeight = val })
    this.$on('Va@configReceiveDesktopMinibarWidth', (val) => { this.desktopMinibarWidth = val })
    this.$on('Va@configReceiveDesktopSidebarWidth', (val) => { this.desktopSidebarWidth = val })
    this.$on('Va@configReceiveDesktopMinimumWidth', (val) => { this.desktopMinimumWidth = val })
    this.$on('Va@configReceiveMobileMinibarWidth', (val) => { this.mobileMinibarWidth = val })
    this.$on('Va@configReceiveMobileSidebarWidth', (val) => { this.mobileSidebarWidth = val })
    this.$on('Va@configReceiveMobileTopbarHeight', (val) => { this.mobileTopbarHeight = val })
    this.$on('Va@configReceiveSidebarPriority', (val) => { this.sidebarPriority = val })
    this.$on('Va@configReceiveMinibarPriority', (val) => { this.minibarPriority = val })
    this.$on('Va@configReceiveTopbarPriority', (val) => { this.topbarPriority = val })
    this.$on('Va@configReceiveDesktopMargin', (val) => { this.desktopMargin = val })
    this.$on('Va@configReceiveTopbarPadded', (val) => { this.topbarPadded = val })
    this.$on('Va@configReceiveMinibarTheme', (val) => { this.minibarTheme = val })
    this.$on('Va@configReceiveSidebarTheme', (val) => { this.sidebarTheme = val })
    this.$on('Va@configReceiveTopbarTheme', (val) => { this.topbarTheme = val })
    this.$on('Va@configReceivePageBgColor', (val) => { this.pageBgColor = val })
    this.$on('Va@configReceiveShowToggle', (val) => { this.showToggle = val })
    this.$on('Va@configReceiveTextLinks', (val) => { this.textLinks = val })
    this.$on('Va@configReceivePageSize', (val) => { this.pageSize = val })
    this.$on('Va@configReceiveCompact', (val) => { this.compact = val })
    this.$on('Va@configReceiveReverse', (val) => { this.reverse = val })
    this.$on('Va@configReceiveBgColor', (val) => { this.bgColor = val })
    this.$on('Va@configReceiveSplit', (val) => { this.split = val })
    this.$on('Va@configReceiveRtl', (val) => { this.rtl = val })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this._handleResize, false)
  },
  computed: {
    classObj () {
      // let prefixCls = this
      let klass = {}

      return klass
    },
    styleObj () {
      let style = {}
      let woh = window.outerHeight
      let position = this.btnPosition

      style['position'] = 'fixed'
      style['right'] = '14px'
      style['z-index'] = '99999'
      style['top'] = (woh / 2) - (position.height * 1.5) + 'px'
      style['border-top-right-radius'] = '0px'
      style['border-bottom-right-radius'] = '0px'

      return style
    },
    shouldTopbarPriorityBeDisabled () {
      if (this.sidebarPriority || this.minibarPriority) {
        return true
      }
      if (this.desktopMargin === 0) {
        return true
      }

      return false
    },
    shouldTopbarPaddedBeDisabled () {
      if (this.desktopMargin === 0) {
        return true
      }

      if (!this.topbarPriority) {
        return true
      }

      return false
    }
  }
}
</script>

<style lang="scss">
.themeModalBody {
  hr {
    margin-bottom: 5px;
  }
}
.va-col {
  p {
    margin-top: 0em;
  }
}
.back {
  background-color: #212733;
  padding: 10px;
  font-size: 12px;
  line-height: 16px;
  color: #B0AFAB;
  border-radius: 5px;
}
.comment {
  color: #5C676D;
  font-style: italic;
}
.blue {
  color: #5CCFE0;
}
.yellow {
  color: #FFD580;
}
.green {
  color: #BAE36D;
}
</style>
