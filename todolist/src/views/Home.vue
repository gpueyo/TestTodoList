<template>
    <div id="content" class="homepage">
        <div class="task-create">
            <div class="task">
                <input type="text" placeholder="Añade una nueva tarea..." v-model="newTask" @keyup.enter="addTask"/>
                <button @click="addTask">+</button>
            </div>

            <p v-if="errors.emptyTask">La tarea debe contener texto</p>
        </div>

        <div class="task-list">
            <template v-if="Object.keys(tasks).length > 0">
                <ul>
                    <li v-for="task in tasks">
                        {{task.description}}
                    </li>
                </ul>
            </template>
            <template v-else>
                <!-- TODO -->
                <p class="msg-empty">¡Todo completado! No hay más tareas</p>
            </template>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'Home',
        data() {
            return {
                newTask: "",
                errors: {
                    emptyTask: false,
                },
            }
        },
        computed: {
            tasks (){
                var result = this.$store.getters['getTasks'];
                return result ? result : {};
            },
        },
        methods: {
            // Utils
            resetErrors(){
                this.errors.emptyTask = false
            },

            // Functionalities
            addTask(){
                console.log("ADD TASK");
                var self = this;

                self.resetErrors();

                if ( self.newTask.trim() != "" ){
                    self.$store.dispatch('addTask', { desc: self.newTask });
                    self.newTask = "";
                } else {
                    self.errors.emptyTask = true
                }
            },
        },
        created() {
            this.$store.dispatch('loadTasks', {});
        }
    }

</script>

<style lang="scss">

    #content.homepage {


        // Tablet
        @media (max-width: 768px) {
        }

        // Mobile
        @media (max-width: 360px) {
        }
    }

</style>