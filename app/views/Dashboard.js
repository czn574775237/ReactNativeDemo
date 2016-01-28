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

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      res: [],
      goodsList: this.ds.cloneWithRows([])
    };
  }


  componentDidMount() {
    this._loadInitialState();

    // GoodsAPI.findAll().then((res) => {
    //   var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //   this.setState({ goodsList: ds.cloneWithRows(res) });
    // }).catch((err) => {
    //   console.log(err);
    // });
    this._fetchData();
    console.log(this.ds);
  }

  _fetchData(page: Number, pageNum: Number) {
    this.page = page = page || 1;
    this.pageNum = pageNum = pageNum || 10;
    GoodsAPI.findAll({ page, pageNum }).then((res) => {
      let { goodsList } = this.state;
      res = this.state.res.concat(res);
      this.setState({
        goodsList: this.ds.cloneWithRows(res),
        res
      });
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
        onScroll={this._handleScrollFetchData.bind(this)}
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

  _handleScrollFetchData() {
    // this._fetchData(2);
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
