import './style.scss';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import Guest from './Users/Guest';
import Authentication from './Users/Login';
import Gallery from './Gallery/Gallery';
import SavedItem from './Saved/SavedItem';
import SelectedGallery from './Selected/SelectedGallery';
import SelectedSaveGallery from './Selected/SelectedSaveGallery';
import CreatePin from './Users/CreatePin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Users/Register';
import Login from './Users/Login';
import { useEffect, useState } from 'react';
import Profile from './Users/Profile';
import { IDGalleryCollectionRef, IDProfilePicCollectionRef, IDSaveGalleryCollectionRef } from './lib/firebase-collection';
import { onSnapshot } from 'firebase/firestore';
function App() {

  const [owner,setOwner] = useState({
    id:{},
    data:{authUsername:'',authEmail:'',authPassword:''}
  })

  const [profile,setProfile] = useState({
    id:{},
    data:{email:''}
  })

  const [ownerGalleries,setOwnerGalleries] = useState([])

  const [searchList,setSearchList] = useState([])
  const [searchFilter,setSearchFilter] = useState(searchList)

  const [profiles,setProfiles] = useState([])
  let [navFile,setNavFile] = useState("")

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

    const unsubscribe2 = onSnapshot(IDProfilePicCollectionRef,snapshot => {

      setProfiles(snapshot.docs.map((doc,idx) =>{
        return {
          ...doc.data(),
          email:doc.data().email
        }
      }))
    })

    const unsubscribe3 = onSnapshot(IDSaveGalleryCollectionRef,snapshot => {
      setOwnerGalleries(snapshot.docs.map((doc,idx) => {
        return {
          ...doc.data(),
          name:doc.data().name
        } 
      }))
    })

    return () => {
      
      unsubscribe()
      unsubscribe2()
      unsubscribe3()

    }

  },[])

  // useEffect(() => {
  //   profiles.map((item,idx) => {
  //       if (item.email == owner.data.authEmail) {
  //       setNavFile(item.img)
  //       }
  //       console.log("Shit")
  //   })
  // },[])

  return (
    <div className="App">
      <Router>
        <Navbar  
          searchList={searchList} 
          setSearchList={setSearchList}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          owner={owner} setOwner={setOwner}
          navFile={navFile} setNavFile={setNavFile}
        ></Navbar>
        <Routes>
          <Route path="/guest" element={<Guest></Guest>}></Route>
          <Route path="/saved" element={<SavedItem owner={owner} setOwner={setOwner}  ></SavedItem>}></Route>
          <Route 
              path="/selectedgallery" 
              element={<SelectedGallery
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              owner={owner} 
              setOwner={setOwner}
            ></SelectedGallery>}></Route>
          <Route path="/selectedsavedgallery" element={<SelectedSaveGallery owner={owner} setOwner={setOwner} ></SelectedSaveGallery>}></Route>
          <Route 
            path="/login" 
            element={<Login  
              owner={owner} 
              setOwner={setOwner}
              setNavFile={setNavFile}
              profiles={profiles}
            >
                
            </Login>}>

          </Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route 
            path="/" 
            element={<Gallery
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
            >
          </Gallery>}></Route>
          <Route path="/create" element={<CreatePin owner={owner} setOwner={setOwner}></CreatePin>}></Route>
          <Route 
            path="/profile" 
            element={<Profile 
            owner={owner} 
            setOwner={setOwner}
            profile={profile} setProfile={setProfile}
            profiles={profiles} setProfiles={setProfiles}
            navFile={navFile} setNavFile={setNavFile}
            setOwnerGalleries={setOwnerGalleries} ownerGalleries={ownerGalleries}
            ></Profile>}
            ></Route>
        </Routes>
      </Router>
    </div>
  );

}

export default App;
