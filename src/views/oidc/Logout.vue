<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-row align="center" justify="center">
                    <v-col cols="6">
                        <v-row justify="center">
                            <v-progress-circular :size="96"
                                :width="7"
                                color="primary"
                                indeterminate />
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'oidc-logout-callback',
    mounted () {
        this.$store.dispatch('auth/logoutCallback').then(() => {
            this.$router.push({ name: 'login-page' })
        })
    }
}
</script>