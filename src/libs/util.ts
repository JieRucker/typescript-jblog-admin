export function title(title: string) {
  title = title || '博客';
  window.document.title = title;
}

export function inOf(arr: any[], targetArr: any[]) {
  let res = true;
  arr.forEach(item => {
    if (targetArr.indexOf(item) < 0) {
      res = false;
    }
  });
  return res;
}

export function oneOf(ele: string, targetArr: any[]) {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
}

export function getRouterObjByName(routers: any, name: any):any {
  if (!name || !routers || !routers.length) {
    return null;
  }
  // debugger;
  let routerObj = null;
  for (let item of routers) {
    if (item.name === name) {
      return item;
    }
    routerObj = getRouterObjByName(item.children, name);
    if (routerObj) {
      return routerObj;
    }
  }
  return null;
}

export function handleTitle(vm: any, item: any) {
  if (typeof item.title === 'object') {
    return vm.$t(item.title.i18n);
  } else {
    return item.title;
  }
}

export async function getCurrentNode(list: any, keyword: any, nodes: any, cb: any) {
  if (Object.keys(keyword).length > 1) {
    throw new Error('Expression only one object length')
  }
  let parentNode = null;
  let node: any = null;
  let [name] = Object.keys(keyword);
  let value = keyword[name];
  const func = await (() => {
    return (list: any, value: any) => {
      for (let i = 0; i < list.length; i++) {
        if (node) break;
        let obj = list[i];
        if (!obj || !obj[name]) continue;

        if (obj[name] === value) {
          node = obj;
          break;
        } else {
          if (obj[nodes]) {
            parentNode = obj;
            func(obj[nodes], value);
          }
        }
      }
    }
  })();

  func(list, value);

  await (() => {
    node || (parentNode = '无父节点');
    cb && cb.call(null, {
      parentNode: parentNode,
      node: node
    })
  })()
}

export function setCurrentPath(vm: any, name: any) {
  getCurrentNode(vm.$store.state.app.routers, {name: name}, 'children', (data: any) => {
    vm.$store.commit('setCurrentPath', (() => {
      let a = null;
      if (typeof data.node.crumb === 'function') {
        a = data.node.crumb(vm)
      } else {
        a = data.node.crumb
      }
      return a;
    })());

    vm.$store.commit('setActiveMenuItem', {
      data: data,
      name: vm.$route.name
    });
  });
}


export function toDefaultPage(routers: any, name: string, route: any, next: any) {
  let len = routers.length;
  let i = 0;
  let notHandle = true;
  while (i < len) {
    if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
      route.replace({
        name: routers[i].children[0].name
      });
      notHandle = false;
      next();
      break;
    }
    i++;
  }
  if (notHandle) {
    next();
  }
}

