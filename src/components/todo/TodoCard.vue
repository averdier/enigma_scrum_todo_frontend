<template>
    <v-card>

        <v-card-actions>

            <div class="card_header_action_text">
                {{ new Date(item.created_at * 1000).toLocaleDateString() }}
            </div>

            <v-spacer></v-spacer>
            <template v-if="options.editMode">
                <v-btn icon @click="onSubmitClick">
                    <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn icon @click="onCancelClick">
                    <v-icon>mdi-cancel</v-icon>
                </v-btn>
            </template>
            <template v-else>
                <v-btn icon @click="onEditClick" :disabled="!active">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="onDeleteClick" :disabled="!active">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
            
        </v-card-actions>

        <v-card-text>
            <template v-if="options.editMode">
                <v-form ref="form" lazy-validation>
                    <v-textarea
                        name="input-content"
                        ref="inputContent"
                        label="Todo content"
                        autofocus
                        v-model="form.content"
                        :rules="rules.content" />
                </v-form>
            </template>
            <template v-else>
                {{ item.content }}
            </template>
        </v-card-text>

    </v-card>
</template>

<script>
export default {
    name: 'todo-card',
    props: {
        item: {
            type: Object,
            required: true
        },
        active: {
            type: Boolean,
            required: false,
            default: () => false
        }
    },
    created () { this.form.content = this.item.content },
    data: () => ({
        options: {
            editMode: false
        },
        form: {
            content: null
        },
        rules: {
            content: [
                v => !!v || 'Content is required.'
            ]
        }
    }),
    watch: {
        active: function (oldValue, newValue) {
            if (newValue) this.options.editMode = false
        }
    },
    methods: {

        onSubmitClick () {
            if (this.$refs.form.validate()) {
                    this.$store.dispatch(
                    'todo/updateItem',
                    {
                        oldItem: this.item,
                        payload: this.form
                    }
                )
                this.item.content = this.form.content
                this.options.editMode = false
            }
        },

        onEditClick () {
            this.options.editMode = !this.options.editMode
        },

        onCancelClick () {
            this.$refs.form.reset()
            this.options.editMode = false
        },

        onDeleteClick () {
            this.$store.dispatch('todo/deleteItem', this.item)
        }
    }
}
</script>

<style scoped>
.card_header_action_text {
    padding-left: 8px;
}
</style>