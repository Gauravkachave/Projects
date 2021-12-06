// url to fetch api's
export const API_GATEWAY_URL = process.env.REACT_APP_API_GATEWAY_URL;

export const API_ENDPOINTS = {
    signin : API_GATEWAY_URL + "login",
    validateToken : API_GATEWAY_URL + "validtoken",
    createPublicGroup : API_GATEWAY_URL + "addGroup",
    getGroups : API_GATEWAY_URL + 'listAll',
    getGroupsInfo : API_GATEWAY_URL + 'details',
    updateGroup : API_GATEWAY_URL + 'updateGroup',
    createFolder : API_GATEWAY_URL + 'addFolder',
    getFolderList : API_GATEWAY_URL + 'folderList',
    listAllFolder : API_GATEWAY_URL + 'listAllFolder',
    addCategory : API_GATEWAY_URL + 'addCategory',
    listAllCategory :  API_GATEWAY_URL + 'category/listAll',
    
}