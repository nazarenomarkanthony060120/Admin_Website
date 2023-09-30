import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, getCountFromServer, getDocs, addDoc, doc, getDoc, setDoc, orderBy, query } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyAjnPzN6UJlBc-_9xVE6XRZDLgmdtvEVKI",
    authDomain: "btes-system.firebaseapp.com",
    projectId: "btes-system",
    storageBucket: "btes-system.appspot.com",
    messagingSenderId: "71757932730",
    appId: "1:71757932730:web:77c9614964b79662e9fa83",
    measurementId: "G-6LK9ZNRQ4S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getTotalStudents (){
    const colRef = collection(db, 'Student');
    const snapshot = await getCountFromServer(colRef);
    document.getElementById('total-student').textContent = snapshot.data().count
}

async function getTotalTeachers (){
    const colRef = collection (db, 'Teacher')
    const snapshot = await getCountFromServer(colRef)
    document.getElementById('total-teacher').textContent = snapshot.data().count
}

async function getTotalParents (){
    const colRef = collection (db, 'Pupil')
    const snapshot = await getCountFromServer(colRef)
    document.getElementById('total-parents').textContent = snapshot.data().count
}

async function getTotalStudentsPending (){
    const colRef = collection(db, 'Students_Pending_Enrollment');
    const snapshot = await getCountFromServer(colRef);
    document.getElementById('total-students-pending').textContent = snapshot.data().count
}

var teachers = []
async function getTeachers (){
    const colRef = collection (db, 'Teacher')
    const snapshot = await getDocs (colRef)
    snapshot.docs.forEach((doc) => {
        parents.push([doc.id])
    })
}

var parents = []
async function getParents (){
    const colRef = collection (db, 'Pupil')
    const snapshot = await getDocs (colRef)
    snapshot.docs.forEach((doc) => {
        parents.push([doc.id])
        console.log(doc)
    })
}

async function updateAnnouncement (time, current_date, announcement, mentioned_id, date_time) {
    try {
        await addDoc(collection(db, 'Announcement/'), {
            time : time,
            date : current_date,
            announcement : announcement,
            mentioned_id : mentioned_id,
            date_time : date_time
        }).then(() => {
            location.reload()
        })
    } catch (error) {
        console.log(error.message)
    }
}

async function getMentionedName (span_context, userID){
    const colRef = doc (db, 'Pupil/' + userID)
    const snapshot = await getDoc(colRef);
    if (snapshot.exists()){
        span_context.textContent = snapshot.data().f_name + ' ' + snapshot.data().m_name + ' ' + snapshot.data().l_name
    } else {
        const col = doc (db, 'Teacher/' + userID)
        const snap = await getDoc(col)
        if (snap.exists()){
            span_context.textContent = snap.data().f_name + ' ' + snap.data().m_name + ' ' + snap.data().l_name
        }
    }
}

async function getAnnounement (){
    const colRef = collection(db, 'Announcement')
    const desc = query(colRef, orderBy('date_time', 'desc'))
    const snapshot = await getDocs (desc)
    snapshot.docs.forEach((doc) => {
        renderAnnouncement (doc)
    })
}

async function getEnrollmentStatus (){
    const colRef = doc (db, 'Enrollment/', 'open_close')
    const snapshot = await getDoc(colRef)
    if (snapshot.exists()){
        if (snapshot.data().status === 'open'){
            document.getElementById('open_close_enrollment').innerText = 'Close Enrollment'
            document.getElementById('open_close_enrollment').className = 'btn-danger'
        } else {
            document.getElementById('open_close_enrollment').innerText = 'Open Enrollment'
            document.getElementById('open_close_enrollment').className = 'btn-primary'
        }
    }
}

async function updateOpenCloseEnrollmentStatus (status, sy){
    var ref = doc (db, 'Enrollment/', 'open_close')
    const docRef = await setDoc (ref, {
        status : status,
        sy : sy 
    }).then (() => {
        console.log(2)
    }) 
}

async function schoolYear (sy){
    try {
        await addDoc(collection(db, 'School Year/'), {
            sy : sy
        })
    } catch (error) {
        console.log(error.message)
    }
}

