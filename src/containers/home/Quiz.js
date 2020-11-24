import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Quiz extends Component {
    render() {
        const quizTopic = this.props.match.params.quiz;
        return(
            <h1>{quizTopic.toUpperCase()}</h1>
        );
    }
}

export default withRouter(Quiz);
