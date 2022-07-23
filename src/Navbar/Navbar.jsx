import { onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IDGalleryCollectionRef } from '../lib/firebase-collection'



function Navbar(
    {
        searchList,setSearchList,
        searchFilter,setSearchFilter,
        owner,setOwner,
        profiles,navFile
    }
) {


    const [search,setSearch] = useState("")
    const [file,setFile] = useState("")
    
    useEffect(() => {
        const unsubscribe = onSnapshot(IDGalleryCollectionRef,snapshot => {

            setSearchFilter(snapshot.docs.map((doc,idx) => {
                return {
                    ...doc.data(),
                    name:doc.data().name
                }
            }))

            setSearchList(snapshot.docs.map((doc,idx) => {
                return {
                    ...doc.data(),
                    name:doc.data().name
                }
            }))

        })
        
        return () => {
            unsubscribe()
        }
    },[])

    useEffect(() => {
        console.log(navFile)
    },[
        navFile
    ])
    
    useEffect(() => {
        // console.log(searchFilter) 
        // console.log(searchList) 
        setSearchFilter(searchList.filter((currentStarter,idx) => {
            return (
                currentStarter.name.toLowerCase().includes(search.toLowerCase())
            )
        }))

    },[search])


    const handleLogOut = e => {
        setTimeout(() => {
            window.location.reload()
        })
    }

    return (
        <div className='navBar'>
            <div className="main">
                <div className="logo">
                    <img src="./img/pinterest.png" alt="" />
                </div>
                <div className="home">
                    <Link to="/">
                        <h3>
                            Home
                        </h3>
                        <ion-icon  className="mobile" name="home-outline"></ion-icon>
                    </Link>
                </div>
                <div className="create">
                    <Link to="/create">
                        <h3>
                            Create
                        </h3>
                        <ion-icon className="mobile" name="create-outline"></ion-icon>
                    </Link>
                </div>
            </div>
            <div className="searchBar">
                <input 
                    type="text"
                    placeholder='Search...'
                    value={search}
                    onChange={e => setSearch(e.target.value)} 
                />
            </div>
            <div className="settings">
                <div className="row">
                    <div className="saved">
                        <Link
                            to="/saved"
                        >
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.2988 6.79875L23.2013 0.70125C22.92 0.42 22.575 0.21375 22.2 0.10125V0H1.2C0.53625 0 0 0.53625 0 1.2V28.8C0 29.4637 0.53625 30 1.2 30H28.8C29.4638 30 30 29.4637 30 28.8V8.49375C30 7.85625 29.7488 7.24875 29.2988 6.79875ZM10.2 2.7H19.8V6.6H10.2V2.7ZM27.3 27.3H2.7V2.7H7.8V7.8C7.8 8.46375 8.33625 9 9 9H21C21.6638 9 22.2 8.46375 22.2 7.8V3.5175L27.3 8.6175V27.3ZM15 12.375C12.0187 12.375 9.6 14.7937 9.6 17.775C9.6 20.7562 12.0187 23.175 15 23.175C17.9813 23.175 20.4 20.7562 20.4 17.775C20.4 14.7937 17.9813 12.375 15 12.375ZM15 20.775C13.3425 20.775 12 19.4325 12 17.775C12 16.1175 13.3425 14.775 15 14.775C16.6575 14.775 18 16.1175 18 17.775C18 19.4325 16.6575 20.775 15 20.775Z" fill="black"/>
                            </svg>
                        </Link>
                    </div>
                    <div className="profile">

                        {navFile == "" ?  
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M15 28.4998C22.4557 28.4998 28.5 22.4556 28.5 14.9999C28.5 7.54419 22.4557 1.49999 15 1.49999C7.54425 1.49999 1.5 7.54419 1.5 14.9999C1.5 22.4556 7.54425 28.4998 15 28.4998ZM15 29.9997C23.2845 29.9997 30 23.2843 30 14.9999C30 6.71544 23.2845 0 15 0C6.7155 0 0 6.71544 0 14.9999C0 23.2843 6.7155 29.9997 15 29.9997Z" fill="black"/>
                            <path d="M6 23.7223C6 22.9476 6.579 22.2928 7.35 22.2073C13.1363 21.5668 16.89 21.6246 22.6635 22.2216C22.9518 22.2519 23.2251 22.3654 23.4499 22.5484C23.6747 22.7315 23.8414 22.976 23.9295 23.2522C24.0176 23.5283 24.0234 23.8242 23.9462 24.1036C23.8689 24.383 23.712 24.6339 23.4945 24.8256C16.6808 30.7648 12.7868 30.683 6.48 24.8316C6.1725 24.5466 6 24.1416 6 23.7231V23.7223Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M22.5863 22.9674C16.8585 22.3749 13.1588 22.3194 7.43175 22.9532C7.24324 22.9752 7.06945 23.0659 6.94365 23.208C6.81786 23.3501 6.74891 23.5336 6.75 23.7234C6.75 23.9379 6.83925 24.1412 6.99 24.2822C10.116 27.1816 12.4845 28.4919 14.7998 28.5001C17.1233 28.5084 19.6193 27.2086 23.0018 24.2612C23.1092 24.1655 23.1866 24.0407 23.2244 23.9019C23.2623 23.7632 23.259 23.6164 23.215 23.4794C23.171 23.3424 23.0881 23.2212 22.9765 23.1305C22.8649 23.0397 22.7293 22.9833 22.5863 22.9682V22.9674ZM7.2675 21.4622C13.1145 20.815 16.923 20.8735 22.7415 21.4757C23.1752 21.521 23.5863 21.6917 23.9245 21.967C24.2627 22.2424 24.5133 22.6103 24.6455 23.0258C24.7778 23.4414 24.7861 23.8865 24.6693 24.3066C24.5525 24.7268 24.3157 25.1037 23.988 25.3914C20.5568 28.3824 17.6993 30.0114 14.7953 30.0001C11.883 29.9896 9.1515 28.3329 5.97075 25.3817C5.74302 25.1695 5.56147 24.9127 5.43746 24.6273C5.31345 24.3418 5.24963 24.0339 5.25 23.7227C5.24891 23.1635 5.45416 22.6236 5.82643 22.2063C6.1987 21.7891 6.71182 21.5239 7.2675 21.4614V21.4622Z" fill="black"/>
                            <path d="M21 11.9999C21 13.5912 20.3679 15.1173 19.2426 16.2426C18.1174 17.3678 16.5913 17.9999 15 17.9999C13.4087 17.9999 11.8826 17.3678 10.7574 16.2426C9.63214 15.1173 9 13.5912 9 11.9999C9 10.4087 9.63214 8.88255 10.7574 7.75734C11.8826 6.63214 13.4087 6 15 6C16.5913 6 18.1174 6.63214 19.2426 7.75734C20.3679 8.88255 21 10.4087 21 11.9999Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M15 16.4999C16.1935 16.4999 17.3381 16.0258 18.182 15.1819C19.0259 14.338 19.5 13.1934 19.5 11.9999C19.5 10.8065 19.0259 9.6619 18.182 8.818C17.3381 7.97409 16.1935 7.49999 15 7.49999C13.8065 7.49999 12.6619 7.97409 11.818 8.818C10.9741 9.6619 10.5 10.8065 10.5 11.9999C10.5 13.1934 10.9741 14.338 11.818 15.1819C12.6619 16.0258 13.8065 16.4999 15 16.4999ZM15 17.9999C16.5913 17.9999 18.1174 17.3678 19.2426 16.2426C20.3679 15.1173 21 13.5912 21 11.9999C21 10.4087 20.3679 8.88255 19.2426 7.75734C18.1174 6.63214 16.5913 6 15 6C13.4087 6 11.8826 6.63214 10.7574 7.75734C9.63214 8.88255 9 10.4087 9 11.9999C9 13.5912 9.63214 15.1173 10.7574 16.2426C11.8826 17.3678 13.4087 17.9999 15 17.9999Z" fill="black"/>
                            </svg>
                        : 
                            <img src={navFile} alt="" />
                        }
                        <div className="dropdown-content">
                            {owner.data.authUsername.length == '' ? 
                            <Link to="/register">
                                Register
                            </Link>
                            : 
                            <></> }
                            <Link
                                to="/login"
                                onClick={ e => owner.data.authUsername.length == '' ? '' : handleLogOut(e)}
                            >
                                {owner.data.authUsername.length == '' ? 'Login' : 'Logout' }
                            </Link>
                            <Link to="/profile">
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar