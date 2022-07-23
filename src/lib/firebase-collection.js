import {collection} from 'firebase/firestore'
import { db } from './firebase'

export const authCollectionRef = collection(db,'auth')
export const IDSaveGalleryCollectionRef = collection(db,'IDSavedGallery')
export const IDGalleryCollectionRef = collection(db,'IDGallery')
export const IDProfilePicCollectionRef = collection(db,'ProfileID')
export const IDSavingOtherGallery = collection(db,'IDSaveOtherGallery')

