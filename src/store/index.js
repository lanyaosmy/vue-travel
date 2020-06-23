import Vue from 'vue'
import Vuex from 'vuex'

import todoModule from './todoModule'
import moduleB from './moduleB'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        todoState: todoModule,
        b: moduleB
    }
})
