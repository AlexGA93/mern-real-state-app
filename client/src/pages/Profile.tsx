import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserStoreType, UserType } from "../types/types";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { API_ROOT_ROUTE, API_ROUTES, USER_ROUTES } from "../utils/constants";

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
  const dispatch = useDispatch();

  // access to redux state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userState: UserStoreType = useSelector(
    (state: RootState) => state.user
  );

  const [formData, setFormData] = useState<UserType>({});
  // state to deal with image upload
  const [file, setFile] = useState<File | undefined>(undefined);
  const [filePercentage, setFilePercentage] = useState<number>(0);
  const [fileUploadError, setFileUploadError] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

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
    const storageRef = ref(storage, fileName);

    // upload to firebase
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      // event
      "state_changed",
      // observer
      (snapshot) => {
        // tracking upload
        const progress: number =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // update progress local state
        setFilePercentage(progress);
      },
      (err: Error) => {
        console.error(err);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // upload the local form data with the new avatar photo from firebase
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const request: RequestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };

      const res = await fetch(
        USER_ROUTES.UPDATE + "/" + userState.currentUser!._id,
        request
      );

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDelete = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      dispatch(deleteUserStart());
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const request: RequestInit = {method: "DELETE"};
      console.log(USER_ROUTES.DELETE + "/" + userState.currentUser!._id);
      
      const res = await fetch(
        USER_ROUTES.DELETE + "/" + userState.currentUser!._id,
        request
      );

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));

    } catch (error) {
      dispatch(deleteUserFailure(error))
    }
  }

  const handleLogOut = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      dispatch(signOutStart());

      const res = await fetch(API_ROOT_ROUTE+API_ROUTES.AUTH.SIGNOUT);
      const data = await res.json();

      if(data.success === false){
        dispatch(signOutFailure(data.message));
        return;
      }

      dispatch(signOutSuccess(data));

    } catch (error) {
      dispatch(signOutFailure(error));
    }
  }

  // use useEffect to make something if file changes (undefined -> File)
  useEffect(
    () => {
      if (file) handeFileUpload(file);
    },
    // The component will refresh itself every time 'file' changes
    [file]
  );

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">My Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* hidden input to upload new photo */}
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFile(e.target.files![0])
          }
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        {/* image - capable of upload*/}
        <img
          onClick={handleRef}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={formData.avatar || userState.currentUser?.avatar}
          alt="profile_image"
        />
        {/* image - uploading state */}
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image Upload ( image must be les than 2mb )
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage.toFixed(
              2
            )}%`}</span>
          ) : filePercentage === 100 && !fileUploadError ? (
            <span className="text-green-700">Image Successfully Uploaded!</span>
          ) : (
            ""
          )}
        </p>
        {/* username */}
        <input
          defaultValue={userState.currentUser?.username}
          type="text"
          className="border p-3 rounded-lg"
          id="username"
          placeholder="Username"
          onChange={handleChange}
        />
        {/* email */}
        <input
          defaultValue={userState.currentUser?.email}
          type="email"
          className="border p-3 rounded-lg"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        {/* password */}
        <input
          type="password"
          className="border p-3 rounded-lg"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {/* buttons */}
        <button
          className={
            (updateSuccess ? "bg-green-700" : "bg-slate-700") +
            " text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          }
        >
          {userState.loading
            ? "Loading..."
            : updateSuccess
            ? "User Updated Successfully"
            : "Update"}
        </button>
      </form>
      {/*  external buttons */}
      <div className="flex flex-wrap justify-center mt-2 sm:justify-between">
        {/* delete account */}
        <button 
          onClick={handleDelete} 
          className="w-full sm:w-48 mt-2 bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 ">
          Delete Account
        </button>
        {/* sign out */}
        <button 
          onClick={handleLogOut}
          className="w-full sm:w-48 mt-2 bg-gray-900 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 ">
          Sign Out
        </button>
      </div>
    </div>
  );
};
export default Profile;
