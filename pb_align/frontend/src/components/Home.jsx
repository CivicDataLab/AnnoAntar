import React, { Component } from 'react';
import {connect} from 'react-redux';

import {notes, auth, stories} from "../actions";



class Home extends Component {

    componentDidMount() {
        this.props.fetchStories();
    }

    state = {
        text: "",
        story: null,
        updateNoteId: null,
        isStorySelected: false,
        sentences: {},
    }

    resetForm = () => {
        this.setState({story: null, text: "", updateNoteId: null, isStorySelected: false, sentences: null});
    }

    selectForEdit = (id) => {
        let note = this.props.notes[id];
        this.setState({text: note.text, updateNoteId: id});
    }

    selectStoryForAlign = (id) => {
        let story = this.props.stories[id];
        console.log(story);
        this.state.story = story;
        this.props.selectStory(id);
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
                    <div id = "wrapper" className="d-flex">
                        <div className="bg-light border-right" id="sidebar-wrapper">
                          <div className="list-group list-group-flush">
                            {this.props.sentences.map((sentence, id) => (
                                <a key={`sentence_${sentence.id}`} className="list-group-item list-group-item-action bg-light" >{sentence.source}</a>
                            ))}

                          </div>
                        </div>

                        <div className="bg-light border-right" id="page-content-wrapper">
                            <h3>Add sentence</h3>
                            <form >
                                <input
                                    value={this.state.text}
                                    placeholder="Enter source sentence here..."

                                    required />
                                <input type="submit" value="Save sentence" />
                            </form>

                            <h3>Selected Sentence</h3>
                            <div>
                                <span> {this.state.text} </span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        notes: state.notes,
        stories: state.stories,
        user: state.auth.user,
        sentences: state.sentences,
        isStorySelected: false,
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
