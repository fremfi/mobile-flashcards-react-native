import React from 'react';
import styled from 'styled-components';

const QuizWrapper = styled.View`
    flex: 1;
`;

const Progress = styled.Text`
    flex: 1;
    font-size: 20;
    padding: 10px;
`;

const Card = styled.View`
    flex: 10;
    align-items: center;
`;

const CardText = styled.Text`
    padding: 20px;
    padding-top: 100px;
    font-size: 40;
    text-align: center;
`;

const FlipCardLink = styled.TouchableWithoutFeedback`
    align-items: center;
    margin-bottom: 50px;
    height: 50;
`;

const FlipCardText = styled.Text`
    font-size: 25;
    color: #BE2C0C;
`;

const QuizActions = styled.View`
    flex: 5;
    align-items: center;
`;

const CorrectBtn = styled.TouchableOpacity`
    margin: 5px;
    height: 50;
    width: 150;
    background-color: green;
    border-radius: 2;
    border: 1px solid green;
    align-items: center;
    justify-content: center;
`;

const CorrectBtnText = styled.Text`
    font-size: 20px;
    color: white;
`;

const IncorrectBtn = CorrectBtn.extend`
    background-color: #BE2C0C;
    border: 1px solid #BE2C0C;
`;

const IncorrectBtnText = CorrectBtnText.extend`
    color: white;
`;

const RestartQuizBtn = CorrectBtn.extend`
    background-color: black;
    border: 1px solid black
`;

const RestartQuizBtnText = CorrectBtnText;

const BackToDeckBtn = RestartQuizBtn;

const BackToDeckBtnText = CorrectBtnText;

const ResultsView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const ResultsText = styled.Text`
    font-size: 30;
`;

const Results = styled.Text`
    font-size: 60;
`

class Quiz extends React.Component {
    state = {
        currentIndex: 0,
        showAnswer: false,
        noOfCorrectAnswers: 0
    }

    onCorrectPress = () => {
        this.setState({
            noOfCorrectAnswers: this.state.noOfCorrectAnswers + 1
        });
        this.goToNextQuestion();
    }

    goToNextQuestion = () => {
        this.setState({
            currentIndex: this.state.currentIndex + 1,
            showAnswer: false
        });
    }

    onBackToDeckPress = (deck) => {
        this.props.navigation.navigate('Deck', { deck });
    }

    onRestartQuiz = () => {
        this.setState({
            currentIndex: 0,
            showAnswer: false,
            noOfCorrectAnswers: 0
        });
    }

    render() {
        const { deck } = this.props.navigation.state.params;
        const { showAnswer, currentIndex, noOfCorrectAnswers } = this.state;
        const questionObject = deck.questions[currentIndex];
        const question = questionObject ? questionObject.question : undefined;
        const answer = questionObject ? questionObject.answer : undefined;     
        return (
            question ? 
            <QuizWrapper>
                <Progress>{currentIndex + 1}/{deck.questions.length}</Progress>
                <Card>
                        <CardText>{ showAnswer ? answer : question }</CardText>
                    <FlipCardLink
                        onPress={() => this.setState({ showAnswer: !this.state.showAnswer })}
                    >
                        <FlipCardText>{ showAnswer ? 'Question' : 'Answer' }</FlipCardText>
                    </FlipCardLink>
                </Card>
                <QuizActions>
                    <CorrectBtn
                        onPress={this.onCorrectPress}
                    >
                        <CorrectBtnText>Correct</CorrectBtnText>
                    </CorrectBtn>
                    <IncorrectBtn
                        onPress={this.goToNextQuestion}
                    >
                        <IncorrectBtnText>Incorrect</IncorrectBtnText>
                    </IncorrectBtn>
                </QuizActions>
            </QuizWrapper> :
            <ResultsView>
                <ResultsText>Your score is:</ResultsText>
                <Results>{(noOfCorrectAnswers/deck.questions.length)*100}%</Results>
                <RestartQuizBtn
                    onPress={this.onRestartQuiz}                
                >
                    <RestartQuizBtnText>Restart Quiz</RestartQuizBtnText>
                </RestartQuizBtn>
                <BackToDeckBtn
                    onPress={() => this.onBackToDeckPress(deck)}
                >
                    <BackToDeckBtnText>Back To Deck</BackToDeckBtnText>
                </BackToDeckBtn>
            </ResultsView>
        )
    }
}

export default Quiz;