import auth from '@/services/auth'
import backend from '@/services/backend'

const defaultState = () => ({
    user: null,
    status: ''
})

export const namespaced = true

export const state = defaultState

export const mutations = {
    SET_STATUS (state, status) { state.status = status },
    SET_USER (state, user) { 
        state.user = user 
        if (user != null) {
            backend.instance.defaults.headers['Authorization'] = `Bearer ${user.access_token}`
        }
    },
    RESET (state) {
        const ds = defaultState()
        Object.keys(ds).forEach(key => {
            state[key] = ds[key]
        })
    }
}

export const actions = {
    login ({ commit }) {
        commit('SET_STATUS', 'loading')
        return auth.instance.signinRedirect()
    },
    loginCallback ({ commit }) {
        return auth.instance.signinRedirectCallback().then(user => {
            commit('SET_USER', user)
            commit('SET_STATUS', 'success')

            return user
        })
        .catch(error => {
            commit('SET_STATUS', 'error')
            commit('SET_USER', null)
            throw error
        })
    },

    logout () {
        return auth.instance.signoutRedirect()
    },
    logoutCallback ({ dispatch }) {
        return auth.instance.signoutRedirectCallback().then(() => {
            dispatch('reset', null, { root: true })
        })
        .catch(error => {
            dispatch('reset', null, { root: true })
            throw error
        })
    },
    initWithUser ({ commit }, user) {
        commit('SET_USER', user)
        if (user !== null && user !== undefined) commit('SET_STATUS', 'success')
    },

    reset ({ commit }) { commit('RESET') }
}