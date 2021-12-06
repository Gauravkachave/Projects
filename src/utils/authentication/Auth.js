import { getSessionToken } from './jwtUtils';

export const auth = store => {
    return getSessionToken() || false;
};