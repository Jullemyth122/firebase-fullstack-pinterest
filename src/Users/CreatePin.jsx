import { addDoc, setDoc,doc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useRef, useState } from 'react'

import {v4} from 'uuid'
import { db, storage } from '../lib/firebase'
import { authCollectionRef ,IDGalleryCollectionRef, IDSaveGalleryCollectionRef } from '../lib/firebase-collection'

function CreatePin({owner,setOwner}) {

  const user = owner.data.authUsername

  const [name,setName] = useState('')
  const [file,setFile] = useState(null)
  const [uid,setUid] = useState(v4())
  const [errors,setErrors] = useState({})

  const [progress,setProgress] = useState(null)

  const hiddenFileInput2 = useRef(null);

  const handleClickGallery2 = event => {
    hiddenFileInput2.current.click();
  };

  const handleChangeGallery2 = event => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
  };

  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = "Name/Photo is Required"
    }

    return errors
  }

  const handleSubmit = e => {
    e.preventDefault()
    setUid(v4())

    let errors = validate()
    
    if (user.length == '') {
      return alert("Please Register/Login First")
    } 

    if (Object.keys(errors).length && file == null) {
      // else {
      return setErrors(errors)
      // }
    }


    const uploadFile = () => {

      const userStorageRef = ref(storage,`user-number-upload-galleries/${user}-${uid}-${file.name}`)
      const allStorageRef = ref(storage,`all-galleries/${user}-${owner.data.authEmail}-${uid}-${file.name}`)
    
      let list = [userStorageRef,allStorageRef]
      let list2 = ['IDSavedGallery','IDGallery']

      for (let i = 0; i < list.length; i++) {
        let uploadUserStorageTask = uploadBytesResumable(list[i],file)
        uploadUserStorageTask.on("state_changed",(snap) => {
          const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(progress);
  
          switch(snap.state) {
            case "paused":
              console.log("upload is paused")
              break;
            case "running":
              console.log("Upload is Running");
              break;
            default:
              break;
          }
        },(err) => {
          console.log(err)
        },() => {
          getDownloadURL(uploadUserStorageTask.snapshot.ref)
          .then( async (downloadURL) => {
            // addDoc(list2[i],{
            //   name:name,img:downloadURL
            // })
            await setDoc(doc(db,list2[i],`${user}-${uid}`),{
              creator:user,name:name,img:downloadURL,email:owner.data.authEmail
            })
            .then( res => {})
            .catch(err => {})

          })
        })
        
      }

    
    }

    uploadFile()

  }

  return (
    <div className='create-container'>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-6 d-flex align-items-center justify-content-center">
              <div className="imgForm">
                <img onClick={handleClickGallery2} ref={hiddenFileInput2} onChange={handleChangeGallery2} src={file == null ? '' : URL.createObjectURL(file)} style={ file == null ? {display:"none"} : {display:"block"}} alt="" />
                <div className="imageOpener" onClick={handleClickGallery2} style={ file == null ? {display:"grid"} : {display:"none"}}>
                  <div className="card-body">
                    <ion-icon style={{fontSize:'35px'}} name="arrow-up-circle-outline"></ion-icon>
                    <h4> 
                      Please Upload Images Here.
                    </h4>
                  </div>
                  <input
                    accept=".png, .jpg, .jpeg" 
                    type="file"
                    name="photo"
                    ref={hiddenFileInput2}
                    onChange={handleChangeGallery2}
                    style={{display:'none'}} 
                  /> 
                </div>
              </div>
            </div>
            <div className="col-6 ">
              <form action="" onSubmit={handleSubmit}>
                <input 
                  placeholder='Add Your Title...'
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <button type='submit' disabled={progress !== null && progress < 100} >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin