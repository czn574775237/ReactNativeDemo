import React from 'react-native';
import * as UserAPI from '../apis/UserAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../config';
import store from '../store';

let {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput
} = React;


const BG_URL = 'http://mg.soupingguo.com/bizhi/big/10/286/016/10286016.jpg';

export default
class UserSignin extends React.Component {

  state = {
    username: 'test@qq.com',
    password: '123456'
  };

  render() {
    let { username, password } = this.state;
    return (
      <View style={styles.container}>
        <Image source={{uri: BG_URL}} style={styles.bg}>
          <View style={styles.loginForm}>
            <TextInput
              style={styles.input}
              placeholder="手机号/邮箱"
              value={username}
              onChangeText={(username) => {this.setState({username})}}
            />
            <TextInput
              style={styles.input}
              placeholder="密码"
              value={password}
              onChangeText={(password) => {this.setState({password})}}
            />
            <Icon.Button
              name="user"
              onPress={this._handleSubmit.bind(this)}>登陆</Icon.Button>
          </View>
        </Image>
      </View>
    );
  }

  _handleSubmit() {
    let { username, password } = this.state;
    UserAPI.signin({ username, password }).then((res) => {
      // console.log(this.props);
      store.setToken(res.token);
      this.props.navigator.replace({
        name: this.props.redirectComponent,
        ...this.props.redirectComponentParams
      });
    });
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  opacityContainer: {
    flex: 1,
    opacity: 0.5,
    backgroundColor: '#fff',
    position: 'absolute',
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    left: 0,
    top: 0,
  },
  bg: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    resizeMode: 'cover',
    flex: 1
  },
  loginForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingLeft: 10,
    borderColor: '#fff',
    borderWidth: 1,
    height: 40
  }
});
