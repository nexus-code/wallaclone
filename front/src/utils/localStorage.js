


export const setUserLS = user => {

  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserLS = () => {
  const user = localStorage.getItem('user');
  // console.log('user', user);

  return !user ? undefined : JSON.parse(user);
};

export const setAdsLS = ads => {

  localStorage.setItem('ads', JSON.stringify(ads));
};

export const getAdsLS = () => {
  const ads = localStorage.getItem('ads');

  return !ads ? [] : JSON.parse(ads);
};

/**
 * Pending the unification of functions!:
 */

// export const setLocalStorage = (key, value) => {

//   localStorage.setItem(key, JSON.stringify(value));
// };

// export const getLocalStorage = key => {
//   const ls = localStorage.getItem(key);
//   return !ls ? undefined : JSON.parse(ls);
// };


export const clearLocalStorage = () => {
  localStorage.clear();
}



/*
* complementary functions
*/

export const isEmpty = (obj) => {
  // https://firstclassjs.com/check-if-object-is-empty-in-javascript/

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}