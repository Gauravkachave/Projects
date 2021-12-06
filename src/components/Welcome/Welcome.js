import React,{useEffect} from 'react';
const Welcome = (props) => {

    useEffect(()=>{
props.history.push('/auth/signin')
    })
    return ( <div>

    </div> );
}
 
export default Welcome;