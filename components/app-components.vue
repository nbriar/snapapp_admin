<template>
  <div>
    {{ appComponents }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppComponents',
  computed: mapGetters({
    appComponents: 'appComponents/list'
  })
}
</script>
