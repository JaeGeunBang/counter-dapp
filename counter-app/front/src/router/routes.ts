import { RouteRecordRaw } from 'vue-router';
import TodoList from '../pages/TodoList/TodoList.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'todolist', name: 'TodoList', component: () => import('pages/TodoList/TodoList.vue') },
      { path: 'createTodo', name: 'TodoCreate', component: () => import('pages/TodoList/CreateTodo.vue') },
      { path: 'todolist/:id', name: 'TodoUpdate', component: () => import('pages/TodoList/UpdateTodo.vue') },
      { path: 'wallet', name: 'Wallet', component: () => import('pages/Wallet/Index.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
