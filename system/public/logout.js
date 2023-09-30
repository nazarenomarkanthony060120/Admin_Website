import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAjnPzN6UJlBc-_9xVE6XRZDLgmdtvEVKI",
    authDomain: "btes-system.firebaseapp.com",
    projectId: "btes-system",
    storageBucket: "btes-system.appspot.com",
    messagingSenderId: "71757932730",
    appId: "1:71757932730:web:77c9614964b79662e9fa83",
    measurementId: "G-6LK9ZNRQ4S"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth()

document.querySelector('.logout-administrator').addEventListener('click', (e) => {
    signOut(auth).then(async () => {
        alert('logging out')
        await sleep(1)
        // location.replace('login.html')
        alert('2')
      }).catch((error) => {
        // An error happened.
      });
})


async function sleep (seconds){
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}