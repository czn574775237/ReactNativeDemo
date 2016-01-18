import React from 'react-native';
import routes from './routes';
// import store from './store';

var WINDOW_WIDTH = require('Dimensions').get('window').width;

var {
  StyleSheet,
  View,
  AsyncStorage,
  Navigator,
} = React;


var STRORAGE_KEY = '@App:currentRoute';

var BaseConfig = Navigator.SceneConfigs.FloatFromRight;
// var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
//   snapVelocity: 8,
//   edgeHitWidth: WINDOW_WIDTH
// });
var CustomLeftToRightGesture = Object.assign({}, {
  snapVelocity: 8,
  edgeHitWidth: WINDOW_WIDTH
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

  componentDidMount() {
    if (__DEV__) {
      this._loadInitialState();
    }
  }

  componentWillUnmount() {
    // console.log(this._listeners);
  }

  // !Note: 发现使用 AsyncStorage 会出现异常
  // 加载上一路由的历史
  async _loadInitialState() {
    try {
      var currentRoute = await AsyncStorage.getItem(STRORAGE_KEY);
      currentRoute = JSON.parse(currentRoute);
      if (currentRoute && currentRoute.name !=='Dashboard' &&
        this._navigator) {
        this._navigator.push(currentRoute);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    return (
      <Navigator
        ref={this._setNavigatorRef.bind(this)}
        style={styles.container}
        initialRoute={{
          name: 'Dashboard',
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
    return CustomSceneConfig;
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

  // !Note: 发现使用 AsyncStorage 会出现异常
  // 记录当前的路由
  async _saveCurrentRoute(currentRoute: string) {
    try {
      await AsyncStorage.setItem(STRORAGE_KEY, currentRoute);
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
