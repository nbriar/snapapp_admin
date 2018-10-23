export default function ({ store, redirect }) {
  console.log('annnnnnnnnn')
  if (store.getters.isAuthenticated) {
    return redirect('/')
  }
}
