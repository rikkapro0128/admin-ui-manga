export interface State {
  count: number
}

export default {
  namespaced: true,
  state: () => ({
    count: 1,
  }),
  mutations: {
    increment (state: State, payload: any) {
      state.count = state.count + 1;
    }
  }
}
