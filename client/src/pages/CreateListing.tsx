import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { app } from "../utils/firebase";
import { formImageURLSType } from "../types/types";

const CreateListing = () => {
  const [files, setFiles] = useState<FileList | never[]>([]);
  const [formData, setFormData] = useState<formImageURLSType>({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState<boolean | string>(
    false
  );
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files!);
  };

  const submitFiles = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // check if we reached the limit of images number
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      // update uploadingImage local loading state
      setUploadingImage(true);
      setImageUploadError(false);

      const promises = [];

      // for every file we want to make a promise during the firebase upload
      for (let i = 0; i < files.length; i++) {
        // upload to firebase every file
        const file: File = files[i];
        promises.push(storeImage(file));
      }

      // we'll update local storage when promises are resolved
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: urls as string[],
          });
          // update local upload images state
          setImageUploadError(false);
          setUploadingImage(false);
        })
        .catch(() => {
          setImageUploadError(`Image upload failed (2mb max per image)`);
          setUploadingImage(false);
        }
        );
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploadingImage(false);
    }
  };

  // function to prepare firebase upload
  const storeImage = async (file: File) => {
    return new Promise((resolve, reject) => {
      
      // define storage
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
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
          console.log(`Upload is ${progress}% done`);
        },
        (err) => {
          // reject promise
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // resolve promise with url
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDeleteImage = (index: number) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_url: string, i: number) => i !== index)
    })
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      {/* title */}
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      {/* form */}
      <form className="flex flex-col sm:flex-row gap-4">
        {/* LEFT SIDE */}
        <div className="flex flex-col flex-1 gap-4">
          {/* inputs */}
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="border p-3 rounded-lg"
            maxLength={62}
            minLength={10}
            required
          />
          <textarea
            placeholder="Description"
            id="description"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="border p-3 rounded-lg"
            required
          />
          {/* checkboxes */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          {/* Inputs */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                className="w-14 appearance-none p-3 border border-gray-300 rounded-lg"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="w-14 p-3 border border-gray-300 rounded-lg"
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="w-14 p-3 border border-gray-300 rounded-lg"
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="w-14 p-3 border border-gray-300 rounded-lg"
                type="number"
                id="discountedPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleFiles}
            />
            <button
              type="button"
              onClick={submitFiles}
              disabled={uploadingImage}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              { uploadingImage ? 'Uploading...' : 'Upload' }
            </button>
          </div>
          {/* error messages */}
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {/* show miniatures */}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((imageUrl: string, index: number) => (
              <div className="flex flex-wrap items-center justify-between p-3 border rounded-lg">
                <img
                  className="w-20 h-20 object-cover rounded-lg"
                  key={imageUrl}
                  src={imageUrl}
                  alt="listing_image"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  type="button"
                  id="delete"
                  className="w-20 h-10 bg-red-700 text-white rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          {/*  BUTTON */}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};
export default CreateListing;
