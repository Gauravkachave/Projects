import { getCookie } from '../CookieLocalStorage';

const STORE_NAME = 'session_token';

export const getSessionToken = () => {

  let dataStorage = getCookie(STORE_NAME);

  if (dataStorage && dataStorage) {
    return dataStorage;
  }
  return;
}

const jwtUtils = {
  getSessionToken
}

export default jwtUtils;