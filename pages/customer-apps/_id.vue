<template>
  <v-layout
    column
    justify-center
    align-center>
    <div>
      {{ currentApp }}
    </div>
    <pages :pages="currentApp.pages" />
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import pages from '../../components/pages.vue'

export default {
  middleware: 'authenticated',
  components: {
    pages
  },
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
