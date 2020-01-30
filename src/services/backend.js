import axios from 'axios'

const apiClient = axios.create({
    baseURL: `${process.env.VUE_APP_BACKEND}`,
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export default {
    instance: apiClient,

    getTodos() {
        return this.instance.get('/todo')
        .then(r => r.data)
    },

    createTodo(payload) {
        return this.instance.post(
            '/todo',
            { content: payload.content }
        )
        .then(r => r.data)
    },

    updateTodo(todoUuid, payload) {
        return this.instance.put(
            `/todo/${todoUuid}`,
            payload
        )
        .then(r => r.data)
    },

    deleteTodo(todoUuid) {
        return this.instance.delete(
            `/todo/${todoUuid}`
        )
        .then(r => r.status === 204)
    }
}
