/// <reference types="@jafish/m-store/src" />

declare namespace Jafish_StoreInReact {
    type JSXNode<T> = (params: T) => JSX.Element
    type Callback = (callback: Function) => void
    type StoreCallback<T, U> = (state: T) => U

    interface Merge {
        readonly id: number
        subscribes: Array<Function>
        onceCallback: any
        once: boolean
        useOnce: Callback
    }
    
    type StoreGet<T, U> = [Jafish_MStore.MStore<T>, StoreCallback<T, U>]
    type NestCallback<T> = (fn: (props: T) => any) => any

    interface useStore {
        <T1, U1>(
            s1: StoreGet<T1, U1>,
        ): NestCallback<U1>
        <T1, U1, T2, U2>(
            s1: StoreGet<T1, U1>,
            s2: StoreGet<T2, U2>,
        ): NestCallback<U1 & U2>
        <T1, U1, T2, U2, T3, U3>(
            s1: StoreGet<T1, U1>,
            s2: StoreGet<T2, U2>,
            s3: StoreGet<T3, U3>,
        ): NestCallback<U1 & U2 & U3>
        <T1, U1, T2, U2, T3, U3, T4, U4>(
            s1: StoreGet<T1, U1>,
            s2: StoreGet<T2, U2>,
            s3: StoreGet<T3, U3>,
            s4: StoreGet<T4, U4>,
        ): NestCallback<U1 & U2 & U3 & U4>
        <T1, U1, T2, U2, T3, U3, T4, U4, T5, U5>(
            s1: StoreGet<T1, U1>,
            s2: StoreGet<T2, U2>,
            s3: StoreGet<T3, U3>,
            s4: StoreGet<T4, U4>,
            s5: StoreGet<T5, U5>,
        ): NestCallback<U1 & U2 & U3 & U4 & U5>
        <T1, U1, T2, U2, T3, U3, T4, U4, T5, U5, T6, U6>(
            s1: StoreGet<T1, U1>,
            s2: StoreGet<T2, U2>,
            s3: StoreGet<T3, U3>,
            s4: StoreGet<T4, U4>,
            s5: StoreGet<T5, U5>,
            s6: StoreGet<T6, U6>,
        ): NestCallback<U1 & U2 & U3 & U4 & U5 & U6>
        <T1, U1, T2, U2, T3, U3, T4, U4, T5, U5, T6, U6, T7, U7>(
            s1: StoreGet<T1, U1>,
            s2: StoreGet<T2, U2>,
            s3: StoreGet<T3, U3>,
            s4: StoreGet<T4, U4>,
            s5: StoreGet<T5, U5>,
            s6: StoreGet<T6, U6>,
            s7: StoreGet<T7, U7>,
        ): NestCallback<U1 & U2 & U3 & U4 & U5 & U6 & U7>
        <T1, U1, T2, U2, T3, U3, T4, U4, T5, U5, T6, U6, T7, U7, T8, U8>(
            s1: StoreGet<T1, U1>,
            s2: StoreGet<T2, U2>,
            s3: StoreGet<T3, U3>,
            s4: StoreGet<T4, U4>,
            s5: StoreGet<T5, U5>,
            s6: StoreGet<T6, U6>,
            s7: StoreGet<T7, U7>,
            s8: StoreGet<T8, U8>,
        ): NestCallback<U1 & U2 & U3 & U4 & U5 & U6 & U7 & U8>
        <T1, U1, T2, U2, T3, U3, T4, U4, T5, U5, T6, U6, T7, U7, T8, U8, T9, U9>(
            s1: StoreGet<T1, U1>,
            s2: StoreGet<T2, U2>,
            s3: StoreGet<T3, U3>,
            s4: StoreGet<T4, U4>,
            s5: StoreGet<T5, U5>,
            s6: StoreGet<T6, U6>,
            s7: StoreGet<T7, U7>,
            s8: StoreGet<T8, U8>,
            s9: StoreGet<T9, U9>,
        ): NestCallback<U1 & U2 & U3 & U4 & U5 & U6 & U7 & U8 & U9>

        (...arg: StoreGet<any, any>[]): NestCallback<any>
    }

    interface UseStoreInHook {
        <T, U>(store: Jafish_MStore.MStore<T>, callback: StoreCallback<T, U>): (() => U)
    }
}
