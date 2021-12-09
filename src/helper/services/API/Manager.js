import { getSessionToken } from '../../../utils/authentication/jwtUtils';
import { serviceRequest } from '../../apihelper';
import { API_ENDPOINTS } from '../apiendpoint';


export const createFolderAPI = (params,signal) => {
    let url=API_ENDPOINTS.createFolder;
    let requestOptions = {
        method:'POST',
        body:JSON.stringify(params),
        headers:{
            'session-token' : getSessionToken('session_token')
        }
    }
    return serviceRequest(url,requestOptions);
}


export const getFolderListAPI= (params,signal) => {
    let url=API_ENDPOINTS.getFolderList;
    
    Object.entries(params).forEach(([key, val])=>{
        if(key === 'folder_state')
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


export const listAllFolderAPI= (params,signal) => {
    let url=API_ENDPOINTS.listAllFolder;

    url+=`?folder_type=${params['folder_type']}`;

    let requestOptions = {
        method:'GET',
        headers:{
            'session-token' : getSessionToken('session_token')
        }
    }
    return serviceRequest(url,requestOptions);
}


export const addCategoryAPI = (params,signal) => {
    let url=API_ENDPOINTS.addCategory;
    
    let requestOptions = {
        method:'POST',
        body:JSON.stringify(params),
        headers:{
            'session-token' : getSessionToken('session_token')
        }
    }
    return serviceRequest(url,requestOptions);
} 

export const listAllCategoryAPI= (params,signal) => {
    let url=API_ENDPOINTS.listAllCategory;

    url+=`?folder_id=${params['folder_id']}`;

    let requestOptions = {
        method:'GET',
        headers:{
            'session-token' : getSessionToken('session_token')
        }
    }
    return serviceRequest(url,requestOptions);
}

export const updateCategoryAPI = (params,signal) => {
    let url=API_ENDPOINTS.updateCategory;
    
    let requestOptions = {
        method:'POST',
        body:JSON.stringify(params),
        headers:{
            'session-token' : getSessionToken('session_token')
        }
    }
    return serviceRequest(url,requestOptions);
}

export const updateFolderListAPI = (params,signal) => {
    let url=API_ENDPOINTS.updateFolderList;
    
    let requestOptions = {
        method:'POST',
        body:JSON.stringify(params),
        headers:{
            'session-token' : getSessionToken('session_token')
        }
    }
    return serviceRequest(url,requestOptions);
}
