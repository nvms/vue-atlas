<template>
  <!-- https://vue-atlas.com/documentation/layoutmanager -->
  <va-layout-manager
    bg-color="#F4F5F7"
    page-bg-color="#FFFFFF"
    desktop-margin="0"
    desktop-minimum-width="0"
    desktop-sidebar-width="200"
    desktop-minibar-width="0"
    desktop-topbar-height="42"
    mobile-sidebar-width="0"
    mobile-minibar-width="0"
    mobile-topbar-height="42"
    :rtl="false"
    :reverse="false"
    :split="false"
    :sidebar-priority="false"
    :minibar-priority="false"
    :topbar-priority="false"
    :topbar-padded="false">

    <va-layout-manager-config />

    <!-- https://vue-atlas.com/documentation/topbar -->
    <va-topbar theme="blue">
      <div slot="left">
        <span style="font-weight:700;margin:0 20px 0 10px;">
          Application
        </span>
        <va-dropdown tall>
          <div slot="trigger">
            <va-button
              size="sm"
              type="primary-dark">
              File
              <va-icon icon-style="solid" type="angle-down" margin="0 2px 0 10px"></va-icon>
            </va-button>
          </div>
          <li><router-link :to="'/'">Router link</router-link></li>
          <li><router-link :to="'/'">Router link</router-link></li>
          <li><a href="#">Standard hyperlink</a></li>
          <li><a href="#">Standard hyperlink</a></li>
          <hr/>
          <li><a href="#">Standard hyperlink</a></li>
        </va-dropdown>
        <va-button-group>
          <va-button type="primary-light" style="margin-left:10px;">Edit</va-button>
          <va-dropdown>
            <div slot="trigger">
              <va-button type="primary-light">
                <va-icon type="ellipsis-h"></va-icon>
              </va-button>
            </div>
            <li><a href="#">...</a></li>
          </va-dropdown>
        </va-button-group>
      </div>
      <div slot="center"> &nbsp; </div>
      <div slot="right">
        <va-button type="primary-dark" tall>
          <va-icon type="user"/>
        </va-button>
      </div>
    </va-topbar>

    <!-- https://vue-atlas.com/documentation/minibar -->
    <va-minibar
      :top-items="[{icon:'home'},{icon:'search'},{icon:'user'}]"
      :bottom-items="[{icon:'question'}]"
      theme="purple" />

    <!-- https://vue-atlas.com/documentation/sidebar -->
    <va-sidebar theme="default" compact>
        <va-sidebar-header>
          <router-link :to="'/'">
            <va-button block>
              <va-icon type="align-left" size="1.25em" color="#fff" bg-color="rgb(234, 192, 72)" margin="0 10px 0 0" padding="14px 14px 12px"></va-icon>
              Application
            </va-button>
          </router-link>
        </va-sidebar-header>
      <va-sidebar-scrollarea>
        <va-sidebar-group
          :items="[{name:'Item1'}]"
          title="Category 1"
          :show-toggle="true" />
        <va-sidebar-group
          :items="[{name:'Item1'}]"
          title="Category 2"
          :show-toggle="true" />
      </va-sidebar-scrollarea>
    </va-sidebar>

    <!-- https://vue-atlas.com/documentation/page -->
    <va-page size="md">
      <va-page-header>
        
      <div slot="breadcrumb">
        <va-breadcrumb separator="/">
          <va-breadcrumb-item :to="{ path: '/documentation/pageheader' }">Index</va-breadcrumb-item>
          <va-breadcrumb-item>Demo</va-breadcrumb-item>
        </va-breadcrumb>
      </div>
      
      <div slot="title">
        <span>Page title</span>
      </div>

      <div slot="subtitle">
        <span>Subtitle</span>
      </div>

      <div slot="actions">
        <va-button type="subtle">
          <va-icon type="edit" icon-style="regular" margin="0 7px 0 0"></va-icon>
          Edit
        </va-button>
        <va-button type="subtle" round>
          <va-icon type="star"></va-icon>
        </va-button>
      </div>

      <div slot="bottom">
        <va-input placeholder="Filter"></va-input>
        <va-select placeholder="Additional filters">
          <va-option value="1">Filter 1</va-option>
          <va-option value="2">Filter 2</va-option>
        </va-select>
      </div>
      
    </va-page-header>

    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo commodi illum similique quisquam expedita quae quaerat reprehenderit debitis, pariatur deserunt?
    </p>

    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, odit. Ipsa harum aperiam reiciendis cupiditate quia quam aut mollitia quo sit dolorum consequuntur voluptate non quis excepturi optio modi, officiis corporis doloremque, vitae porro quasi odio, eum nihil? Omnis magni praesentium, officia sequi assumenda corrupti eos architecto autem minus magnam veniam quidem consequuntur, deserunt nihil odio. Eos optio facere, omnis rerum neque fugit aliquam autem, doloremque commodi dicta quae maxime sunt accusamus explicabo vel officia architecto reprehenderit quos soluta! Doloremque blanditiis, officiis praesentium necessitatibus velit, perspiciatis sit iure deleniti possimus quod repellat, asperiores rem ad a voluptas pariatur dicta! Nisi aspernatur dolores iure expedita nam eius, repellendus quas ab. Molestiae corporis quas, quos repellat ea repellendus vel sed aspernatur aperiam!
    </p>

    <p>
      <va-button @click.native="showStackedOne">Open modal one</va-button>
    </p>

    </va-page>

    <va-modal title="Modal One" ref="stackedOne">
      <div slot="body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut corporis ipsum
          minus aspernatur maiores totam.
        </p>
        <p>
          <va-button @click.native="showStackedTwo">Open modal two</va-button>
        </p>
      </div>
    </va-modal>
    <va-modal title="Modal Two" ref="stackedTwo">
      <div slot="body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut corporis ipsum
          minus aspernatur maiores totam.
        </p>
        <p>
          <va-button @click.native="showStackedThree">Open modal three</va-button>
        </p>
      </div>
    </va-modal>

  </va-layout-manager>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {

        }
    },
    methods: {
      showStackedOne () {
        this.$refs.stackedOne.open()
      },
      showStackedTwo () {
        this.$refs.stackedTwo.open()
      },
      showStackedThree () {
        this.VaModal.confirm({
          title: 'Are you sure?',
          type: 'danger',
          message: 'This is going to delete <b>everything</b>. Are you sure you want to do that?',
          onConfirm () {
            console.log('Can\'t say we didn\'t warn you...')
          }
        })
      }
    }
}
</script>
