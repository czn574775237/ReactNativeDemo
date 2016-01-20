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
  WINDOW_WIDTH,
  SPLASH_INTERVAL
} from '../config';

import {
  KEY_APP_CURRENT_ROUTE
} from '../constants/StorageKeys';


const duration = __DEV__ ? 1000 : SPLASH_INTERVAL;
const STRORAGE_KEY = KEY_APP_CURRENT_ROUTE;

export default
class Splash extends React.Component {

  state = {
    bounceValue: new Animated.Value(1)
  };

  componentDidMount() {
    this._startAnimation();
    this._transitionToDashboard();
  }

  _transitionToDashboard() {
    setTimeout(() => {
      this.props.navigator.push({
        name: 'Dashboard'
      });
    }, duration);
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
