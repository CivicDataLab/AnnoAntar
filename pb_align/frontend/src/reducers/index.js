import { combineReducers } from 'redux';
import notes from "./notes";
import stories from "./stories";
import auth from "./auth";
import sentences from "./sentences";


const ponyApp = combineReducers({
    notes, auth, stories, sentences
})

export default ponyApp;
