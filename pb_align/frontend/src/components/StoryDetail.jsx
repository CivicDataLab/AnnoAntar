import React, { Component } from 'react';
import {connect} from 'react-redux';
import {auth, stories} from "../actions";

class StoryDetail extends Component {


    componentDidMount() {
        const { story_id } = this.props.match.params;
        this.props.fetchStory(story_id);
    }

    state = {
        story: {},
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



            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        story: state.storyDetail.story,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStory: (story_id) => {
            dispatch(stories.fetchStory(story_id));
        },
        logout: () => dispatch(auth.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StoryDetail);