<template>
  <div>
    <v-btn
      small
      outline
      color="secondary"
      class="mb-3"
      @click="toggleAppForm">Create New App</v-btn>
    <v-card>
      <v-card-title>
        <h3>My Apps</h3>
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
        :items="apps"
        :search="search"
      >
        <template
          slot="items"
          slot-scope="props">
          <td
            class="cursor-hover"
            @click="viewApp(props.item.id)">
            {{ props.item.name }}
          </td>
          <td class="text-xs-left">{{ props.item.slug }}</td>
          <td class="text-xs-left">
            <v-icon
              class="cursor-hover"
              @click="viewApp(props.item.id)">pageview</v-icon>
          </td>
          <td class="text-xs-left">
            <v-icon
              class="cursor-hover"
              @click="editApp(props.item)"
            >edit</v-icon>
          </td>
          <td class="text-xs-left">
            <v-icon
              class="cursor-hover"
              @click="deleteConfirmation = true">delete</v-icon>
            <v-dialog
              v-model="deleteConfirmation"
              max-width="290"
            >
              <v-card>
                <v-card-title class="headline">
                  <b class="mr-3">
                    <span class="text-bold red--text">DELETE</span>
                  </b>
                  <b class="text-info"> {{ props.item.name }}</b>?
                  <div class="mt-3">This is irreversible!</div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer />

                  <v-btn
                    flat="flat"
                    @click="deleteConfirmation = false"
                  >
                    Cancel
                  </v-btn>

                  <v-btn
                    color="red darken-1"
                    flat="flat"
                    @click="deleteApp(props.item.id)"
                  >
                    Continue
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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

    <!-- New App Form-->
    <div v-if="showAppForm">
      <h3>{{ isUpdatedApp ? 'Update' : 'Create' }} New App</h3>
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Apps',
  data: function () {
    return {
      showAppForm: false,
      validForm: false,
      deleteConfirmation: false,
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
      this.$router.push({ name: 'customer-apps-id', params: { id: appId } })
    },
    editApp: function (app) {
      this.showAppForm = true
      this.isUpdatedApp = true
      this.currentApp = app
      this.editedAppName = app.name
    },
    deleteApp: function (appId) {
      this.deleteConfirmation = false
      this.$store.dispatch('apps/DESTROY', {id: appId})
    }
  }
}
</script>

<style>
.cursor-hover:hover{
  cursor: pointer;
}
</style>
