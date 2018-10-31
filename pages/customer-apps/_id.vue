<template>
  <v-layout
    column
    justify-center
    align-center>
    <div>
      {{ currentApp }}
    </div>

  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'authenticated',
  computed: mapGetters({
    isAuthenticated: 'isAuthenticated',
    loggedUser: 'loggedUser',
    currentApp: 'appStore/currentApp'
  }),
  created () {
    const id = this.$route.params.id
    this.$store.dispatch('appStore/GET_APP', {id: id})
  }
}
</script>
