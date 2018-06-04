import React from 'react';
import styled from 'styled-components';
import { KeyboardAvoidingView } from 'react-native';

const AddCardWrapper = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const SubmitBtn = styled.TouchableHighlight`
    margin: 20px;
    height: 50;
    width: 150;
    border-radius: 2;
    border: 1px solid black;
    align-items: center;
    justify-content: center;
    background-color: black;
`;

const SubmitBtnText = styled.Text`
    font-size: 20px;
    color: white;
`;

const Input = styled.TextInput`
    height: 50;
    margin: 20px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 2;
    align-self: stretch;
`;

class AddCard extends React.Component {
    state = {
        question: '',
        answer: ''
    }

    onAddCard = () => {
        const { answer, question } = this.state;
        if (!question || !answer) { 
            alert("please, fill the form");
            return;
        };
        const { deck } = this.props.navigation.state.params;
        deck.questions = deck.questions.concat(this.state);
        this.props.screenProps.addCard(deck);
        this.props.navigation.navigate('Deck', { deck });
    }

    render() {
        return (
            <AddCardWrapper behavior="padding" enabled>
                <Input
                    placeholder="Question"
                    value={this.state.question}
                    onChangeText={(text) => this.setState({ question: text })}
                />
                <Input
                    placeholder="Answer"
                    value={this.state.answer}
                    onChangeText={(text) => this.setState({ answer: text })}
                />
                <SubmitBtn
                    onPress={this.onAddCard}
                >
                    <SubmitBtnText>Submit</SubmitBtnText>
                </SubmitBtn>
            </AddCardWrapper>
        );
    }
};

export default AddCard;