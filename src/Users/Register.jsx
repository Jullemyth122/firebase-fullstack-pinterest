import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { authCollectionRef } from '../lib/firebase-collection'
import { useNavigate } from 'react-router-dom'

import {v4} from 'uuid'

function Register() {

  const [allAccounts,setAllAccounts] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(authCollectionRef,snapshot => {
        setAllAccounts(snapshot.docs.map(doc => ({
            id:doc.id,
            data:doc.data()
        })))
    })

    return () => {
        unsubscribe()
    }
},[])

  const [errors,setErrors] = useState({
    user_:'',
    email_:'',
    pass_:'',
  })
  
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const [uid,setUid] = useState(v4())
  
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const handleSubmit = e => {
    e.preventDefault()

    console.log(
      username.length >= 5 &&
      password.length >= 6 &&
      email == email.match(isValidEmail)
    )

    allAccounts.map((items) => {
      if (items.id == email) {
        return setErrors({email_:"Email is already taken"})
      }
      else if ( username.length >= 5 && email == email.match(isValidEmail) && password.length >= 6) {
        setUid(v4())    
        setDoc(doc(db,'auth',`${email}`),{
          authEmail:email,
          authUsername:username,
          authPassword:password
        },{merge:true})
        .then( res => {})
        .catch(err => {})


        setTimeout(() => {
            navigate("/login")
        },500)

        
      } else {
        return setErrors({
          user_: username.length >= 5 ? '' : 'Username is not min 5 letters',
          email_: email.match(isValidEmail) ? '' : "Please Input Email",
          pass_:password.length >= 6 ? '' : "Password is not min 6 letters",
        })
      }
    })
  }
  
  return (
    <div className='register-container'>
      <form onSubmit={handleSubmit}>
        <div className="username">
          <input type="text" placeholder='Username...'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <h6> {errors.user_} </h6>
        </div>
        <div className="email">
          <input type="text" placeholder='Email...' 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <h6>
          {errors.email_}
          </h6>
        </div>
        <div className="password">
          <input type="password" placeholder='Password...' 
            value={password}
            onChange={e=> setPassword(e.target.value)}
          />
          <h6>
          {errors.pass_}
          </h6>
        </div>

        <button type='submit'>
          Register
        </button>

        <div className="box-left"></div>
        <div className="box-left"></div>
        <div className="box-right"></div>
        <div className="box-right"></div>
        <div className="circle-bottom"></div>
        <div className="circle-bottom"></div>

      </form>
    </div>
  )
}

export default Register