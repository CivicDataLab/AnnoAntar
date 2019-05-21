import React, { Component } from 'react';
import {connect} from 'react-redux';

import {notes, auth} from "../actions";



class Home extends Component {

    componentDidMount() {
        this.props.fetchNotes();
    }

    state = {
        text: "",
        updateNoteId: null,
    }

    resetForm = () => {
        this.setState({text: "", updateNoteId: null});
    }

    selectForEdit = (id) => {
        let note = this.props.notes[id];
        this.setState({text: note.text, updateNoteId: id});
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
                <div id = "wrapper" className="d-flex">
                    <div className="bg-light border-right" id="sidebar-wrapper">
                      <div className="list-group list-group-flush">
                        {this.props.notes.map((note, id) => (
                            <a key={`note_${note.id}`} className="list-group-item list-group-item-action bg-light" onClick={() => this.selectForEdit(id)}>{note.text}</a>
                        ))}
                        
                      </div>
                    </div>

                    <div className="bg-light border-right" id="page-content-wrapper">
                        <h3>Add sentence</h3>
                        <form onSubmit={this.submitNote}>
                            <input
                                value={this.state.text}
                                placeholder="Enter source sentence here..."
                                onChange={(e) => this.setState({text: e.target.value})}
                                required />
                            <button onClick={this.resetForm}>Reset</button>
                            <input type="submit" value="Save sentence" />
                        </form>

                        <h3>Selected Sentence</h3>
                        <table>
                            <tbody>
                                {this.props.notes.map((note, id) => (
                                    <tr key={`note_${note.id}`}>
                                        <td>{note.text}</td>
                                        <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
                                        <td><button onClick={() => this.props.deleteNote(id)}>delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            <span> {this.state.text} </span>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        notes: state.notes,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: () => {
            dispatch(notes.fetchNotes());
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
        logout: () => dispatch(auth.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
