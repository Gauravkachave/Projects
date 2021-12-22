import React,{useState,useEffect} from 'react';
import AddTemplateComponent from '../../../components/Manager/ManagerTemplates/AddTemplate';
import {listAllFolderAPI,listAllCategoryAPI,addTemplateAPI} from '../../../helper/services/API/Manager';
import Snackbar from '../../../components/Snackbar/Snackbar';


    const AddTemplate = (props) => {
        const[inputs,setInputs]=useState({
            folder_id:'0', cat_id:'0' , tmpl_type: 'NORMAL'
        });
        const [errors,setErrors]=useState({});
        const [contentLoader,setContentLoader]=useState(false);
        const [selectFolder,setSelectFolder]=useState(null);
        const [subCategory,setSubCategory]=useState(null);
        const [textAreaCharLeft,setTextAreaCharLeft]=useState(600);
        const [textAreaCharLimit] = useState(600);
        const [mesError,setMesError]=useState(null);
        const [snackbarState, setSnackbarState] = useState({
            messageInfo: { open: false, message: null, variant: 'success' }
        });

        useEffect(() => {
            (async () => {
                let folderListData = await getFolderList();
                setSelectFolder(folderListData);
                // inputs['folder_id'] = "0";
                //  setInputs({...inputs});
                 
                let initialFolderId = folderListData[0].folder_id;
                let categoryListData = await getCategoryList(initialFolderId);
                setSubCategory(categoryListData);
                // inputs['cat_id'] = "0";
                //  setInputs({...inputs});
            })
            ().catch(err => {
                console.error('Caught error while getting folder and category list ',err);
            });
        }, []);

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
            try {
                let categoryList = await listAllCategoryAPI({ folder_id: folderId });
                if(categoryList.success && categoryList.data){ return categoryList.data; }
                else { return []; }
            } catch (error) {
                throw error;
            };
        }

        const onHandleChange = (input,value) => {
            let isError = '';
            if(input === 'folder_id'){
                let folderId = value;
                (async () => {
                    let categoryListData = await getCategoryList(folderId);
                    setSubCategory(categoryListData);
                })().catch(err => { console.error('Caught error while getting category list ',err); });
                inputs[input] = value;
            }
            if(input === 'tmpl_message') {
                const byteSize = str => new Blob([str]).size;
                let inputValLength = byteSize(value);
                setTextAreaCharLeft((inputValLength <= textAreaCharLimit) ? textAreaCharLimit-inputValLength : textAreaCharLeft);
                isError = (inputValLength > textAreaCharLimit) ? setMesError('You have exceeded character limit') : '';
                value = (inputValLength <= textAreaCharLimit) ? value : inputs[input];
                inputs[input] = value;
            }
            else {
                inputs[input] = value;
            }
            

        inputs[input]=value;
        errors[input]= isError ? isError : '';

        setInputs({...inputs});
        setErrors({...setErrors});
        }

        const handleValidation = () => {
            let isValid=true;
            let error=errors;
            let errordata=['folder_id','cat_id','tmpl_name','tmpl_message','tmpl_type'];

            errordata.forEach(value => {
                if(value === 'folder_id' || value === 'cat_id'){
                    if(inputs[value] === '0'){
                    isValid = false;
                    error[value] = "This field is required";
                }}
                else{
                if(!inputs[value] || !inputs[value].trim()){
                    isValid=false;
                    error[value]='This field is required';
                }}
            })
            setErrors({...error});
            return isValid;
        }

        const onCreateTemplateBtn = () => {
            if(handleValidation()){
                let params=inputs;
                setContentLoader(true);
                addTemplateAPI(params).then((res)=> {
                setContentLoader(false);
                    if(res.success && res.message_code === 10018){
                        setSnackbarState({
                            messageInfo:{
                                open:true,
                                message:res.message,
                                variant:'success'
                            }
                        })
                        setTimeout(() => {
                            props.history.push({ pathname: '/manager/manage-normal-template', });
                        }, 1000);
                    }
                })
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
            />}
            <AddTemplateComponent
            onHandleChange={onHandleChange}
            errors={errors}
            inputs={inputs}
            contentLoader={contentLoader}
            onCreateTemplateBtn={onCreateTemplateBtn}
            selectFolder={selectFolder}
            subCategory={subCategory}
            textAreaCharLeft={textAreaCharLeft}
            textAreaCharLimit={textAreaCharLimit}
            mesError={mesError}
            />
            </React.Fragment>
            
        );

        }
export default AddTemplate;