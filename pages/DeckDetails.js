import React from 'react';
import styled from 'styled-components';
import Deck from '../components/Deck';
import { setLocalNotification, clearLocalNotification } from '../helpers';

const Wrapper = styled.View`
    flex: 1;
    padding-top: 100px;
    align-items: center;
`;

const DeckInformation = styled.View`
    flex: 1;
`;

const DeckActions = styled.View`
    flex: 1;
`;

const AddCardBtn = styled.TouchableHighlight`
    margin: 5px;
    height: 50;
    width: 150;
    border-radius: 2;
    border: 1px solid black;
    align-items: center;
    justify-content: center;
`;

const AddCardBtnText = styled.Text`
    font-size: 20px;
`;

const StartQuizBtn = AddCardBtn.extend`
    background-color: black;
`;

const StartQuizBtnText = AddCardBtnText.extend`
    color: white;
`;

class DeckDetails extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;
        const { title } = deck; 
        return {
            title
        }
    }

    onAddCard = () => {
        const { deck } = this.props.navigation.state.params;
        this.props.navigation.navigate('AddCard', { deck });
    }

    onStartQuiz = () => {
        clearLocalNotification().then(setLocalNotification());
        const { deck } = this.props.navigation.state.params;
        this.props.navigation.navigate('Quiz', { deck });
    }

    render() {
        const { deck } = this.props.navigation.state.params;
        const { title } = deck;
        return (
            <Wrapper>
                <DeckInformation>
                    <Deck size="large" title={title} totalNoOfCards={deck.questions.length} />
                </DeckInformation>
                <DeckActions>
                    <AddCardBtn
                        onPress={this.onAddCard}
                    >
                        <AddCardBtnText>Add Card</AddCardBtnText>
                    </AddCardBtn>
                    <StartQuizBtn
                        onPress={this.onStartQuiz}
                    >
                        <StartQuizBtnText>Start Quiz</StartQuizBtnText>
                    </StartQuizBtn>
                </DeckActions>
            </Wrapper>
        );
    }
};

export default DeckDetails;

