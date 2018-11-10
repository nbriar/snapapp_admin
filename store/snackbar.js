export const state = () => ({
  snack: {color: '', text: ''}
})

export const mutations = {
  SET_SNACK (state, snack) {
    state.snack = snack
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
