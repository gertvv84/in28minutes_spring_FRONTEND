import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

export default function WelcomeComponent() {
    const {username} = useParams();
    const [message,setMessage] = useState(null);

    function callHelloWorldRestApi() {
        console.log('click');

        retrieveHelloWorldPathVariable(username)
            .then((response) => successfulResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log('cleanup'));
    }

    function successfulResponse(response) {
        setMessage(response.data.message);
    }

    function errorResponse(response) {
        console.log('error',response);
    }

    return(
        <div className="Welcome">
            <div>Welcome {username}</div>
            <div><Link to="/todos">Manage your Todo's</Link></div>
            <div>
                <button className="btn btn-success" onClick={callHelloWorldRestApi}>Call Hello World</button>
            </div>
            
            <div className="text-info">
                {message}
            </div>
        </div>
    )
}