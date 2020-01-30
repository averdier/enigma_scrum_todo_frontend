<template>
    <router-view></router-view>
</template>

<script>
const startRouteGuard = (to, from, next) => {
    if (to.path === '/') next('/main')
    else next()
}

export default {
    name: 'start-page',
    beforeRouteEnter(to, from, next) { startRouteGuard(to, from, next) },
    beforeRouteUpdate(to, from, next) {startRouteGuard(to, from, next) },
}
</script>