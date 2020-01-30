<template>
    <v-app>
        <v-app-bar app dark>
            <v-toolbar-title>Enigma | Scrum | Todo</v-toolbar-title>

            <template v-slot:extension>
                <v-btn fab bottom left absolute color="primary" @click="onAddClick">
                <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>

        </v-app-bar>

        <v-content>
            <router-view />
        </v-content>
    </v-app>
</template>

<script>
const routeGuardMain = (to, from, next) => {
    if (to.path === '/main') next('/main/todo')
    else next()
}

export default {
    name: 'main-page',
    beforeRouteEnter(to, from, next) { routeGuardMain(to, from, next) },
    beforeRouteUpdate(to, from, next) { routeGuardMain(to, from, next) },
    methods: {
        onAddClick () {
            this.$root.$emit('todo-create')
        }
    }
}
</script>

<style scoped>
.mainContent {
  padding-top: 16px;
}
</style>
