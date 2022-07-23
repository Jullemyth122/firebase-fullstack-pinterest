import { onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { IDGalleryCollectionRef } from '../lib/firebase-collection'
import { Link } from 'react-router-dom'
function Gallery({searchFilter,setSearchFilter}) {

    const Items = ({items}) => {
        return(
            <>
                <div className='items'>
                    <Link to="/selectedgallery" state={ { from: items } } >
                        <img src={items.img} alt="" />
                        <h5> {items.name} </h5>
                    </Link>
                </div>
            </>
        )
    }

    return (
        <div className='gallery container-fluid'>
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
    )
}

export default Gallery