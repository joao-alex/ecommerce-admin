import api from './api';

export const isAuthenticated = async () => {
    const token = localStorage.getItem('token');
    if(token){
        try{
            await api.get('/validate',{headers:{Authorization:token}})
            console.log('passou')
            return true;
        }catch(error){
            return false
        }
    }else return false;
};