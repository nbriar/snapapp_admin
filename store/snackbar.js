export const state = () => ({
  snack: {color: '', text: ''}
})

export const mutations = {
  setSnack (state, snack) {
    state.snack = snack
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
