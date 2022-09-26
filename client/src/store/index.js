import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedTbxIdx:null,
    toolboxes:[
      {
        id:1,
        name: "Programmer",
        description: "tools for my programming",
        isPrivate: false,
        ownerId: 1,
        tools: [
          {	
            id:1,
            name:"erd_plus",
            url: "https://erdplus.com/standalone",
            description: "a tool to draw ERDs",
            category:"diagramming",
            rating_sum: 7.5,
            rating_count: 2,
            status: "online"
          },
          {	
            id:2,
            name:"fake_email",
            url: "https://fake_email.com",
            description: "a tool to generate fake temporary mailboxes",
            category:"email",
            rating_sum: 9.5,
            rating_count: 2,
            status: "unknown"
          }
        ]
      },
      {
        id:2,
        name: "Designer",
        description: "tools for my designing",
        isPrivate: false,
        ownerId: 1,
        tools: [
          {	
            id:3,
            name:"brush",
            url: "https://brush.com",
            description: "a tool for free drawing",
            category:"design",
            rating_sum: 4.5,
            rating_count: 3,
            status: "down"
          }
        ],
      }
    ]
  },
  getters:{
    getToolboxes:function (state) {
      return state.toolboxes;
    },
    getSelectedToolboxIdx:function (state) {
      return state.selectedTbxIdx
    },
    getSelectedToolbox:function (state) {
      if(state.selectedTbxIdx > -1){
        return state.toolboxes[state.selectedTbxIdx]
      }
      return null
    },
    getTools: function(state) {
      return state.toolboxes.flatMap(tbx=>tbx.tools);      
    }
    
  },
  mutations: {
    updateSelectedToolbox:function (state, index) {
      state.selectedTbxIdx = index
    }
  },
  actions: {
  },
  modules: {
  }
})
