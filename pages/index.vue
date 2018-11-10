<template>
  <v-layout
    column
    justify-center>
    <h2>My Applications</h2>
    <Apps />
    <Templates />
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Apps from '../components/apps.vue'
import Templates from '../components/templates.vue'

export default {
  middleware: 'authenticated',
  components: {
    Apps,
    Templates
  },
  computed: mapGetters({
    isAuthenticated: 'isAuthenticated',
    loggedUser: 'loggedUser',
    apps: 'apps/list'
  }),
  mounted () {
    this.$store.commit('apps/SET_CURRENT', {})
  }
}
</script>
