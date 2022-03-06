<template>
  <div style="background-color: #EDEDED">
    <div class="row justify-center" style="background-color: #FFF8F3">
      <div class="col-2"/>
      <div class="col-8">
        <div class="row justify-center q-mt-lg">
          <h2>Update Todo</h2>
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
            <div class="row q-mt-lg">
              <q-checkbox
                v-model="checked"
                color="cyan"
                label="Checked"
              />
            </div>
            <div class="row q-mt-lg q-mb-xl">
              <q-btn color="blue-5" @click="UpdateTodo()">Update</q-btn>
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
import { useRoute, useRouter } from 'vue-router'

export default {

  setup() {
    const $q = useQuasar()
    const router = useRouter();
    const subject = ref('')
    const body = ref('')
    const checked = ref(false)
    const route = useRoute();
    const todoId = route.params.id

    const getTodo = async () => {
      try {
        const res = await axios.get(`api/v1/todo/${todoId}`)
        subject.value = res.data.subject;
        body.value = res.data.body ;
        checked.value = res.data.checked;
      } catch(err) {
        console.log(err) ;
      }
    }
    getTodo();

    const UpdateTodo = () => {
      $q.dialog({
        title: 'Confirm',
        message: '수정하시겠어요?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await axios.patch(`api/v1/todo/${todoId}`, {
            subject: subject.value,
            body: body.value,
            checked: checked.value
          })
          $q.notify({
            message: 'update success',
            color: 'secondary'
          })
          await router.push({
            name: 'TodoList'
          })
        } catch(err) {
          console.log(err) ;
        }
      })
    }

    return {
      subject,
      body,
      checked,
      UpdateTodo
    }
  }
}
</script>

<style>

</style>
