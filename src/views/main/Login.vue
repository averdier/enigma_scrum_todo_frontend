<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-row align="center" justify="center">
                    <v-col cols="4">
                        <v-row justify="center">
                            <v-btn @click="onLoginClick">Login</v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'login',
    methods: {
        onLoginClick () {
            this.$store.dispatch('auth/login')
        }
    }
}
</script>