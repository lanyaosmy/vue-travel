<template>
    <div class="todo">
        <div>
            <button @click="increment">increment</button>
            <p>{{ count }}={{ countPlusLocalState }}</p>
            <p>Done Todo:{{ doneTodosCount }}</p>
            <ul class="todos">
                <li v-for="todo in todos" :key="todo.id" class="todo-item">
                    <input
                        type="checkbox"
                        :name="todo.text"
                        :id="todo.id"
                        :checked="todo.done"
                        @change="changeTodo(todo.id)"
                    />
                    {{ todo.text }}
                    <!-- <span @click="removeTodo">x</span> -->
                </li>
            </ul>
            <input type="text" name="todoText" v-model="newTodo" />
            <button @click="addTodo(newTodo)">Add Todo</button>
            <button @click="asyncAddTodo(newTodo)">Async Add Todo</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { CHANGE_TODO_STATE, ADD_TODO } from '@/store/mutation-types'

export default {
    name: 'Todo',
    components: {},
    data() {
        return {
            localCount: 2,
            newTodo: ''
        }
    },
    methods: {
        increment() {
            this.$store.commit('increment')
        },
        checkBoxChange(id) {
            // this.$store.commit('changeTodoState', { id })
            this.$store.commit({
                type: CHANGE_TODO_STATE,
                id
            })
        },
        // ...mapMutations([CHANGE_TODO_STATE]),
        ...mapMutations({
            changeTodo: CHANGE_TODO_STATE,
            addTodo: ADD_TODO
        }),
        ...mapActions(['asyncAddTodo'])
    },
    computed: {
        // count() {
        //     return this.$store.state.count
        // },
        ...mapState(['count', 'todos']),
        ...mapState({
            // 箭头函数可使代码更简练
            countB: state => state.count,

            // 传字符串参数 'count' 等同于 `state => state.count`
            countAlias: 'count',

            // 为了能够使用 `this` 获取局部状态，必须使用常规函数
            countPlusLocalState(state) {
                return state.count + this.localCount
            }
        }),
        // doneTodosCount() {
        //     return this.$store.getters.doneTodosCount
        // },
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
            'doneTodosCount',
            'anotherGetter'
            // ...
        ]),
        // 重命名getter
        ...mapGetters({
            // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
            doneCount: 'doneTodosCount'
        })
    }
    // 属性名与state的子节点相同，可以直接传数组
    // computed: mapState([
    // // 映射 this.count 为 store.state.count
    //     'count'
    // ])
}
</script>

<style scoped>
.todo {
    display: flex;
    justify-content: space-between;
}
.todo-item {
    text-align: left;
}
</style>
