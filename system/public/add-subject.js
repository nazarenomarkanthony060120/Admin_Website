import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, deleteDoc, where, query } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
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

async function addSubject (teacher, subject, grade, time){
    addDoc(collection(db, 'Subject/'), {
        teacher : teacher,
        subject : subject,
        grade : grade,
        time : time, 
    }).then((doc) => {
        console.log(`doc id : ${doc.id}`)
        location.reload()
    }).catch((error) => {
        console.log(error.messag)
    })
}

async function getSubjects (){
    const colRef = collection (db, 'Subject')
    var snapshot = await getDocs (colRef)
    snapshot.docs.forEach((doc) => {
        renderSubject (doc)
    })
}

async function deleteSubject (unique_id) {
    var colRef = doc(db, 'Subject/', unique_id)
    await deleteDoc(colRef)
    .then(() => {
        location.reload()
    })
}

async function updateSubject (subject_id, teacher, subject, grade, time) {
    var colRef = doc (db, 'Subject/', subject_id)
    const docRef = await setDoc (colRef, {
        teacher : teacher,
        subject : subject,
        grade : grade,
        time : time,
    }).then (() => {
        location.reload()
    })
}

async function orderBySubjectGrade (subject_grade){
    const colRef = collection(db, 'Subject');
    const subjectQuery = query(colRef, where('grade', '==', subject_grade));
    var snapshot = await getDocs(subjectQuery);
    snapshot.docs.forEach((subjectQuery) => {
        renderSubject(subjectQuery)
    })
}

var x = 1
var subjects = []
function renderSubject (doc) {
    var tbody = document.querySelector('.add-subject-list-table-tbody')

    var tr = document.createElement('tr')
    var td_row_no = document.createElement('td')
    var td_teacher = document.createElement('td')
    var td_subject = document.createElement('td')
    var td_grade = document.createElement('td')
    var td_time = document.createElement('td')
    var td_button = document.createElement('td')

    var span_row_no = document.createElement('span')
    var span_teacher = document.createElement('span')
    var span_subject = document.createElement('span')
    var span_grade = document.createElement('span')
    var span_time = document.createElement('span')

    var div_button = document.createElement('span')

    td_row_no.className = 'p-3'
    td_teacher.className = 'td_teacher p-3'
    td_subject.className = 'p-3'
    td_grade.className = 'p-3'
    td_time.className = 'p-3'
    td_button.className = 'p-3'
    div_button.className = 'p-1'
    td_button.className = 'update-delete-subject'

    span_row_no.textContent = `${x++}.`
    span_teacher.textContent = doc.data().teacher
    span_subject.textContent = doc.data().subject
    span_grade.textContent = doc.data().grade
    span_time.textContent = doc.data().time

    subjects.push([doc.id, doc.data().teacher, doc.data().subject, doc.data().grade, doc.data().time])

    div_button.innerHTML = '<button class="update-subject btn btn-primary mx-1">Update</button>'
    div_button.innerHTML += '<button class="delete-subject btn btn-danger mx-1">Delete</button>'

    td_row_no.appendChild(span_row_no)
    td_teacher.appendChild(span_teacher)
    td_subject.appendChild(span_subject)
    td_grade.appendChild(span_grade)
    td_time.appendChild(span_time)
    td_button.appendChild(div_button)

    tr.appendChild(td_row_no)
    tr.appendChild(td_teacher)
    tr.appendChild(td_subject)
    tr.appendChild(td_grade)
    tr.appendChild(td_time)
    tr.appendChild(td_button)

    tbody.appendChild(tr)
}

function deleteTableRow(){
    x = 1
    var table_body = document.querySelectorAll('.add-subject-list-table-tbody tr')
    for (const row of table_body){
      row.remove()
    }
}


window.addEventListener('DOMContentLoaded', async(event) => {
    await getSubjects()

    var subject_id
    document.getElementById('search-subject').addEventListener('keyup', (e) => {
        document.querySelectorAll('.add-subject-list-table-tbody tr').forEach((row) => {
            row.querySelector('.td_teacher').textContent.toLowerCase().startsWith(e.target.value.toLowerCase()) ? (row.style.display = 'table-row') : (row.style.display = 'none')
        })
    })

    document.getElementById('subject-list').addEventListener('change', (e) => {
        var subject = document.getElementById('subject-list').value;
        deleteTableRow()
        orderBySubjectGrade(subject)
        if(subject == 0){
            getSubjects()
        }
    })
    
    document.getElementById('add-subject-btn').addEventListener('click', (e) => {
        document.querySelector('.content-title .title').textContent = ' > Add Sucject'
        document.querySelector('.add-subject-info-container').style.display = 'block'
        document.querySelector('.add-subject-container').style.display = 'none'
    })

    var isAddSubject = true
    document.getElementById('add-subject').addEventListener('click', (e) => {
        if (isAddSubject){
            var teacher = document.querySelector('.add-subject .add-subject-info-container #teacher-subject-name').value
            var subject = document.querySelector('.add-subject .add-subject-info-container #subject-name').value
            var grade = document.querySelector('.add-subject .add-subject-info-container #grade-subject-name').value
            var time = document.querySelector('.add-subject .add-subject-info-container #time-subject-name').value
            addSubject(teacher, subject, grade, time)
            console.log(isAddSubject)
            isAddSubject = false
        } 
    })
    
    document.getElementById('close-add-subject').addEventListener('click', (e) => {
        document.querySelector('.content-title .title').textContent = ''
        document.querySelector('.add-subject-info-container').style.display = 'none'
        document.querySelector('.add-subject-container').style.display = 'block'
    })

    
    document.querySelectorAll('.update-subject').forEach((element, index) => {
        element.addEventListener('click', (e) => {
            document.querySelector('.content-title .title').textContent = ' > Update Subject'
            document.querySelector('.update-subject-info-container').style.display = 'block'
            document.querySelector('.add-subject-container').style.display = 'none'
            getSubjectInfo (index) 
        })
    })

    function getSubjectInfo (index) {
    // subjects.push([doc.id, doc.data().teacher, doc.data().subject, doc.data().grade, doc.data().time])

        subject_id = subjects[index][0]
        document.querySelector('.add-subject .update-subject-info-container #teacher-subject-name').value = subjects[index][1]
        document.querySelector('.add-subject .update-subject-info-container #subject-name').value = subjects[index][2]
        document.querySelector('.add-subject .update-subject-info-container #grade-subject-name').value = subjects[index][3]
        document.querySelector('.add-subject .update-subject-info-container #time-subject-name').value = subjects[index][4]
    }

    document.getElementById('close-update-subject').addEventListener('click', (e) => {
        document.querySelector('.content-title .title').textContent = ' > Update Subject'
        document.querySelector('.update-subject-info-container').style.display = 'none'
        document.querySelector('.add-subject-container').style.display = 'block'
    })

    document.getElementById('update-subject').addEventListener('click', (e) => {
        var teacher = document.querySelector('.add-subject .update-subject-info-container #teacher-subject-name').value
        var subject = document.querySelector('.add-subject .update-subject-info-container #subject-name').value
        var grade = document.querySelector('.add-subject .update-subject-info-container #grade-subject-name').value
        var time = document.querySelector('.add-subject .update-subject-info-container #time-subject-name').value
        updateSubject (subject_id, teacher, subject, grade, time)
    })

    document.querySelectorAll('.delete-subject').forEach((element, index) => {
        element.addEventListener('click', (e) => {
            deleteSubject(subjects[index][0])
        })
    })
})