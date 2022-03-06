import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { loginInterface } from './state';

const getters: GetterTree<loginInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
