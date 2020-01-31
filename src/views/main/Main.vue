<template>
    <v-app>
        <v-app-bar app dark>
            <v-toolbar-title>Enigma | Scrum | Todo</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item @click="onLogoutClick">
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

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
const routeGuardMain = async (to, from, next) => {
    if (to.path === '/main') next({ name: 'todo-page' })
    else next()
}

export default {
    name: 'main-page',
    beforeRouteEnter(to, from, next) { routeGuardMain(to, from, next) },
    beforeRouteUpdate(to, from, next) { routeGuardMain(to, from, next) },
    methods: {
        onAddClick () {
            this.$root.$emit('todo-create')
        },
        onLogoutClick () {
            this.$store.dispatch('auth/logout').catch(() => {
                this.$router.push('/login')
            })
        }
    }
}
</script>

<style scoped>
.mainContent {
  padding-top: 16px;
}
</style>
