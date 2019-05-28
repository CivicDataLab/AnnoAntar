const initialState = { story: {
    title : "",
    source_text: "",
    translation_text: "",
}};



export default function storyDetail(state=initialState, action) {

    switch (action  .type) {

        case 'FETCH_STORY':
            return {...state, story:action.story};

        default:
            return state;
    }
}
