import React from 'react-native';

var {
  View,
  Text,
  Image,
  StyleSheet
} = React;

var WINDOW_WIDTH = require('Dimensions').get('window').width;

export default
class GoodsItem extends React.Component {

  static propTypes = {
    item: React.PropTypes.shape({
      goodsId: React.PropTypes.number.isRequired,
      storeId: React.PropTypes.number.isRequired
    }).isRequired,
  };

  render() {
    let { goodsThumbImg, goodsName, goodsPrice } = this.props.item;
    return (
      <View style={styles.container}>
        <View style={styles.cell1}>
          <Image style={styles.image} source={{uri: goodsThumbImg}} />
        </View>
        <View style={styles.cell2}>
          <Text>{goodsName}</Text>
          <Text style={styles.price}>￥{goodsPrice}</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10
  },
  cell1: {
    flex: 1
  },
  cell2: {
    flex: 2
  },
  image: {
    height: WINDOW_WIDTH/4,
    width: WINDOW_WIDTH/4
  },
  price: {
    color: '#ff0000'
  }
});
