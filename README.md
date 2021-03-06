# @jafish/store-in-react

[![npm](https://img.shields.io/npm/v/@jafish/store-in-react)](https://www.npmjs.com/package/@jafish/store-in-react)

[m-store](https://github.com/a526800921/jafish_m-store)在react下的扩展，提供同步数据的api

### 使用

```js
import MStore from '@jafish/m-store'
import { createStorer, createStorerInHook } from '@jafish/store-in-react'

const store = new MStore({
  test: 1,
})

// 自增
const addTest = () => store.set(state => ({ test: state.test + 1 }))

// 囊括组件的方式
const Node1 = createStorer(
  [store, state => ({
    test: state.test,
  })],
  ...可以更多，参数格式一致
)(
  // ({ test }) => <div onClick={addTest}>{test}</div>
  class extends Component {
    render() {
      const { test } = this.props

      return <div onClick={addTest}>{test}</div>
    }
  }
)

// HOOK的方式
const useTestStore = createStorerInHook(store, state => ({
  test: state.test,
}))

const Node2 = () => {
  const { test }  = useTestStore()

  return <div>{test}</div>
}
```

### API

> createStorer([store, getState], ...)(Node)

第一个函数接收多个参数，参数格式一致：[store实例， 获取状态的回调]

返回的函数接收一个返回状态的组件，可以是函数式组件，可以是类组件

```js
const Node1 = createStorer(
  [store, state => ({
    test: state.test,
  })],
  [store, state => ({
    test2: state.test,
  })],
)(class extends Component {
  async componentDidMount() {
    console.log(this.props)
    
    await addTest()
    // 通过 await ，可以立即拿到变更后的 state
    console.log(this.props)
  }

  render() {
    const { test, test2 } = this.props

    return <div onClick={addTest}>{test} {test2}</div>
  }
})
```

> createStorerInHook(store, getState): () => state

该方法仅可用在函数式组件，内部使用了 useState useEffect。

接收两个参数，第一个是store实例，第二个是获取状态的回调，返回一个在函数式组件内部使用的 function，执行后返回状态

```js
// HOOK的方式
const useTestStore = createStorerInHook(store, state => ({
  test: state.test,
}))

const useTestStore2 = createStorerInHook(store, state => ({
  test: state.test,
}))

const Node2 = () => {
  const { test }  = useTestStore()
  const testStore2 = useTestStore2()

  return <div>{test} {testStore2.test}</div>
}
```

### 实践

细化状态的方式可以让我们达到更低的渲染成本，状态尽量细化到小组件内，外部仅负责调用

将状态与页面分离

> store.js

```js
import MStore from '@jafish/m-store'

export const store = new MStore({
    test: 1
})

export const addTest = async () => {
    const { test } = store.get()

    if (test % 2 === 0) await new Promise(resolve => setTimeout(resolve, 500))

    store.set(state => ({
        test: state.test + 1
    }))
}
```

> index.jsx

```js
import React from 'react'
import { createStorer, createStorerInHook } from '@jafish/store-in-react'
import { store as TestStore, addTest } from './store'

const useTestStore = createStorerInHook(TestStore, state => ({
    test: state.test
}))

const Add = () => {
    const { test } = useTestStore()

    return <div>{test}</div>
}

export default function App() {

    return (
        <div onClick={addTest}>
            <Add />
        </div>
    )
}
```

### 更新

> 2.0.0

将 react 版本提升到 17

将 useStore 改为 createStorer

将 useStoreInHook 改为 createStorerInHook

规避 hook 的规则验证

