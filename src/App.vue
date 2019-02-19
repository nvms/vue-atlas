<template>
  <!-- https://vue-atlas.com/documentation/app -->
  <va-app
    desktop-margin="0"
    desktop-minimum-width="0"
    desktop-sidebar-width="0"
    desktop-minibar-width="50"
    desktop-topbar-height="0"
    mobile-sidebar-width="0"
    mobile-minibar-width="0"
    mobile-topbar-height="50"
    :rtl="false"
    :reverse="false"
    :split="false"
    :sidebar-priority="false"
    :minibar-priority="true"
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
          <li><router-link to="/">Router link</router-link></li>
          <li><router-link to="/">Router link</router-link></li>
          <li><a href="#">Standard hyperlink</a></li>
          <li><a href="#">Standard hyperlink</a></li>
          <hr/>
          <li><a href="#">Standard hyperlink</a></li>
        </va-dropdown>

        <va-dropdown tall>
          <div slot="trigger">
            <va-button
              size="sm"
              type="primary-dark">
              Preferences
              <va-icon icon-style="solid" type="angle-down" margin="0 2px 0 10px"></va-icon>
            </va-button>
          </div>
          <li><router-link to="/">Router link</router-link></li>
          <li><router-link to="/">Router link</router-link></li>
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
        <va-dropdown tall>
          <div slot="trigger">
            <va-button type="primary-dark">
              <va-icon type="user"/>
            </va-button>
          </div>
          <li><a href="#">...</a></li>
        </va-dropdown>
      </div>
    </va-topbar>

    <!-- https://vue-atlas.com/documentation/minibar -->
    <va-minibar
      :top-items="minibarTopItems"
      :bottom-items="[{icon:'question-circle'}]"
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
          :items="groupOneItems"
          title="Without icons" />
        <va-sidebar-group
          :items="groupTwoItems"
          title="With icons" />
      </va-sidebar-scrollarea>
    </va-sidebar>

    <!-- https://vue-atlas.com/documentation/page -->
    <va-page size="lg">
      <va-page-header>

        <div slot="breadcrumb">
          <va-breadcrumb separator="/">
            <va-breadcrumb-item :to="{ path: '/' }">Index</va-breadcrumb-item>
            <va-breadcrumb-item>Demonstration</va-breadcrumb-item>
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
            width="md"
            placeholder="Filter (change me)"
            buttons
            :loading="inputLoading"
            @confirm="inputConfirm"
            @cancel="inputCancel"
            v-model="inputText">
          </va-input>
          <va-select size="sm" width="sm" multiple search extra placeholder="Additional filters" v-model="filters" :options="options" />
          <va-button size="sm" @click="showStackedOne">Modal</va-button>
          <va-toggle :value="!toggled"></va-toggle>
          <va-toggle size="lg" v-model="toggled"></va-toggle>
        </div>

      </va-page-header>

      <va-loading v-show="toggled" center />

      <va-row :gutter="20">
        <va-column :xs="12" :sm="12" :md="8">
          <p>
            If you're new here, you may want to begin by launching the AppConfig
            modal (bottom right) and playing with those settings. Try increasing
            the width of the Sidebar and the height of the Topbar. With both the
            Sidebar and Minibar shown, try toggling the values for `rtl`, `split`
            and `reverse` to get a feel for how they work.
          </p>
          <p>
            <va-card :elevation="elevation">
              <div slot="topLeft">
                <va-select size="sm" width="sm" v-model="elevation" :format="cardSelectFormat" no-uncheck>
                  <va-option value="0">0</va-option>
                  <va-option value="1">1</va-option>
                  <va-option value="2">2</va-option>
                  <va-option value="3">3</va-option>
                  <va-option value="4">4</va-option>
                  <va-option value="5">5</va-option>
                </va-select>
                &nbsp;
                <va-button-group>
                  <va-button size="sm"><va-icon type="file" icon-style="regular"/></va-button>
                  <va-button size="sm"><va-icon type="folder-open" icon-style="regular"/></va-button>
                  <va-button size="sm"><va-icon type="trash-alt" icon-style="regular"/></va-button>
                </va-button-group>
                &nbsp;
                <va-tooltip
                  content="Important tooltip"
                  placement="right"
                  effect="tooltip-fade-right">
                  <va-button size="sm">Hover me</va-button>
                </va-tooltip>
              </div>
              <div slot="topRight">
                <va-button
                  @click="VaNotification.open({title:'Hello',message:'World',type:'info'})"
                  size="sm">
                  <va-icon type="cogs"></va-icon>
                </va-button>
              </div>
              <p>
                Culture vanquish the impossible a billion trillion decipherment
                <a href="#">network of wormholes</a> from which we spring. Billions
                upon billions brain is the seed of intelligence the ash of stellar
                alchemy astonishment with pretty stories for which there's little good
                evidence tendrils of gossamer clouds. Tingling of the spine emerged
                into consciousness the carbon in our apple pies a mote of dust
                suspended in a sunbeam the carbon in our apple pies astonishment.
              </p>
              <div style="display:flex;justify-content:space-between;">
                <div v-for="(item, index) in paginatedItemsShown" :key="index">
                  {{item}}
                </div>
              </div>
              <p>
                <va-pagination
                  :value="3"
                  :total="paginatedItems.length"
                  :max="5"
                  @change="doPaginate"
                  :per-page="10">
                </va-pagination>
              </p>
            </va-card>
          </p>
          <p>
            <va-card>
              <va-form type="vertical" ref="form">
                <va-form-item label="Name">
                  <va-input v-model="form.name" :rules="[{type:'required'}]"/>
                </va-form-item>
                <va-form-item label="Select">
                  <va-select placeholder="Stuff">
                    <va-option value="taco" label="Taco">Twelve tacos</va-option>
                  </va-select>
                  &nbsp;
                  <va-button><va-icon type="circle" size="9px"/></va-button>
                </va-form-item>
                <va-form-item label="Typeahead">
                  <va-typeahead
                    show-clean
                    :debounce="400"
                    placeholder="Provide a GitHub username"
                    @change="getGitResults"
                    :items="gitItems"
                    :add-format="gitCallback"
                    icon="github"
                    icon-style="brands"
                    :limit="10">
                    <div slot="item" slot-scope="{item}" style="display:flex;align-items:center;justify-content:center;align-content:center;cursor:default;">
                      <img width="26px" height="26px" :src="item.avatar_url" style="margin-right: 10px;"/>
                      <span>{{ item.login }}</span>
                    </div>
                  </va-typeahead>
                  &nbsp;
                  <va-button><va-icon type="circle" size="9px"/></va-button>
                </va-form-item>
                <va-form-item label="Pick a color">
                  <va-input v-model="color"/>
                  &nbsp;
                  <va-color-picker @change="colorPickerOnChange"/>
                </va-form-item>
                <va-form-item>
                  <va-button type="primary" @click="submitForm">Submit</va-button>&nbsp;
                  <va-button @click="resetForm">Reset</va-button>
                </va-form-item>
              </va-form>
            </va-card>
          </p>
        </va-column>

        <va-column :xs="12" :sm="12" :md="4">
          <va-card>
            <p>
              <va-checkbox-group v-model="foods">
                <va-checkbox label="pizza">Pizza</va-checkbox>
                <va-checkbox label="tacos">Tacos</va-checkbox>
                <va-checkbox label="fries">Fries</va-checkbox>
              </va-checkbox-group>
            </p>
            <p>
              <va-button @click="showNotification">Show notification</va-button>
              &nbsp;
              <va-button @click="$refs.aside.open()">Open aside</va-button>
            </p>
            <p>
              <va-input prefix="https://vue-atlas.com/" />
            </p>
            <p>
              <va-input prefix="$" postfix=".00 USD" width="xs" />
            </p>
            <p>
              <va-input postfix="@gmail.com" icon="envelope-open" />
            </p>
            <p>
              <va-datepicker width="md" size="sm" v-model="dateValue" :readonly="true" :format="'MM/dd/yyyy'" />
            </p>
            <p>
              <va-textarea
                ref="textarea"
                :autosize="true"
                buttons
                :resize="false"
                :loading="textareaLoading"
                @confirm="textareaConfirm"
                @cancel="textareaCancel"
                v-model="textareaText" />
            </p>
            <p>
              <va-button size="sm">Secondary action</va-button>
              &nbsp;
              <va-button size="sm" type="primary">Primary action</va-button>
            </p>
          </va-card>
        </va-column>
      </va-row>

    </va-page>

    <va-aside ref="aside">
      <va-form ref="formtwo" type="horizontal" style="margin-top: 20px">
        <va-form-item label="Name">
          <va-input
                  name="name"
                  placeholder="Your name"
                  :rules="[{type:'required'}]" />
        </va-form-item>
        <va-form-item label="Food">
          <va-select v-model="food" placeholder="Choose one" :rules="[{type:'required'}]">
            <va-option value="pizza" label="Pizza">
              Pizza is life
              <va-icon type="heart" color="#FF5630"/>
            </va-option>
            <va-option value="taco" label="Taco">Twelve tacos</va-option>
            <va-option value="fries" label="Fries">Hm, fries?</va-option>
          </va-select>
        </va-form-item>
        <va-form-item :label-col="2">
          <va-button type="primary">Submit</va-button>
        </va-form-item>
        <va-form-item :label-col="2">
          {{food}}
        </va-form-item>
      </va-form>
    </va-aside>

    <va-modal title="Modal One" ref="stackedOne">
      <div slot="body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut corporis ipsum
          minus aspernatur maiores totam.
        </p>
        <p>
          <va-button @click="showStackedTwo">Open modal two</va-button>
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
          <va-button @click="showStackedThree">Open modal three</va-button>
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
           * Toggle
           */
          toggled: false,

          /**
           * Datepicker
           */
          dateValue: '',

          form: {
            name: ''
          },

          /**
           * Card
           */
          elevation: '0',

          /**
           * ColorPicker
           */
          color: '',

          /**
           * Pagination
           */
          paginatedItems: [],
          paginatedItemsShown: [],

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
           * The select dropdown in the Aside
           */
          food: '',

          /**
           * Minibar
           */
          minibarTopItems: [
            {
              icon:'vuejs',
              brand:true,
              iconStyle:'brands',
              size:'22px',
              tooltip:'Made with Vue.js'
            },
            {
              icon:'search',
              tooltip: 'Search'
            },
            {
              icon:'user',
              tooltip: 'Account'
            }
          ],

          /**
           * Sidebar
           */
          groupOneItems: [
            {
              name: 'Home',
              route: '/'
            },
            {
              name: 'Item 2'
            },
            {
              name: 'Item 3'
            }
          ],
          groupTwoItems: [
            {
              icon: 'user',
              name: 'Account'
            },
            {
              icon: 'inbox',
              name: 'Messages',
              sub: '5 unread',
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
          ],

          /**
           * Typeahead
           */
          gitItems: []
        }
    },
    mounted () {
      for (let i = 0; i < 170; i++) {
        this.paginatedItems.push(i)
      }
    },
    methods: {
      submitForm () {
        this.$refs.form.validateFields((result) => {
          console.log(result)
        })
      },
      resetForm () {
        this.$refs.form.resetValidation((result) => {
          console.log(result)
        })
      },
      colorPickerOnChange (e) {
        this.color = e.hex + ', rgba(' + e.rgba.r + ', ' + e.rgba.g + ', ' + e.rgba.b + ', ' + e.rgba.a + ')'
      },
      doPaginate (e) {
        this.paginatedItemsShown = this.paginatedItems.slice((e.pageNumber * e.perPage) - e.perPage, e.pageNumber  * e.perPage)
      },
      getGitResults (query) {
        let self = this
        let xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://api.github.com/search/users?q=' + query)
        xhr.onload = () => {
          if (xhr.status === 200) {
            let results = JSON.parse(xhr.responseText)
            self.gitItems = results.items
          }
        }
        xhr.send()
      },
      gitCallback (item) {
        this.textareaText = JSON.stringify(item)
        return item.login
      },
      cardSelectFormat (item) {
        if (!item) return
        return 'elevation: ' + item.label
      },
      showNotification () {
        this.VaNotification.open({
          title: `Change default MySQL password to something other than 'root'`,
          message: `For security reasons, make sure you change the password of the MySQL
          user 'root' to something other than 'root' when you publish this application.<br/>
          <br/>
          <br/>
          <a href='#'>Instructions</a>`,
          type: 'warning',
          duration: 3000
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
            type: 'danger'
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
    },
    watch: {
      toggled (val) {
        if (val) {
          setTimeout(() => {
            this.toggled = false
          }, 600)
        }
      }
    }
}
</script>
