import React,{useState,useEffect} from 'react';
import ManageFoldersComponent from '../../../components/Manager/ManagerTemplates/ManageFolders';
import {listAllFolderAPI,updateFolderListAPI} from '../../../helper/services/API/Manager';
import Snackbar from '../../../components/Snackbar/Snackbar';

const ManageFolders = () => {
    const [inputs,setInputs]=useState({});
    const [folders,setFolders]=useState(null);
    const [contentLoader, setContentLoader] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [folderId,setFolderId]=useState(null);
    const [folderName,setFolderName]=useState(null);
    const [folderPassword,setFolderPassword]=useState(null);
    const [folderState,setFolderState]=useState(null);
    const handleExpandClick = () => { setExpanded(!expanded) };

    const [snackbarState,setSnackbarState]=useState({
        messageInfo:{
            open:false,
            message:null,
            variant:'success'
        }
    })

    useEffect(() => {
        let params={
            folder_type:'NORMAL',
        }
        setContentLoader(true);
        listAllFolderAPI(params).then((res) => {
            setContentLoader(false);
            if(res.success && res.message_code ===10005 ){
                setFolders(res.data);
                inputs['folder_id'] = "0";
                setInputs({...inputs});
            }else{
                console.log(res);
            }
        })        
    },[]);


        const handleEdit = (id) => {
            setEditDialog(!editDialog);
            const data=folders.find(item => item.id === id );
            console.log(data);
            setFolderName(data.folder_name);
            setFolderPassword(data.folder_password);
            setFolderState(data.folder_state);
            setFolderId(id);
        }
            

        const handleDialog = () => {
            setEditDialog(!editDialog);
        }

        const updateCategory = () => {
            let params={
                'folder_id':inputs['folder_id'],
                'folder_name':folderName,
                'folder_password':folderPassword,
                'folder_state':folderState,
                folder_type:'NORMAL'
            }
            updateFolderListAPI(params).then((res)=>{
                console.log(res);
            })
        }
        const onUpdateChange = (input,value) => {
            if(input === 'folder_state'){
                setFolderState(value);
            }
            if(input === 'folder_name'){
                setFolderName(value);
            }
            if(input === 'folder_password'){
                setFolderPassword(value);
            }
        }

    return ( 
        <div>
        <ManageFoldersComponent
        folders={folders}
        contentLoader={contentLoader}
        handleEdit={handleEdit}
        editDialog={editDialog}
        handleEdit={handleEdit}
        inputs={inputs}
        handleDialog={handleDialog}
        folderState={folderState}
        onUpdateChange={onUpdateChange}
        folderName={folderName}
        folderPassword={folderPassword}
        updateCategory={updateCategory}
        />
        </div>
     );
}
export default ManageFolders;

