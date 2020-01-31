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
    name: 'oidc-login-callback',
    mounted () {
        this.$store.dispatch('auth/loginCallback').then(() => {
            this.$router.push({ name: 'main-page' })
        })
    }
}
</script>