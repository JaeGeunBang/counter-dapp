<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="col justify-center">
        <div class="row justify-center q-pt-lg q-mb-lg">
          Conn Wallet
        </div>
        <div class="row q-mb-lg justify-center">
          <q-btn icon="img:icons/Metamask.png" color="white" text-color="black" label="MetaMask" @click="onConnMetaMask" />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar'

export default {
  props: {
  },
  emits: [
    ...useDialogPluginComponent.emits,
  ],

  setup () {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel  } = useDialogPluginComponent()

    const onConnMetaMask = () => {
      onDialogOK({"type":"metamask"})
    }

    return {
      dialogRef,
      onDialogHide,
      onConnMetaMask,
      onOKClick () {
        onDialogOK({"type":"ok"})
      },
      onCancelClick: onDialogCancel
    }
  }
}
</script>
