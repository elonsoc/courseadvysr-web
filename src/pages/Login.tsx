import React, { useState } from 'react';
import { ep } from '../cfg';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login: React.VFC = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();
    const handleSubmit = () => {
        Axios({
            method: "post",
            url: ep + "login",
            data: { username: username.toLowerCase(), password: password },
            withCredentials: true,
          })
            .then((response) => {
              if (response.status === 200) {
              
                //possibly stupid way of clearing but idgaf
      
                setUsername("")
                setPassword("")
                history.push("/courses")
              }
            })
            .catch((response) => {
              //TODO: alert user to wrong password or without password
              setPassword("")
              alert("That isn't your password. Try again?");
              
              
            });    
    }
    

    return (
        <>
            <div>
                <form>
                    <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    
                    <input type="button" value="Submit" onClick={handleSubmit}/>
                </form>
            </div>
        </>);
};

export default Login;