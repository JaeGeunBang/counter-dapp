<template>
  <div style="background-color: #EDEDED">
    <div class="row justify-center" style="background-color: #FFF8F3">
      <div class="col-2"/>
      <div class="col-8">
        <div class="column">
          <div class="row">
            <div class="col">
              <div class="row justify-center">
                <h2>Todo List</h2>
              </div>
              <div class="row justify-center">
                <q-btn class="q-mr-lg" color="blue-5" @click="moveCreateTodoPage">Create</q-btn>
                <q-input v-model="searchText" filled type="search">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
            </div>
          </div>
          <div class="row justify-center q-mt-lg">
            <TodoList
              :todos_items="filtered_todos_items"
              @deleteTodo="deleteTodo"
            />
          </div>
          <div class="row justify-center q-mt-lg q-mb-lg">
            <q-pagination
              v-model="currentPage"
              :max="maxPage"
              direction-links
            />
          </div>
        </div>
      </div>
      <div class="col-2"/>
    </div>
  </div>
</template>

<script lang="ts">
import TodoList from "components/TodoList.vue";
import {ref, watch, computed} from "vue";
import axios from "src/axios"
import { useRouter } from 'vue-router'
import { useQuasar } from "quasar";

export default {
  components: {
    TodoList
  },
  setup() {
    const router = useRouter();
    let todos_items = ref([])
    // insert into todo (subject, checked, body, createdAt, updatedAt) values ('sell my phone', false, 'test', '2022-01-20', '2022-01-20') ;
    // insert into todo (subject, checked, body, createdAt, updatedAt) values ('sell book', false, 'test', '2022-01-20', '2022-01-20') ;
    // insert into todo (subject, checked, body, createdAt, updatedAt) values ('meet friend', true, 'test', '2022-01-20', '2022-01-20') ;
    // insert into todo (subject, checked, body, createdAt, updatedAt) values ('play the game', false, 'test', '2022-01-20', '2022-01-20') ;
    // insert into todo (subject, checked, body, createdAt, updatedAt) values ('sell 123', true, 'test', '2022-01-20', '2022-01-20') ;
    // insert into todo (subject, checked, body, createdAt, updatedAt) values ('test111', false, 'test', '2022-01-20', '2022-01-20') ;
    const filtered_todos_items = ref([])
    const currentPage = ref(1);
    const showPage = ref(5);
    const maxPage = computed(() => {
      if (todos_items.value.length < 1)
        return 1;
      return Math.ceil(todos_items.value.length / showPage.value) ;
    });
    const searchText = ref('');
    const $q = useQuasar()

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          'api/v1/todo'
        );
        todos_items.value = res.data;
        todos_items.value = todos_items.value.filter(todo => {
          const subject: string = todo['subject']
          if(subject.includes(searchText.value)) {
            return true
          }
          return false
        })
        filtered_todos_items.value = todos_items.value.slice(
          (currentPage.value * showPage.value) - showPage.value, currentPage.value * showPage.value)
      } catch (err) {
        console.log(err);
        //triggerToast('Something went wrong', 'danger')
      }
    }
    getTodos()

    const deleteTodo = async (id: number) => {
      try {
        await axios.delete(`api/v1/todo/${id}`)
        await getTodos()
        $q.notify({
          message: 'delete success',
          color: 'red'
        })
      } catch(err) {
        console.log(err) ;
      }
    }

    const moveCreateTodoPage = () => {
      router.push({
        name: 'TodoCreate'
      })
    }

    watch((currentPage), () => {
      filtered_todos_items.value = todos_items.value.slice(
        (currentPage.value * showPage.value) - showPage.value, currentPage.value * showPage.value)
    })

    let timeout: any = null;
    watch((searchText), () => {
      clearTimeout(timeout); // n,e,w 를 모두 치면 3번 db 요청이 가는데, timeout을 활용해 new만 db 요청을 할수있다.
      timeout = setTimeout(() => {
        getTodos(1);
      }, 1000)
    })

    return {
      currentPage,
      maxPage,
      filtered_todos_items,
      searchText,
      deleteTodo,
      moveCreateTodoPage
    }
  }

}
</script>

<style>

</style>
