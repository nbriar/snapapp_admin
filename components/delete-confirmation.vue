<template>
  <v-dialog
    v-model="visible"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        <b class="mr-3">
          <span class="text-bold red--text">DELETE</span>
          <br>
          <span class="text-info"> {{ title }} ?</span>
        </b>
        <div class="mt-3">This is irreversible!</div>
      </v-card-title>
      <v-card-actions>
        <v-spacer />

        <v-btn
          flat="flat"
          @click="cancelCallback()"
        >
          Cancel
        </v-btn>

        <v-btn
          color="red darken-1"
          flat="flat"
          @click="confirmCallback(itemId)"
        >
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'DeleteConfirmation',
  props: {
    title: { type: String, default: 'Error' },
    itemId: { type: Number, default: 0 },
    visible: { type: Boolean, default: false },
    cancelCallback: { type: Function, default: null },
    confirmCallback: { type: Function, default: null }
  }
}
</script>
