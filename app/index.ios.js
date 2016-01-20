import React from 'react-native';
import routes from './routes';
import store from './store';
import {
  KEY_APP_CURRENT_ROUTE
} from './constants/StorageKeys';

var WINDOW_WIDTH = require('Dimensions').get('window').width;

var {
  StyleSheet,
  View,
  AsyncStorage,
  Navigator,
} = React;


const STRORAGE_KEY = KEY_APP_CURRENT_ROUTE;

var BaseConfig = Navigator.SceneConfigs.FloatFromRight;
// var BaseConfig = Navigator.SceneConfigs.FadeAndroid;

// var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
//   snapVelocity: 8,
//   edgeHitWidth: WINDOW_WIDTH
// });
var CustomLeftToRightGesture = Object.assign({}, {
  snapVelocity: 8,
  edgeHitWidth: WINDOW_WIDTH
});

var FadeSceneConfig = Object.assign({}, Navigator.SceneConfigs.FadeAndroid, {

});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
  springTension: 10,
  springFriction: 1,
  gestures: {
    pop: CustomLeftToRightGesture
  }
});

class App extends React.Component {

  state = {
    currentRoute: null
  };

  render() {

    return (
      <Navigator
        ref={this._setNavigatorRef.bind(this)}
        style={styles.container}
        initialRoute={{
          name: 'Splash',
        }}
        renderScene={this._renderScene.bind(this)}
        configureScene={this._configureScene.bind(this)}
      />
    );
  }

  _renderScene(route, navigator) {
    var Component = routes[route.name];
    if (!Component) {
      throw new Error('No route name map');
    }

    return <Component navigator={navigator} {...route} />
  }

  _configureScene(route) {
    switch (route.name) {
      case 'Splash':
      case 'Dashboard':
        return FadeSceneConfig;

      default:
        return CustomSceneConfig;
    }

  }

  _setNavigatorRef(navigator) {
    if (navigator !== this._navigator) {
      this._navigator = navigator;
      if (navigator) {
        let callback = (event) => {
          // if (__DEV__) {
          //   console.log(`Event: ${event.type}`, {
          //     route: JSON.stringify(event.data.route),
          //     target: event.target,
          //     type: event.type
          //   });
          // }
          let { route } = event.data;
          this._saveCurrentRoute(JSON.stringify(route));
        }

        this._listeners = [
          // navigator.navigationContext.addListener('willfocus', callback),
          navigator.navigationContext.addListener('didfocus', callback)
        ];

      }
    }
  }

  // 记录当前的路由
  async _saveCurrentRoute(currentRoute: string) {
    try {
      await store.setItem(KEY_APP_CURRENT_ROUTE, currentRoute);
    } catch (error) {
      console.log(error);
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f6f6ef',
    // paddingTop: 15
  },
});

module.exports = App;
