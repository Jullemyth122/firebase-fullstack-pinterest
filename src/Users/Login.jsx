import { onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { authCollectionRef } from '../lib/firebase-collection'
import { useNavigate } from 'react-router-dom'

function Login({
    owner,setOwner,
    setNavFile,
    profiles
}) {

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
        email_:'',
        pass_:'',
    })
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const handleSubmit = (e) => {
        e.preventDefault()
        
        allAccounts.map((items) => {
        if (items.id == email && password.length >= 6) {
            
            profiles.map((item,idx) => {
                // console.log(item,items)
                if (item.email == items.data.authEmail) {
                    setNavFile(item.img)
                    // console.log("Shit")
                }
            })
            return (
                setOwner(items),
                setErrors({
                    email_:'',
                    pass_:''
                })
            )
        }  else if ( items.id == email && password.length >= 6 == false) {
            return setErrors({
                email_: items.id == email.match(isValidEmail) ? '' : "Invalid Email",
                pass_:password == items.data.authPassword ? '' : "Invalid Password",
            })
        } else {
            if (items.id === email) {
                return setErrors({
                    email_: items.id == email.match(isValidEmail) ? '' : "Invalid Email",
                    pass_:password.length >= 6 ? '' : "Invalid Password",
                })
            }
        }
        })
    }

    const handleNavigate = () => {
        setTimeout(() => {
            navigate("/")
        },500)
    }

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
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

                <button type='submit' onClick={handleNavigate} >
                Login
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

export default Login