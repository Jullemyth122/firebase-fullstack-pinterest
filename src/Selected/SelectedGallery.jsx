import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { v4 } from 'uuid'
import { db, storage } from '../lib/firebase'
import { IDGalleryCollectionRef } from '../lib/firebase-collection'

function SelectedGallery({searchFilter,setSearchFilter,owner,setOwner}) {
    const location = useLocation()
    const {from} = location.state

    const [galleries,setGalleries] = useState([])
    const [uid,setUid] = useState(v4())
    // useEffect(() => {
    //     const unsubscribe = onSnapshot(IDGalleryCollectionRef,snapshot => {
    //         setGalleries(snapshot.docs.map(doc => ({
    //             id:doc.id,
    //             data:doc.data()
    //         })))
    //     })

    //     return () => {
    //         unsubscribe()
    //     }
    // },[])


    const Items = ({items}) => {
        return(
            <>
                <div className='items'>
                    <Link to="/selectedgallery" state={ { from: items } } >
                        <img src={items.img} alt="" />
                        <h5> {items.creator} </h5>
                    </Link>
                </div>
            </>
        )
    }

    const handleSavedButton = e => {

        if (owner.data.authEmail.length == '') {
            return alert("Please Register/Login First")
        }

        setUid(v4())

        // const saveStorageRef = ref(storage,`${owner.data.authEmail}-${uid}`)

        setDoc(doc(db,`IDSaveOtherGallery`,`${owner.data.authEmail}-${uid}`),{
            email:owner.data.authEmail,img:e.img
        })
        .then(res => {})
        .catch(err => {})

    }

    return (
        <div className='selected-gallery container-fluid'>
            <div className="main-item">
                <div className="card">
                    <div className="row">
                        <div className="col-sm-6">
                            <img src={from.img} alt="" />
                        </div>
                        <div className="col-sm-6 text-dom">
                            <h1>
                                {from.name}
                            </h1>

                            <h4>
                                Author: {from.creator}
                            </h4>
                        </div>
                        <button 
                            className='saved-button' 
                            onClick={ e => handleSavedButton(from)}
                        > 
                            Saved 
                        </button>
                    </div>
                </div>

            </div>

            <div className="other-items">
                {searchFilter.map((gallery,i) => {
                    let cards = [`card_small`,`card_medium`,`card_large`]
                    return (
                        <div
                        className={ 'card ' + cards[Math.floor(Math.random() * cards.length)]}
                        key={gallery.id}
                        >
                            <Items items={gallery}></Items>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default SelectedGallery