
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContex';
import {auth} from '../../src/firebase/firebase.init'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
const AuthProvider = ({children}) => {  
    const provider = new GoogleAuthProvider

    const [user,setUser]= useState(null) 
    const [loading,setLoading] = useState(true)

    const createUser = (email,password)=>{

setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }  

    const singIn = (email,password)=>{
           setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }



const logOut = ()=>{
   setLoading(true)
     return signOut(auth)
}

const googleLogin = ()=>{

    setLoading(true) 

    return signInWithPopup(auth,provider)
}

 useEffect(()=>{


    const  unSubscribe = onAuthStateChanged(auth,currentUser=>{

        setUser(currentUser)  

        console.log('user in the auth sate change ', currentUser);
        
        setLoading(false)
    })

 return ()=>{

    unSubscribe()
 }
 },[])











    const authInfo = {
         logOut,
       createUser,
       singIn, 
       user,
       loading ,
       googleLogin

    }
    return <AuthContext value={authInfo}>
          {children}
    </AuthContext>
};

export default AuthProvider;