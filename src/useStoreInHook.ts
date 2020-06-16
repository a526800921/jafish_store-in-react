/// <reference path="./index.d.ts" />
/// <reference types="@jafish/m-store/src" />

import { useState, useEffect } from 'react'
import { getUpdates } from './useStore'

const useStoreInHook: Jafish_StoreInReact.UseStoreInHook = (store, callback) =>
    () => {
        const currentState = callback(store.get())
        const [state, setState] = useState(currentState)

        useEffect(() => {
            const updateState = () => {
                const newState = callback(store.get())
                // 减少不必要的 setState
                const updates = getUpdates(currentState, newState, callback)

                if (Object.keys(updates).length > 0) setState(newState)
            }
            
            // 补偿初始化到订阅之间的时间，别处所做的修改
            updateState() 
            // 发起订阅
            const ubsubscribe = store.subscribe(updateState)
            // 取消订阅
            return () => ubsubscribe()
        }, [store, callback])

        return state
    }

export default useStoreInHook



