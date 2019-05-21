import { combineReducers } from 'redux';
import notes from "./notes";
import stories from "./stories";
import auth from "./auth";


const ponyApp = combineReducers({
    notes, auth, stories
})

export default ponyApp;
