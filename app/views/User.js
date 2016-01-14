import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

let {
  width: viewWidth,
  height: viewHeight
} = Dimensions.get('window');


var {
  View,
  Text,
  StyleSheet,
  TextInput,
  WebView,
  Animated
} = React;

export default
class UserPage extends React.Component {

  static title = '用户';

  state = {
    fadeAnim: new Animated.Value(0),
  };


  componentWillMount() {
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 1}
    ).start();
  }

  render() {
    return (
      <Animated.View style={{
        opacity: this.state.fadeAnim,
        transform: [{
          translateY: this.state.fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [viewHeight, 0]
          })
        }]
      }}>
        <View style={styles.container}>
          <Icon.Button name="qq" backgroundColor="#3b5998" onPress={this.handleClick.bind(this)}>
              通过QQ登陆
          </Icon.Button>
          <View style={{marginTop: 10}}>
            <Icon.Button name="weixin" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
                通过微信登陆
            </Icon.Button>
          </View>
          <View>
            <WebView
              automaticallyAdjustContentInsets={false}
              javaScriptEnabled={true}
              style={{height: 300, width: 360, borderColor: '#333', borderWidth: 1}}
              url="http://m.baidu.com"
            />
          </View>
        </View>
      </Animated.View>
    );
  }

  handleClick() {
    
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 65,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    margin: 10,
    fontSize: 18
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingLeft: 15
  }
});
