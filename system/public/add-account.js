import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjnPzN6UJlBc-_9xVE6XRZDLgmdtvEVKI",
  authDomain: "btes-system.firebaseapp.com",
  projectId: "btes-system",
  storageBucket: "btes-system.appspot.com",
  messagingSenderId: "71757932730",
  appId: "1:71757932730:web:77c9614964b79662e9fa83",
  measurementId: "G-6LK9ZNRQ4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth()

var parent_f_name = document.querySelector('.add-account #parent_f_name')
var parent_m_name = document.querySelector('.add-account #parent_m_name')
var parent_l_name = document.querySelector('.add-account #parent_l_name')
var parent_address = document.querySelector('.add-account #parent_address')
var parent_contact_number = document.querySelector('.add-account #parent_contact_number')   
var parent_father_name = document.querySelector('.add-account #parent_father_name')
var parent_mother_name = document.querySelector('.add-account #parent_mother_name')
var parent_email = document.querySelector('.add-account #parent_email') 
var parent_password = document.querySelector('.add-account #parent_password')

async function createParentAccount (unique_id){
    var ref = doc(db, 'Pupil/' + unique_id)
    const docRef = await setDoc(ref, {
        f_name : parent_f_name.value,
        m_name : parent_m_name.value,
        l_name : parent_l_name.value,
        address : parent_address.value,
        contact_number : parent_contact_number.value,
        father : parent_father_name.value,
        mother : parent_mother_name.value,
        email : parent_email.value,
        password : parent_password.value
    }).then (() => {
        location.reload()
        document.getElementById('parent-add-account-form').reset()
        console.log('parent account successfully created!')
    })
}

var teacher_f_name = document.querySelector('#teacher_f_name')
var teacher_m_name = document.querySelector('#teacher_m_name')
var teacher_l_name = document.querySelector('#teacher_l_name')
var teacher_address = document.querySelector('#teacher_address')
var teacher_contact_number = document.querySelector('#teacher_contact_number')   
var teacher_grade = document.querySelector('#teacher_grade')
var teacher_email = document.querySelector('#teacher_email')
var teacher_password = document.querySelector('#teacher_password')

async function createTeacherAccount (unique_id){
    var ref = doc(db, 'Teacher/' + unique_id)
    const docRef = await setDoc(ref, {
        f_name : teacher_f_name.value,
        m_name : teacher_m_name.value,
        l_name : teacher_l_name.value,
        address : teacher_address.value,
        contact_number : teacher_contact_number.value,
        grade : teacher_grade.value,
        email : teacher_email.value,
        password : teacher_password.value
    }).then (() => {
        location.reload()
        console.log('teacher account successfully created!')
    })
}

window.addEventListener('DOMContentLoaded', async(event) => {

    document.getElementById ('add-parent-account').addEventListener ('click', (e) =>{
        e.preventDefault()
        createUserWithEmailAndPassword(auth, parent_email.value, parent_password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.uid)
            createParentAccount(user.uid)
        }).catch((error) => {
            console.log(error.message)
        })
    })

    document.getElementById ('add-teacher-account').addEventListener('click', (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, teacher_email.value, teacher_password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.uid)
            createTeacherAccount(user.uid)
        }).catch((error) => {
            console.log(error.message)
        })
    })
})