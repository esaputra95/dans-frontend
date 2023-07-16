/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from "axios";
// import 'dotenv/config'

export const getToken = ()=> {
    return `Bearer ${sessionStorage.getItem('token')}`
}

const header = () => {
    const token = getToken();
    console.log({token});
    
    return {
        'X-Custom-Header': 'foobar',
        'Content-Type': 'application/json',
        'Authorization': token
    }
}


export const service = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 45000,
    headers: header()
});