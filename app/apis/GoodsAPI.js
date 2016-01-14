import { http, paramsUrl } from '../libs/http';

export function findAll(params) {
  let url = '/Mobile/Goods/all';
  return http(paramsUrl(url, params));
}

export function findOne({ goodsId, storeId }) {
  let url = `/Mobile/Goods/get?goodsId=${goodsId}&storeId=${storeId}`;
  return http(url);
}
