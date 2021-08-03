<template>
    <div id="content" class="homepage">
        
        <div class="task-create">
            <div class="task-container add" :class="{ 'error' : errors.emptyTask }">
                <div class="task">
                    <span class="checkbox">
                        <div class="fake-check"></div>
                    </span>

                    <input class="input" v-model="newTask" @keyup.enter="addTask" type="text" placeholder="Añade una nueva tarea..." />
                </div>
                <button class="btn add" :class="{ 'disabled' : newTask.trim() == '' }" @click="addTask"></button>
                <p v-if="errors.emptyTask" class="msg-inline error">La tarea debe contener texto</p>
            </div>
        </div>

        <div class="task-list">
            <template v-if="Object.keys(tasks).length > 0">
                <div class="task-container" :class="{ 'done' : task.checked }" v-for="task in tasks">
                    <div class="task">
                        <span class="checkbox">
                            <input type="checkbox" v-model="task.checked" @change="editTask( task.id )"/>
                            <div class="fake-check">
                            </div>
                        </span>

                        <input class="input" type="text" v-model="task.description" @keyup="editTask( task.id )" :disabled="task.checked" maxlength="250"/>
                    </div>
                    <button class="btn delete" @click="delTask( task.id )"></button>
                    <p class="msg-inline error" v-if="task.description.trim() == ''">La tarea debe contener texto</p>
                </div>
            </template>
            <template v-else>
                <p class="msg empty">¡Todo completado! No hay más tareas</p>
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
        $task-bg: tint($base-main, 100%);
        $task-bg-dark: tint($base-main, 10%);
        $check-size: 24px;

        max-width: 600px;
        padding: 60px 30px;

        .task-create,
        .task-list {
            @include display-flex();
            @include flex-direction(column);
            @include flex-wrap(wrap);
            @include justify-content(flex-start);

            &.task-create {
                margin-bottom: 50px;
            }

            &.task-list {
                @include flex-direction(column-reverse);
            }

            .task-container {
                @include display-flex();
                @include flex-direction(row);
                @include flex-wrap(wrap);
                @include justify-content();
                @include align-items(flex-start);
                width: 100%;
                margin-bottom: 20px;

                .task,
                .btn,
                .msg-inline {
                    @include display-inline-flex();
                    @include justify-content();
                    @include align-items();
                }
                .task {
                    box-shadow: 0 2px 12px -3px shade($base-main, 15%);
                    background-color: $task-bg;
                    border-radius: 3px;
                    min-height: 40px;
                    width: 100%;
                    max-width: calc( 100% - 40px - 9px );
                    margin-right: 9px;
                    padding: 9px 12px;
                    transition-duration: 0.2s;

                    &:hover {
                        box-shadow: 0 2px 12px -3px shade($base-main, 25%);
                    }

                    .input {
                        width: calc( 100% - #{$check-size} - 9px );
                        height: 20px;
                        margin-left: 9px;
                        line-height: 20px;
                        background-color: $task-bg;
                        border: none;
                        outline: unset;
                        color: $text-main;
                    }

                    .checkbox {
                        position: relative;
                        width: $check-size;
                        height: $check-size;
                        user-select: none;

                        .fake-check,
                        input[type="checkbox"] {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: $check-size;
                            height: $check-size;
                        }
                        input[type="checkbox"] {
                            opacity: 0;
                            z-index: 1;
                            cursor: pointer;
                        }

                        .fake-check {
                            @include background( $size: ( $check-size - 6px ) );
                            border: solid 1px $inactive-main;
                            border-radius: 100%;
                            display: inline-block;
                            transition-duration: 0.2s;
                        }
                        input:checked + .fake-check {
                            background-image: img('checked.svg');
                            background-color: tint( $inactive-main, 40%);
                            border-color: tint( $inactive-main, 10%);
                        }

                        &:hover {
                            .fake-check {
                                background-image: img('checked_primary.svg');
                                background-color: tint($primary-main, 90%);
                                border-color: $primary-main;
                            }
                            input:checked + .fake-check {
                                background-color: tint( $inactive-main, 30%);
                            }
                        }

                    }

                }

                .btn {
                    @include background( $size: 24px );
                    height: 40px;
                    width: 40px;
                    cursor: pointer;
                    transition-duration: 0.2s;

                    &.add {
                        background-image: img('add.svg');
                        
                        &:hover:not(.disabled) {
                            background-image: img('add_dark.svg');
                        }
                    }
                    &.delete {
                        background-image: img('delete.svg');
                        background-size: 18px;

                        &:hover {
                            background-image: img('delete_error.svg');
                        }
                    }
                    &.disabled {
                        cursor: not-allowed;
                        filter: grayscale(100%);
                        opacity: 0.3;
                    }

                }

                .msg-inline {
                    @include justify-content(flex-start);
                    width: 100%;
                    padding: 6px 9px 6px 12px;
                    font-family: $font-text-bold;
                    font-size: 0.7rem;

                    &.error {
                        color: shade( $error-main, 40% );
                    }
                }
                

                &.add {
                    margin-bottom: 0;

                    .task {
                        box-shadow: unset;
                        border: 1px dashed $inactive-main;
                        background-color: $base-main;

                        .input {
                            background-color: $base-main;
                        }

                        .checkbox {
                            opacity: 0.6;

                            &:hover .fake-check {
                                background: none;
                                border-color: $inactive-main;
                            }
                        }
                    }


                    &.error {
                        .task {
                            border-color: shade( $error-main, 20% );
                        }
                    }
                }

                &.done {

                    .task {
                        background-color: $task-bg-dark;

                        .input {
                            text-decoration: line-through;
                            color: tint( $text-main, 40% );
                        }
                    }
                }

            }
        }



        // Tablet
        @media (max-width: 768px) {
        }

        // Mobile
        @media (max-width: 360px) {
        }
    }

</style>