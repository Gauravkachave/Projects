import React,{useState,useEffect} from 'react';
import ManageTemplate from '../../../components/Manager/ManagerTemplates/ManageTemplate';
import Snackbar from '../../../components/Snackbar/Snackbar';
import {listAllFolderAPI,listAllCategoryAPI,templateListAPI,deleteTemplateAPI} from '../../../helper/services/API/Manager';
import ComfirmDialogComponent from '../../../components/common/ComfirmDialog';

const ManageTemplates = (props) => {
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
    const [confirmDialog, setConfirmDialog] = useState({alert: false,id: null,index:null});

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
        setContentLoader(true);
        templateListAPI(params).then((res) => {
        setContentLoader(false);
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

    const handleDelete = (value,index) => {
        setConfirmDialog({alert:true, id:value,index:index});
    }
    const deleteTemplate = (value) => {
        if(value === true){
        let params = {
            tmpl_id:confirmDialog.id
        }
        deleteTemplateAPI(params).then((res) => {
            console.log(res);
            if(res.success && res.message_code === 10030){
            setSnackbarState({
                messageInfo:{
                    open:true,
                    message:res.message,
                    variant:'success'
                }
            })
            // delete data[confirmDialog.index];
            // setTemplateList(templateList);
            window.location.reload();
        }
        })
    }
    setConfirmDialog({alert: false,id: null,index:null});
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
                handleDelete={handleDelete}
            />
            {(confirmDialog.alert) &&
            <ComfirmDialogComponent
                title='Delete Template Confirmation'
                yesTitle='Yes Delete'
                noTitle="No"
                deleteName='Do you want to delete selected template?'
                open={confirmDialog.alert}
                deleteConfirm={(value)=>{
                    deleteTemplate(value);
                }}
            />
            }
        </React.Fragment>
     );
}
 
export default ManageTemplates;