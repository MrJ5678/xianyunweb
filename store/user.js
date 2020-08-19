export const state = () => ({
  // 采用接口返回的数据结构
  userInfo: {
    token: "",
    user: {}
  }
});

export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  // 清除用户数据
  cleanUserInfo(state, info) {
    state.userInfo =  {
      token: "",
      user: {}
    }
  }
};

export const actions = {
  login({ commit }, data) {
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    }).then(res => {
      if(res.status === 200 && res.data) {
        const data = res.data
        commit('setUserInfo', data)
      }
    })
  }
};
