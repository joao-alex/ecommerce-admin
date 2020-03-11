import React, { useState, useEffect} from 'react';
import {Button,Alert} from 'react-bootstrap';
import './index.css';

import api from '../../services/api';
import { isAuthenticated } from '../../services/auth'

export default function Login( { history }) {
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');


    async function handleSubmit(e){
        e.preventDefault();

        api.post('/admins/auth',{username,password})
        .then(response => { 
            localStorage.setItem('token',`Bearer ${response.data.token}`)

            history.push('/app')
        })
        .catch(error => {
            switch (error.response.status) {
                case 401:
                    setError('Senha incorreta!');
                    break;
                case 404:
                    setError('Usuario Inexistente!')
                    break;
                default:
                    break;
            }
        });
    }

    useEffect(()=>{
        async function validate(){
            const response = await isAuthenticated();
            if(response)
                history.push('/app')
        }
        validate();
    })

    return (
        <div className="login-container">
            <form onSubmit={(e)=>handleSubmit(e)}>
                {error!=='' && <Alert variant='danger'>{error}</Alert>}
                <input
                    placeholder="Digite seu email"
                    value={ username }
                    onChange={ event => setUsername(event.target.value) }
                    required
                />
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={ password }
                    onChange={ event => setPassword(event.target.value) }
                    required
                />  
                <Button variant="info" type="submit">Entrar</Button>   
            </form>
        </div>
    )
}