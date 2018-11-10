<template>
  <v-layout
    column
    justify-center>
    <h2>My Applications</h2>
    <Apps />
    {{ templates }}
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Apps from '../components/apps.vue'

export default {
  middleware: 'authenticated',
  components: {
    Apps
  },
  computed: mapGetters({
    isAuthenticated: 'isAuthenticated',
    loggedUser: 'loggedUser',
    apps: 'apps/list',
    templates: 'templates/list'
  }),
  created () {
    this.$store.commit('apps/SET_CURRENT', {})
    this.$store.dispatch('templates/GET_ALL')
  }
}
</script>
