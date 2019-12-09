<template>
  <va-app
    :desktop-sidebar-width="desktopSidebarWidth"
    :desktop-minibar-width="desktopMinibarWidth"
    :desktop-topbar-height="desktopTopbarHeight"

    :mobile-topbar-height="mobileTopbarHeight"
    :mobile-sidebar-width="mobileSidebarWidth"
    :mobile-minibar-width="mobileMinibarWidth"
  >
    <va-app-config/>

    <va-topbar theme="default">
      <div slot="left">
        <va-button @click="$refs.myAside.open()">
          <va-icon type="bars" size="1.4em" />
        </va-button>
      </div>
      <div slot="center">center</div>
      <div slot="right">right</div>
    </va-topbar>

    <va-minibar
      :top-items="mbTopItems"
      :bottom-items="mbBottomItems"/>

    <va-sidebar compact>
      <va-sidebar-group :show-toggle="false" title="Navigation" :items="groupOneItems"/>
      <va-sidebar-group :show-toggle="false" title="Resources" :items="groupTwoItems"/>
    </va-sidebar>

    <va-page size="lg">
      <va-page-header>
        <div slot="breadcrumb">
          <va-breadcrumb separator="/">
            <va-breadcrumb-item :to="{ path: '/' }">atlas</va-breadcrumb-item>
            <va-breadcrumb-item>Sandbox</va-breadcrumb-item>
          </va-breadcrumb>
        </div>
        <div slot="title">Sandbox</div>
        <div slot="subtitle">A sandbox or basic boilerplate layout</div>
        <div slot="actions">
          <va-button href="https://github.com/nvms/vue-atlas">GitHub</va-button>
          <va-button href="https://www.npmjs.com/package/vue-atlas">npm</va-button>
        </div>
        <div slot="bottom">
          <va-select
            width="md"
            no-uncheck
            v-model="selectValue"
            placeholder="Select an option"
            :multiple="true"
            :input-placeholder="'Search'"
            :options="options">
          </va-select>
        </div>
      </va-page-header>

      <p>
        Proin risus lectus, interdum vitae justo vel, malesuada condimentum sem. Proin volutpat posuere molestie. Fusce vel justo arcu. Quisque quis dapibus tortor. Donec ultricies mattis cursus. Phasellus accumsan feugiat massa. Ut semper aliquet turpis, eu finibus est egestas sit amet. Aliquam rhoncus elementum enim. Donec sit amet ligula egestas, accumsan neque sit amet, faucibus eros. Etiam consequat eros at lacus bibendum fermentum. Aenean tempor libero ut sem fermentum, nec ultrices arcu rutrum. Nulla facilisi. Nullam condimentum sapien et suscipit lacinia. Duis vulputate dolor placerat, pellentesque orci non, ultricies lacus. Fusce nec ligula in turpis euismod blandit ultricies et lorem.
      </p>

      <p>
        In ac risus sit amet erat imperdiet convallis ut a lacus. Ut sollicitudin velit ante, nec blandit purus pharetra id. Fusce interdum placerat ullamcorper. Proin feugiat mauris eget sem rhoncus, vel sollicitudin dolor ullamcorper. Cras vitae mauris a massa pretium faucibus. Duis ac mi gravida, porta mi in, vulputate dolor. Praesent eget nisi nisi. Praesent sodales commodo felis pretium maximus. Donec sapien magna, tempor a sem nec, fringilla congue lorem. Nunc vel nulla pellentesque, hendrerit dui quis, consectetur ligula. Aliquam eu nibh sit amet dui pharetra mattis ut non lectus. Fusce elementum, massa a vehicula blandit, ipsum magna tincidunt justo, vitae malesuada mauris nibh nec lorem. Donec venenatis metus sed lorem ultricies ornare.
      </p>

      <p>
        Aenean dapibus blandit sem at convallis. Duis semper quis nulla ac mattis. Sed egestas posuere laoreet. Pellentesque tempor felis sed augue iaculis, at placerat lectus consequat. Proin at eros tincidunt, placerat felis eget, vehicula augue. Aliquam vitae fringilla eros. In justo arcu, imperdiet nec ullamcorper at, mattis eget odio. Phasellus laoreet massa in commodo posuere. Maecenas ultrices placerat massa eget interdum. Fusce eu ullamcorper enim.
      </p>

      <p>
        <va-button @click="showWarningNotification">Show warning notification</va-button>
      </p>

      <p>
        <va-button @click="showModal" icon-after="window-maximize">Show a modal</va-button>
      </p>

      <p>
        <va-button
            @click="VaModal.alert({
              type: 'danger',
              title: 'Oh, no...',
              message: 'Danger, Will Robinson!',
              width: '275px'
            })"
            icon-after="window-maximize">
            Show an alert
        </va-button>
      </p>

      <va-modal title="Modal title" ref="modal" @confirm="modalConfirm">
        <div slot="body">
          <p>That's some fancy modal you got there.</p>
        </div>
      </va-modal>

      <va-aside placement="left" ref="myAside" :width="desktopMinibarWidth + desktopSidebarWidth + `px`">
        <!-- The va-sidebar and va-minibar below still receive updates from va-app, -->
        <!-- just as the va-sidebar and va-minibar above do.                        -->
        <va-minibar
          :style="`top:0;width:${desktopMinibarWidth}px;`"
          :top-items="mbTopItems"
          :bottom-items="mbBottomItems" />
        <va-sidebar
          :style="`top:0;left:${desktopMinibarWidth}px;width:${desktopSidebarWidth}px;`"
          :compact="false">
          <va-sidebar-group title="Navigation" :items="groupOneItems"/>
          <va-sidebar-group title="Resources" :items="groupTwoItems"/>
        </va-sidebar>
      </va-aside>

    </va-page>
  </va-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

      desktopTopbarHeight: 0,
      desktopMinibarWidth: 50,
      desktopSidebarWidth: 240,

      mobileTopbarHeight: 50,
      mobileMinibarWidth: 0,
      mobileSidebarWidth: 0,

      selectValue: '',

      options: [
        { value: 'cat', label: 'Cat' },
        { value: 'dog', label: 'Dog' },
        { value: 'wallaby', label: 'Wallaby' },
        { value: 'bear', label: 'Bear' },
        { value: 'kangaroo', label: 'Kangaroo' }
      ],
      mbTopItems: [
        { icon: 'vuejs', brand: true, iconStyle: 'brands', size: '22px', tooltip: 'Made with Vue.js' },
        { icon: 'search', tooltip: 'Search', method: this.showAside },
        { icon: 'user', tooltip: 'Account' }
      ],
      mbBottomItems: [{ icon: 'question-circle' }],
      groupOneItems: [
        { name: 'Sandbox', route: '/' },
        { name: 'Somewhere', route: '/somewhere' }
      ],
      groupTwoItems: [
        {
          name: 'External',
          children: [
            { name: 'GitHub', external: 'https://github.com/nvms/vue-atlas', icon: 'github-alt', iconStyle: 'brands' },
            { name: 'npm', external: 'https://www.npmjs.com/package/vue-atlas', icon: 'npm', iconStyle: 'brands' }
          ]
        }
      ]
    }
  },
  methods: {
    showWarningNotification () {
      this.notification.warning({
        title: 'Change default MySQL password to something other than "root"',
        message: `For security reasons, make sure you change the password of the MySQL
        user 'root' to something other than 'root' when you publish this application.
        <br/>
        <br/>
        <a href='#'>Instructions</a>`,
        duration: 0
      })
    },
    showModal () {
      this.$refs.modal.open()
    },
    modalConfirm () {
      console.log('Glad you agree.')
      this.$refs.modal.close()
    },
    showAside () {
      this.$refs.myAside.open()
    }
  }
}
</script>
