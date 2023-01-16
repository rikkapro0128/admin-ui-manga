import { createStore } from 'vuex'
import mangas from '@/store/mangas';

// Create a new store instance.
const store = createStore({
  modules: {
    mangas: mangas,
  },
})

export default store;
