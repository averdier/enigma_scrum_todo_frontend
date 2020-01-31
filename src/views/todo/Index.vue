<template>
    <v-container v-if="itemsStatus === 'success'" class="mainContent">

        <!--Create form-->
        <v-expand-transition>
            <v-row v-if="options.create">
                <v-col cols="12">
                    <v-card>

                        <v-card-actions>
                            <div class="card_header_action_text">Create new todo</div>

                            <v-spacer></v-spacer>
                            <v-btn icon @click="onSubmitClick">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn icon @click="onCancelClick">
                                <v-icon>mdi-cancel</v-icon>
                            </v-btn>
                        </v-card-actions>

                        <v-card-text>
                            <v-form ref="createForm" lazy-validation>
                                <v-textarea
                                    name="input-create"
                                    ref="inputCreate"
                                    label="Todo content"
                                    autofocus
                                    v-model="form.content"
                                    :rules="rules.content" />
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>

            </v-row>
        </v-expand-transition>

        <!--Todo list-->
        <v-row>
            <v-col cols="12" v-for="(item, index) in items" :key="index">
                <todo-card :item="item" :active="editActive" />
            </v-col>
        </v-row>

    </v-container>
    <v-container v-else fill-height>
        <v-row align="start" justify="center">
            <v-col cols="12">
                <v-row justify="center">
                    Loading todos
                </v-row>
            </v-col>
            <v-col cols="6">
                <v-progress-linear
                    color="primary"
                    indeterminate
                    roundedheight="6" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TodoCard from '@/components/todo/TodoCard.vue'

export default {
    name: 'todo-list-page',
    components: { TodoCard },
    mounted () {
        this.$store.dispatch('todo/getItems')
        this.$root.$on('todo-create', () => {
            this.onCreateEvent()
        })
    },
    computed: {
        ...mapState({
            items: state => state.todo.items,
            itemsStatus: state => state.todo.status.items 
        }),

        editActive () {
            return !this.options.create
        }
    },
    data: () => ({
        form: {
            content: null
        },
        rules: {
            content: [
                v => !!v || 'Content is required.'
            ]
        },
        options: {
            create: false
        }
    }),
    methods: {
        resetCloseForm () {
            this.options.create = false
            this.$refs.createForm.reset()
        },

        onCreateEvent () {
            this.options.create = true
        },

        onSubmitClick () {
            if (this.$refs.createForm.validate()) {
                this.$store.dispatch('todo/createItem', this.form)
                this.resetCloseForm()
            }
        },

        onCancelClick () {
            this.resetCloseForm()
        },

        createTodo () {
            this.$store.dispatch('todo/createItem', this.form)
        }
    }
}
</script>

<style scoped>
.mainContent {
    padding-top: 32px;
}
.card_header_action_text {
    padding-left: 8px;
}
</style>