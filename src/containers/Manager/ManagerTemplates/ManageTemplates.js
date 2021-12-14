import React,{useState,useEffect} from 'react';
import ManageTemplate from '../../../components/Manager/ManagerTemplates/ManageTemplate';
import Snackbar from '../../../components/Snackbar/Snackbar';
import {listAllFolderAPI,listAllCategoryAPI,templateListAPI} from '../../../helper/services/API/Manager';

const ManageTemplates = () => {
    // const [inputs,setInputs]=useState({
    //     tmpl_type: 'NORMAL', folder_id:0, cat_id:0,
    // });
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

    // useEffect(()=>{
    //     ( async () => {
    //         let folderListData=await getFolderList();
    //         setFolderList(folderListData);
    //         inputs['folder_id'] = "0";
    //         setInputs({...inputs});

    //         let initialFolderId =folderListData[0].folder_id;
    //         let categoryListData = await getCategoryList(initialFolderId);
    //         setCategoryList(categoryListData);
    //         inputs['cat_id'] = "0";
    //         setInputs({...inputs});

    //     })
    //     ().catch(err => {
    //         console.error('Caught error while getting folder and category list ',err);
    //         setSnackbarState({
    //             messageInfo: {
    //                 open: true,
    //                 message: 'Something went Wrong!',
    //                 variant: 'error'
    //             }
    //         });
    //     })
    // },[])

    useEffect(()=>{
        let params={
            folder_type:'NORMAL'
        }
        listAllFolderAPI(params).then((res)=>{
            if(res.success && res.message_code === 10005){
                console.log(res);
                setFolderList(res.data);
                setFolderId(res.data[0].id);

                let catParams={folder_id:res.data[0].id};
                listAllCategoryAPI(catParams).then((res)=>{
                    if(res.success){
                        setCategoryList(res.data);
                        setCatId(res.data[0].cat_id);
                        console.log(res);
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

    // const getFolderList = async () => {
    //     try{
    //         let allFolderList = await listAllFolderAPI({ folder_type:'NORMAL' });
    //         if(allFolderList.success && allFolderList.data){
    //             return allFolderList.data;
    //         }else{
    //             return [];
    //         }
    //     }catch(error){
    //         throw(error);
    //     };
    // }

    // const getCategoryList = async (folderId) => {
    //     try{
    //         let allCategoryList = await listAllCategoryAPI({folder_id: folderId});
    //         if(allCategoryList.success && allCategoryList.data){
    //             return allCategoryList.data;
    //         }else{
    //             return [];
    //         }
    //     }catch(error){
    //         throw(error);
    //     };
    // }

    // const getTemplateList = async (tempType,folderId,catId) => {
    //     try{
    //         let params={
    //             'tmpl_type':tempType,
    //             'folder_id':folderId,
    //             'cat_id' : catId
    //         }
    //         let allTemplateList = await templateListAPI(params);
    //         if(allTemplateList.success && allTemplateList.data){
    //             return allTemplateList.data;
    //         }else{
    //             return [];
    //         }
    //     }catch(error){
    //         throw(error);
    //     };
    // }

    

    // const handleChange = (input,value) => {
    //     if(input === 'folder_id'){
    //         let folderId = value;
    //         ( async () => {
    //             let allCategoryListData = await getCategoryList(folderId);
    //             setCategoryList(allCategoryListData);
    //         }) ().catch(err => {
    //              console.error('Caught error while getting category list ',err);
    //              });
    //              inputs[input] = value;
    //     }
        
    //     if(input === 'cat_id'){
    //        let catId=value;
    //         ( async () => {
    //             let templateListData = await getTemplateList(catId);
    //             setTemplateList(templateListData);
    //             console.log(templateListData);
    //         }) ().catch(err => {
    //              console.error('Caught error while getting category list ',err);
    //              });
    //              inputs[input] = value;
    //     }


    //     else{
    //         inputs[input] = value;
    //     }

    //     inputs[input]=value;
    //     setInputs({...inputs});
    // }

    const handleChange = (input,value) => {
        if(input === 'folder_id'){
            setFolderId(value);

            let catParams = {
                folder_id:value
            }
            listAllCategoryAPI(catParams).then((res)=>{
                if(res.success){
                    setCategoryList(res.data);
                    console.log(res);
                }else{
                    let templateParams={
                        tmpl_type : 'NORMAL',
                        folder_id : value,
                        cat_id : res.data[0].cat_id
                    }
                    templateData(templateParams);
                }
            })
        }else if(input ==='cat_id'){
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
                // inputs={inputs}
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