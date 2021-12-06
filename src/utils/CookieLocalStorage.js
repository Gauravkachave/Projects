import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getCookie= (COOKIES_STORE) => {        
  let dataStorage = cookies.get(COOKIES_STORE);

  if (dataStorage) {
    return typeof dataStorage === 'object' ? JSON.parse(dataStorage) : dataStorage;
  }
  return;
}

export const setCookie= (COOKIES_STORE, data, option = { path: '/' }) => {

  if (data) {
    try {
      let value = typeof data === 'object' ? JSON.stringify(data) : data;
      cookies.set(COOKIES_STORE, value, option);
      return true;
    } catch (e) {
      return false;
    }
  } else {
    try {
      cookies.remove(COOKIES_STORE, option);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export const getLocalStorage = (COOKIES_STORE) => {

  let dataStorage = localStorage.getItem(COOKIES_STORE);

  if (dataStorage) {
    return JSON.parse(dataStorage);
  }
  return;
}

export const setLocalStorage = (COOKIES_STORE, data) => {

  if (data) {
    try {
      localStorage.setItem(COOKIES_STORE, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  } else {
    try {
      localStorage.removeItem(COOKIES_STORE);
      return true;
    } catch (e) {
      return false;
    }
  }
}

const CookieLocalStorage = {
  getCookie,
  setCookie,
  getLocalStorage,
  setLocalStorage
};

export default CookieLocalStorage;