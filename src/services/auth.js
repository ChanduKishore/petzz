import { getAuth,signOut,onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router";
import DB from '../services/database'

const auth = getAuth();

async function trackuserSigninStatus(setUserUid){
     onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setUserUid(uid)
        
          // ...
        } else {
          // User is signed out
          // ...
          setUserUid(null)
        }
      });
  }

  function logout(setUser,navigate){
    signOut(auth).then(() => {
    console.log('logout')
    setUser(null) 
    navigate('/', {replace:true})
// Sign-out successful.
}).catch((error) => {
// An error happened.
});
}

function login(e,setUser,email,password){
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('login sucessful')
        setUser(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
    }   

function signUp(e,setUser,username,email,password,mobile,address){
    e.preventDefault()
    console.log(username,email,password)
    
         createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
         console.log('user created')
         const data={username,mobile,address,fullname:username}
         DB.addData('Users',user.uid,data).then(()=>{
             console.log('data stored to db')
             setUser(user)
             })

         // ...
         })
         .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         // ..
         })
}

export default {login,signUp,logout, trackuserSigninStatus}