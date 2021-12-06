export var serviceRequest = async function(url, requestOptions = {}){
    
    requestOptions.headers={
        ...requestOptions.headers,
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }

    var response = await fetch(url,requestOptions).then(async res=>{
        if(res.ok) return res.json();
        else if(res.status === 403){
            return res;
        }else if(res.status === 401){
            let unAuthorizedRes = await res.json();
            return unAuthorizedRes;
        }else if(res.status === 500){
            return res.json().then(json =>{
                throw new Error(json);
            })
        }else {
                const error = new Error(res.error);
                error.response = res;
                return error;
            }
    })

    return response;
}


// // import { userLogout } from "./commonFunction";

// export var serviceRequest = async function(url, requestOptions = {}) {

//     requestOptions.headers = {
//          ...requestOptions.headers,
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     }

//     var response = await fetch(url, requestOptions).then(async res => {
//         if (res.ok) return res.json();
//         else if (res.status === 403) {
//             return res;
//         } else if (res.status === 401) {

//             let unAuthorizedRes = await res.json();
//             // if(!unAuthorizedRes.success && unAuthorizedRes.message_code === 10001){
//             //     userLogout(unAuthorizedRes);
//             // }
//             return unAuthorizedRes;
//         }
//         else if (res.status === 500) {
//             return res.json().then(json => {
//                 throw new Error(json);
//             })
//         }
//         else {
//             const error = new Error(res.error);
//             error.response = res;
//             return error;
//         }
//     });
//     return response;
// };