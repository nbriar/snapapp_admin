<template>
  <p>Signing in...</p>
</template>

<script>
import jwtDecode from 'jwt-decode'
import { setToken, checkSecret, extractInfoFromHash } from '~/utils/auth'

export default {
  mounted () {
    const { token, secret } = extractInfoFromHash()
    if (!checkSecret(secret) || !token) {
      console.error('Something happened with the Sign In request')
    }
    const user = JSON.stringify(jwtDecode(token))

    this.$store.commit('SET_USER', {user, token})
    setToken(token)
    this.$router.replace('/')
  }
}
</script>
