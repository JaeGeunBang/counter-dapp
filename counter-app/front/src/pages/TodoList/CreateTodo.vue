<template>
  <div style="background-color: #EDEDED">
    <div class="row justify-center" style="background-color: #FFF8F3">
      <div class="col-2"/>
      <div class="col-8">
        <div class="row justify-center q-mt-lg">
          <h2>Create Todo</h2>
        </div>
        <div class="row justify-start q-mt-lg">
          <div class="col"/>
          <div class="col-10">
            <div class="row q-mt-lg">
              <q-input
                filled
                v-model="subject"
                label="Subject"
              />
            </div>
            <div class="row q-mt-lg" style="max-width: 1000px">
              <q-input
                filled
                v-model="body"
                label="body"
                type="textarea"
                style="width: 1000px"
              />
            </div>
            <div class="row q-mt-lg q-mb-xl">
              <q-btn color="blue-5" @click="CreateTodo()">Create</q-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2"/>
    </div>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";
import { useQuasar } from 'quasar'
import axios from "src/axios";
import { useRouter } from 'vue-router'

export default {
  setup() {
    const $q = useQuasar()
    const router = useRouter();
    const subject = ref('')
    const body = ref('')

    const CreateTodo = () => {
      $q.dialog({
        title: 'Confirm',
        message: '생성하시겠어요?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await axios.post('api/v1/todo/register', {
            subject: subject.value,
            body: body.value,
          })
          $q.notify({
            message: 'create success',
            color: 'secondary'
          })
          await router.push({
            path: 'todolist'
          })
        } catch(err) {
          console.log(err) ;
        }
      })
    }

    return {
      subject,
      body,
      CreateTodo
    }
  }
}
</script>

<style>

</style>
