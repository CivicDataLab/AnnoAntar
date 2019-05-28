import { combineReducers } from 'redux';
import notes from "./notes";
import stories from "./stories";
import storyDetail from "./storyDetail";
import auth from "./auth";
import sentences from "./sentences";


const ponyApp = combineReducers({
    auth, stories, sentences, storyDetail
})

export default ponyApp;
