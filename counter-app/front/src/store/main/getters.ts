import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { mainInterface } from './state';

const getters: GetterTree<mainInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
