<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :multi-line="true">
    {{ message }}
    <v-btn
      flat
      color="accent"
      @click.native="show = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      color: '',
      message: ''
    }
  },
  created: function () {
    this.$store.watch(state => state.snackbar.snack, () => {
      const msg = this.$store.state.snackbar.snack
      if (msg !== '') {
        this.show = true
        this.color = this.$store.state.snackbar.snack.color
        this.message = this.$store.state.snackbar.snack.text
        this.$store.commit('snackbar/SET_SNACK', '')
      }
    })
  }
}
</script>
