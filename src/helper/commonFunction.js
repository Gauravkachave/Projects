import { setCookie } from '../utils/CookieLocalStorage';
// import { useHistory } from 'react-router';

export const userLogout = (props) => {
// const history=useHistory();
console.log(props);
    let deleteSessionTokenCookie = setCookie('session_token', null, { path: '/', sameSite: true });
    if (deleteSessionTokenCookie && props.history) {
        return props.history.push('/auth/signin');
    }
    else if (!props.success && props.message_code === 10001) {
        window.location.assign('/auth/login?sessexpire=true');
    }  
}