import { MutationTree } from 'vuex';
import { mainInterface } from './state';

const mutation: MutationTree<mainInterface> = {
  updateLang (state, payload) {
    state.lang = payload.lang
  }
};

export default mutation;
