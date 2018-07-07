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
    sidebarWidth: {
      type: [Number, String],
      default: 0,
      required: false
    },
    minibarWidth: {
      type: [Number, String],
      default: 0,
      required: false
    },
    topbarHeight: {
      type: [Number, String],
      default: 0,
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
      havePage: false
    }
  },
  watch: {
    sidebarWidth (val) {
      this.broadcastSidebarWidth(val)
    },
    minibarWidth (val) {
      this.broadcastMinibarWidth(val)
    },
    topbarHeight (val) {
      this.broadcastTopbarHeight(val)
    }
  },
  methods: {
    broadcastSidebarWidth (val) {
      this.broadcast('VaBars', 'Va@sidebarWidthChange', val)
      this.broadcast('VaPage', 'Va@sidebarWidthChange', val)
    },
    broadcastMinibarWidth (val) {
      this.broadcast('VaBars', 'Va@minibarWidthChange', val)
      this.broadcast('VaPage', 'Va@minibarWidthChange', val)
      this.broadcast('VaMinibar', 'Va@minibarWidthChange', val)
    },
    broadcastTopbarHeight (val) {
      this.broadcast('VaBars', 'Va@topbarHeightChange', val)
      this.broadcast('VaPage', 'Va@topbarHeightChange', val)
      this.broadcast('VaTopbar', 'Va@topbarHeightChange', val)
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
    }
  },
  mounted () {
    this.broadcastSidebarWidth(this.sidebarWidth)
    this.broadcastMinibarWidth(this.minibarWidth)

    this.checkForPresenceOfTopbar()
    this.checkForPresenceOfSidebar()
    this.checkForPresenceOfPage()
  },
  created () {
    // Presence replies
    this.$on('Va@topbarPresenceReply', (val) => {
      if (val === true) {
        this.haveTopbar = true
        // topbar height value needs to be broadcast right away
        this.broadcastTopbarHeight(this.topbarHeight)
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
