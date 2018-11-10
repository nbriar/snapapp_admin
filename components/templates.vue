<template>
  <div>
    Templates
    {{ templates }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Templates',
  computed: mapGetters({
    templates: 'templates/list'
  }),
  mounted () {
    this.$store.dispatch('templates/GET_ALL')
  }
}
</script>
