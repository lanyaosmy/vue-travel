import * as types from './mutation-types'
export default {
    state: {
        count: 0,
        todos: [
            { id: 1, text: 'apple', done: true },
            { id: 2, text: 'banana', done: false },
            { id: 3, text: 'mongo', done: false },
            { id: 4, text: 'peach', done: false }
        ]
    },
    // mutation 必须是同步函数
    mutations: {
        increment(state) {
            state.count++
        },
        [types.CHANGE_TODO_STATE](state, payload) {
            state.todos.forEach(todo => {
                if (todo.id === payload) {
                    todo.done = !todo.done
                }
            })
        },
        [types.ADD_TODO](state, text) {
            console.log('text', text)
            if (text.length) {
                state.todos.push({
                    id: state.todos.length + 1,
                    text,
                    done: false
                })
            }
        }
    },
    actions: {
        asyncAddTodo({ commit }, text) {
            setTimeout(() => {
                commit(types.ADD_TODO, text)
            }, 1000)
        }
        // 组合多个action
        // actionB({ dispatch, commit, rootState }) {
        //     console.log('rootState', rootState)
        //     return dispatch('actionA').then(() => {
        //         commit('someOtherMutation')
        //     })
        // },
        // // 使用async/await组合多个action
        // async actionA({ commit }) {
        //     commit('gotData', await getData())
        // },
        // async actionB({ dispatch, commit }) {
        //     await dispatch('actionA') // 等待 actionA 完成
        //     commit('gotOtherData', await getOtherData())
        // }
        // checkout({ commit, state }, products) {
        //     // 把当前购物车的物品备份起来
        //     const savedCartItems = [...state.cart.added]
        //     // 发出结账请求，然后乐观地清空购物车
        //     commit(types.CHECKOUT_REQUEST)
        //     // 购物 API 接受一个成功回调和一个失败回调
        //     shop.buyProducts(
        //         products,
        //         // 成功操作
        //         () => commit(types.CHECKOUT_SUCCESS),
        //         // 失败操作
        //         () => commit(types.CHECKOUT_FAILURE, savedCartItems)
        //     )
        // }
    },
    getters: {
        // store.getters.doneTodos
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        },
        // 接受其他getter作为第二个参数
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length
        },
        // 通过方法访问，可以传参，没有缓存
        getTodoById: state => id => {
            return state.todos.find(todo => todo.id === id)
        }
    }
}
