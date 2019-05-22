const initialState = [];


export default function stories(state=initialState, action) {
    let storyList = state.slice();

    switch (action  .type) {

        case 'FETCH_STORIES':
            return [...state, ...action.stories];

        default:
            return state;
    }
}
