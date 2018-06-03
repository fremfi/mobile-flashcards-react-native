import React from 'react';
import styled from 'styled-components';
import { KeyboardAvoidingView } from 'react-native';

const NewDeckWrapper = styled.KeyboardAvoidingView`
  flex: 1;
  padding: 50px;
  align-items: center;
`;
const QuestionText = styled.Text`
    flex: 1;
    font-size: 40;
    text-align: center;
`;

const TitleInput = styled.TextInput`
    height: 50;
    width: 250;
    padding: 10px;
    border: 1px solid black;
    border-radius: 2;
`;

const NewDeckActionsWrapper = styled.View`
    flex: 1;
    align-items: center;
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

class NewDeck extends React.Component {
    state = {
        text: ''
    }

    onDeckSubmit = () => {
        if (this.state.text === '') {
            return;
        };
        const newDeck = {
            title: this.state.text,
            questions: []
        };
        this.props.screenProps.addDeck(newDeck);
        this.setState({ text: '' });
        this.props.navigation.navigate('Deck', { deck: newDeck });
    }

    render() {
        return (
            <NewDeckWrapper behavior="padding" enabled>
                <QuestionText> What is the title of your new deck? </QuestionText>
                <NewDeckActionsWrapper>
                    <TitleInput
                        placeholder="Deck Title"
                        value={this.state.text}
                        onChangeText={(text) => this.setState({text})}
                    />
                    <SubmitBtn
                        onPress={this.onDeckSubmit}
                    >
                        <SubmitBtnText>Submit</SubmitBtnText>
                    </SubmitBtn>
                </NewDeckActionsWrapper>
            </NewDeckWrapper>
        );
    }
};

export default NewDeck;

