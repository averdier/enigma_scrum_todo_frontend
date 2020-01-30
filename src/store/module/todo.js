import backend from '@/services/backend'

const uuidv1 = require('uuid/v1');

const defaultState = () => ({
    items: [],
    status: {
        items: '',
        create: '',
        update: '',
        delete: ''
    }
})

export const namespaced = true
export const state = defaultState

export const mutations = {
    SET_STATUS (state, { key, status }) { state.status[key] = status },
    SET_ITEMS (state, items) { state.items = items },
    ADD_ITEM (state, item) { state.items.push(item) },
    SET_ITEM_AT (state, { item, index }) {
        if (state.items.length == 0) state.items.push(item)
        else {
            if (index >= 0 && index < state.items.length) {
                state.items.splice(index, 0, item)
            }
        }
    },
    REPLACE_ITEM (state, { oldItem, newItem }) {
        const index = state.items.indexOf(oldItem)
        if (index !== -1) state.items[index] = newItem
    },
    DELETE_ITEM (state, item) {
        const index = state.items.indexOf(item)
        if (index !== -1) state.items.splice(index, 1)
    },
    RESET (state) {
        const ds = defaultState()
        Object.keys(ds).forEach(key => {
            state[key] = ds[key]
        })
    }
}

export const actions = {
    getItems ({ commit }) {
        commit('SET_STATUS', { key: 'items', status: 'loading' })
        
        return backend.getTodos()
        .then(data => {
            commit('SET_ITEMS', data.todos)
            commit('SET_STATUS', { key: 'items', status: 'success' })

            return data.todos
        })
        .catch(error => {
            commit('SET_STATUS', { key: 'items', status: 'error' })
            throw error
        })
    },

    createItem ({ commit }, payload) {
        commit('SET_STATUS', { key: 'create', status: 'loading'})

        const newTodo = Object.assign({}, payload)
        newTodo.uuid = uuidv1()
        newTodo.created_at = new Date().getTime() / 1000

        commit('SET_ITEM_AT', { item: newTodo, index: 0 })

        return backend.createTodo(payload)
        .then(item => {
            commit('REPLACE_ITEM', { oldItem: newTodo, newItem: item })
            commit('SET_STATUS', { key: 'create', status: 'success' })

            return item
        })
        .catch(error => {
            commit('DELETE_ITEM', newTodo)
            commit('SET_STATUS', { key: 'create', status: 'error' })
            
            throw error
        })
    },

    updateItem ({ commit }, { oldItem, payload }) {
        commit('SET_STATUS', { key: 'update', status: 'loading' })

        const newItem = Object.assign({}, oldItem)
        newItem.content = payload.content

        commit('REPLACE_ITEM', { oldItem, newItem })
        return backend.updateTodo(oldItem.uuid, payload)
        .then(item => {
            commit('SET_STATUS', { key: 'update', status: 'success' })

            return item
        })
        .catch(error => {
            commit('REPLACE_ITEM', { oldItem: newItem, newItem: oldItem })
            commit('SET_STATUS', { key: 'update', status: 'error' })
            throw error
        })
    },

    deleteItem ({ commit, state }, item) {
        commit('SET_STATUS', { key: 'delete', status: 'loading' })

        const copy = Object.assign({}, item)
        const index = state.items.indexOf(item)

        commit('DELETE_ITEM', item)

        return backend.deleteTodo(item.uuid)
        .then(response => {
            commit('SET_STATUS', { key: 'delete', status: 'success' })

            return response
        })
        .catch(error => {
            commit('SET_ITEM_AT', { item: copy, index: index })
            commit('SET_STATUS', { key: 'delete', status: 'error' })

            throw error
        })
    }
}
