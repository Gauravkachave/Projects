import React,{useState,useEffect} from 'react';
import ManageTemplate from '../../../components/Manager/ManagerTemplates/ManageTemplate';
import Snackbar from '../../../components/Snackbar/Snackbar';
import {listAllFolderAPI,listAllCategoryAPI,templateListAPI} from '../../../helper/services/API/Manager';

const ManageTemplates = () => {
    const [folderList,setFolderList]=useState(null);
    const [folderId,setFolderId]=useState(null);
    const [catId,setCatId]=useState(null);
    const [categoryList,setCategoryList]=useState(null);
    const [templateList,setTemplateList]=useState(null);
    const [contentLoader,setContentLoader]=useState(false);
    const [snackbarState,setSnackbarState]=useState({
        messageInfo:{
            open:false,
            message:null,
            variant:'success'
        }
    });

    useEffect(()=>{
        let params={
            folder_type:'NORMAL'
        }
        listAllFolderAPI(params).then((res)=>{
            if(res.success && res.message_code === 10005){
                setFolderList(res.data);
                setFolderId(res.data[0].id);

        let catParams={folder_id:res.data[0].id};
        listAllCategoryAPI(catParams).then((res)=>{
            if(res.success){
                setCategoryList(res.data);
                setCatId(res.data[0].cat_id);
            }
                   
        let templateParams={
            tmpl_type : 'NORMAL',
            folder_id : res.data[0].cat_folder_id,
            cat_id : res.data[0].cat_id
        }
        templateData(templateParams);
        })
        }
        })
    },[])

    const templateData = (params) =>{
        templateListAPI(params).then((res) => {
            if (res.success && res.message_code === 10010) {
                setTemplateList(res.data);
            }
        })
    }

    const handleChange = (input,value) => {
        if(input === 'folder_id' && value !== '0'){
            setFolderId(value);

            let catParams = {
                folder_id:value
            }
            listAllCategoryAPI(catParams).then((res)=>{
                if(res.success && res.message_code === 10017){
                    setCategoryList(res.data);

                    if(res.data.length === 0){
                        setCatId('0');
                    }else{
                    setCatId(res.data[0].cat_id);
                    let templateParams={
                        tmpl_type : 'NORMAL',
                        folder_id : value,
                        cat_id : res.data[0].cat_id
                    }
                    templateData(templateParams);
                }
            }
            })
        }
        else if(input === 'cat_id' && value !== '0'){
            setCatId(value);
            let templateParams={
                tmpl_type : 'NORMAL',
                folder_id : folderId,
                cat_id : value
            }
            templateData(templateParams);
        }
    }
    return ( 
        <React.Fragment>
            {snackbarState.messageInfo.open && <Snackbar
            message={snackbarState.messageInfo.message}
            open={snackbarState.messageInfo.open}
            closeSnackBar={() => {
                setSnackbarState({
                    messageInfo: {
                        open: false,
                        message: null,
                        variant: 'success'
                    }
                });
            }}
            variant={snackbarState.messageInfo.variant}
            autoHideDuration={5000}
            /> }

            <ManageTemplate
                folderList={folderList}
                folderId={folderId}
                catId={catId}
                categoryList={categoryList}
                contentLoader={contentLoader}
                handleChange={handleChange}
                templateList={templateList}
            />
        </React.Fragment>
     );
}
 
export default ManageTemplates;