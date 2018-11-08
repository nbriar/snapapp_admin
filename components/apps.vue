<template>
  <div>
    <deleteConfirmation
      :visible="showDeleteConfirmation"
      :item-id="deletableItem.id"
      :title="deletableItem.name"
      :cancel-callback="cancelDelete"
      :confirm-callback="deleteApp"
    />

    <div>
      <v-btn
        small
        outline
        color="secondary"
        class="mb-3"
        @click="toggleAppForm">Create New App</v-btn>

      <!-- New App Form-->
      <div v-if="showAppForm">
        <h3>{{ isUpdatedApp ? 'Update' : 'Create New' }} App</h3>
        <v-form
          v-if="showAppForm"
          v-model="validForm"
          lazy-validation>
          <v-text-field
            v-validate="'required|alpha_spaces'"
            v-model="editedAppName"
            :error-messages="errors.collect('name')"
            label="App Name"
            data-vv-name="name"
            required
          />
          <v-btn
            small
            color="primary"
            @click="onSubmit">Submit</v-btn>
          <v-btn
            small
            outline
            color="primary"
            @click="toggleAppForm">Cancel</v-btn>
        </v-form>
      </div>
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
            v-for="(item) in apps"
            :key="item.id"
            color="blue-grey darken-2 mt-3"
            class="white--text">
            <v-card-title primary-title>
              <div class="headline">{{ item.name }}</div>
            </v-card-title>
            <v-card-text>
              ID: {{ item.slug }}
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat
                icon
                class="text-xs-left mr-5">
                <v-icon
                  class="cursor-hover"
                  @click="viewApp(item.id)">pageview</v-icon>
              </v-btn>
              <v-btn
                flat
                icon
                class="text-xs-left mr-5">
                <v-icon
                  class="cursor-hover"
                  @click="editApp(item)"
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
  name: 'Apps',
  components: {
    deleteConfirmation
  },
  data: function () {
    return {
      showAppForm: false,
      validForm: false,
      showDeleteConfirmation: false,
      deletableItem: {},
      isUpdatedApp: false,
      currentApp: null,
      editedAppName: '',
      search: '',
      headers: [
        { text: 'Name', align: 'left', sortable: true, value: 'name' },
        { text: 'Code-Name', sortable: true, value: 'slug' },
        { text: '', sortable: false, value: 'view' },
        { text: '', sortable: false, value: 'edit' },
        { text: '', sortable: false, value: 'delete' }
      ]
    }
  },
  computed: mapGetters({
    apps: 'apps/list'
  }),
  created () {
    this.$store.dispatch('apps/GET_ALL')
  },
  methods: {
    toggleAppForm: function () {
      this.showAppForm = !this.showAppForm
    },
    onSubmit: function (event) {
      event.preventDefault()
      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.isUpdatedApp) {
            this.$store.dispatch('apps/EDIT', {id: this.currentApp.id, name: this.editedAppName})
          } else {
            this.$store.dispatch('apps/NEW', {name: this.editedAppName})
          }
          this.toggleAppForm()
        }
      })
    },
    viewApp: function (appId) {
      this.$store.dispatch('apps/GET', {id: appId})
      this.$router.push({ name: 'pages' })
    },
    editApp: function (app) {
      this.showAppForm = true
      this.isUpdatedApp = true
      this.currentApp = app
      this.editedAppName = app.name
    },
    deleteApp: function (id) {
      this.showDeleteConfirmation = false
      this.$store.dispatch('apps/DESTROY', {id})
      this.deletableItem = {}
    },
    confirmDelete: function(app) {
      this.showDeleteConfirmation = true
      this.deletableItem = app
    },
    cancelDelete: function() {
      this.showDeleteConfirmation = false
    }
  }
}
</script>

<style>
.cursor-hover:hover{
  cursor: pointer;
}
</style>
