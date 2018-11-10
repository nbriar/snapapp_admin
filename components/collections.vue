<template>
  <div>
    {{ collections }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Collections',
  computed: mapGetters({
    collections: 'collections/list'
  })
}
</script>
