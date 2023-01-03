import * as ImagePicker from "expo-image-picker";

export const pickImage = async (setSelectedImage) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
  });
  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
  } else {
    alert("You did not select any image.");
  }
};

export const uploadImage = async () => {
  const blobImage = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", selectedImage, true);
    xhr.send(null);
  });

  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  const storageRef = ref(storage, "User/" + Date.now());
  const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress("Upload is " + progress + "% done");
      setProgressBar(progress);
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          break;
        case "storage/canceled":
          break;
        // ...
        case "storage/unknown":
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setUserInfo({ ...userInfo, imgUrl: downloadURL });
        console.log("File available at", downloadURL);
      });
    }
  );
};
