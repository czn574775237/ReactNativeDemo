import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import * as GoodsAPI from '../apis/GoodsAPI';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../config';

let {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  WebView,
  TouchableWithoutFeedback
} = React;


export default
class GoodsDetail extends React.Component {

  static props = {
    storeId: React.PropTypes.number.isRequired,
    goodsId: React.PropTypes.number.isRequired
  };

  state = {};

  componentDidMount() {
    let { storeId, goodsId } = this.props;
    GoodsAPI.findOne({ goodsId, storeId }).then((item) => {
      this.setState({ item });

    }).catch(() => {  // 需要登陆权限才能，失败后则跳去登陆页面
      this.props.navigator.push({
        name: 'UserSignin',
        redirectComponent: 'GoodsDetail',
        redirectComponentParams: { goodsId, storeId }
      })

    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            {this._renderGoodsDetail()}
          </View>
        </ScrollView>
        {this._renderNavigation()}
        {this._renderActionButton()}
      </View>
    );
  }

  _renderNavigation() {
    return (
      <TouchableWithoutFeedback
        onPress={()=> { this.props.navigator.pop(); }}>
        <View style={styles.iconBackContainer}>
          <Icon
            name="chevron-left"
            size={20}
            style={styles.iconBack}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderGoodsDetail() {
    let { item } = this.state;
    if (!item) {
      return null;
    }

    return (
      <View style={styles.goodsContent}>
        {this._renderImageSwiper()}
        {this._renderConciseInfo()}
        {this._renderStoreInfo()}
        {this._renderGoodsDetailContent()}
      </View>
    )
  }

  _renderImageSwiper() {
    let { item } = this.state;
    return (
      <View style={styles.swiperContainer}>
        <Swiper height={WINDOW_HEIGHT/2.5}>
        {
          item.goodsImg.map((t, i) => {
            return (
              <View key={i} style={styles.swiperItem}>
                <Image
                  source={{uri: t.thumbImgBig}}
                  style={{flex: 1}}
                   />
              </View>
            );
          })
        }
        </Swiper>
      </View>
    );
  }

  _renderConciseInfo() {
    let {
      goodsName,
      marketPrice,
      shippingFee,
      goodsTotalSales,
      favouriteCount
    } = this.state.item;
    return (
      <View style={styles.conciseInfoContainer}>
        <Text style={styles.goodsTitle}>{goodsName}</Text>
        <Text style={[styles.text]}>售价：
          <Text style={styles.price}>￥{marketPrice}</Text>
        </Text>
        <View style={styles.flexContainer}>
          <View style={styles.cell}>
            <Text style={[styles.text, styles.gray]}>运费：
              <Text style={[styles.gray]}>￥{shippingFee}</Text>
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={[styles.text, styles.gray]}>销量：
              <Text style={[styles.gray]}>{goodsTotalSales}笔</Text>
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={[styles.text, styles.gray]}>收藏：
              <Text style={[styles.gray]}>{favouriteCount}次</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }

  _renderStoreInfo() {
    let { store } = this.state.item;
    if (!store.logo) {  // 如果 logo 为 ''，则 <Image /> 渲染时会出现 app crash.
      store.logo = undefined; // 设为 undefined 则不会出现问题
    }
    return (
      <View style={{flex: 1}}>
        <View style={{
          padding: 10,
          marginTop: 10,
          backgroundColor: '#fff',
        }}>
          <Image
            source={{uri: store.logo }} style={{
            height: 60,
            width: 60,
            padding: 10
          }} />
          <Text style={{
            position: 'absolute',
            left: 80,
            top: 10
          }}>{store.name}</Text>
        </View>
        <View style={{
          position: 'absolute',
          right: 5,
          top: 30,
          padding: 5,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#fe9900',
          borderRadius: 3,
        }}>
          <Text style={{ color: '#fe9900' }}>
            <Icon name="user"></Icon> 进店逛逛
          </Text>
        </View>
      </View>
    );
  }

  _renderGoodsDetailContent() {
    let { goodsImg, goodsDesc } = this.state.item;
    return (
      <View style={[styles.cell]}>
        <View style={{
          marginTop: 10,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          alignItems: 'center',
          padding: 10
        }}>
          <Text style={{
            flex: 1
          }}>商品详情</Text>
        </View>
        {
          //<WebView html={goodsDesc} style={{height: 1000}} />
        }
        {
          goodsImg.map((t, i) => {
            return (
              <View key={i} style={{
                // flex: 1,
                // justifyContent: 'center',
                // alignItems: 'stretch',
              }}>
                <Image
                  source={{uri: t.thumbImgBig}}
                  style={{
                    flex: 1,
                    width: WINDOW_WIDTH,
                    height: WINDOW_HEIGHT,
                  }}
                  resizeMode="contain"
                />
              </View>
            );
          })
        }
      </View>
    );
  }

  _renderActionButton() {
    return (
      <View style={[styles.actionButtonContainer, styles.flexContainer]}>
        <View style={[{
          flex: 0.5,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        }, styles.center]}>
          <Icon name="commenting-o" size={14} style={{padding: 3}}></Icon>
          <Text style={[styles.f12]}>客服</Text>
        </View>
        <View style={[{
          flex: 0.5,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          borderLeftWidth: 1,
          borderLeftColor: '#eee'
        }, styles.center]}>
          <Icon name="user" size={14} style={{padding: 3}}></Icon>
          <Text style={[styles.f12]}>店铺</Text>
        </View>
        <View style={[{
          flex: 0.5,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          borderLeftWidth: 1,
          borderLeftColor: '#eee'
        }, styles.center]}>
          <Icon name="star-o" size={14} style={{padding: 3}}></Icon>
          <Text style={[styles.f12]}>收藏</Text>
        </View>
        <View style={[{
          backgroundColor: '#fe9900',
        }, styles.center, styles.cell]}>
          <Text style={{ padding: 10, color: '#fff'}}>加入购物车</Text>
        </View>
        <View style={[{
          backgroundColor: '#ff5000'
        }, styles.center, styles.cell]}>
          <Text style={{ padding: 10, color: '#fff'}}>立即购买</Text>
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  },
  text: {
    padding: 3,
    fontSize: 12
  },
  price: {
    color: '#eb5211'
  },
  gray: {
    color: '#999'
  },
  cell: {
    flex: 1
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  f12: {
    fontSize: 12
  },
  f14: {
    fontSize: 14
  },
  iconBackContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    width: 30,
    height: 30,
    alignItems: 'center',
    borderRadius: 15,
    position: 'absolute',
    left: 10,
    top: 25
  },
  iconBack: {
    color: '#fff',
    position: 'absolute',
    top: 5,
    left: 5
  },
  bigImage: {
    width: WINDOW_WIDTH,
    height: 200
  },

  goodsContent: {
    flex: 1
  },
  swiperContainer: {
  },
  swiperItem: {
    flex: 1
  },

  conciseInfoContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  goodsTitle: {
    fontSize: 16,
    paddingBottom: 10
  },


  actionButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: WINDOW_WIDTH,
  }
});
