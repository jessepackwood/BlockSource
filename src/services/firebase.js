import firebase from 'firebase';



firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.database();

export const isAuthenticated = () => {
  return !!auth.currentUser
}

export const provider = new firebase.auth.GoogleAuthProvider();

export const googleSignIn = () => {
  return firebase.auth().signInWithPopup(provider)
}

export default firebase;
