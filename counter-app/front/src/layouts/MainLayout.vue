<template>
  <q-layout view="hHh Lpr fFf">
    <div class="q-pt-lg q-pb-lg row justify-center" style="background-color: #FFE194">
      <div class="col-2"/>
      <div class="col-8">
        <q-toolbar inset>
          <q-avatar>
            <img style="opacity: 0.8; max-width: 100%; height: auto; width: auto" :src="require('assets/Logo.png')">
          </q-avatar>
          <q-toolbar-title class="title q-ml-lg">
            <router-link to="/" style="text-decoration: none">
              Quasar Framework
            </router-link>
          </q-toolbar-title>
          <div v-if!="!isLogin" class="q-mt-sm">
            <q-btn class="q-px-xl" fab-mini color="brown-5" @click="openLoginModal">LOGIN</q-btn>
          </div>
          <div v-else class="q-mt-sm">
            <strong class="q-mr-sm">ID: {{ filterUserAccountId }}</strong>
            <q-btn class="q-px-xl" fab-mini color="brown-5" @click="logoutWallet">LOGOUT</q-btn>
          </div>
        </q-toolbar>
        <q-toolbar>
          <q-tabs
            inline-label
            class="text-white"
          >
            <q-btn-dropdown class="q-mx-lg q-my-sm" unelevated text-color="brand" label="Trade" icon="eva-flip-2-outline" >
              <q-list>
                <q-item clickable>
                  <q-item-section>Exchange</q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section>liquidity</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn-dropdown class="q-mr-lg q-my-sm" unelevated label="Earn" text-color="brand" icon="eva-plus-circle-outline">
              <q-list>
                <q-item clickable>
                  <q-item-section>Exchange</q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section>liquidity</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn-dropdown class="q-mr-lg q-my-sm" unelevated label="TodoList" text-color="brand" icon="eva-grid-outline">
              <q-list>
                <router-link to="/todolist" style="text-decoration: none">
                  <q-item clickable>
                    <q-item-section color="black">TodoList</q-item-section>
                  </q-item>
                </router-link>
              </q-list>
            </q-btn-dropdown>
            <q-btn-dropdown class="q-mr-lg q-my-sm" unelevated label="Social" text-color="brand" icon="eva-wifi-outline">
              <q-list>
                <q-item clickable>
                  <q-item-section color="black">Blog</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section color="black">Facebook</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section color="black">Instagram</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-tabs>
        </q-toolbar>
      </div>
      <div class="col-2"/>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
    <div>
      footer
    </div>
  </q-layout>
</template>

<script lang="ts">

import { defineComponent, ref, computed } from 'vue'
import {MetaMaskInpageProvider} from "@metamask/providers";
import detectEthereumProvider from "@metamask/detect-provider";
import axios from 'src/axios';
import { useQuasar } from 'quasar'
import LoginModal from 'src/components/LoginModal.vue';
import { useStore } from 'src/store';

export default defineComponent({
  name: 'MainLayout',

  components: {
  },
  mounted() {
    this.$q.iconSet.arrow.dropdown = ""
  },
  setup () {
    const $q = useQuasar()
    const isLogin = ref(false)
    const userAccountId = ref('')
    const filterUserAccountId = computed(() => {
      const length = userAccountId.value.length
      return userAccountId.value.substring(0, 4) + "..." + userAccountId.value.substring(length - 4, length)
    })
    const $store = useStore()

    const detectProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        startApp(provider);
        console.log('Detect MetaMask!');
        return true
      } else {
        console.log('Please install MetaMask!');
        return false
      }

      function startApp(provider: unknown) {
        if (provider !== window.ethereum) {
          console.error('Do you have multiple wallets installed?');
          return false
        }
      }
    }

    const openLoginModal = () => {
      $q.dialog({
        component: LoginModal,
        componentProps: {}
      }).onOk((payload) => {
        if(payload['type'] === 'metamask') {
          $store.commit('login/updateDrawerState', {'type': 'metamask'})
          ConnMetaMask()
        }
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    }

    const logoutWallet = () => {
      isLogin.value = false
      $store.commit('login/updateDrawerState', {'type': ''})
    }

    const ConnMetaMask = async () => {
      const isDetected = await detectProvider();
      if (!isDetected)
        return false;

      const ethereum = window.ethereum as MetaMaskInpageProvider;

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      // @ts-ignore
      const userId = accounts[0]
      try {
        await axios.post('api/v1/user/login', {
          userId: userId
        })
      } catch(err) {
        console.log(err)
        //triggerToast('Something went wrong', 'danger')
      }
      if(userId !== null) {
        userAccountId.value = userId
      }
      isLogin.value = true
      console.log(userId)
    }

    const init = () => {
      // language
      $store.commit('main/updateLang', {'lang': 'kr'})

      // wallet
      if($store.state.login.type === 'metamask') {
        ConnMetaMask()
      }
    }
    init()

    return {
      isLogin,
      filterUserAccountId,
      ConnMetaMask,
      openLoginModal,
      logoutWallet
    }
  }
})
</script>

<style>
  .title {
    padding: 13px 0;
    font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
    font-size: 1.75em;
    line-height: 32px;
    font-weight: 800
  }

  a {
    color:black;
    text-decoration: none;
  }

  .text-brand {
    color: #876445 !important;
  }
  .bg-brand {
    background: #a2aa33 !important;
  }
</style>
