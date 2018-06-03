import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import DeckList from '../components/DeckList';

const Wrapper = styled.View`
  flex: 1;
  padding: 50px;
`;

const ActivityIndicatorWrapper = styled.ActivityIndicator`
    flex: 1;
`;

const NoDecksNotification = styled.Text`
    font-size: 20;
    justify-content: center;
    align-items: center;
`;

class Decks extends React.Component {
    getDecks = () => {
        return Object.keys(this.props.screenProps.flashcards).map((deckTitle) =>
            this.props.screenProps.flashcards[deckTitle]);
    }
 
    onDeckPress = (deck) => {
        this.props.navigation.navigate('Deck', { deck });
    }
    render() {
        const { flashcards } = this.props.screenProps;
        return (
            <Wrapper>
                { this.getDecks().length > 0 ? 
                <DeckList onDeckPress={this.onDeckPress} decks={this.getDecks()} /> :
                <NoDecksNotification> No decks have been created</NoDecksNotification>}
            </Wrapper> 
        );
    }
};

export default Decks;