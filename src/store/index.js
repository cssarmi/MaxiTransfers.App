import Vuex from 'vuex'
import general from "@/store/general/index";

const store = new Vuex.Store({
    modules: {
        general
    }
})

export default store;
