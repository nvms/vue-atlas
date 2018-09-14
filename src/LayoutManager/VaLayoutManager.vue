<template>
  <div>
    <slot/>
  </div>
</template>

<script>
import events from '../utils/events'
// import type from '../utils/type'

export default {
  name: 'VaLayoutManager',
  mixins: [events],
  props: {
    desktopSidebarWidth: {
      type: [Number, String],
      default: 0,
      required: false
    },
    desktopMinibarWidth: {
      type: [Number, String],
      default: 0,
      required: false
    },
    desktopTopbarHeight: {
      type: [Number, String],
      default: 0,
      required: false
    },
    mobileFriendly: {
      type: Boolean,
      default: true
    },
    mobileBreakpoint: {
      type: Number,
      default: 768,
      required: false
    },
    mobileSidebarWidth: {
      type: [Number, String],
      default: 0,
      required: false
    },
    mobileMinibarWidth: {
      type: [Number, String],
      default: 0,
      required: false
    },
    mobileTopbarHeight: {
      type: [Number, String],
      default: 0,
      required: false
    },
    rtl: {
      type: Boolean,
      default: false
    },
    sidebarPriority: {
      type: Boolean,
      default: false,
      required: false
    },
    prefixCls: {
      type: String,
      default: 'va'
    }
  },
  data () {
    return {
      haveTopbar: false,
      haveMinibar: false,
      haveSidebar: false,
      havePage: false,

      currentTopbarHeight: 0,
      currentMinibarWidth: 0,
      currentSidebarWidth: 0,

      isMobile: false,
      pastMobileBreakpoint: false,

      windowWidth: 0
    }
  },
  watch: {
    pastMobileBreakpoint (val) {
      this.broadcastIsMobile(val)
      this.setAndBroadcastDimensions()
    },
    desktopSidebarWidth (val) {
      this.setAndBroadcastDimensions()
    },
    desktopMinibarWidth (val) {
      this.setAndBroadcastDimensions()
    },
    desktopTopbarHeight (val) {
      this.setAndBroadcastDimensions()
    },
    mobileSidebarWidth (val) {
      this.setAndBroadcastDimensions()
    },
    mobileMinibarWidth (val) {
      this.setAndBroadcastDimensions()
    },
    mobileTopbarHeight (val) {
      this.setAndBroadcastDimensions()
    },
    rtl (val) {
      this.broadcastIsRTL(val)
    },
    sidebarPriority (val) {
      this.broadcastSidebarPriority(val)
    }
  },
  methods: {
    _handleResize () {
      let ww = window.innerWidth || document.body.clientWidth

      if (parseInt(ww) < this.mobileBreakpoint) {
        this.pastMobileBreakpoint = true
      } else {
        this.pastMobileBreakpoint ? this.pastMobileBreakpoint = false : true
      }

      this.windowWidth = parseInt(ww)
    },
    broadcastSidebarWidth (val) {
      this.broadcast('VaBars', 'Va@sidebarWidthChange', val)
      this.broadcast('VaPage', 'Va@sidebarWidthChange', val)
      this.broadcast('VaTopbar', 'Va@sidebarWidthChange', val)
    },
    broadcastMinibarWidth (val) {
      this.broadcast('VaBars', 'Va@minibarWidthChange', val)
      this.broadcast('VaPage', 'Va@minibarWidthChange', val)
      this.broadcast('VaMinibar', 'Va@minibarWidthChange', val)
      this.broadcast('VaTopbar', 'Va@minibarWidthChange', val)
    },
    broadcastTopbarHeight (val) {
      this.broadcast('VaBars', 'Va@topbarHeightChange', val)
      this.broadcast('VaPage', 'Va@topbarHeightChange', val)
      this.broadcast('VaTopbar', 'Va@topbarHeightChange', val)
    },
    broadcastIsMobile (val) {
      this.broadcast('VaTopbar', 'Va@topbarIsMobile', val)
      this.broadcast('VaSidebar', 'Va@sidebarIsMobile', val)
      this.broadcast('VaPage', 'Va@pageIsMobile', val)
      this.broadcast('VaMinibar', 'Va@minibarIsMobile', val)
      this.broadcast('VaRange', 'Va@rangeIsMobile', val)

      this.broadcast('VaMobile', 'Va@mobileIsMobile', val)
      this.broadcast('VaDesktop', 'Va@desktopIsMobile', val)
    },
    broadcastIsRTL (val) {
      this.broadcast('VaPage', 'Va@rtlChange', val)
      this.broadcast('VaBars', 'Va@rtlChange', val)
      this.broadcast('VaTopbar', 'Va@rtlChange', val)
    },
    broadcastSidebarPriority (val) {
      this.broadcast('VaBars', 'Va@sidebarPriorityChange', val)
      this.broadcast('VaTopbar', 'Va@sidebarPriorityChange', val)
    },
    checkForPresenceOfTopbar () {
      this.broadcast('VaTopbar', 'Va@topbarPresenceCheck', true)
    },
    checkForPresenceOfSidebar () {
      this.broadcast('VaSidebar', 'Va@sidebarPresenceCheck', true)
    },
    checkForPresenceOfMinibar () {
      this.broadcast('VaMinibar', 'Va@minibarPresenceCheck', true)
    },
    checkForPresenceOfPage () {
      this.broadcast('VaPage', 'Va@pagePresenceCheck', true)
    },
    setAndBroadcastDimensions () {
      if (this.pastMobileBreakpoint) {
        this.currentTopbarHeight = this.mobileTopbarHeight
        this.currentMinibarWidth = this.mobileMinibarWidth
        this.currentSidebarWidth = this.mobileSidebarWidth
      } else {
        this.currentTopbarHeight = this.desktopTopbarHeight
        this.currentMinibarWidth = this.desktopMinibarWidth
        this.currentSidebarWidth = this.desktopSidebarWidth
      }
      this.broadcastSidebarWidth(this.currentSidebarWidth)
      this.broadcastMinibarWidth(this.currentMinibarWidth)
      this.broadcastTopbarHeight(this.currentTopbarHeight)
    }
  },
  mounted () {
    window.addEventListener('resize', this._handleResize, false)
    this._handleResize()

    this.setAndBroadcastDimensions()

    this.checkForPresenceOfTopbar()
    this.checkForPresenceOfSidebar()
    this.checkForPresenceOfPage()

    this.broadcastIsRTL(this.rtl)
    this.broadcastSidebarPriority(this.sidebarPriority)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this._handleResize, false)
  },
  created () {
    // Presence replies
    this.$on('Va@topbarPresenceReply', (val) => {
      if (val === true) {
        this.haveTopbar = true
      }
    })
    this.$on('Va@minibarPresenceReply', (val) => {
      if (val === true) {
        this.haveMinibar = true
      }
    })
    this.$on('Va@sidebarPresenceReply', (val) => {
      if (val === true) {
        this.haveSidebar = true
      }
    })
    this.$on('Va@pagePresenceReply', (val) => {
      if (val === true) {
        this.havePage = true
      }
    })

    // Listen for Sidebar width change - implemented when Sidebar's resizer was implemented
    // this.$on('Va@sidebarWidthChange', (val) => {
    //   this.broadcastSidebarWidth(val)
    // })

    // Some components might want to request the isMobile status, for example,
    // if they have been created a while after isMobile was broadcast.
    // See VaRange.
    this.$on('Va@requestIsMobile', (val) => {
      if (val === true) {
        this.broadcastIsMobile(this.pastMobileBreakpoint)
      }
    })

    // Disconnections
    this.$on('Va@sidebarDisconnect', (val) => {
      if (val === true) {
        this.haveSidebar = false
      }
    })
    this.$on('Va@minibarDisconnect', (val) => {
      if (val === true) {
        this.haveMinibar = false
      }
    })
    this.$on('Va@topbarDisconnect', (val) => {
      if (val === true) {
        this.haveTopbar = false
      }
    })
    this.$on('Va@pageDisconnect', (val) => {
      if (val === true) {
        this.havePage = false
      }
    })
  }
}
</script>
