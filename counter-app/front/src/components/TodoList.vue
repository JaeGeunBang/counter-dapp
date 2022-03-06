<template>
  <div>
    <q-card
      v-for="item in todos_items"
      :key="item.id"
      class="my-card"
    >
      <q-card-section class="q-mb-md q-px-xl">
        <div class="row justify-between">
          <div class="col-md-auto">
            <q-checkbox disable v-model="item.checked" color="cyan" />
          </div>
          <div class="col-md-auto text-h6" @click="moveToEditPage(item.id)">
            {{ item.subject }}
          </div>
          <div class="q-ml-xl col-md-auto">
            <q-btn color="red-5" @click="DeleteDialog(item.id)">Delete</q-btn>
          </div>
        </div>

      </q-card-section>
    </q-card>

  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default {
  props: {
    todos_items: {
      type: Array,
      required: true
    }
  },
  setup(props: any, {emit}: any) {
    const $q = useQuasar()
    const router = useRouter();
    const DeleteDialog = (id: number) => {
      $q.dialog({
        title: 'Confirm',
        message: '지우시겠어요?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        emit('deleteTodo', id)
      })
    }

    const moveToEditPage = (id: number) => {
      router.push({
        name: `TodoUpdate`,
        params: {
          id: id
        }
      })
    }

    return {
      DeleteDialog,
      moveToEditPage
    }
  }
}
</script>

<style>

</style>
