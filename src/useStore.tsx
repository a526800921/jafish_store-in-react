/// <reference path="./index.d.ts" />
/// <reference types="@jafish/m-store/src" />

import React, { Component } from 'react'

export function getUpdates<T>(
    currentState: Jafish_MStore.State,
    newState: Jafish_MStore.State,
    callback: Jafish_MStore.Next<T>
): Jafish_MStore.State {
    return Object.keys(newState).reduce((update, key) => {
        const oldValue = currentState[key]
        const newValue = newState[key]

        if (newValue === void 0) {
            console.error('useStore 中有返回值为 undefined:', key, callback.toString())

            return update
        }

        // 当前key有更新
        // 此处只做浅比较
        if (oldValue !== newValue) update[key] = currentState[key] = newState[key]

        return update
    }, {})
}

let id: number = 1

const CreateNode = <T, U>(
    stores: Jafish_StoreInReact.StoreGet<T, U>[],
    CNode
) => class MergeStore extends Component implements Jafish_StoreInReact.Merge {
        readonly id: number = id++
        oldStates: any[] = []
        subscribes: Function[] = []
        onceCallback: any = null
        once: boolean = false

        constructor(props) {
            super(props)

            this.state = {}

            stores.forEach(([store, callback], index) => {
                // 添加状态
                let currentState = callback(store.get())
                // 记录状态
                this.oldStates[index] = currentState
                // 合并状态
                Object.assign(this.state, currentState)
            })
        }

        componentDidMount() {
            stores.forEach(([store, callback], index) => {
                const updateState = (u: Jafish_MStore.Update[], cb: Function) => {
                    const newState = callback(store.get())
                    // 减少不必要的 setState
                    const updates = getUpdates(this.oldStates[index], newState, callback)

                    if (Object.keys(updates).length > 0) this.setState(updates, cb())
                }

                // 补偿初始化到订阅之间的时间，别处所做的修改
                updateState([], () => void 0)
                // 订阅更新
                const unsubscribe = store.subscribe(updateState)
                // 取消订阅队列
                this.subscribes.push(unsubscribe)
            })
        }

        componentWillUnmount() {
            // 取消订阅
            this.subscribes.splice(0, this.subscribes.length).forEach(fn => fn())

            // 给一个取消功能
            typeof this.onceCallback === 'function' && this.onceCallback()
        }

        // 当前实例只走一次
        // 提供给函数式组件，模拟 didMount
        useOnce: Jafish_StoreInReact.Callback = (callback) => {
            if (this.once) return
            this.once = true

            this.onceCallback = callback()
        }

        render() {
            return <CNode {...this.props} {...this.state} useOnce={this.useOnce} />
        }
    }

const useStore: Jafish_StoreInReact.useStore = (
    ...stores: Jafish_StoreInReact.StoreGet<any, any>[]
) => CNode => CreateNode(stores, CNode)

export default useStore