function designEnrollmentButton (text){
    if (text === "Open Enrollment"){
        document.getElementById('open_close_enrollment').className = 'btn-danger'
    } else {
        document.getElementById('open_close_enrollment').className = 'btn-primary'
    }
}

function renderAnnouncement (doc) {
    var event_posted = document.querySelector('.event-posted')

    var announcement_container = document.createElement('div')
    var div_date_time = document.createElement('div')
    var div_date = document.createElement('div')
    var div_time = document.createElement('div')
    var div_announcement = document.createElement('div')
    var div_mentioned = document.createElement('div')

    var span_date = document.createElement('span')
    var span_time = document.createElement('span')
    var span_announcement = document.createElement('span')
    var span_mentioned = document.createElement('span')

    announcement_container.className = 'announcement_container'
    div_date_time.className = 'div_date_time'
    div_announcement.className = 'div_announcement'
    div_mentioned.className = 'div_mentioned'
    
    span_date.textContent = doc.data().date
    span_time.textContent = doc.data().time
    span_announcement.textContent = doc.data().announcement

    getMentionedName(span_mentioned, doc.data().mentioned_id)

    div_date.appendChild(span_date)
    div_time.appendChild(span_time)

    div_date_time.appendChild(div_date)
    div_date_time.appendChild(div_time)

    div_announcement.appendChild(span_announcement)
    
    div_mentioned.appendChild(span_mentioned)

    announcement_container.appendChild(div_date_time)
    announcement_container.appendChild(div_announcement)
    announcement_container.appendChild(div_mentioned)
    event_posted.appendChild(announcement_container)
}

window.addEventListener('DOMContentLoaded', async(event) => {
    await getEnrollmentStatus()
    await getTotalStudents()
    await getTotalTeachers()
    await getTotalParents()
    await getTotalStudentsPending()
    await getAnnounement()

    var isClickTeacher = true
    document.getElementById('mention-all-teacher').addEventListener('click', () => {
        if (isClickTeacher === true){
            getTeachers()
            document.getElementById('mention-all-teacher').textContent = 'Close Mention'
            isClickTeacher = false
        } else {
            teachers = []
            document.getElementById('mention-all-teacher').textContent = 'All Teacher'
            isClickTeacher = true
        }
    })

    var isClickParent = true
    document.getElementById('mention-all-parents').addEventListener('click', () => {
        if (isClickParent === true){
            getParents()
            document.getElementById('mention-all-parents').textContent = 'Close Mention'
            isClickParent = false
            console.log(parents)
        } else {
            parents = []
            document.getElementById('mention-all-parents').textContent = 'All Parents'
            isClickParent = true
            console.log(parents)
        }
    })

    var isPostClick = true
    document.querySelector('.post').addEventListener('click', async () => {
        console.log(teachers.length)
        if (isPostClick === true) {
            var announcement = document.getElementById('announcement').value
            var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()
            var date = new Date()
            var current_date =  (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
            let date_time = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();

            if (teachers.length > 0 || parents.length > 0) {
                for (let i = 0; i < teachers.length; i++) {
                    if (teachers.length > 0) {
                        updateAnnouncement(time, current_date, announcement, teachers[i][0], date_time)
                    }
                }
                for (let i = 0; i < parents.length; i++) {
                    if (parents.length > 0) {
                        updateAnnouncement(time, current_date, announcement, parents[i][0], date_time)
                    }
                }
            }
            isPostClick = false
        }
    })

    document.getElementById('open_close_enrollment').addEventListener('click', (e) => {
        var sy1 = document.getElementById('sy1').value
        var sy2 = document.getElementById('sy2').value

        if (sy1 === '' || sy2 === '') {
            alert('Please enter school year!')
        } else {
            var text = document.getElementById('open_close_enrollment').innerText
            var sy = sy1 + ' - ' + sy2
            if (text === 'Open Enrollment'){
                document.getElementById('open_close_enrollment').innerText = 'Close Enrollment'
                schoolYear(sy)
                updateOpenCloseEnrollmentStatus('open', sy)
            } else {
                document.getElementById('open_close_enrollment').innerText = 'Open Enrollment'
                updateOpenCloseEnrollmentStatus('close', sy)
            }
            designEnrollmentButton(text)
        }
    })

})