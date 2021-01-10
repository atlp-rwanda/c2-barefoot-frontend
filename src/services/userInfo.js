import React from 'react'
import { Redirect } from "react-router-dom";

const token = localStorage.getItem('barefootUserToken'); 

export function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}
  
//   console.log(parseJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZWZhY2U0M2MtMmU0OS00NzNiLWJiZTItMzA1ZDFhNTE5MGYxIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjEwMDA1MTI1LCJleHAiOjE2MTA2MDk5MjV9.LJlr8HowpIhJ4rJ9EwIFBw71xoaeY0AD7BCS52FdExk'))
  
export function checkUser(token){
    const user = parseJwt(token);
    console.log(user)
    switch(user.role){
        case '29df247e-c86e-4fc7-b2fd-26b57f975b88':
            return 'accommodation-supplier'
            break
        case '45429837-ed2c-435d-bc22-ad9c5dbe3782':
            return 'requester'
            break
        case '47e327b8-0073-4443-968b-ef8849ddfb49':
            return 'travel-team-member'
            break
        case '4fd084a0-cdd6-47a5-aaf5-5fdc8b5629dd':
            return 'travel-admin'
            break
        case '7254a9e7-2e1b-4f83-ad73-78b90dd3df77':
            return 'manager'
            break
        case 'eface43c-2e49-473b-bbe2-305d1a5190f1':
            return 'administrator'
            break
        default:
            break
    }
}

export function toBeRedirected(){
    const user = checkUser(token);
    console.log(user)
    if(user != 'travel-admin'){
        console.log('you are not')
        return true
    }else{
        console.log("welcome")
        return false
    }
}

export function redirectUser(){
    <Redirect to= '/profile'/>
}