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
                
                tasks [ new Date().getTime() ] = {
                    description: params.desc,
                    checked: false
                };
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

