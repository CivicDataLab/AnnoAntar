import React, { Component } from 'react';
import {connect} from 'react-redux';

import {notes, auth, stories} from "../actions";



class Home extends Component {

    componentDidMount() {
        this.props.fetchStories();
    }

    state = {
        selectedStory: null,
        selectedSentence : {source:"", translation:""}
    }

    resetForm = () => {
        this.setState({selectedStory: null, selectedSentence : { source:"", translation:"" }});
    }

    changeTranslation = (text) => {
        console.log(text);
    }

    selectStoryForAlign = (id) => {
        let story = this.props.stories[id];
        console.log(story);
        this.state.selectedStory = story;
        this.props.selectStory(id).then(this.setState({...this.state, selectedSentence: this.props.sentences[0]}));
    }

    selectForEdit = (id) => {
        this.setState({...this.state, selectedSentence : this.props.sentences[id]});
        console.log(this.state.selectedSentence);
    }

    submitNote = (e) => {
        e.preventDefault();
        if (this.state.updateNoteId === null) {
            this.props.addNote(this.state.text).then(this.resetForm)
        } else {
            this.props.updateNote(this.state.updateNoteId, this.state.text).then(this.resetForm);
        }
    }

    render() {
        return (
            <div>
                <h2>Welcome to Story sentence Aligner</h2>
                <hr />
                <div style={{textAlign: "right"}}>
                    {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
                </div>
                {!this.props.sentences.length > 0 &&
                <div>
                {this.props.stories.map((story, id) => (
                    <div key={`story_${story.id}`} >
                        <br/>
                        <div className="d-flex row mx-md-n5">
                            <div className="mx-auto col bordered" style={{ width: '50%'}}>
                                <p> {story.source_text} </p>
                            </div>
                            <div className="mx-auto col bordered" style={{ width: '50%'}}>
                                <p> {story.translation_text} </p>
                            </div>
                        </div>

                        <div>
                            <button className="btn row" onClick={() => this.selectStoryForAlign(id)}>Select Story</button>
                        </div>
                        <br/>

                    </div>
                ))}
                </div>
                 }

                {this.props.sentences.length >0 &&
                    <div>
                        <div className="d-flex row mx-md-n5">
                            <div className="mx-auto col bordered" style={{ width: '50%'}}>
                                <p> {this.state.selectedStory.source_text} </p>
                            </div>
                            <div className="mx-auto col bordered" style={{ width: '50%'}}>
                                <p> {this.state.selectedStory.translation_text} </p>
                            </div>
                        </div>

                        <br/>
                        <div id = "wrapper" className="d-flex">


                            <div className="bg-light border-right" id="sidebar-wrapper">
                              <div className="list-group list-group-flush">
                                {this.props.sentences.map((sentence, id) => (
                                    <a key={`sentence_${sentence.id}`}
                                       className="list-group-item list-group-item-action bg-light"
                                       onClick={() => this.selectForEdit(id)}> {sentence.source}
                                       </a>
                                ))}

                              </div>
                            </div>


                            {this.state.selectedSentence &&
                            <div className="bg-light border-right" id="page-content-wrapper">
                                <h5>Selected Sentence</h5>
                                <span> {this.state.selectedSentence.source} </span>
                                <form >
                                    <input
                                        value={this.state.selectedSentence.translation}
                                        placeholder="Enter translation here..."
                                        onChange={(e) => this.changeTranslation({text: e.target.value})}
                                        required />
                                    <button>Discard</button>
                                    <input type="submit" value="Save Alignment" />
                                  </form>
                            </div>}
                        </div>
                        <div className="pull-right">
                            <button> Prev </button>
                            <button> Next </button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function SentenceAlignment (props)  {
    return (<div className="bg-light border-right" id="page-content-wrapper">
        <h5>Selected Sentence</h5>
        <span> {props.selectedSentence.source} </span>
        <span> {props.selectedSentence.translation} </span>
    </div>)
}

const mapStateToProps = state => {
    return {
        stories: state.stories,
        user: state.auth.user,
        sentences: state.sentences,
        selectedSentence: {source:"", translation:""},
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: () => {
            dispatch(notes.fetchNotes());
        },
        fetchStories: () => {
            dispatch(stories.fetchStories());
        },
        addNote: (text) => {
            return dispatch(notes.addNote(text));
        },
        updateNote: (id, text) => {
            return dispatch(notes.updateNote(id, text));
        },
        deleteNote: (id) => {
            dispatch(notes.deleteNote(id));
        },
        selectStory: (id) => {
            return dispatch(stories.fetchSentences(id));
        },
        logout: () => dispatch(auth.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
