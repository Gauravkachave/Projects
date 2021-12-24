import { getSessionToken } from '../../../utils/authentication/jwtUtils';
import { serviceRequest } from '../../apihelper';
import { API_ENDPOINTS } from '../apiendpoint';

export const createPublicGroupAPI=(params,signal) => {
    let url=API_ENDPOINTS.createPublicGroup;
     
    let requestOptions = {
        method:'POST',
        body:JSON.stringify(params),
        headers:{
            'session-token' : getSessionToken('session_token')
        }
    }
    return serviceRequest(url,requestOptions);
}


export const getGroupsAPI = (params,signal) => {
    let url=API_ENDPOINTS.getGroups;
    
    Object.entries(params).forEach(([key, val])=>{
        if(key === 'grp_type')
            url+=`?${key}=${val}`;
        else 
            url+=`&${key}=${val}`;
    });

    let requestOptions = {
        method:'GET',
        headers:{
            'session-token' : getSessionToken('session_token')
        }
    }
    return serviceRequest(url,requestOptions);
}

export const getGroupsInfoAPI = (params,signal) => {
    let url=API_ENDPOINTS.getGroupsInfo;
    
    url+=`?grp_id=${params['grp_id']}`;
    
    let requestOptions={
        method:'GET',
        headers:{
            'session_token' : getSessionToken('session_token')
        }
    }
    return serviceRequest(url,requestOptions);

}

export const updateGroupAPI = (params,signal) => {
    let url=API_ENDPOINTS.updateGroup;      

    let requestOptions = {
        method:'POST',
        body:JSON.stringify(params),
        headers:{
            'session_token' : getSessionToken('session_token')
        }
    }
    return serviceRequest(url,requestOptions);

}

export const dropDownListAllAPI = (params,signal) => {
    let url=API_ENDPOINTS.dropDownListAll;
    
    url+=`?grp_type=${params['grp_type']}`;
    
    let requestOptions={
        method:'GET',
        headers:{
            'session_token' : getSessionToken('session_token')
        }
    }
    return serviceRequest(url,requestOptions);
}