<template>
  <va-app
    :desktop-sidebar-width="195"
    :desktop-minibar-width="0"
    :desktop-topbar-height="45"
  >
    <va-app-config/>
    <va-topbar></va-topbar>
    <va-minibar :top-items="mbTopItems" :bottom-items="mbBottomItems"/>
    <va-sidebar compact>
      <va-sidebar-group show-toggle title="Navigation" :items="groupOneItems"/>
      <va-sidebar-group show-toggle title="Resources" :items="groupTwoItems"/>
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
        <div slot="actions">
          <va-button
            type="subtle-link"
            href="https://github.com/nvms/vue-atlas"
          >GitHub</va-button>
          <va-button
            type="subtle-link"
            href="https://www.npmjs.com/package/vue-atlas"
          >npm</va-button>
        </div>
      </va-page-header>
      <va-button @click="showModal" block icon-after="window-maximize">Modal</va-button>
      <va-modal title="Modal title" ref="modal" @confirm="modalConfirm">
        <div slot="body">
          <p>That's some fancy modal.</p>
        </div>
      </va-modal>
    </va-page>
    <va-aside ref="aside" placement="right">Hey!</va-aside>
  </va-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      mbTopItems: [
        {
          icon: 'vuejs',
          brand: true,
          iconStyle: 'brands',
          size: '22px',
          tooltip: 'Made with Vue.js'
        },
        {
          icon: 'search',
          tooltip: 'Search',
          method: this.showAside
        },
        {
          icon: 'user',
          tooltip: 'Account'
        }
      ],
      mbBottomItems: [
        {
          icon: 'question-circle'
        }
      ],
      groupOneItems: [{ name: 'Sandbox', route: '/' }],
      groupTwoItems: [
        {
          name: 'External',
          children: [
            {
              name: 'GitHub',
              external: 'https://github.com/nvms/vue-atlas',
              icon: 'github-alt',
              iconStyle: 'brands'
            },
            {
              name: 'npm',
              external: 'https://www.npmjs.com/package/vue-atlas',
              icon: 'npm',
              iconStyle: 'brands'
            }
          ]
        }
      ]
    }
  },
  methods: {
    showModal () {
      this.$refs.modal.open()
    },
    modalConfirm () {
      this.$refs.modal.close()
    },
    showAside () {
      this.$refs.aside.open()
    }
  }
}
</script>
