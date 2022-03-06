import { store } from 'quasar/wrappers'
import login from './login'
import main from './main'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex'
import {loginInterface} from "src/store/login/state";
import {mainInterface} from "src/store/main/state";
import createPersistedState from "vuex-persistedstate";

export interface StateInterface {
  login: loginInterface
  main: mainInterface
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      login,
      main
    },
    plugins: [
      createPersistedState({
        storage: window.localStorage,
        paths: ["login", "main"],
      }),
      createPersistedState({
        storage: window.sessionStorage,
        paths: [],
      })
    ],
    strict: !!process.env.DEBUGGING
  })

  return Store;
})

export function useStore() {
  return vuexUseStore(storeKey)
}
