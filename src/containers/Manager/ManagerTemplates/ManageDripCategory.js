import React,{useState, useEffect} from 'react';
import DripCategoryComponent from '../../../components/Manager/ManagerTemplates/ManageDripCategory';
import {listAllFolderAPI, listAllCategoryAPI, updateCategoryAPI} from '../../../helper/services/API/Manager';
import Snackbar from '../../../components/Snackbar/Snackbar';

const ManageDripCategory = () => {
    const [folder_id, setFolder_id] = useState("select_folder");
    const [folderList, setFolderList] = useState(null);
    const [categoryList, setCategoryList] = useState(null);
    const [contentLoader, setContentLoader] = useState(false);
    const [catName, setCatName] = useState(null);
    const [catId, setCatId] = useState(null);
    const [catState, setCatState] = useState(null);

    const [editDialog, setEditDialog] = useState(false);
    const [snackbarState, setSnackbarState] = useState({
        messageInfo : {
            open : false,
            message : null,
            variant : "success"
        }
    })

    useEffect(() => {
        let params = {
            folder_type : "DRIP"
        }
        listAllFolderAPI(params).then((res) => {
            if(res.success && res.message_code === 10005){
                setFolderList(res.data);
            }
        })
    },[]);

    const handleChange = (input,value) => {
        setFolder_id(input);
        let params = {
            folder_id : input,
        };
        setContentLoader(true);
        listAllCategoryAPI(params).then((res) =>{
            setContentLoader(false);
            setCategoryList(res.data);
        })
    };

    const handleDialog = () => {
        setEditDialog(!editDialog);
    };

    const handleEdit = (id) => {
        setEditDialog(!editDialog);
        const data=categoryList.find(item => item.cat_id === id );
        setCatName(data.cat_name);
        setCatId(data.cat_id);
        setCatState(data.cat_state);
    };

    const onUpdateChange = (input, value) => {
        if(input === 'cat_state'){
            setCatState(value);
        }
        if(input === 'cat_name'){
            setCatName(value);
        }
    }
    const updateCategory = () => {
        let params = {
            cat_id : catId,
            folder_id : folder_id,
            cat_name : catName,
            cat_state : catState,
        };

        updateCategoryAPI(params).then((res) => {
            const index = categoryList.findIndex((value) => value.cat_id === catId);
            categoryList[index] = params;
            setEditDialog(!editDialog);

            if(res.success && res.message_code === 10016){
                console.log(res);
                setSnackbarState({
                    messageInfo : {
                        open : true,
                        message : res.message,
                        variant : "success"
                    }
                });
            }else if(!res.success){
                setSnackbarState({
                    messageInfo : {
                        open : true,
                        message : res.message,
                        variant : "error"
                    }
                });
            }else{
                console.log(res);
            }
        })
    }
    return ( 
        <React.Fragment>

            {snackbarState.messageInfo.open && <Snackbar
                message={snackbarState.messageInfo.message}
                open={snackbarState.messageInfo.open}
                closeSnackBar ={()=>{
                    setSnackbarState({
                    messageInfo:{
                        open:false,
                        message:null,
                        variant:'success'
                    }
                    })
                }}
                variant={snackbarState.messageInfo.variant}
                autoHideDuration={5000}
            />}

            <DripCategoryComponent
            folder_id = {folder_id}
            handleChange = {handleChange}
            folderList = {folderList}
            categoryList = {categoryList}
            contentLoader = {contentLoader}
            editDialog = {editDialog}
            handleDialog = {handleDialog}
            handleEdit = {handleEdit}
            catName = {catName}
            catId = {catId}
            catState = {catState}
            onUpdateChange = {onUpdateChange}
            updateCategory = {updateCategory}
            />
        </React.Fragment>
     );
}
 
export default ManageDripCategory;