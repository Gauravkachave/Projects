import { getSessionToken } from '../../../utils/authentication/jwtUtils';
import { serviceRequest } from '../../apihelper';
import { API_ENDPOINTS } from '../apiendpoint';


export const userSignInAPI = (params,signal) => {
    let url=API_ENDPOINTS.signin;

    let requestOptions = {
        method: 'POST',
        body:JSON.stringify(params)
    }
    return serviceRequest(url,requestOptions);
}

export const validateTokenAPI=(params,signal) => {
    let url=API_ENDPOINTS.validateToken;

    let requestOptions = {
        method:'GET',
        body:JSON.stringify(params),
        headers:{
        'session-token' : getSessionToken('session_token')
        }
    }
    return serviceRequest(url,requestOptions);
}

// export const createPublicGroupAPI=(params,signal) => {
//     let url=API_ENDPOINTS.createPublicGroup;
     
//     let requestOptions = {
//         method:'POST',
//         body:JSON.stringify(params),
//         headers:{
//             'session-token' : getSessionToken('session_token')
//         }
//     }
//     return serviceRequest(url,requestOptions);
// }








export const getUserSubscriptionListAPI = () => {
    let url = API_ENDPOINTS.getUserSubscriptionList;

    let requestOptions = {
        method: 'GET'
    }
    return serviceRequest(url, requestOptions);
};


export const userSignUpAPI = (params, signal) => {
    let url = API_ENDPOINTS.signUp;

    let requestOptions = {
        method: 'POST',
        body:JSON.stringify(params)
    }

    return serviceRequest(url, requestOptions);
};

