import React,{useState,useEffect} from 'react';
import AddTemplateComponent from '../../../components/Manager/ManagerTemplates/AddTemplate';
import {listAllFolderAPI,listAllCategoryAPI,addTemplateAPI} from '../../../helper/services/API/Manager';
import Snackbar from '../../../components/Snackbar/Snackbar';


    const AddTemplate = (props) => {
        const[inputs,setInputs]=useState({
            folder_id:0, cat_id:0 , tmpl_type: 'NORMAL'
        });
        const[errors,setErrors]=useState({});
        const[contentLoader,setContentLoader]=useState(false);
        const[selectFolder,setSelectFolder]=useState(null);
        const[subCategory,setSubCategory]=useState(null);
        const [snackbarState, setSnackbarState] = useState({
            messageInfo: { open: false, message: null, variant: 'success' }
        });

        // useEffect(()=>{
        //     let params={
        //         folder_type:'NORMAL'
        //     }
        //     listAllFolderAPI(params).then((res)=>{
        //         if(res.success && res.message_code === 10005){
        //             setSelectFolder(res.data);
        //             // inputs['folder_id'] = "0";
        //             // setInputs({...inputs});
        //         }else{
        //             console.log(res);
        //         }
        //     })
        // },[])

        useEffect(() => {
            (async () => {
                let folderListData = await getFolderList();
                setSelectFolder(folderListData);
                inputs['folder_id'] = "0";
                 setInputs({...inputs});
                 
                let initialFolderId = folderListData[0].folder_id;
                let categoryListData = await getCategoryList(initialFolderId);
                setSubCategory(categoryListData);
                inputs['cat_id'] = "0";
                 setInputs({...inputs});
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
            // let params = {
            //     folder_id : value
            // }
            // setContentLoader(true);
            // listAllCategoryAPI(params).then((res)=>{
            // setContentLoader(false);
            //     if(res.success && res.message_code === 10017){
            //         setSubCategory(res.data);
            //     }
            // })

            if(input === 'folder_id'){
                let folderId = value;
                (async () => {
                    let categoryListData = await getCategoryList(folderId);
                    setSubCategory(categoryListData);
                })().catch(err => { console.error('Caught error while getting category list ',err); });
                inputs[input] = value;
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
            let errordata=['folder_id','tmpl_name','tmpl_message','tmpl_type'];

            errordata.forEach(value => {
                if (!inputs[value] || (value !== 'folder_id' && !inputs[value].trim())) {
                    isValid = false;
                    error[value] = "This field is required";
                }
                if(value === 'folder_id' && inputs[value] === '0'){
                    isValid = false;
                    error[value] = "This field is required";
                }
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
            />
            </React.Fragment>
            
        );

        }
export default AddTemplate;