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
                        <input type="checkbox" v-model="task.checked" @change="editTask( task.id )"/>
                        <input type="text" v-model="task.description" @keyup="editTask( task.id )" maxlength="250"/>
                        <button @click="delTask( task.id )">Eliminar</button>
                        <p v-if="task.description.trim() == ''">La tarea debe contener texto</p>
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
                console.log(result);
                return result ? result : {};
            },
        },
        methods: {
            // Functionalities
            addTask(){
                console.log("ADD TASK");
                var self = this;
                self.errors.emptyTask = false;

                if ( self.newTask.trim() != "" ){
                    self.$store.dispatch('addTask', { desc: self.newTask });
                    self.newTask = "";
                } else {
                    self.errors.emptyTask = true;
                }
            },
            editTask( taskId ){
                console.log("EDIT TASK");
                var self = this;
                var task = self.tasks[ taskId ];                

                if ( task && task.description.trim() != '' ){
                    self.$store.dispatch('editTask', { task: task });
                }
            },
            delTask( taskId ){
                console.log("DELETE TASK");
                var self = this;
                var task = self.tasks[ taskId ];                

                if ( task ){
                    self.$store.dispatch('delTask', { id: taskId });
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