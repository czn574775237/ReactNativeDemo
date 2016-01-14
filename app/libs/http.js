import store from '../store';
var API_ROOT = 'http://multi-m.beeee.com/api';
let URL_TOKEN_KEY = 'token';

export async function http(url, data) {
  if (url.indexOf(API_ROOT) === -1) {
    url = API_ROOT + url;
  }
  let token = await store.getToken();

  if (token) {
    if (url.indexOf('?') === -1) {
      url = `${url}?${URL_TOKEN_KEY}=${token}`;
    } else {
      url = `${url}&${URL_TOKEN_KEY}=${token}`;
    }
  }

  let config;
  if (!data) {
    config = { method: 'get' };
  } else {
    config = {
      method: 'post',
      headers: {
        'Accept':
          'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type':
          'application/x-www-form-urlencoded; charset=utf-8'
      },
      // body: JSON.stringify(data)
      body: formDataParam(data)
    };
  }

  return fetch(url, config)
          .then(_status)
          .then(_json)
          .then(_acl);
}

export function paramsUrl(url, data) {
  let params = formDataParam(data);
  return `${url}?${params}`;
}


// Check the request status
function _status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(response.statusText);
}

// Transform to json format
function _json(response) {
  try {
    const json = response.json();
    if (process.env.NODE_ENV !== 'production') {
      console.log('XHR Request: %s', response.url);
    }
    return json;
  } catch(ex) {
    throw new Error(ex);
  }
}

// Acl check
function _acl(json) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('XHR Request return data:', json);
  }

  if (json) {
    const aclCode = parseInt(json.returnCode);
    switch (aclCode) {
      // success
      case 1:
        return json.data;

      // 账号停用
      case -629:
        throw new Error(json.returnMsg);

      // 权限错误
      case -990:
      case -989:
      case 401:
      case 403:
        // dispatch 权限错误的事件
        dispatch(ActionTypes.REQUEST_ACL_ERROR, json);
        // throw new Error(JSON.stringify(json));
        throw new Error(json.returnMsg);
        // return json.data;

      default:
        throw new Error(json.returnMsg);
    }
  }
  throw new Error(JSON.stringify(json));
}

function formDataParam(obj) {
  let query = '', name, value, fullSubName, subName, subValue, innerObj, i;

  for (name in obj) {
    value = obj[name];
    if(value instanceof Array) {
      for(i = 0; i < value.length; ++i) {
        subValue = value[i];
        fullSubName = name + '[' + i + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += formDataParam(innerObj) + '&';
      }
    } else if(value instanceof Object) {
      for(subName in value) {
        subValue = value[subName];
        fullSubName = name + '[' + subName + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += formDataParam(innerObj) + '&';
      }
    } else if(value !== undefined && value !== null) {
      query += encodeURIComponent(name) + '=' +
        encodeURIComponent(value) + '&';
    }
  }
  return query.length ? query.substr(0, query.length - 1) : query;
}
