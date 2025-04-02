
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

export default function LoginComponent() {
    const authContext = useAuth();

    const [username,setUsername] = useState('in28minutes');
    const [pswd,setPswd] = useState('dummy');
    const [showErrorMessage,setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    function handleUserNameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPswd(event.target.value);
    }

    async function handleSubmit() {
        if(await authContext.login(username,pswd)){
            navigate(`/welcome/${username}`);
        }else{
            setShowErrorMessage(true);
        }
    }

    return(
        <div className="Login">
            {showErrorMessage && <div className="errorMessage">Authentication Failed!</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUserNameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={pswd} onChange={handlePasswordChange}></input>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>


        </div>
    )
}
