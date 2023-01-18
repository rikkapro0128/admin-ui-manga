import { ActionContext } from 'vuex';
import { config } from '@/env/index';
import { parserMangaToTable } from '@/untils/index';

export interface State {
  value: Array<any>,
  count: number,
  option: {
    limit: number,
    skip: number,
    sort: SortType,
  }
}

interface RemoveManga {
  id: string;
}

enum SortType {
  ascending = 'asc',
  descending = 'desc',
}

export default {
  namespaced: true,
  state: () => ({
    value: [],
    count: 0,
    option: {
      limit: 5,
      skip: 1,
      sort: SortType.ascending,
    }
  }),
  mutations: {
    concatManga(state: State, payload: any) {
      state.value = payload;
    },
    clearManga(state: State) {
      state.value = [];
    },
    changeOption(state: State, payload: any) {
      state.option = { ...state.option, ...payload };
    },
    setCountManga(state: State, payload: any) {
      state.count = payload;
    },
  },
  actions: {
    async getMangas({ commit, state, getters }: ActionContext<State, any>) {
      const res = await fetch(`${config.development.baseUrl}/v1/get/mangas?skip=${state.option.skip === 1 ? state.option.skip : state.option.skip + 1}&limit=${state.option.limit}&sort=${state.option.sort}`);
      const data = await res.json();
      const newManga = parserMangaToTable(data.payload);
      commit('setCountManga', data.count);
      commit('concatManga', newManga);
      return getters.getViewManga;
    },
    async removeManga({ commit, dispatch }: ActionContext<State, any>, payload: RemoveManga) {
      try {
        const res = await fetch(`${config.development.baseUrl}/v1/remove/manga/${payload.id}`, { method: 'DELETE' });
        const data = await res.json();
        await dispatch('getMangas');
        if(data.message === 'remove successfully.') {
          return true;
        }else {
          return false;
        }
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
    clearManga({ commit }: ActionContext<State, any>) {
      commit('clearManga');
    },
    async changeOption({ commit }: ActionContext<State, any>, payload: any) {
      commit('changeOption', payload);
    },
  },
  getters: {
    getViewManga(state: State) {
      return state.value;
    }
  }
}
