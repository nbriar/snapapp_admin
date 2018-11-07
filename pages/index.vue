<template>
  <v-layout
    column
    justify-center>
    <Apps />
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
    apps: 'apps/list'
  })
}
</script>
