import { createStore } from 'vuex'
import mangas from '@/store/mangas';
import chapters from '@/store/chapters';

// Create a new store instance.
const store = createStore({
  modules: {
    mangas: mangas,
    chapters: chapters,
  },
})

export default store;
