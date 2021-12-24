import React,{useState, useEffect} from 'react';
import ManageBirthdayComponent from '../../../components/Manager/ManagerTemplates/ManageBirthday';
import {dropDownListAllAPI} from '../../../helper/services/API/Contacts';

const ManageBirthday = () => {
    const [inputs, setInputs] = useState({
        "select_group" : "select_group"
    });
    const [selectGroups, setSelectGroups] = useState(null);
    const [errors, setErrors] = useState({});
    const [publicGroupList,setPublicGroupList] = useState(null);
    const [privateGroupList, setPrivateGroupList] = useState(null);

    useEffect(() => {
        GetPublicGroupList();
        GetPrivateGroupList();
       
    },[]);

    const GetPublicGroupList = () => {
        let params = {
            grp_type : "PUBLIC"
        };
        dropDownListAllAPI(params).then((res) => {
            if(res.success && res.message_code === 10011){
                setPublicGroupList(res.data);
            }
        });
    };

    const GetPrivateGroupList = () => {
        let grpParams = {
            grp_type : "PRIVATE"
        };
        dropDownListAllAPI(grpParams).then((res) => {
            if(res.success && res.message_code === 10011){
                setPrivateGroupList(res.data);
            }
        });
    }

    const handleChange = (input,value) => {
        let isError = " ";

        inputs[input] = value;
        errors[input] = isError ? isError : " ";

        setInputs({ ...inputs });
        setErrors({ ...errors });
    };

    const handleValidation = () => {
        let isValid = true;
        let error = errors;
        let errordata = ["select_group", "birthday_message"];

        errordata.forEach(value => {
            if(!inputs[value] || !inputs[value].trim()){
                isValid=false;
                error[value]='This field is required';
            }
        })
        setErrors({...error});
        return isValid;
    };

    const handleSubmit = () => {
        if(handleValidation()){

        }
    };

    return ( 
        <React.Fragment>
            <ManageBirthdayComponent
            inputs = {inputs}
            selectGroups = {selectGroups}
            errors = {errors}
            handleChange = {handleChange}
            handleSubmit = {handleSubmit}
            publicGroupList = {publicGroupList}
            privateGroupList = {privateGroupList}
            />
        </React.Fragment>
     );
}
 
export default ManageBirthday;