<template>
  <div style="background-color: #EDEDED">
    <q-page class="column">
      <div class="row justify-center" style="background-color: #FFF8F3">
        <div class="col-2"/>
        <div class="col-8">
          <div class="row" style="height: 550px">
            <div class="col" style="text-align: center; margin-top: auto; margin-bottom: auto;">
              <img class="q-ml-lg" style="opacity: 0.7; max-width: 70%; height: auto; width: auto" :src="require('assets/main1.png')">
            </div>
            <div class="col" style="text-align: center; margin-top: auto; margin-bottom: auto;">
              <p style="text-align:right">
                <p class="text-brown-8" style="font-size: 55px; font-family: 'Nanum Gothic', sans-serif;">
                  <strong>잠자는 코인 돈이 되다!</strong>
                </p>
                <p style="font-size: 20px">
                  거래소에서 잠자고 있는 내코인 <br/>
                  <strong>예치하면 24시간 365일 이자 수익</strong>
                </p>
                <p>
                  <q-btn class="q-pa-md" color="purple-5">
                    <p style="font-family: 'Nanum Gothic', sans-serif; font-size: 18px; text-align: center; margin-top: auto; margin-bottom: auto;">
                      예치/대출하러 가기
                    </p>
                  </q-btn>
                </p>
              </p>
            </div>
          </div>
        </div>
        <div class="col-2"/>
      </div>
      <div class="row justify-center" style="background-color: #FFCBCB">
        <div class="col-2"/>
        <div class="col-8">
          <div class="row" style="height: 550px">
            <div class="col" style="text-align: center; margin-top: auto; margin-bottom: auto;">
              <p style="text-align:left">
                <p style="font-size: 20px">
                  거래소 지갑에 <br/>
                  <strong>일년 내내 묵혀둔다고</strong>
                </p>
                <p class="text-brown-10" style="font-size: 45px; font-family: 'Nanum Gothic', sans-serif;">
                  <strong>단,1원도 나오지 않습니다!</strong>
                </p>
                <p>
                  <q-btn class="q-pa-md" color="secondary">
                    <p style="font-family: 'Nanum Gothic', sans-serif; font-size: 18px; text-align: center; margin-top: auto; margin-bottom: auto;">
                      자세히 보기
                    </p>
                  </q-btn>
                </p>
              </p>
            </div>
            <div class="col" style="text-align: center; margin-top: auto; margin-bottom: auto;">
              <img style="opacity: 0.7; max-width: 100%; height: auto; width: auto" :src="require('assets/main2.png')">
            </div>
          </div>
        </div>
        <div class="col-2"/>
      </div>
    </q-page>
  </div>
</template>

<script lang="ts">
import detectEthereumProvider from "@metamask/detect-provider";

export default {
  setup() {
    const detectProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        startApp(provider);
        console.log('Detect MetaMask!');
      } else {
        console.log('Please install MetaMask!');
      }

      function startApp(provider: unknown) {
        if (provider !== window.ethereum) {
          console.error('Do you have multiple wallets installed?');
        }
      }
    }

    return {

    }
  }
}
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@700&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Nanum+Gothic:wght@700&display=swap')
.row > div
  padding: 10px 15px
  //background: rgba(86,61,124,.15)
  //border: 1px solid rgba(86,61,124,.2)
</style>
