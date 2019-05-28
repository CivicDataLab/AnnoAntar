import React, { Component } from 'react';
import {connect} from 'react-redux';
import {auth, stories} from "../actions";

class StoryDetail extends Component {


    componentDidMount() {
        const { story_id } = this.props.match.params;
        this.props.fetchStory(story_id);
        this.props.fetchSentences(story_id);
    }

    state = {
        story: {},
    }

    isAcceptState  = (state) => {
        switch(state) {
            case 'A':
              return "btn btn-success";
          case 'E':
              return "btn btn-success";
            default:
              return "btn btn-default";
          }
    }
    isRejectState  = (state) => {
        switch(state) {
            case 'R':
              return "btn btn-danger";
            default:
              return "btn btn-default";
      }
    }
    isEditedState  = (state)  => {
        switch(state) {
            case 'E':
              return "btn btn-secondary";
            case 'EnA':
              return "btn btn-secondary";
            default:
              return "btn btn-default";
      }
    }

    acceptTranslation = (id) => {
        let sentences = this.props.sentences;
        let sentence = this.props.sentences[id];
        sentence.state = 'A';

        sentences.splice(id, 1, sentence);
        this.setState(sentences: sentences);

    }
    rejectTranslation = (id) => {
        let sentences = this.props.sentences;
        let sentence = this.props.sentences[id];
        sentence.state = 'R';

        sentences.splice(id, 1, sentence);
        this.setState(sentences: sentences);

    }
    editTranslation = (id, e) => {
        let sentences = this.props.sentences;
        let sentence = this.props.sentences[id];
        sentence.state = 'EnA';
        sentence.translation = e.target.value;
        sentences.splice(id, 1, sentence);
        this.setState(sentences: sentences);

    }

    render() {
        return (
            <div>
                <h2>Story sentence Aligner</h2>
                <hr />
                <div style={{textAlign: "right"}}>
                    {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
                </div>



                <div className="d-flex row mx-md-n5">
                    <div className="mx-auto col bordered" style={{ width: '50%'}}>
                        <p> {this.props.story.source_text} </p>
                    </div>
                    <div className="mx-auto col bordered" style={{ width: '50%'}}>
                        <p> {this.props.story.translation_text} </p>
                    </div>
                </div>

                <div>
                    <table>
                        <tbody>
                            {this.props.sentences.map((sentence, id) => (
                                <tr key={`sentence_${sentence.id}`}>
                                    <td>{sentence.source}</td>
                                    <input
                                            value={sentence.translation}
                                            placeholder="Enter translation here..."
                                            onChange={(e)=>this.editTranslation(id, e)}
                                            required />
                                    <td>
                                        <div className="btn-group" role="group" aria-label="...">
                                          <div className="btn-group" role="group">
                                            <button
                                                type="button"
                                                onClick={()=>this.acceptTranslation(id)}
                                                className = {this.isAcceptState(sentence.state)}>Accept</button>
                                          </div>
                                          <div className="btn-group" role="group">
                                            <button
                                                type="button"
                                                onClick={()=>this.rejectTranslation(id)}
                                                className = {this.isRejectState(sentence.state)}>Reject</button>
                                          </div>
                                          <div className="btn-group" role="group">
                                            <button type="button"  disabled className = {this.isEditedState(sentence.state)}>Edited</button>
                                          </div>
                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        story: state.storyDetail.story,
        sentences: state.sentences,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStory: (story_id) => {
            dispatch(stories.fetchStory(story_id));
        },
        fetchSentences: (id) => {
            return dispatch(stories.fetchSentences(id));
        },
        logout: () => dispatch(auth.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StoryDetail);