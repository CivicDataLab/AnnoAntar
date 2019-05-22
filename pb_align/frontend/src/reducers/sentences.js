const initialState = [];


export default function sentences(state=initialState, action) {
    let storyList = state.slice();

    switch (action  .type) {

        case 'UPDATE_ALIGNMENTS':
            return [...state, ...action.sentences];

        default:
            return state;
    }
}
