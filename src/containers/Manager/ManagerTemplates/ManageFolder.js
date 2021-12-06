import React,{useState,useEffect} from 'react';
import ManageFoldersComponent from '../../../components/Manager/ManagerTemplates/ManageFolders';
import {listAllFolderAPI} from '../../../helper/services/API/Manager';
const ManageFolders = () => {
   const[folders,setFolders]=useState(null);
    const [contentLoader, setContentLoader] = useState(false);

    useEffect(() => {
        let params={
            folder_type:'NORMAL',
        }
        setContentLoader(true);
        listAllFolderAPI(params).then((res) => {
            if(res.success && res.message_code ===10005 ){
                console.log(res)
                setFolders(res.data);
            setContentLoader(false);
            }else{
                console.log(res);
            }
        })        
    },[]);
    return ( 
        <div>
        <ManageFoldersComponent
        folders={folders}
        contentLoader={contentLoader}
        />
        </div>
     );
}
export default ManageFolders;

