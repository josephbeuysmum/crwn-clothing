import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCvN9ORNa7YOcMgx3CKc2y-i0Y6L_a4zu8",
    authDomain: "crwn-db-7d279.firebaseapp.com",
    databaseURL: "https://crwn-db-7d279.firebaseio.com",
    projectId: "crwn-db-7d279",
    storageBucket: "crwn-db-7d279.appspot.com",
    messagingSenderId: "258467485083",
    appId: "1:258467485083:web:d8199c22cacd5a1879fd3e"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshop = await userRef.get();
    if (!snapshop.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try  {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;