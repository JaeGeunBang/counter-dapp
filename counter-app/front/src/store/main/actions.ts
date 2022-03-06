import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { mainInterface } from './state';

const actions: ActionTree<mainInterface, StateInterface> = {
  // updateDrawerState ( context, isOpen) {
  //   context.commit('updateDrawerState', {
  //     isOpen: isOpen
  //   })
  // }
};

export default actions;
