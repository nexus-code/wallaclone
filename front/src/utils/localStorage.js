


export const setUserLS = user => {

  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserLS = () => {
  const user = localStorage.getItem('user');
  
  return !user || user === 'undefined' ? undefined : JSON.parse(user);
};

export const setAdsLS = adverts => {

  localStorage.setItem('adverts', JSON.stringify(adverts));
};

export const getAdvertsLS = () => {
  const adverts = localStorage.getItem('adverts');

  return !adverts ? [] : JSON.parse(adverts);
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