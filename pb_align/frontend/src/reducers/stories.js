const initialState = [];


export default function stories(state=initialState, action) {
    let storyList = state.slice();

    switch (action  .type) {

        case 'FETCH_STORIES':
            return [...state, ...action.stories];

        case 'FETCH_SENTENCES':
            console.log("sentences got");
            return [...state, ...action.sentences];

        default:
            return state;
    }
}
