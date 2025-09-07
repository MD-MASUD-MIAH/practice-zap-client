
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContex';
import auth  from '../firebase/firebase.init.js'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
const AuthProvider = ({children}) => { 

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



 useEffect(()=>{


    const  unSubscribe = onAuthStateChanged(auth,currentUser=>{

        setUser(currentUser) 
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
       loading

    }
    return <AuthContext value={authInfo}>
          {children}
    </AuthContext>
};

export default AuthProvider;