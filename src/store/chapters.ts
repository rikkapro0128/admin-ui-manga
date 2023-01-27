import { ActionContext } from 'vuex';
import { config } from '@/env/index';

enum SortType {
  ascending = 'asc',
  descending = 'desc',
}

interface PayloadIDManga {
  id: string,
}

interface PayloadChapters {
  payload: Array<Chapter>,
  count: number
}

export interface Chapter {
  id: string,
  idManga: string,
  number: number,
  desc: string,
  name: string,
  images: Array<Image>,
  createdAt: string,
  updatedAt: string,
}

export interface Image {
  size: number,
  filepath: string,
  newFilename: string,
  mimetype: string,
  mtime: string,
  length: string,
  originalFilename: string,
}

export interface Chapters {
  value: [] | Array<Chapter>,
  count: number,
  option: {
    limit: number,
    skip: number,
    sort: SortType,
  }
}
const chapters = {
  value: [],
  count: 0,
  option: {
    limit: 10,
    skip: 1,
    sort: SortType.ascending,
  }
}

export interface MangaManage {
  [key: string]: Chapters,
}

interface AppendChapter {
  id: string,
  chapters: Array<Chapter>,
}
interface CountChapter {
  id: string,
  count: number,
}
interface LimitChapter {
  id: string,
}

const mangas: MangaManage = {};

export default {
  namespaced: true,
  state: mangas,
  mutations: {
    initChapterByMangaId(state: MangaManage, payload: PayloadIDManga) {
      state[payload.id] = {
        value: [],
        count: 0,
        option: {
          limit: 10,
          skip: 1,
          sort: SortType.ascending,
        }
      };
    },
    appendChapters(state: MangaManage, payload: AppendChapter) {
      state[payload.id].value = [...state[payload.id].value, ...payload.chapters]
    },
    setCount(state: MangaManage, payload: CountChapter) {
      state[payload.id].count = state[payload.id].count !== payload.count ? payload.count : state[payload.id].count;
    },
    increaseDoubleSkip(state: MangaManage, payload: PayloadIDManga) {
      state[payload.id].option.skip = state[payload.id].option.limit + state[payload.id].option.skip;
    },
  },
  actions: {
    async APIGetChapters({ commit, state, getters }: ActionContext<MangaManage, any>, payload: PayloadIDManga) {

      if (payload.id) {
        if (!(payload.id in state)) {
          commit('initChapterByMangaId', payload);
        }
        const res = await fetch(`${config.development.baseUrl}/v1/get/list-chapter/${payload.id}?skip=${state[payload.id].option.skip === 1 ? state[payload.id].option.skip : state[payload.id].option.skip + 1}&limit=${state[payload.id].option.limit}&sort=${state[payload.id].option.sort}`);
        const { payload: chapters, count }: PayloadChapters = await res.json();
        if (chapters.length) {
          commit('appendChapters', { ...payload, chapters });
          commit('increaseDoubleSkip', payload);
        }
        if (count !== state[payload.id].count) {
          commit('setCount', { ...payload, count });
        }
        return true;
      } else {
        return false;
      }
    },
  },
  getters: {
    temp(state: MangaManage) {
    }
  }
}
