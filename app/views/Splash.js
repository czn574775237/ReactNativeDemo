import React from 'react-native';

let {
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  Animated
} = React;

import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH
} from '../config';


const duration = 3000;
const STRORAGE_KEY = '@App:currentRoute';

export default
class Splash extends React.Component {

  state = {
    bounceValue: new Animated.Value(1)
  };

  componentDidMount() {
    this._loadInitialState();
    this._startAnimation();

  }

  async _loadInitialState() {
    try {
      var currentRoute = await AsyncStorage.getItem(STRORAGE_KEY);
      currentRoute = JSON.parse(currentRoute);
      setTimeout(() => {
        if (currentRoute && currentRoute.name !== 'Splash') {
          this.props.navigator.replace(currentRoute);
        } else {
          currentRoute = { name: 'Dashboard' };
          this.props.navigator.replace(currentRoute);
        }
      }, duration);
    } catch (error) {
      console.log(error);
    }
  }

  _startAnimation() {
    this.state.bounceValue.setValue(0);
    Animated.timing(
      this.state.bounceValue,
      {
        toValue: 1,
        duration
      }
    ).start();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.Image
          source={require('image!splash_bg')}
          style={{
            height: WINDOW_HEIGHT,
            width: WINDOW_WIDTH,
            transform: [
              {
                scale: this.state.bounceValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.25]
                }),
              },
            ],
            // opacity: this.state.bounceValue
            // opacity: this.state.bounceValue.interpolate({
            //   inputRange: [0, 1],
            //   outputRange: [1, 0.5]
            // })
          }}
        />
      </View>
    );
  }
}
