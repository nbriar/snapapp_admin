<template>
  <v-layout
    column
    justify-center>
    <h2>Pages</h2>
    <pages />
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import pages from '../components/pages.vue'

export default {
  middleware: 'authenticated',
  components: {
    pages
  },
  computed: mapGetters({
    isAuthenticated: 'isAuthenticated',
    loggedUser: 'loggedUser',
    currentApp: 'apps/current'
  })
}
</script>
