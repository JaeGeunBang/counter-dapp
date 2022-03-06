import { MutationTree } from 'vuex';
import { loginInterface } from './state';

const mutation: MutationTree<loginInterface> = {
  updateDrawerState (state, payload) {
    state.type = payload.type
  }
};

export default mutation;
