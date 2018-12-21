<template>
  <!-- https://vue-atlas.com/documentation/app -->
  <va-app
    bg-color="#F4F5F7"
    page-bg-color="#FFFFFF"
    desktop-margin="0"
    desktop-minimum-width="0"
    desktop-sidebar-width="0"
    desktop-minibar-width="50"
    desktop-topbar-height="0"
    mobile-sidebar-width="0"
    mobile-minibar-width="0"
    mobile-topbar-height="48"
    :rtl="false"
    :reverse="false"
    :split="false"
    :sidebar-priority="false"
    :minibar-priority="false"
    :topbar-priority="false"
    :topbar-padded="false">

    <va-app-config />

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
      :top-items="[{icon:'vuejs',brand:true,iconStyle:'brands',size:'22px'},{icon:'search'},{icon:'user'}]"
      :bottom-items="[{icon:'question'}]"
      theme="blue" />

    <!-- https://vue-atlas.com/documentation/sidebar -->
    <va-sidebar theme="default" compact>
        <va-sidebar-header>
          <router-link :to="'/'">
            <va-button block>
              <va-icon type="align-left" size="1.25em" color="#fff" bg-color="rgb(72, 128, 234)" margin="0 10px 0 0" padding="14px 14px 12px"></va-icon>
              Application
            </va-button>
          </router-link>
        </va-sidebar-header>
      <va-sidebar-scrollarea>
        <va-sidebar-group
          :items="[{name:'Home', route: '/', icon: 'home'},{name:'Item2'},{name:'Item3'},{name:'Item4'}]"
          title="Group 1" />
        <va-sidebar-group
          :items="groupTwoItems"
          title="Group 2" />
      </va-sidebar-scrollarea>
    </va-sidebar>

    <!-- https://vue-atlas.com/documentation/page -->
    <va-page size="lg">
      <va-page-header>
        
      <div slot="breadcrumb">
        <va-breadcrumb separator="/">
          <va-breadcrumb-item :to="{ path: '/documentation/pageheader' }">Index</va-breadcrumb-item>
          <va-breadcrumb-item>Demo</va-breadcrumb-item>
        </va-breadcrumb>
      </div>
      
      <div slot="title">
        <span>Page header</span>
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
        <va-input
          size="sm"
          placeholder="Filter (change me)"
          buttons
          :loading="inputLoading"
          @confirm="inputConfirm"
          @cancel="inputCancel"
          v-model="inputText">
        </va-input>
        <va-select size="sm" multiple search extra placeholder="Additional filters" v-model="filters" :options="options" />
        <va-button size="sm" @click.native="showStackedOne">Modal</va-button>
      </div>
      
    </va-page-header>

    <p>
      Culture vanquish the impossible a billion trillion decipherment network of wormholes from which we spring. Billions upon billions brain is the seed of intelligence the ash of stellar alchemy astonishment with pretty stories for which there's little good evidence tendrils of gossamer clouds. Tingling of the spine emerged into consciousness the carbon in our apple pies a mote of dust suspended in a sunbeam the carbon in our apple pies astonishment.
    </p>

    <p>
      Cambrian explosion science citizens of distant epochs encyclopaedia galactica brain is the seed of intelligence rich in mystery. Rings of Uranus made in the interiors of collapsing stars hundreds of thousands astonishment from which we spring laws of physics? The ash of stellar alchemy a very small stage in a vast cosmic arena network of wormholes another world concept of the number one the only home we've ever known and billions upon billions upon billions upon billions upon billions upon billions upon billions.
    </p>

    <p>
      <va-datepicker size="sm" v-model="dateValue" :readonly="true" :format="'MM/dd/yyyy'"></va-datepicker>
    </p>

    <p>
      <va-textarea
        width="100%"
        :autosize="true"
        buttons
        :resize="false"
        :loading="textareaLoading"
        @confirm="textareaConfirm"
        @cancel="textareaCancel"
        v-model="textareaText"></va-textarea>
    </p>

    <p>
      <va-checkbox-group v-model="foods">
        <va-checkbox label="pizza">Pizza</va-checkbox>
        <va-checkbox label="tacos" checked>Tacos</va-checkbox>
        <va-checkbox label="fries">Fries</va-checkbox>
      </va-checkbox-group>
    </p>

    <p>
      <va-radio-group v-model="foods">
        <va-radio label="pizza">Pizza</va-radio>
        <va-radio label="tacos" checked>Tacos</va-radio>
        <va-radio label="fries">Fries</va-radio>
      </va-radio-group>
    </p>

    <p>
      <va-button @click.native="showNotification">Show notification</va-button>
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

  </va-app>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
          /**
           * Input and InputOps
           */
          inputText: '',
          inputLoading: false,

          /**
           * Datepicker
           */
          dateValue: '',

          /**
           * Textarea and InputOps
           */
          textareaText: `This textarea will automatically grow as it is filled with content because we passed the 'autosize' prop to it.`,
          textareaLoading: false,

          /**
           * Select
           */
          options: [
            { value: 'cat', label: 'Cat' },
            { value: 'dog', label: 'Dog' },
            { value: 'wallaby', label: 'Wallaby' },
            { value: 'bear', label: 'Bear' },
            { value: 'kangaroo', label: 'Kangaroo' }
          ],
          filters: [],

          /**
           * Checkbox and radio
           */
          foods: ['tacos'],
          
          /**
           * Sidebar
           */
          groupTwoItems: [
            {
              icon: 'user',
              name: 'Account'
            },
            {
              icon: 'inbox',
              name: 'Messages',
              children: [
                {
                  icon: 'inbox',
                  name: 'Inbox'
                },
                {
                  icon: 'envelope-open',
                  name: 'Read'
                }
              ]
            },
            {
              icon: 'cog',
              name: 'Settings'
            }
          ]
        }
    },
    mounted () {
    },
    methods: {
      showNotification () {
        this.VaNotification.open({
          title: `Change default MySQL password to something other than 'root'`,
          message: `For security reasons, make sure you change the password of the MySQL
          user 'root' to something other than 'root' when you publish this application.<br/>
          <br/>
          <br/>
          <a href='#'>Instructions</a>`,
          type: 'warning'
        })
      },
      /**
       * Input InputOps
       */
      inputConfirm (e) {
        this.inputLoading = true
        console.log('Doing something with the value: ', this.inputText)
        setTimeout(() => {
          this.inputLoading = false
          console.log('Finished doing something. Setting loading to false so that the input operations buttons know to disappear.')
          this.VaToast({
            text: 'Data published: ' + this.inputText,
            type: 'success',
            placement: 'top'
          })
          this.VaNotification.open({
            title: 'Saved',
            message: 'Data published: ' + this.inputText,
            type: 'warning'
          })
        }, 2000)
      },
      inputCancel () {
        console.log('Cancelling')
      },

      /**
       * Textarea InputOps
       */
      textareaConfirm (e) {
        this.textareaLoading = true
        console.log('Doing something with the value: ', this.textareaText)
        setTimeout(() => {
          this.textareaLoading = false
          console.log('Finished doing something. Setting loading to false so that the input operations buttons know to disappear.')
          this.VaToast({
            text: 'Data published: ' + this.textareaText,
            type: 'success',
            placement: 'top'
          })
          this.VaNotification.open({
            title: 'Saved',
            message: 'Data published: ' + this.textareaText,
            type: 'warning'
          })
        }, 2000)
      },
      textareaCancel () {
        console.log('Cancelling')
      },

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
