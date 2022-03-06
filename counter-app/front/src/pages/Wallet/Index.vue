<template>
  <div style="background-color: #EDEDED">
    <div class="row justify-center" style="background-color: #FFF8F3">
      <div class="col-2"/>
      <div class="col-8">
        <div>
          <h3>이더리움 지갑</h3>
          <q-btn color="red-5" @click="CreateWallet()" class="q-mr-lg">Create</q-btn>
          <q-btn color="red-5" @click="RecoveryWallet()">Recovery</q-btn>
          <q-input filled v-model="password" label="패스워드" class="q-mt-lg q-mb-lg" type="password"/>
          <q-input filled v-model="Mnemonic" label="니모닉" class="q-mb-lg q-mt-lg"/>
          <br/>
          public key: {{ publicKey }}
          <br/>
          암호화된 private key: {{ enPrivateKey }}
        </div>
        <div>
          <h3>잔액</h3>
          <q-btn color="red-5" @click="getBalance()">잔액조회</q-btn>
          <h6> Eth: {{ balance }}</h6>
        </div>
        <div>
          <h3>거래</h3>
          <q-input filled v-model="publicKey" label="송신처" class="q-mb-lg"/>
          <q-input filled v-model="toAccount" label="수신처" class="q-mb-lg"/>
          <q-input filled v-model="sendValue" label="코인" class="q-mb-lg"/>
          <q-btn color="red-5" @click="transformCoin()">송신하기</q-btn>
        </div>
      </div>
      <div class="col-2"/>
    </div>

  </div>
</template>

<script lang="ts">

import Web3 from "web3";
import {ref, reactive, computed} from "vue";
import { useQuasar } from 'quasar'
import {ethers} from "ethers";

export default {
  setup() {
    const $q = useQuasar()
    const web3 = new Web3('https://ropsten.infura.io/v3/3c52917848e945229c0d33d632b10490');
    const balance = ref('0')
    const publicKey = ref('')
    const enPrivateKey = ref('')
    interface enObjectType {
      [key: string]: any
    }
    let enObject = reactive(<enObjectType>{})
    const sendValue = ref('0')
    const toAccount = ref('0xEAF9b035c5a6A3D7369e58E82b03AdCe50f68064')
    const password = ref('wirmsdl710')
    const Mnemonic = ref('organ uphold illegal peace ethics emerge release super library test inform spray')

    const CreateWallet = () => {
      const account = web3.eth.accounts.create();
      publicKey.value = account.address;
      enPrivateKey.value = getEncryptObjectFromKey(account.privateKey, password.value)['crypto']['ciphertext']
      $q.notify({
        message: 'account 생성 완료',
        color: 'secondary'
      })
    }

    const RecoveryWallet = () => {
      const wallet = ethers.Wallet.fromMnemonic(Mnemonic.value)
      publicKey.value = wallet.address;
      enObject = getEncryptObjectFromKey(wallet.privateKey, password.value)
      enPrivateKey.value = enObject['crypto']['ciphertext']
      //console.log(getDecryptKeyFromObject(enObject, password.value));
      $q.notify({
        message: 'account 복구 완료',
        color: 'secondary'
      })
    }

    const getEncryptObjectFromKey = (privateKey: string, password: string) => {
      return web3.eth.accounts.encrypt(privateKey, password)
    }

    const getDecryptKeyFromObject = (privateKey: any, password: string) => {
      return web3.eth.accounts.decrypt(privateKey, password).privateKey
    }


    const getBalance = async () => {
      let getbalance = await web3.eth.getBalance(publicKey.value);
      balance.value = web3.utils.fromWei(getbalance, "ether")
    }

    const transformCoin = async () => {
      const privateObjectKey = getDecryptKeyFromObject(enObject, password.value)

      const nonce = await web3.eth.getTransactionCount(publicKey.value, 'latest')
      const transaction = {
        nonce: nonce,
        to: toAccount.value,
        value: web3.utils.toHex(web3.utils.toWei(sendValue.value, 'ether')),
        gasLimit: web3.utils.toHex(30000),
      }

      const signedTx = await web3.eth.accounts.signTransaction(transaction, privateObjectKey) ;
      web3.eth.sendSignedTransaction(signedTx.rawTransaction!, function(error, hash) {
        if (!error) {
          console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
        } else {
          console.log("❗Something went wrong while submitting your transaction:", error)
        }
      })
    }

    return {
      balance,
      sendValue,
      password,
      Mnemonic,
      publicKey,
      enPrivateKey,
      toAccount,
      CreateWallet,
      RecoveryWallet,
      getBalance,
      transformCoin
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
