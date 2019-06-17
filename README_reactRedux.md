### 学习文档
https://github.com/react-guide/redux-tutorial-cn

### 经验之谈
* action的type可以统一用一个文件来管理，这样可以保证命名的统一性，reducer也方便使用这些type值
* reducer不一定要使用switch
* 减少Action样板代码
```
// 写action我们普遍会写很多函数，如下
export function add (text) {
  return {
    type: 'add',
    text
  }
}
export function delete (id) {
  return {
    type: 'delete',
    id 
  }
}
// 我们写一个生成action的函数就可以减少很多代码了
function CreateAction (type, ...argsName) {
  // 这里的args是dispatch时候传入的参数
  return function (...args) {
    let action = { type }
    argsName.forEach(item, index) => {
      action[item] = args[index]
    }
    return action
  }
}
export ADD_TODO = 'ADD_TODO'
export const add = CreateAction('ADD_TODO', 'something')
// 当然也可以通过一些已有的中间件来实现生成，`redux-actions`和`redux-act`
```
* 减少Reducer样板代码
```
function updateObject(oldObject, newValues) {}
function updateItemInArray(array, itemId, updateItemCallback) {}

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}


// 省略了内容
function setVisibilityFilter(visibilityState, action) {}

const visibilityReducer = createReducer('SHOW_ALL', {
    'SET_VISIBILITY_FILTER' : setVisibilityFilter
});

// 省略了内容
function addTodo(todosState, action) {}
function toggleTodo(todosState, action) {}
function editTodo(todosState, action) {}

const todosReducer = createReducer([], {
    'ADD_TODO' : addTodo,
    'TOGGLE_TODO' : toggleTodo,
    'EDIT_TODO' : editTodo
});

function appReducer(state = initialState, action) {
    return {
        todos : todosReducer(state.todos, action),
        visibilityFilter : visibilityReducer(state.visibilityFilter, action)
    };
}
```
## Redux和react-redux
`概念（https://segmentfault.com/a/1190000007642740）`
