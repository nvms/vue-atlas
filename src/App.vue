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
      <br/>
      valOne: {{valOne}}<br/>
      valTwo: {{valTwo}}
      <div style="width: 300px;">
        <va-multi-select v-model="valOne">
          <va-multi-select-option value="1" text="text1" label="label1"></va-multi-select-option>
          <va-multi-select-option value="2" text="text2" label="label2"></va-multi-select-option>
          <va-multi-select-option value="3" text="text3" label="label3"></va-multi-select-option>
        </va-multi-select>
        <br/>
        <va-multi-select v-model="valTwo" :options="valTwoItems" />
      </div>
    </va-page>
    <va-aside ref="aside" placement="right">Hey!</va-aside>
  </va-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      valOne: ['1'],
      valTwo: ['val1', { 'someKey': 'someVal' }],
      valTwoItems: [
        { value: 'val1', text: 'text1', label: 'label1' },
        { value: 'val2', text: 'text2', label: 'label2' },
        { value: 'val3', text: 'text3', label: 'label3' },
        { value: 'val4', text: 'text4', label: 'label4' },
        { value: 'val5', text: 'text5', label: '' },
        { value: 'val6', text: 'text6', label: 'label6' },
        { value: 'val7', text: 'text7', label: 'label7' },
        { value: 'val8', text: 'text8', label: 'label8' },
        { value: 'val9', text: 'text9', label: 'label9' },
        { value: 'val10', text: 'text10', label: 'label10' },
        { value: 'val11', text: 'text11', label: 'label11' },
        { value: 'val12', text: 'text12', label: 'label12' },
        { value: 'val13', text: 'text13', label: 'label13' },
        { value: 'val14', text: 'text14', label: 'label14' },
        {
          value: {
            someKey: 'someVal'
          },
          text: 'text15',
          label: 'label15'
        }
      ],

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
