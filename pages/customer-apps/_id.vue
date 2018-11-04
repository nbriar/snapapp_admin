<template>
  <v-layout
    column
    justify-center
    align-center>
    <div>
      {{ currentApp }}
    </div>
    <pages />
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
    currentApp: 'apps/current'
  }),
  created () {
    const id = this.$route.params.id
    this.$store.dispatch('apps/GET', {id: id})
  }
}
</script>
