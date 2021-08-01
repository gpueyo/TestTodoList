import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    tasks: {},
}

export default new Vuex.Store({
    state: state,
    modules: {
    },
    getters: {
        getTasks: (state, getters, rootState) => {
            return state.tasks;
        },    
    },
    actions: {
        loadTasks (context, params) {
            var tasks = localStorage.tasks != undefined ? JSON.parse( localStorage.tasks ) : {};
            context.commit('setTasks', { data: tasks });
        },

        addTask (context, params) {
            if ( params.desc ){
                var tasks = context.state.tasks;
                let newId = new Date().getTime();

                tasks [ newId ] = {
                    id: newId,
                    description: params.desc,
                    checked: false
                };
                localStorage.setItem('tasks', JSON.stringify( tasks ));
                                
                context.commit('setTasks', { data: tasks });
            }
        },
        editTask (context, params) {
            if ( params.task ){
                var tasks = context.state.tasks;
                
                Vue.set(tasks, params.task.id, { ...params.task });
                localStorage.setItem('tasks', JSON.stringify( tasks ));
                                
                context.commit('setTasks', { data: tasks });
            }
        },
        delTask (context, params) {
            if ( params.id ){
                var tasks = context.state.tasks;
                
                delete tasks[ params.id ];
                localStorage.setItem('tasks', JSON.stringify( tasks ));
                                
                context.commit('setTasks', { data: tasks });
            }
        },
    
    },
    mutations: {
        setTasks(state, params) {
            let values = params.data ? params.data : {};
            Vue.set(state, 'tasks', { ...values });
        },

    }
})

