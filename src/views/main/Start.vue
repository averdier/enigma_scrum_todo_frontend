<template>
    <router-view></router-view>
</template>

<script>
import auth from '@/services/auth'
import store from '@/store'

const nextLogged = async (to, from, next) => {
    if (to.path == '/login' || to.path === '/') next ({ name: 'main-page' })
    else next()
}

const startRouteGuard = async (to, from, next) => {
    let user = null
    if (store.state.auth.user === null || store.state.auth.user !== undefined) {
        user = await auth.getUser()
        if (user !== null && user !== undefined && !user.expired) {
            store.dispatch('auth/initWithUser', user)
            nextLogged(to, from, next)
        }
        else next({ name: 'login-page' })
    }
    else{
        user = store.state.auth.user
        if (!user.expired) {
            nextLogged(to, from, next)
        }
    }
    
}

export default {
    name: 'start-page',
    beforeRouteEnter(to, from, next) { startRouteGuard(to, from, next) },
    beforeRouteUpdate(to, from, next) {startRouteGuard(to, from, next) },
}
</script>