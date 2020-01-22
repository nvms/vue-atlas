<template>
  <div :style="styleObj">
    <slot/>
  </div>
</template>

<script>
import events from '../utils/events'

export default {
  name: 'VaApp',
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
    minibarPriority: {
      type: Boolean,
      default: false,
      required: false
    },
    topbarPriority: {
      type: Boolean,
      default: false,
      required: false
    },
    topbarPadded: {
      type: Boolean,
      default: false,
      required: false
    },
    split: {
      type: Boolean,
      default: false,
      required: false
    },
    reverse: {
      type: Boolean,
      default: false,
      required: false
    },
    desktopMargin: {
      type: [Number, String],
      default: 0,
      required: false
    },
    desktopMinimumWidth: {
      type: [Number, String],
      default: 0,
      required: false
    },
    bgColor: {
      type: String,
      default: '#F4F5F7',
      required: false
    },
    pageBgColor: {
      type: String,
      default: '#FFFFFF',
      required: false
    },
    showToggle: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    const dDesktopMinimumWidth = this.desktopMinimumWidth
    const dDesktopTopbarHeight = this.desktopTopbarHeight
    const dDesktopMinibarWidth = this.desktopMinibarWidth
    const dDesktopSidebarWidth = this.desktopSidebarWidth
    const dMobileSidebarWidth = this.mobileSidebarWidth
    const dMobileMinibarWidth = this.mobileMinibarWidth
    const dMobileTopbarHeight = this.mobileTopbarHeight
    const dSidebarPriority = this.sidebarPriority
    const dMinibarPriority = this.minibarPriority
    const currDesktopMargin = this.desktopMargin
    const dTopbarPriority = this.topbarPriority
    const dDesktopMargin = this.desktopMargin
    const dTopbarPadded = this.topbarPadded
    const dPageBgColor = this.pageBgColor
    const dShowToggle = this.showToggle
    const dReverse = this.reverse
    const dBgColor = this.bgColor
    const dSplit = this.split
    const dRtl = this.rtl
    return {
      mDesktopTopbarHeight: dDesktopTopbarHeight,
      mDesktopMinimumWidth: dDesktopMinimumWidth,
      mDesktopSidebarWidth: dDesktopSidebarWidth,
      mDesktopMinibarWidth: dDesktopMinibarWidth,
      mMobileSidebarWidth: dMobileSidebarWidth,
      mMobileMinibarWidth: dMobileMinibarWidth,
      mMobileTopbarHeight: dMobileTopbarHeight,
      currentDesktopMargin: currDesktopMargin,
      mMinibarPriority: dMinibarPriority,
      mSidebarPriority: dSidebarPriority,
      mTopbarPriority: dTopbarPriority,
      mDesktopMargin: dDesktopMargin,
      mTopbarPadded: dTopbarPadded,
      pastMobileBreakpoint: false,
      mPageBgColor: dPageBgColor,
      mShowToggle: dShowToggle,
      allowMarginUpdates: true,
      currentTopbarHeight: 0,
      currentSidebarWidth: 0,
      currentMinibarWidth: 0,
      mSidebarTheme: 'blue',
      mMinibarTheme: 'blue',
      mTopbarTheme: 'blue',
      mReverse: dReverse,
      mBgColor: dBgColor,
      haveSidebar: false,
      haveMinibar: false,
      mTextLinks: false,
      haveTopbar: false,
      mCompact: false,
      isMobile: false,
      havePage: false,
      contentWidth: 0,
      mPageSize: 'md',
      mSplit: dSplit,
      windowWidth: 0,
      mRtl: dRtl
    }
  },
  watch: {
    pastMobileBreakpoint (val) {
      this.broadcastIsMobile(val)
      this.setAndBroadcastDimensions()
    },
    desktopSidebarWidth (val) {
      this.mDesktopSidebarWidth = val
    },
    mDesktopSidebarWidth () {
      this.setAndBroadcastDimensions()
    },
    desktopMinibarWidth (val) {
      this.mDesktopMinibarWidth = val
    },
    mDesktopMinibarWidth () {
      this.setAndBroadcastDimensions()
    },
    desktopTopbarHeight (val) {
      this.mDesktopTopbarHeight = val
    },
    mDesktopTopbarHeight () {
      this.setAndBroadcastDimensions()
    },
    mobileSidebarWidth (val) {
      this.mMobileSidebarWidth = val
    },
    mMobileSidebarWidth () {
      this.setAndBroadcastDimensions()
    },
    mobileMinibarWidth (val) {
      this.mMobileMinibarWidth = val
    },
    mMobileMinibarWidth () {
      this.setAndBroadcastDimensions()
    },
    mobileTopbarHeight (val) {
      this.mMobileTopbarHeight = val
    },
    mMobileTopbarHeight () {
      this.setAndBroadcastDimensions()
    },
    rtl (val) {
      this.mRtl = val
    },
    mRtl (val) {
      this.broadcastIsRTL(val)
    },
    sidebarPriority (val) {
      this.mSidebarPriority = val
    },
    mSidebarPriority (val) {
      this.broadcastSidebarPriority(val)
    },
    minibarPriority (val) {
      this.mMinibarPriority = val
    },
    mMinibarPriority (val) {
      this.broadcastMinibarPriority(val)
    },
    topbarPriority (val) {
      this.mTopbarPriority = val
    },
    mTopbarPriority (val) {
      this.broadcastTopbarPriority(val)
    },
    topbarPadded (val) {
      this.mTopbarPadded = val
    },
    mTopbarPadded (val) {
      this.broadcastTopbarPadded(val)
    },
    bgColor (val) {
      this.mBgColor = val
    },
    mBgColor (val) {
      this.broadcastBgColor(val)
    },
    pageBgColor (val) {
      this.mPageBgColor = val
    },
    mPageBgColor (val) {
      this.broadcastPageBgColor(val)
    },
    split (val) {
      this.mSplit = val
    },
    mSplit (val) {
      this.broadcastIsSplit(val)
    },
    reverse (val) {
      this.mReverse = val
    },
    mReverse (val) {
      this.broadcastIsReverse(val)
    },
    mCompact (val) {
      this.broadcastCompact(val)
    },
    mTextLinks (val) {
      this.broadcastTextLinks(val)
    },
    showToggle (val) {
      this.mShowToggle = val
    },
    mShowToggle (val) {
      this.broadcastShowToggle(val)
    },
    desktopMargin (val) {
      this.mDesktopMargin = val
    },
    mDesktopMargin (val) {
      /**
       * Calling _handleResize here. Why? So a new contentWidth
       * is calculated and broadcasted.
       */
      this._handleResize()
      this.broadcastDesktopMargin(val)
    },
    desktopMinimumWidth (val) {
      this.mDesktopMinimumWidth = val
    },
    mDesktopMinimumWidth (val) {
      this.broadcastDesktopMinimumWidth(val)
    },
    windowWidth (val) {
      this.broadcastWindowWidth(val)
    },
    contentWidth (val) {
      this.broadcastContentWidth(val)
    },
    allowMarginUpdates (val) {
      this.broadcastAllowMarginUpdates(val)
    },
    mPageSize (val) {
      this.broadcastPageSize(val)
    },
    topbarTheme (val) {
      this.mTopbarTheme = val
    },
    mTopbarTheme (val) {
      this.broadcastTopbarTheme(val)
    },
    minibarTheme (val) {
      this.mMinibarTheme = val
    },
    mMinibarTheme (val) {
      this.broadcastMinibarTheme(val)
    },
    sidebarTheme (val) {
      this.mSidebarTheme = val
    },
    mSidebarTheme (val) {
      this.broadcastSidebarTheme(val)
    }
  },
  methods: {
    _handleResize () {
      const ww = window.innerWidth || document.body.clientWidth

      if (parseInt(ww) < this.mobileBreakpoint) {
        this.pastMobileBreakpoint = true
      } else {
        this.pastMobileBreakpoint ? (this.pastMobileBreakpoint = false) : true
      }

      this.windowWidth = parseInt(ww)
      this.contentWidth = this.windowWidth - this.mDesktopMargin * 2
    },
    broadcastSidebarWidth (val) {
      this.broadcast('VaSidebar', 'Va@sidebarWidthChange', val)
      this.broadcast('VaMinibar', 'Va@sidebarWidthChange', val)
      this.broadcast('VaTopbar', 'Va@sidebarWidthChange', val)
      this.broadcast('VaPage', 'Va@sidebarWidthChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastMinibarWidth (val) {
      this.broadcast('VaSidebar', 'Va@minibarWidthChange', val)
      this.broadcast('VaMinibar', 'Va@minibarWidthChange', val)
      this.broadcast('VaTopbar', 'Va@minibarWidthChange', val)
      this.broadcast('VaPage', 'Va@minibarWidthChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastTopbarHeight (val) {
      this.broadcast('VaSidebar', 'Va@topbarHeightChange', val)
      this.broadcast('VaMinibar', 'Va@topbarHeightChange', val)
      this.broadcast('VaTopbar', 'Va@topbarHeightChange', val)
      this.broadcast('VaPage', 'Va@topbarHeightChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastIsMobile (val) {
      this.broadcast('VaSidebar', 'Va@sidebarIsMobile', val)
      this.broadcast('VaMinibar', 'Va@minibarIsMobile', val)
      this.broadcast('VaTopbar', 'Va@topbarIsMobile', val)
      this.broadcast('VaPage', 'Va@pageIsMobile', val)
      this.broadcast('VaRange', 'Va@rangeIsMobile', val)
      this.broadcast('VaMobile', 'Va@mobileIsMobile', val)
      this.broadcast('VaDesktop', 'Va@desktopIsMobile', val)
      this.broadcast('VaDatepicker', 'Va@datepickerIsMobile', val)
      this.broadcast('VaTimepicker', 'Va@timepickerIsMobile', val)
    },
    broadcastIsRTL (val) {
      this.broadcast('VaSidebar', 'Va@rtlChange', val)
      this.broadcast('VaMinibar', 'Va@rtlChange', val)
      this.broadcast('VaTopbar', 'Va@rtlChange', val)
      this.broadcast('VaPage', 'Va@rtlChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastIsSplit (val) {
      this.broadcast('VaSidebar', 'Va@splitChange', val)
      this.broadcast('VaMinibar', 'Va@splitChange', val)
      this.broadcast('VaTopbar', 'Va@splitChange', val)
      this.broadcast('VaPage', 'Va@splitChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastCompact (val) {
      this.broadcast('VaSidebar', 'Va@compactChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastTextLinks (val) {
      this.broadcast('VaSidebar', 'Va@textLinksChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastShowToggle (val) {
      this.broadcast('VaSidebar', 'Va@showToggleChange', val)
      this.broadcast('VaSidebarGroupItem', 'Va@showToggleChange', val)
      this.broadcast('VaSidebarGroupLevel', 'Va@showToggleChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastBgColor () {
      /**
       * Nobody needs to know about BgColor.
       * Only relevant to this component.
       */
      this.broadcastDefaultsToConfig(0)
    },
    broadcastPageBgColor (val) {
      this.broadcast('VaPage', 'Va@pageBgColorChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastIsReverse (val) {
      this.broadcast('VaSidebar', 'Va@reverseChange', val)
      this.broadcast('VaMinibar', 'Va@reverseChange', val)
      this.broadcast('VaTopbar', 'Va@reverseChange', val)
      this.broadcast('VaPage', 'Va@reverseChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastSidebarPriority (val) {
      this.broadcast('VaSidebar', 'Va@sidebarPriorityChange', val)
      this.broadcast('VaMinibar', 'Va@sidebarPriorityChange', val)
      this.broadcast('VaTopbar', 'Va@sidebarPriorityChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastMinibarPriority (val) {
      this.broadcast('VaSidebar', 'Va@minibarPriorityChange', val)
      this.broadcast('VaMinibar', 'Va@minibarPriorityChange', val)
      this.broadcast('VaTopbar', 'Va@minibarPriorityChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastTopbarPriority (val) {
      this.broadcast('VaSidebar', 'Va@topbarPriorityChange', val)
      this.broadcast('VaMinibar', 'Va@topbarPriorityChange', val)
      this.broadcast('VaTopbar', 'Va@topbarPriorityChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastTopbarPadded (val) {
      this.broadcast('VaTopbar', 'Va@topbarPaddedChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastDesktopMargin (val) {
      this.broadcast('VaSidebar', 'Va@desktopMarginChange', val)
      this.broadcast('VaMinibar', 'Va@desktopMarginChange', val)
      this.broadcast('VaTopbar', 'Va@desktopMarginChange', val)
      this.broadcast('VaPage', 'Va@desktopMarginChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastDesktopMinimumWidth (val) {
      this.broadcast('VaSidebar', 'Va@desktopMinimumWidthChange', val)
      this.broadcast('VaMinibar', 'Va@desktopMinimumWidthChange', val)
      this.broadcast('VaTopbar', 'Va@desktopMinimumWidthChange', val)
      this.broadcast('VaPage', 'Va@desktopMinimumWidthChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastAllowMarginUpdates () {},
    broadcastWindowWidth (val) {
      this.broadcast('VaSidebar', 'Va@windowWidthChange', val)
      this.broadcast('VaMinibar', 'Va@windowWidthChange', val)
      this.broadcast('VaTopbar', 'Va@windowWidthChange', val)
      this.broadcast('VaPage', 'Va@windowWidthChange', val)
    },
    broadcastContentWidth (val) {
      this.broadcast('VaSidebar', 'Va@contentWidthChange', val)
      this.broadcast('VaMinibar', 'Va@contentWidthChange', val)
      this.broadcast('VaTopbar', 'Va@contentWidthChange', val)
      this.broadcast('VaPage', 'Va@contentWidthChange', val)
    },
    broadcastPageSize (val) {
      this.broadcast('VaPage', 'Va@pageSizeChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastTopbarTheme (val) {
      this.broadcast('VaTopbar', 'Va@topbarThemeChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastSidebarTheme (val) {
      this.broadcast('VaSidebar', 'Va@sidebarThemeChange', val)
      this.broadcastDefaultsToConfig(0)
    },
    broadcastMinibarTheme (val) {
      this.broadcast('VaMinibar', 'Va@minibarThemeChange', val)
      this.broadcastDefaultsToConfig(0)
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
        this.currentTopbarHeight = this.mMobileTopbarHeight
        this.currentMinibarWidth = this.mMobileMinibarWidth
        this.currentSidebarWidth = this.mMobileSidebarWidth
      } else {
        this.currentTopbarHeight = this.mDesktopTopbarHeight
        this.currentMinibarWidth = this.mDesktopMinibarWidth
        this.currentSidebarWidth = this.mDesktopSidebarWidth
      }
      this.broadcastSidebarWidth(this.currentSidebarWidth)
      this.broadcastMinibarWidth(this.currentMinibarWidth)
      this.broadcastTopbarHeight(this.currentTopbarHeight)
    },
    enableReceivers () {
      /**
       * These exist for VaAppConfig.
       *
       * Setting these values should trigger the 'watch' on each of them,
       * which in turn calls the value's respective broadcast function,
       * broadcasting the new value to whatever has implemented an
       * App.
       */
      this.$on('Va@configDesktopTopbarHeightChange', val => {
        this.mDesktopTopbarHeight = val
      })
      this.$on('Va@configDesktopSidebarWidthChange', val => {
        this.mDesktopSidebarWidth = val
      })
      this.$on('Va@configDesktopMinimumWidthChange', val => {
        this.mDesktopMinimumWidth = val
      })
      this.$on('Va@configDesktopMinibarWidthChange', val => {
        this.mDesktopMinibarWidth = val
      })
      this.$on('Va@configMobileTopbarHeightChange', val => {
        this.mMobileTopbarHeight = val
      })
      this.$on('Va@configMobileSidebarWidthChange', val => {
        this.mMobileSidebarWidth = val
      })
      this.$on('Va@configMobileMinibarWidthChange', val => {
        this.mMobileMinibarWidth = val
      })
      this.$on('Va@configSidebarPriorityChange', val => {
        this.mSidebarPriority = val
      })
      this.$on('Va@configMinibarPriorityChange', val => {
        this.mMinibarPriority = val
      })
      this.$on('Va@configTopbarPriorityChange', val => {
        this.mTopbarPriority = val
      })
      this.$on('Va@configDesktopMarginChange', val => {
        this.mDesktopMargin = val
      })
      this.$on('Va@configTopbarPaddedChange', val => {
        this.mTopbarPadded = val
      })
      this.$on('Va@configMinibarThemeChange', val => {
        this.mMinibarTheme = val
      })
      this.$on('Va@configSidebarThemeChange', val => {
        this.mSidebarTheme = val
      })
      this.$on('Va@configTopbarThemeChange', val => {
        this.mTopbarTheme = val
      })
      this.$on('Va@configPageBgColorChange', val => {
        this.mPageBgColor = val
      })
      this.$on('Va@configShowToggleChange', val => {
        this.mShowToggle = val
      })
      this.$on('Va@configTextLinksChange', val => {
        this.mTextLinks = val
      })
      this.$on('Va@configPageSizeChange', val => {
        this.mPageSize = val
      })
      this.$on('Va@configCompactChange', val => {
        this.mCompact = val
      })
      this.$on('Va@configReverseChange', val => {
        this.mReverse = val
      })
      this.$on('Va@configBgColorChange', val => {
        this.mBgColor = val
      })
      this.$on('Va@configSplitChange', val => {
        this.mSplit = val
      })
      this.$on('Va@configRtlChange', val => {
        this.mRtl = val
      })

      /**
       * These receives are for when certain components are unmounted
       * and remounted at runtime (during HMR usually).
       */
      this.$on('Va@pageConnected', () => {
        this.setAndBroadcastDimensions()
      })
      this.$on('Va@minibarConnected', () => {
        this.setAndBroadcastDimensions()
      })
      this.$on('Va@sidebarConnected', () => {
        this.setAndBroadcastDimensions()
      })
    },
    broadcastDefaultsToConfig (delay = 100) {
      setTimeout(() => {
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveDesktopTopbarHeight',
          this.mDesktopTopbarHeight
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveDesktopMinibarWidth',
          this.mDesktopMinibarWidth
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveDesktopSidebarWidth',
          this.mDesktopSidebarWidth
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveDesktopMinimumWidth',
          this.mDesktopMinimumWidth
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveMobileMinibarWidth',
          this.mMobileMinibarWidth
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveMobileSidebarWidth',
          this.mMobileSidebarWidth
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveMobileTopbarHeight',
          this.mMobileTopbarHeight
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveSidebarPriority',
          this.mSidebarPriority
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveMinibarPriority',
          this.mMinibarPriority
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveTopbarPriority',
          this.mTopbarPriority
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveDesktopMargin',
          this.mDesktopMargin
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveTopbarPadded',
          this.mTopbarPadded
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveMinibarTheme',
          this.mMinibarTheme
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveSidebarTheme',
          this.mSidebarTheme
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveTopbarTheme',
          this.mTopbarTheme
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceivePageBgColor',
          this.mPageBgColor
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveShowToggle',
          this.mShowToggle
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceiveTextLinks',
          this.mTextLinks
        )
        this.broadcast(
          'VaAppConfig',
          'Va@configReceivePageSize',
          this.mPageSize
        )
        this.broadcast('VaAppConfig', 'Va@configReceiveCompact', this.mCompact)
        this.broadcast('VaAppConfig', 'Va@configReceiveReverse', this.mReverse)
        this.broadcast('VaAppConfig', 'Va@configReceiveBgColor', this.mBgColor)
        this.broadcast('VaAppConfig', 'Va@configReceiveSplit', this.mSplit)
        this.broadcast('VaAppConfig', 'Va@configReceiveRtl', this.mRtl)
      }, delay)
    }
  },
  mounted () {
    window.addEventListener('resize', this._handleResize, false)
    /**
     * Call the handler function directly instead of instantiating a resize
     * event like so: window.dispatchEvent(new Event('resize'))
     *
     * Benefit is.. ? Browser compatibility? I dunno.
     */
    this._handleResize()

    /**
     * Mobility check.
     */
    this.setAndBroadcastDimensions()

    /**
     * Presence checks. As of now, this is not really used for
     * anything. Maybe in the future?
     */
    this.checkForPresenceOfSidebar()
    this.checkForPresenceOfTopbar()
    this.checkForPresenceOfPage()

    /**
     * Broadcast props that were passed to the components
     * that need to do stuff based on their values.
     */
    this.broadcastDesktopMinimumWidth(this.mDesktopMinimumWidth)
    this.broadcastMinibarPriority(this.mMinibarPriority)
    this.broadcastSidebarPriority(this.mSidebarPriority)
    this.broadcastTopbarPriority(this.mTopbarPriority)
    this.broadcastDesktopMargin(this.mDesktopMargin)
    this.broadcastTopbarPadded(this.mTopbarPadded)
    this.broadcastContentWidth(this.contentWidth)
    this.broadcastPageBgColor(this.mPageBgColor)
    this.broadcastWindowWidth(this.windowWidth)
    this.broadcastShowToggle(this.mShowToggle)
    this.broadcastTextLinks(this.mTextLinks)
    this.broadcastIsReverse(this.mReverse)
    this.broadcastCompact(this.mCompact)
    this.broadcastIsSplit(this.mSplit)
    this.broadcastIsRTL(this.mRtl)

    /**
     * --------------------------------------------------
     * Methods related to VaAppConfig
     *
     * enableReceivers() exists so that VaAppConfig
     * can talk to VaApp.
     */
    this.enableReceivers()

    /**
     * broadcastDefaultsToConfig() sends default values to
     * VaAppConfig, in case some values weren't specified.
     */
    this.broadcastDefaultsToConfig()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this._handleResize, false)
  },
  created () {
    // Presence replies
    this.$on('Va@minibarPresenceReply', val => {
      if (val === true) {
        this.haveMinibar = true
      }
    })
    this.$on('Va@sidebarPresenceReply', val => {
      if (val === true) {
        this.haveSidebar = true
      }
    })
    this.$on('Va@topbarPresenceReply', val => {
      if (val === true) {
        this.haveTopbar = true
      }
    })
    this.$on('Va@pagePresenceReply', val => {
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
    this.$on('Va@requestIsMobile', val => {
      if (val === true) {
        this.broadcastIsMobile(this.pastMobileBreakpoint)
      }
    })

    // Disconnections
    this.$on('Va@sidebarDisconnect', val => {
      if (val === true) {
        this.haveSidebar = false
      }
    })
    this.$on('Va@minibarDisconnect', val => {
      if (val === true) {
        this.haveMinibar = false
      }
    })
    this.$on('Va@topbarDisconnect', val => {
      if (val === true) {
        this.haveTopbar = false
      }
    })
    this.$on('Va@pageDisconnect', val => {
      if (val === true) {
        this.havePage = false
      }
    })
  },
  computed: {
    styleObj () {
      const bg = this.mBgColor
      const style = {}

      style['background'] = bg
      style['position'] = 'fixed'
      style['top'] = '0px'
      style['right'] = '0px'
      style['bottom'] = '0px'
      style['left'] = '0px'
      style['overflow'] = 'auto'

      return style
    }
  }
}
</script>
