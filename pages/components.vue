<template>
  <v-layout
    column
    justify-center>
    <h2>Components</h2>
    <appComponents />
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import appComponents from '../components/app-components.vue'

export default {
  middleware: 'authenticated',
  components: {
    appComponents
  },
  computed: mapGetters({
    isAuthenticated: 'isAuthenticated',
    loggedUser: 'loggedUser',
    currentApp: 'apps/current'
  })
}
</script>
