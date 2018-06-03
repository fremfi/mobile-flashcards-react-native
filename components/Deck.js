import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DeckSize = {
    medium: {
        titleFontSize: 30,
        infoFontSize: 20
    },
    large: {
        titleFontSize: 50,
        infoFontSize: 30
    }
}

const DeckWrapper = styled.TouchableOpacity`
    align-items: center;
`;

const Title = styled.Text`
    font-size: ${({ size }) => DeckSize[size].titleFontSize};
`;

const Info = styled.Text`
    color: grey;
    font-size: ${({ size }) => DeckSize[size].infoFontSize};;
`;

const Deck = (props) => {
    const { title, totalNoOfCards, size, onDeckPress } = props;
    return (
        <DeckWrapper
            onPress={onDeckPress}
        >
            <Title size={size}>{title}</Title>
            <Info size={size}>{totalNoOfCards} cards</Info>
        </DeckWrapper>
    )
};

Deck.propTypes = {
    size: PropTypes.oneOf(['medium', 'large']),
    title: PropTypes.string.isRequired,
    totalNoOfCards: PropTypes.number.isRequired,
    onDeckPress: PropTypes.func
}

Deck.defaultProps = {
    size: 'medium',
    onDeckPress: () => {}
}

export default Deck;
