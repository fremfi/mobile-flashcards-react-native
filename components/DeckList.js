import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Deck from './Deck';

const DeckListWrapper = styled.ScrollView`
    flex: 1;
`;

const DeckList = (props) => {
    const { decks, onDeckPress } = props;
    return (
        <DeckListWrapper>
            { decks && decks.map((deck) =>
            <Deck
                key={deck.title}
                title={deck.title}
                totalNoOfCards={deck.questions.length}
                onDeckPress={() => onDeckPress(deck)}
            />)}
        </DeckListWrapper>
    )
};

DeckList.propTypes = {
    decks: PropTypes.array.isRequired,
    onDeckPress: PropTypes.func
}

DeckList.defaultProps = {
    onDeckPress: () => {}
}

export default DeckList;

