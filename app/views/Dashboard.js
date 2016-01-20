import React from 'react-native';
import * as GoodsAPI from '../apis/GoodsAPI';
import GoodsItem from '../components/GoodsItem';
import store from '../store';
import { KEY_APP_CURRENT_ROUTE } from '../constants/StorageKeys';

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ListView,
  TouchableOpacity
} = React;

export default
class Dashboard extends React.Component {

  state = {
    goodsList: null
  };

  componentDidMount() {
    this._loadInitialState();

    GoodsAPI.findAll().then((res) => {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({ goodsList: ds.cloneWithRows(res) });
    }).catch((err) => {
      console.log(err);
    });
  }

  // 加载上一路由的历史（仅仅首页加载）
  async _loadInitialState() {
    try {
      var currentRoute = await store.getItem(KEY_APP_CURRENT_ROUTE);
      currentRoute = JSON.parse(currentRoute);
      if (currentRoute && currentRoute.name !=='Dashboard') {
        this.props.navigator.push(currentRoute);
      }
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    return (
      <View style={styles.container}>
        {this.renderGoodsList()}
      </View>
    );
  }

  renderGoodsList() {
    var { goodsList } = this.state;
    if (!goodsList) {
      return null;
    }

    return (
      <ListView
        dataSource={goodsList}
        renderRow={(item, t, i) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                this._onPress(item);
              }}>
              <View>
                <GoodsItem item={item} key={i} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  _onPress(item) {
    var { storeId, goodsId } = item;
    // 这里跳去 GoodsDetail 页面
    this.props.navigator.push({
      name: 'GoodsDetail',
      storeId,
      goodsId
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
