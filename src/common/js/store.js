/**
 * Created by wsy on 1/10/17.
 */
export function saveTolocal(id, key, value) {
    let seller = window.localStorage._seller_;
    if (!seller) {
      seller = {};
      seller[id] = {};
      seller[id][key] = value;
    } else {
      seller = JSON.parse(seller);
      if (!seller[id]) {
        seller[id] = {};
      }
    }
  seller[id][key] = value;
  window.localStorage._seller_ = JSON.stringify(seller);
}

export function loadFrpmlocal(id, key, def) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  } else {
    let ret = seller[key];
    return ret || def;
  }
}
