<template>
  <v-layout
    column
    justify-center>
    This is the collections view.
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
