import React,{useEffect} from 'react';
import { isAuthenticated } from '../../services/auth'

export default function Main({history}){
    
    useEffect(()=>{
        async function validate(){
            const response = await isAuthenticated();
            if(!response)
                history.push('/')
        }
        validate();
    })

    return(
        <p>Main</p>
    )
}