<template>
  <div class="text-left mt-5">
    <deleteConfirmation
      :visible="showDeleteConfirmation"
      :item-id="deletableItem.id"
      :title="deletableItem.title"
      :cancel-callback="cancelDelete"
      :confirm-callback="deletePage"
    />

    <v-btn
      small
      outline
      color="secondary"
      class="mb-3"
      @click="togglePageForm">
      Create New Page
    </v-btn>

    <!-- New Page Form-->
    <div v-if="showPageForm">
      <h3>{{ isUpdatedPage ? 'Update' : 'Create New' }} Page</h3>
      <form v-if="showPageForm">
        <v-text-field
          v-validate="'required|alpha_spaces'"
          v-model="newPageTitle"
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

    <v-container
      fluid
      grid-list-xs
    >
      <v-layout
        align-start
        justify-space-around
        row
        wrap>

        <v-flex xs12>
          <v-card
            v-for="(item) in pages"
            :key="item.id"
            color="blue-grey darken-2 mt-3"
            class="white--text">
            <v-card-title primary-title>
              <div
                class="headline cursor-hover"
                @click="viewPage(item.id)"
              >{{ item.title }}</div>
            </v-card-title>
            <v-card-text>
              Route: {{ item.route }}
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat
                icon
                class="text-xs-left mr-5">
                <v-icon
                  class="cursor-hover"
                  @click="editPage(item)"
                >edit</v-icon>
              </v-btn>
              <v-btn
                flat
                icon
                class="text-xs-left mr-5">
                <v-icon
                  class="cursor-hover"
                  @click="confirmDelete(item)">delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
      newPageTitle: '',
      showDeleteConfirmation: false,
      deletableItem: {},
      isUpdatedPage: false,
      currentPage: null,
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
      this.newPageTitle = ''
      this.updatePage = false
      this.currentPage = null
    },
    onSubmit: function (event) {
      event.preventDefault()
      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.isUpdatedPage) {
            this.$store.dispatch('pages/EDIT', {
              id: this.currentPage.id,
              title: this.newPageTitle
            })
          } else {
            this.$store.dispatch('pages/NEW', {
              appId: this.$store.state.apps.current.id,
              title: this.newPageTitle
            })
          }

          this.togglePageForm()
        }
      })
    },
    viewPage: function (id) {
      this.$router.push({ name: 'app-pages-id', params: { id } })
    },
    editPage: function (page) {
      this.showPageForm = true
      this.isUpdatedPage = true
      this.newPageTitle = page.title
      this.currentPage = page
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
