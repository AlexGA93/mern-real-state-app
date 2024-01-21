import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserStoreType } from "../types/types";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../utils/firebase";

/**
 * * FIREBASE RULES
 service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read; 
      allow write: if 
      request.resource.size < 2*1024*1024 && 
      request.resource.contentType.matches('image/.*')
    }
  }
}
 */

const Profile = () => {
  // access to redux state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { currentUser }: UserStoreType = useSelector(
    (state: RootState) => state.user
  );

  const [formData, setFormData] = useState({avatar:''});
  // state to deal with image upload
  const [file, setFile] = useState<File | undefined>(undefined);    
  const [filePercentage, setFilePercentage] = useState<number>(0); 
  const [fileUploadError, setFileUploadError] = useState<boolean>(false); 
  /**
   *   use useRef hook to return a mutable ref object whose '.current'
   * property is initialized to the passed argument (initialValue).
   * The returned object will persist for the full lifetime of the component.
   */
  const fileRef = useRef<HTMLInputElement>(null);

  const handleRef = () => {
    if (fileRef.current !== null) {
      fileRef.current.click();
    }
  };

  // functio nto upload image to firebase
  const handeFileUpload = (file: File) => {
    // calling firebase functions
    const storage = getStorage(app);
    // generate file name with date to make it unique
    const fileName = new Date().getTime() + file.name;
    // create storage reference
    const storageRef = ref(storage,fileName);

    // upload to firebase
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      // event
      'state_changed',
      // observer
      (snapshot) => {
        // tracking upload
        const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // update progress local state
        setFilePercentage(progress);
      },
      (err: Error) => {
        console.error(err);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          // upload the local form data with the new avatar photo from firebase
          setFormData({...formData, avatar:downloadURL});
        })
      }
    )
  }  

  // use useEffect to make something if file changes (undefined -> File)
  useEffect(
    () => {
      if(file) handeFileUpload(file)
    },
    // The component will refresh itself every time 'file' changes
    [file]
  )

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">My Profile</h1>
      <form className="flex flex-col gap-4">
        {/* hidden input to upload new photo */}
        <input 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files![0])}
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*" 
        />
        {/* image - capable of upload*/}
        <img
          onClick={handleRef}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={formData.avatar || currentUser?.avatar}
          alt="profile_image"
        />
        {/* image - uploading state */}
        <p className="text-sm self-center">
          {
            fileUploadError ? (
              <span className="text-red-700">Error Image Upload ( image must be les than 2mb )</span>
            ) : filePercentage > 0 && filePercentage < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePercentage.toFixed(2)}%`}</span>
            ): filePercentage === 100 && !fileUploadError ? (
              <span className="text-green-700">Image Successfully Uploaded!</span>
            ): (
              ''
            )
          }
        </p>
        {/* username */}
        <input
          type="text"
          className="border p-3 rounded-lg"
          id="username"
          placeholder="Username"
        />
        {/* email */}
        <input
          type="email"
          className="border p-3 rounded-lg"
          id="email"
          placeholder="Email"
        />
        {/* password */}
        <input
          type="password"
          className="border p-3 rounded-lg"
          id="password"
          placeholder="Password"
        />
        {/* buttons */}
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      {/*  external buttons */}
      <div className="flex flex-wrap justify-center mt-2 sm:justify-between">
        {/* delete account */}
        <button className="w-full sm:w-48 mt-2 bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 ">
          Delete Account
        </button>
        {/* sign out */}
        <button className="w-full sm:w-48 mt-2 bg-gray-900 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 ">
          Sign Out
        </button>
      </div>
    </div>
  );
};
export default Profile;
