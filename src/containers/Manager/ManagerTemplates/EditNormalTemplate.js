import React,{useState,useEffect} from 'react';
import EditNormalTemplateComponent from '../../../components/Manager/ManagerTemplates/EditNormalTemplate';
import Snackbar from '../../../components/Snackbar/Snackbar';
import {templateDetailsAPI,listAllFolderAPI,listAllCategoryAPI} from '../../../helper/services/API/Manager';


const EditNormalTemplate = (props) => {
    const tmpl_id = props.match.params.id;
    const [inputs,setInputs]=useState({
        folder_id:0,cat_id:0,tmpl_type:'NORMAL'
    });
    const [errors,setErrors]=useState({});
    const [btnLoader,setBtnLoader]=useState(false);
    const [folderList,setFolderList]=useState(null);
    // const [folderId,setFolderId]=useState(null);
    // const [catId,setCatId]=useState(null);
    const [categoryList,setCategoryList]=useState(null);
    const[snackbarState,setSnackbarState]=useState({
        messageInfo:{
            open:false,
            message:null,
            variant:'success'
        }
    });

// useEffect(()=>{
//     let tempParams={
//         tmpl_id :tmpl_id
//     }
//     templateDetailsAPI(tempParams).then((res)=>{
//         if(res.success && res.message_code === 10010){
//                 setInputs({
//                     ...inputs,
//                     tmpl_name:res.data.tmpl_name,
//                     tmpl_message:res.data.tmpl_message,
//                     cat_id:res.data.tmpl_cat_id,
//                     folder_id:res.data.tmpl_folder_id,

//                     });
//                     setFolderId(res.data.tmpl_folder_id);
//                     // setCatId(res.data.cat_name);
//             }else{
//                 console.log(res);
//             }
//         })

//     let params={
//         folder_type:'NORMAL'
//     }
//     listAllFolderAPI(params).then((res)=>{
//         if(res.success && res.message_code === 10005){
//             setFolderList(res.data);
//             // setFolderId(res.data[0].id);
//         }

//     let catParams={folder_id:folderId};
//     listAllCategoryAPI(catParams).then((res)=>{
//         if(res.success && res.message_code ===10017){
//             setCategoryList(res.data);
//             setCatId(res.data[0].cat_id);
//         }
//     })
//     });
//     },[]);

const editTemplateDetails = async() => {
    let params = {
        tmpl_id :tmpl_id
    }
            templateDetailsAPI(params).then((res)=>{
                if(res.success && res.message_code === 10010){
                        setInputs({
                            ...inputs,
                            tmpl_name:res.data.tmpl_name,
                            tmpl_message:res.data.tmpl_message,
                            cat_id:res.data.tmpl_cat_id,
                            folder_id:res.data.tmpl_folder_id,
                            });
                            // setFolderId(res.data.tmpl_folder_id);
                    }else{
                        console.log(res);
                    }
                })
}

const getFolderList = async() => {
    try {
        let folderList = await listAllFolderAPI({ folder_type:'NORMAL' });
        if(folderList.success && folderList.data){ return folderList.data; }
        else { return []; }
    } catch (error) {
        throw error;
    };
}

const getCategoryList = async(folderId) => {
    console.log(folderId);
    try {
        let categoryList = await listAllCategoryAPI({ folder_id: folderId });
        if(categoryList.success && categoryList.data){ return categoryList.data; }
        else { return []; }
    } catch (error) {
        throw error;
    };
}

useEffect(() => {
    (async () => {
        let folderListData = await getFolderList();
        setFolderList(folderListData);
         
        let initialFolderId = folderListData[0].id;
        let categoryListData = await getCategoryList(initialFolderId);
        setCategoryList(categoryListData);
         await editTemplateDetails();
    })
    ().catch(err => {
        console.error('Caught error while getting folder and category list ',err);
    });
}, []);






    const handleChange = (input,value) => {
        if(input === 'folder_id'){
            let folderId = value;
            (async () => {
                let categoryListData = await getCategoryList(folderId);
                setCategoryList(categoryListData);
            })().catch(err => { console.error('Caught error while getting category list ',err); });
            inputs[input] = value;
            inputs['cat_id'] = 0;
        }
        else {
            inputs[input] = value;
        }
        let isError = '';

        inputs[input]=value;
        errors[input]= isError ? isError : '';

        setInputs({...inputs});
        setErrors({...setErrors});
    }

    const handleValidation = () => {
        let isValid=true;
        let error=errors;
        let errordata=['tmpl_name','tmpl_message','cat_name','folder_name'];

        errordata.forEach(value => {
            if(!inputs[value] || !inputs[value].trim()){
                isValid=false;
                error[value]='This field is required';
            }
        })
        setErrors({...error});
        return isValid;
    }

    return ( 
        <React.Fragment>
            <EditNormalTemplateComponent
            inputs={inputs}
            errors={errors}
            btnLoader={btnLoader}
            handleChange={handleChange}
            // folderId={folderId}
            // catId={catId}
            folderList={folderList}
            categoryList={categoryList}
            
            />
        </React.Fragment>
     );
}
 
export default EditNormalTemplate;