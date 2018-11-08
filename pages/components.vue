<template>
  <v-layout
    column
    justify-center>
    <h2>Components</h2>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'authenticated',
  computed: mapGetters({
    isAuthenticated: 'isAuthenticated',
    loggedUser: 'loggedUser',
    currentApp: 'apps/current'
  })
}
</script>
