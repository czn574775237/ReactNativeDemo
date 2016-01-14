import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import * as GoodsAPI from '../apis/GoodsAPI';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../config';

let {
  View,
  Text,
  Image,
  StyleSheet
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
      <View style={styles.container}>
        {this.renderGoodsDetail()}
      </View>
    );
  }

  renderGoodsDetail() {
    let { item } = this.state;
    if (!item) {
      return null;
    }

    return (
      <View style={styles.goodsContent}>
        {this.renderImageSwiper()}
      </View>
    )

  }

  renderImageSwiper() {
    let { item } = this.state;
    return (
      <View style={styles.swiperContainer}>
        <Swiper height={WINDOW_HEIGHT/2.5}>
        {
          item.goodsImg.map((t, i) => {
            return (
              <View key={i} style={styles.swiperItem}>
                <Image source={{uri: t.thumbImgBig}} style={{flex: 1}} />
              </View>
            );
          })
        }
        </Swiper>
        <View style={styles.iconBackContainer}>
          <Icon
            name="chevron-left"
            size={20}
            style={styles.iconBack}
            onPress={()=> { this.props.navigator.pop(); }}>
          </Icon>
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 18,
    backgroundColor: '#efefef'
  },
  iconBackContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    width: 30,
    height: 30,
    alignItems: 'center',
    borderRadius: 15,
    position: 'absolute',
    left: 10,
    top: 20
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
    flex: 1,
    // height: 400
  },
  swiperItem: {
    // height: 400
    flex: 1
  }

});
