<template>
  <v-layout
    column
    justify-center>
    <h2>Collections</h2>
    <collections />
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import collections from '../components/collections.vue'

export default {
  middleware: 'authenticated',
  components: {
    collections
  },
  computed: mapGetters({
    isAuthenticated: 'isAuthenticated',
    loggedUser: 'loggedUser',
    currentApp: 'apps/current'
  })
}
</script>
