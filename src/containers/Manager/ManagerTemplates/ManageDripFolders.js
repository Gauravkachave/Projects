import React,{useState,useEffect} from 'react';
import ManageDripFoldersComponent from '../../../components/Manager/ManagerTemplates/ManageDripFolders';
import {listAllFolderAPI,updateFolderListAPI} from '../../../helper/services/API/Manager';
import Snackbar from '../../../components/Snackbar/Snackbar';

const ManageDripFolders = (props) => {
    const [folderList, setFolderList] = useState('');
    const [contentLoader, setContentLoader] = useState(true);
    const [editDialog, setEditDialog] = useState(false);
    const [folderName, setFolderName] = useState(null);
    const [folderPass, setFolderPass] = useState(null);
    const [folderState, setFolderState] = useState(null);
    const [folderId, setFolderId] = useState(null);
    const [snackbarState,setSnackbarState] = useState({
        messageInfo:{
            open : false,
            message : null,
            variant : "success"
        }
    })
    useEffect(() =>{
        let params = {
            folder_type : "DRIP"
        }
        listAllFolderAPI(params).then((res) => {
            if(res.success && res.message_code === 10005){
                setFolderList(res.data);
            }
        })
    },[]);

    const handleEdit = (id) => {
        setEditDialog(!editDialog);
        const data=folderList.find(item => item.id === id );
        setFolderName(data.folder_name);
        setFolderPass(data.folder_password);
        setFolderState(data.folder_state);
        setFolderId(id);
    };

    const handleDialog = () => {
        setEditDialog(!editDialog);
    };

    const handleChange = (input,value) => {
        if(input === "folder_name"){
            setFolderName(value);
        }
        if(input === "folder_password"){
            setFolderPass(value);
        }
        if(input === "folder_state"){
            setFolderState(value);
        }
    }

    const handleSubmit = () => {
            let params={
                'folder_id' : folderId,
                'folder_name': folderName,
                'folder_password' : folderPass,
                'folder_state' : folderState,
                 folder_type : 'DRIP'
            };
            updateFolderListAPI(params).then((res) =>{
                setContentLoader(true);
                if(res.success && res.message_code === 10006){
                    setContentLoader(false);
                    setSnackbarState({
                        messageInfo:{
                            open : true,
                            message : res.message,
                            variant : "success"
                        }
                    })
                    setEditDialog(false);
                }else if(!res.success){
                    setSnackbarState({
                        messageInfo:{
                            open : true,
                            message : res.message,
                            variant : "error"
                        }
                    })
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

            <ManageDripFoldersComponent
            folderList = {folderList}
            contentLoader = {contentLoader}
            handleEdit = {handleEdit}
            editDialog = {editDialog}
            handleDialog = {handleDialog}
            folderName = {folderName}
            folderPass = {folderPass}
            folderState = {folderState}
            handleChange = {handleChange}
            handleSubmit={handleSubmit}
            />

        </React.Fragment>
     );
}
 
export default ManageDripFolders;