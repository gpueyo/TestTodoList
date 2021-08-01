<template>
    <div id="content" class="homepage">
        <template v-if="Object.keys(tasks).length > 0">
            <ul>
                <li v-for="task in tasks">
                    {{description}}
                </li>
            </ul>
        </template>
        <template v-else>
            <p>¡Todo completado! No hay más tareas</p>
        </template>
    </div>
</template>

<script>

    export default {
        name: 'Home',
        data() {
            return {
                tempTasks: {},
            }
        },
        computed: {
            tasks: {
                get(){
                    return this.tempTasks;
                },
                set(value){
                    this.tempTasks = value;
                },
            },
        },
        methods: {
        },
        created() {
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