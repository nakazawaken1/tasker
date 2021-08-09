<template>
  <p>認証中...</p>
</template>

<script>
export default {
  async mounted() {
    if (!this.$route.query.code) return this.$router.replace('/')
    const res = await this.$axios.get('/api/auth/callback', {
      params: this.$route.query,
    })
    this.$store.commit('login', res.data.user)
    this.$router.replace(res.data.url || '/')
  },
}
</script>
