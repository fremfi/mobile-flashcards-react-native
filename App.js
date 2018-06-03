import React from 'react';
import { AsyncStorage } from 'react-native';
import styled from 'styled-components';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Decks from './pages/Decks';
import NewDeck from './pages/NewDeck';
import DeckDetails from './pages/DeckDetails';
import AddCard from './pages/AddCard';
import Quiz from './pages/Quiz';
import { setLocalNotification } from './helpers';

const HomeTabs = createBottomTabNavigator({
  Decks,
  NewDeck,
});

const MainNavigator = createStackNavigator({
  Decks: {
    screen: HomeTabs
  },
  Deck: {
    screen: DeckDetails  
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
});

export default class App extends React.Component {
  state = {
    flashcards: {}
  }

  componentDidMount() {
      this.loadFlashCards();
      setLocalNotification();
  }

  loadFlashCards = async () => {
      const value = await AsyncStorage.getItem('flashcards');
      if (value !== null){
        this.setState({
            flashcards: JSON.parse(value)
        });
      }
  }

  saveFlashCards = async (flashcards) => {
    AsyncStorage.setItem('flashcards', JSON.stringify(flashcards));
  }

  addDeck = (deck) => {
      const flashcards = Object.assign(this.state.flashcards, {
          [deck.title]: deck
      });
      this.saveFlashCards(flashcards).then(() => this.setState({ flashcards }));
  }

  addCard = (deck) => {
    const flashcards = {
      ...this.state.flashcards,
      [deck.title]: deck
    };
    this.saveFlashCards(flashcards).then(() => this.setState({ flashcards }));
  }
  
  render() {
    return (
        <MainNavigator screenProps={{ 
          flashcards: this.state.flashcards,
          addDeck: this.addDeck,
          addCard: this.addCard
        }} />
    );
  }
}

console.disableYellowBox = true;