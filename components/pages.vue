<template>
  <div class="text-left mt-5">
    <deleteConfirmation
      :visible="showDeleteConfirmation"
      :item-id="deletableItem.id"
      :title="deletableItem.title"
      :cancel-callback="cancelDelete"
      :confirm-callback="deletePage"
    />
    {{ pages }}
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
          <td class="text-xs-left">
            <v-icon
              class="cursor-hover"
              @click="viewPage(props.item.id)">pageview</v-icon>
          </td>
          <td class="text-xs-left">
            <v-icon
              class="cursor-hover"
              @click="editPage(props.item)">edit</v-icon>
          </td>
          <td class="text-xs-left">
            <v-icon
              class="cursor-hover"
              @click="confirmDelete(props.item)">delete</v-icon>
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
import deleteConfirmation from '../components/delete-confirmation.vue'

export default {
  name: 'Pages',
  components: {
    deleteConfirmation
  },
  data: function () {
    return {
      showPageForm: false,
      newPageName: '',
      showDeleteConfirmation: false,
      deletableItem: {},
      search: '',
      headers: [
        { text: 'Title', align: 'left', sortable: true, value: 'title' },
        { text: 'Url', sortable: true, value: 'url' },
        { text: '', sortable: false, value: 'view' },
        { text: ' ', sortable: false, value: 'delete' }
      ]
    }
  },
  computed: mapGetters({
    pages: 'pages/list'
  }),
  methods: {
    togglePageForm: function () {
      this.showPageForm = !this.showPageForm
    },
    onSubmit: function (event) {
      event.preventDefault()
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('pages/NEW', {
            appId: this.$store.state.apps.current.id,
            title: this.newPageName
          })
          this.togglePageForm()
        }
      })
    },
    viewPage: function (pageId) {
      const appId = this.$route.params.appId
      this.$router.push({ name: 'page', params: { appId, pageId } })
    },
    editPage: function (page) {
      console.log('editing')
    },
    deletePage: function (id) {
      this.showDeleteConfirmation = false
      this.$store.dispatch('pages/DESTROY', {id})
      this.deletableItem = {}
    },
    confirmDelete: function(page) {
      this.showDeleteConfirmation = true
      this.deletableItem = page
    },
    cancelDelete: function() {
      this.showDeleteConfirmation = false
    }
  }
}
</script>
