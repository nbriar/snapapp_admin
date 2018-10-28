<template>
  <div>
    <v-btn
      small
      outline
      color="primary"
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
          <td>{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.slug }}</td>
          <td
            class="text-xs-left"
            @click="viewApp(props.item.id)">
            <a>View</a>
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
      <h3>Create New App</h3>
      <form v-if="showAppForm">
        <v-text-field
          v-validate="'required|alpha_spaces'"
          v-model="newAppName"
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
      </form>
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
      newAppName: '',
      search: '',
      headers: [
        { text: 'Name', align: 'left', sortable: true, value: 'name' },
        { text: 'Code-Name', sortable: true, value: 'slug' },
        { text: '', sortable: false, value: 'controls' }
      ]
    }
  },
  computed: mapGetters({
    apps: 'appStore/apps'
  }),
  created () {
    this.$store.dispatch('appStore/GET_ALL_APPS')
  },
  methods: {
    toggleAppForm: function () {
      this.showAppForm = !this.showAppForm
    },
    onSubmit: function (event) {
      event.preventDefault()
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('newApp', {body: {name: this.newAppName}})
          this.toggleAppForm()
        }
      })
    },
    viewApp: function (appId) {
      this.$router.push({ name: 'app', params: { appId } })
    }
  }
}
</script>
