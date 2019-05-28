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
              return "btn btn_green";
          case 'E':
              return "btn btn_green";
            default:
              return "btn";
          }
    }
    isRejectState  = (state) => {
        switch(state) {
            case 'R':
              return "btn btn_red";
            default:
              return "btn";
      }
    }
    isEditedState  = (state)  => {
        switch(state) {
            case 'E':
              return "btn btn_grey";
            default:
              return "btn";
      }
    }

    render() {
        console.log(this.props);
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
                                            required />
                                    <td>
                                        <button className = {this.isAcceptState(sentence.state)}>Accept</button> &nbsp;
                                        <button className = {this.isRejectState(sentence.state)}>Reject</button> &nbsp;
                                        <button className = {this.isEditedState(sentence.state)}>Edited</button> &nbsp;
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