<template>
  <div class="text-left mt-5">
    <v-btn
      small
      outline
      color="primary"
      class="mb-3"
      @click="togglePageForm">
      Create New Page
    </v-btn>

    <!-- New Page Form-->
    <div v-if="showPageForm">
      <h3>Create New Page</h3>
      <form v-if="showPageForm">
        <v-text-field
          v-validate="'required|alpha_spaces'"
          v-model="newPageName"
          :error-messages="errors.collect('title')"
          data-vv-name="title"
          required
          label="Page Title"
        />
        <v-btn
          small
          color="primary"
          @click="onSubmit">
          Submit
        </v-btn>
        <v-btn
          small
          outline
          color="primary"
          @click="togglePageForm">
          Cancel
        </v-btn>
      </form>
    </div>

    <v-card>
      <v-card-title>
        <h3>Pages</h3>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="pages"
        :search="search"
      >
        <template
          slot="items"
          slot-scope="props">
          <td>{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.route }}</td>
          <td
            class="text-xs-left"
            @click="viewPage(props.item.id)">
            <a>View</a>
          </td>
          <td
            class="text-xs-left"
            @click="confirmDelete(props.item)">
            <a class="red--text">Delete</a>
          </td>
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning">
          No results for "{{ search }}".
        </v-alert>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'


export default {
  name: 'Pages',
  props: {
    pages: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      showPageForm: false,
      newPageName: '',
      search: '',
      headers: [
        { text: 'Title', align: 'left', sortable: true, value: 'title' },
        { text: 'Url', sortable: true, value: 'url' },
        { text: '', sortable: false, value: 'view' },
        { text: ' ', sortable: false, value: 'delete' }
      ]
    }
  },
  methods: {
    togglePageForm: function () {
      this.showPageForm = !this.showPageForm
    },
    onSubmit: function (event) {
      event.preventDefault()
      this.$validator.validateAll().then(result => {
        if (result) {
          const newRoute = _.kebabCase(this.newPageName)
          this.$store.dispatch('newPage', {appId: this.$route.params.appId, body: {title: this.newPageName, route: newRoute}})
          this.togglePageForm()
        }
      })
    },
    viewPage: function (pageId) {
      const appId = this.$route.params.appId
      this.$router.push({ name: 'page', params: { appId, pageId } })
    },
    deletePage: function (page) {
      this.$store.dispatch('destroyPage', {item: page})
    },
    confirmDelete: function (page) {
      const vm = this
      this.$dialog.confirm(`<b><span class="text-bold text-danger">DELETE</span></b> <b class="text-info">${page.title}</b>? This is irreversible!`, {
        html: true,
        verification: page.title,
        verificationHelp: 'Enter "[+:verification]" below and click on "[+:okText]"',
        type: 'hard'
      })
        .then(function () {
          vm.deletePage(page)
        })
        .catch(function () {})
    }
  }
  // created () {
  //   this.$store.dispatch('getAllPages', {appId: this.$route.params.appId})
  // }
}
</script>
