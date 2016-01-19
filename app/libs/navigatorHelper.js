export function back(navigator: Object) {
  let routes = navigator.getCurrentRoutes();
  let length = routes.length;

  if (length === 1) { // 只有当前路由，没得后退了，就返回首页
    navigator.replace({ name: 'Dashboard' });
    return;
  } else {
    navigator.pop();
  }
}
