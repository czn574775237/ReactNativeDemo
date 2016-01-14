import React from 'react-native';

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ListView,
  TouchableOpacity
} = React;

import * as GoodsAPI from '../apis/GoodsAPI';
import GoodsItem from '../components/GoodsItem';

export default
class Dashboard extends React.Component {

  state = {
    goodsList: null
  };

  componentDidMount() {
    GoodsAPI.findAll().then((res) => {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({ goodsList: ds.cloneWithRows(res) });
    });
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
