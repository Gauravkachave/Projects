import React,{useEffect,useState} from 'react';
import ManageCategoriesComponent from '../../../components/Manager/ManagerTemplates/ManageCategories';
import {listAllFolderAPI,listAllCategoryAPI,updateCategoryAPI} from '../../../helper/services/API/Manager';
import Snackbar from '../../../components/Snackbar/Snackbar';

const ManageCategories = () => {
    const [inputs,setInputs]=useState({});
    const [errors,setErrors]=useState({});
    const [selectFolder,setSelectFolder]=useState('');
    const [subCategory,setSubCategory]=useState({});
    const [contentLoader, setContentLoader] = useState(false);

    const [editDialog, setEditDialog] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [catName,setCatName]=useState(null);
    const [catState,setCatState]=useState(null);
    const [catId,setCatId]=useState(null);
    const handleExpandClick = () => { setExpanded(!expanded) };
    const [snackbarState,setSnackbarState]=useState({
        messageInfo:{
            open:false,
            message:null,
            variant:'success'
        }
    })

        const handleEdit = (id) => {
            setEditDialog(!editDialog);
                const data=subCategory.find(item => item.cat_id === id );
                setCatName(data.cat_name);
                setCatState(data.cat_state);
                setCatId(id);
            }
        const handleDialog = () => {
            setEditDialog(!editDialog);
        }

        useEffect(()=>{
            let params={
                folder_type:'NORMAL'
            }
            listAllFolderAPI(params).then((res)=>{
            setContentLoader(true);
                if(res.success && res.message_code === 10005){
                    setContentLoader(false);
                    setSelectFolder(res.data);
                    inputs['folder_id'] = "0";
                    setInputs({...inputs});
                }else{
                    console.log(res);
                }
            })
        },[])


        const handleChange = (input,value) => {
            let params={
                folder_id : value
            }
            setContentLoader(true);
            listAllCategoryAPI(params).then((res)=>{
            setContentLoader(false);
                if(res.success && res.message_code === 10017){
                    setSubCategory(res.data);
                }
            })

            let isError = '';
            inputs[input]=value;
            errors[input]= isError ? isError : '';

            setInputs({...inputs});
            setErrors({...setErrors});

        }

        const updateCategory = () => {
            let params={
                'cat_id':catId,
                "folder_id":inputs['folder_id'],
                'cat_name':catName,
                'cat_state':catState,
            }

            updateCategoryAPI(params).then((res) => {
                const index = subCategory.findIndex((value) => value.cat_id === catId);
                subCategory[index] = params;
                console.log(subCategory);
                setEditDialog(!editDialog);
                console.log(res);
                if(res.success && res.message_code === 10016){
                    setSnackbarState({
                        messageInfo:{
                            open:true,
                            message:res.message,
                            variant:'success'
                        }
                    })
                }else{
                    console.log(res);
                }
                
            })
        }

        const onUpdateChange = (input,value) => {
            if(input === 'cat_state'){
                setCatState(value);
            }
            if(input === 'cat_name'){
                setCatName(value);
            }
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
            <ManageCategoriesComponent
            selectFolder={selectFolder}
            inputs={inputs}
            errors={errors}
            handleChange={handleChange}
            subCategory={subCategory}
            contentLoader={contentLoader}
            catName={catName}
            catState={catState}
            handleExpandClick={handleExpandClick}
            handleEdit={handleEdit}
            editDialog={editDialog}
            expanded={expanded}
            handleDialog={handleDialog}
            updateCategory={updateCategory}
            onUpdateChange={onUpdateChange}
            />
        </React.Fragment>
     );
}
 
export default ManageCategories;
