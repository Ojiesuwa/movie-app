import {
  collection,
  addDoc,
  getFirestore,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, fileStorage } from "./config";
import { modifyArray } from "../aiders/ModifyArray";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { generateRandomId } from "../aiders/RandomId";
import { getUserId } from "./clientstorage";

export function fetchMoviesByCategory({
  title,
  value,
  queryCon = "array-contains",
}) {
  return new Promise(async (resolve, reject) => {
    const q = query(collection(db, "Movies"), where(title, queryCon, value));
    try {
      const data = await getDocs(q);
      let final = [];
      data.forEach((element) => {
        final.push({ id: element.id, ...element.data() });
      });
      resolve(final);
    } catch (error) {
      console.error(error);
    }
  });
}

export function setUserCurrentWatch(userId, movieId) {
  return new Promise(async (resolve, reject) => {
    await updateDoc(doc(db, "Accounts", userId), {
      CurrentWatch: movieId,
    });
    resolve();
  });
}
export function getUserCurrentWatch(userId) {
  return new Promise(async (resolve, reject) => {
    let response = await getDoc(doc(db, "Accounts", userId));
    response = { id: response.id, ...response.data() };
    resolve(response.CurrentWatch);
  });
}

export function fetchMovie(movieId) {
  return new Promise(async (resolve, reject) => {
    let data = await getDoc(doc(db, "Movies", movieId));
    resolve({ ...data.data(), id: movieId });
  });
}

export function toggleMovieSave(userId, movieId) {
  return new Promise(async (resolve, reject) => {
    let userData = await getDoc(doc(db, "Accounts", userId));
    userData = userData.data();
    let savedMovies = userData.Saved || [];

    let { newArray, alreadyExists } = modifyArray(savedMovies, movieId);

    await updateDoc(doc(db, "Accounts", userId), {
      Saved: newArray || [],
    });

    resolve(alreadyExists);
  });
}

export function verifySave(userId, movieId) {
  return new Promise(async (resolve, reject) => {
    let userData = await getDoc(doc(db, "Accounts", userId));
    userData = userData.data();
    let savedMovies = userData.Saved || [];

    console.log(savedMovies, movieId);

    if (savedMovies.includes(movieId)) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

export function fetchSavedMovies(userId) {
  return new Promise(async (resolve, reject) => {
    let userData = await getDoc(doc(db, "Accounts", userId));
    userData = userData.data();
    let savedMovies = userData.Saved || [];

    let promises = savedMovies.map((eachId) => fetchMovie(eachId));

    let allMovies = await Promise.all(promises);

    resolve(allMovies);
  });
}

export function fetchSearchHistory(userId) {
  return new Promise(async (resolve, reject) => {
    let userData = await getDoc(doc(db, "Accounts", userId));
    userData = userData.data();
    let searchHistory = userData.SearchHistory || [];

    resolve(searchHistory);
  });
}

export function queryMovie(queryString) {
  return new Promise(async (resolve, reject) => {
    const q = query(
      collection(db, "Movies"),
      where("Title", "==", queryString)
    );
    let response = await getDocs(q);

    let queryMovies = [];
  });
}

export function loginClient({ email, password }) {
  return new Promise(async (resolve, reject) => {
    const q = query(collection(db, "Accounts"), where("Email", "==", email));
    const emailForAllClients = await getDocs(q);

    let flag = false;
    emailForAllClients.forEach((element) => {
      const data = element.data();
      flag = true;
      if (data.Password === password) {
        resolve({ type: "good", content: String(element.id) });
        return;
      }
    });

    if (!flag) {
      resolve({ type: "err", content: "Email doesn't exist" });
      return;
    }
    resolve({ type: "err", content: "Wrong password" });
    return;
  });
}

export function signupClient({ Firstname, Lastname, Email, Password }) {
  return new Promise(async (resolve, reject) => {
    let databaseInfo = {
      Firstname,
      Lastname,
      Email,
      Password,
      CurrentWatch: "",
      Saved: [],
      Phonenumber: "Empty",
      Date: "1999-01-01",
      Address: "Empty",
      ProfileImage:
        "https://th.bing.com/th/id/R.8352bbd0fdfbbbf44b80641ee088b945?rik=GCbhy4XnhNl7yQ&pid=ImgRaw&r=0",
    };
    let response = await addDoc(collection(db, "Accounts"), databaseInfo);

    resolve(response.id);
  });
}

export function fetchUserCredential(userId) {
  return new Promise(async (resolve, reject) => {
    let userData = await getDoc(doc(db, "Accounts", userId));
    userData = userData.data();
    resolve(userData);
  });
}

export function uploadFile(file, pcb = () => {}, fcb = () => {}) {
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(
      fileStorage,
      `${generateRandomId()}.${file.name.split(".")[1]}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        pcb(progress.toFixed(1));
      },
      () => {},
      async () => {
        const URL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(URL);
        fcb();
      }
    );
  });
}

export function updateUser(userId, data) {
  console.log(userId, data);
  return new Promise(async (resolve, reject) => {
    const response = await updateDoc(doc(db, "Accounts", userId), data);
    resolve(true);
  });
}

export function uploadProfileImage(userId, file) {
  return new Promise(async (resolve, reject) => {
    let fileUrl = await uploadFile(file);
    await updateUser(userId, { ProfileImage: fileUrl });
    resolve(fileUrl);
  });
}

export function uploadNewMovie(videoFile, imageFile, formData, cb, fcb) {
  return new Promise(async (resolve, reject) => {
    let res = await uploadFile(videoFile, (progress) => {
      cb(`Video Uploading ${progress}%`);
    });

    formData.URL = res;

    let coverRes = await uploadFile(imageFile, (progress) => {
      cb(`Cover Image Uploading ${progress}%`);
    });

    formData.Cover = coverRes;
    formData.timestamp = serverTimestamp();
    formData.Rating = 0;

    await addDoc(collection(db, "Movies"), formData);
    fcb();
  });
}

export function searchMovie(queryString) {
  return new Promise(async (resolve, reject) => {
    const q = query(
      collection(db, "Movies"),
      where("QueryKey", "array-contains", queryString.toLowerCase())
    );
    try {
      const data = await getDocs(q);
      let final = [];
      data.forEach((element) => {
        final.push({ id: element.id, ...element.data() });
      });
      resolve(final);
    } catch (error) {
      console.error(error);
    }
  });
}

export function verifyAdmin(userId = getUserId()) {
  return new Promise(async (resolve, reject) => {
    let details = await fetchUserCredential(userId);
    let adminPermission = details.Admin || false;
    resolve(adminPermission);
  });
}
