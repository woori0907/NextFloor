import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  set,
  remove,
  update,
  increment,
} from "firebase/database";
import { v4 as uuid } from "uuid";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user ? await adminUser(user) : null;
    // console.log(updateUser.isAdmin);
    callback(updateUser);
  });
}

export function login() {
  return signInWithPopup(auth, provider).catch((err) => {
    console.error(err);
  });
}

export async function logout() {
  return signOut(auth).then(() => null);
}

async function adminUser(user) {
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

export async function addNewProduct(product, imgUrl) {
  const id = uuid();
  return set(ref(database, `products/${id}}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imgUrl,
    options: product.options.split(","),
    likes: 0,
  });
}

export async function getProducts() {
  return get(ref(database, `products`)).then((snapshot) => {
    if (snapshot.exists()) {
      /** Objects.values : 오브젝트의 key를 제외한 value값만 받아오는 함수 */
      return Object.values(snapshot.val());
    }
  });
}

export async function getProduct(productId) {
  return get(ref(database, `products/${productId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
  });
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}

export async function getLiked(userId, productId) {
  return get(ref(database, `liked/${userId}/${productId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    console.log(items);
    return Object.values(items);
  });
}

export async function addOrUpdateLikes(userId, product) {
  console.log(userId);
  return set(ref(database, `liked/${userId}/${product.id}`), {
    ...product,
    isLiked: true,
  });
}

export async function removeLikes(userId, productId) {
  return remove(ref(database, `liked/${userId}/${productId}`));
}

export async function increaseLike(productId) {
  return update(ref(database, `products/${productId}`), {
    likes: increment(1),
  });
}

export async function decreaseLike(productId) {
  return update(ref(database, `products/${productId}`), {
    likes: increment(-1),
  });
}

export async function getLikedItems(userId) {
  return get(ref(database, `liked/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    console.log(items);
    return Object.values(items);
  });
  // .then((values) => {
  //   const newItems = values?.map((value) => getProduct(value?.id));
  //   console.log(Object.values(newItems));
  //   return Object.values(values);
  // });
}
