import React, {useState} from 'react'
import { AuthContext } from './AuthContext';

const Auth = (props) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [role, setRole] = useState(localStorage.getItem('role'));

    return (
        <AuthContext.Provider value={{
            token,
            user,
            role,
            setToken,
            setUser,
            setRole
          }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default Auth;
