import { createStore } from "redux";

const redu = (state = { sign: false, email: '', course: '',assignment:'' }, action) => {
    if (action.type === 'add') {
        return { email: action.payload, sign: true }
    }
    if (action.type === 'course') {
        return { ...state, course: action.payload, sign: true }
    }
    if (action.type == 'signout') {
        return { sign: false, email: '', course: '' }
    }

    if (action.type==='Sassignment'){
        console.log(action.payload)
        return{...state,assignment:action.payload}
    }
    return state;
}

let store = createStore(redu);
export default store;