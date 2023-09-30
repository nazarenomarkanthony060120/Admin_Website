import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, updatePassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";


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
const auth = getAuth(app);



async function getTeacherAccountList (){
    const colRef = collection(db, 'Teacher')
    const snapshot = await getDocs (colRef)
    snapshot.docs.forEach((doc) => {
        renderTeacherAccountList(doc)
    })
}

async function updateTeacherInfo (f_name, m_name, l_name, address, grade, contact_number, email, password, oldPassword,unique_id){
    // Sign in the user with their old password
    signInWithEmailAndPassword(auth, email, oldPassword)
    .then((userCredential) => {
    // Update the user's password
    const newPassword = password;
    updatePassword(userCredential.user, newPassword)
        .then(() => {
            var ref = doc (db, 'Teacher/' + unique_id)
            setDoc (ref, {
                f_name : f_name,
                m_name : m_name,
                l_name : l_name,
                address : address,
                grade : grade,
                contact_number : contact_number,
                email : email,
                password : password
            }).then (() => {
                console.log('teacher info updated successfully')
                location.reload()
            })
            console.log("Password updated successfully");
        })
        .catch((error) => {
            console.error("Error updating password:", error);
        });
    })
    .catch((error) => {
        console.error("Error signing in:", error);
    });
}


async function getParentAccountList (){
    const colRef = collection(db, 'Pupil')
    let cachedDocs = new Set();
    onSnapshot(colRef, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            const doc = change.doc;
            const docId = doc.id;
            if (change.type === 'added') {
                if (!cachedDocs.has(docId)) {
                    cachedDocs.add(docId);
                    renderParentAccountList(doc)
                }
            }
        });
    });
}

async function updateParentInformation (unique_id, f_name, m_name, l_name, address, contact_number, email, password) {
    // Sign in the user with their old password
    signInWithEmailAndPassword(auth, email, getOldParentPassword())
    .then((userCredential) => {
    // Update the user's password
    const newPassword = password;
    updatePassword(userCredential.user, newPassword)
        .then(() => {
            var ref = doc(db, 'Pupil/' + unique_id)
            setDoc(ref, {
                f_name : f_name,
                m_name : m_name,
                l_name : l_name,
                address : address,
                contact_number : contact_number,
                email : email, 
                password : password
            }).then (() => {
                location.reload()
                console.log('Parent Information Updated Successfully!')
            })
            console.log("Password updated successfully");
        })
        .catch((error) => {
            console.error("Error updating password:", error);
        });
    })
    .catch((error) => {
        console.error("Error signing in:", error);
    });
    
}

var studentList = []
async function getAllStudentList (){
    const colRef = collection(db, "Student");
    var snapshot = await getDocs(colRef); 
    snapshot.docs.forEach((doc) => {
        studentList.push([doc.data().parent_id, doc.data().student_id, doc.data().f_name + " " + doc.data().m_name + " " + doc.data().l_name, doc.data().grade])
    })
}

var x = 1;
var teacherList = []
function renderTeacherAccountList (doc) {
    var table = document.querySelector('.account-teacher-list-table') 
    var tbody = document.querySelector('.account-list-teacher-tbody')

    var tr = document.createElement('tr')
    var td_row_no = document.createElement('td')
    var td_name_address = document.createElement('td')
    var td_grade = document.createElement('td')
    var td_email = document.createElement('td')
    var td_div_button = document.createElement('td')
    var div_button = document.createElement('div')

    var td_div_name_address = document.createElement('div')

    var span_row_no = document.createElement('span')
    var span_name = document.createElement('span')
    var span_address = document.createElement('span')
    var span_grade = document.createElement('span')
    var span_email = document.createElement('span')

    span_name.className = 'teacher-name'

    span_row_no.textContent = x++ + "."
    span_name.textContent = doc.data().f_name + " " + doc.data().m_name + " " + doc.data().l_name
    span_address.textContent = doc.data().address
    span_grade.textContent = doc.data().grade
    span_email.textContent = doc.data().email

    teacherList.push([doc.data().f_name, doc.data().m_name, doc.data().l_name, doc.data().address, doc.data().grade, doc.data().contact_number, doc.data().email, doc.data().password, doc.id])

    div_button.innerHTML = '<button type="button" class="update_teacher btn btn-primary mx-1">Update</button>';
    div_button.innerHTML += '<button type="button" class="view_teacher btn btn-danger mx-1">View</button>';
    
    
    td_row_no.className = 'row-no text-center p-3'
    td_div_name_address.className = 'div-name-address'
    td_grade.className = 'text-center p-3'
    td_email.className = 'text-center p-3'
    tr.className = 'table-light table-striped'

    td_row_no.appendChild(span_row_no)
        td_div_name_address.appendChild(span_name)
        td_div_name_address.appendChild(span_address)
    td_name_address.appendChild(td_div_name_address)
    td_grade.appendChild(span_grade)
    td_email.appendChild(span_email)
    td_div_button.appendChild(div_button)

    tr.appendChild(td_row_no)
    tr.appendChild(td_name_address)
    tr.appendChild(td_grade)
    tr.appendChild(td_email)
    tr.appendChild(td_div_button)

    tbody.appendChild(tr)
    table.appendChild(tbody)
}

var i = 1;
var parentList = []
function renderParentAccountList (doc) {
    var table = document.querySelector('.account-parent-list-table') 
    var tbody = document.querySelector('.account-list-parent-tbody')

    var tr = document.createElement('tr')
    var td_row_no = document.createElement('td')
    var td_name_address = document.createElement('td')
    var td_contact_number = document.createElement('td')
    var td_email = document.createElement('td')
    var td_div_button = document.createElement('td')
    var div_button = document.createElement('div')

    var td_div_name_address = document.createElement('div')

    var span_row_no = document.createElement('span')
    var span_name = document.createElement('span')
    var span_address = document.createElement('span')
    var span_contact_number = document.createElement('span')
    var span_email = document.createElement('span')

    span_name.className = 'parent-name'

    span_row_no.textContent = i++ + "."
    span_name.textContent = doc.data().f_name + " " + doc.data().m_name + " " + doc.data().l_name
    span_address.textContent = doc.data().address
    span_contact_number.textContent = doc.data().contact_number
    span_email.textContent = doc.data().email

    parentList.push([doc.data().f_name, doc.data().m_name, doc.data().l_name, doc.data().address, doc.data().contact_number, doc.data().email, doc.data().password, doc.id, doc.data().father, doc.data().mother])

    div_button.innerHTML = '<button type="button" class="update_parent btn btn-primary mx-1">Update</button>';
    div_button.innerHTML += '<button type="button" class="view_parent btn btn-danger mx-1">View</button>';
    
    
    td_row_no.className = 'row-no text-center p-3'
    td_div_name_address.className = 'div-name-address'
    td_contact_number.className = 'text-center p-3'
    td_email.className = 'text-center p-3'
    tr.className = 'table-light table-striped'

    td_row_no.appendChild(span_row_no)
        td_div_name_address.appendChild(span_name)
        td_div_name_address.appendChild(span_address)
    td_name_address.appendChild(td_div_name_address)
    td_contact_number.appendChild(span_contact_number)
    td_email.appendChild(span_email)
    td_div_button.appendChild(div_button)

    tr.appendChild(td_row_no)
    tr.appendChild(td_name_address)
    tr.appendChild(td_contact_number)
    tr.appendChild(td_email)
    tr.appendChild(td_div_button)

    tbody.appendChild(tr)
    table.appendChild(tbody)
}

let isShowParentAccount = false;
document.getElementById('show-parent-account').addEventListener('click', () => {
    if (isShowParentAccount === false) {
        isShowParentAccount = true;
        document.getElementById('show-parent-account').textContent = 'Show Teacher Account'
        document.querySelector('.content-title .title').textContent = ' > Parent Account'
        document.getElementById('show-teacher-accountlist-container').style.display = 'none'
        document.getElementById('show-parent-accountlist-container').style.display = 'block'
    } else {
        isShowParentAccount = false;
        document.getElementById('show-parent-account').textContent = 'Show Parent Account'
        document.querySelector('.content-title .title').textContent = ' > Teacher Account'
        document.getElementById('show-teacher-accountlist-container').style.display = 'block'
        document.getElementById('show-parent-accountlist-container').style.display = 'none'
    }
})

var oldParentPassword
function setOldParentPassword(password) {
    oldParentPassword = password
}

function getOldParentPassword(){
    return oldParentPassword
}

var oldTeacherPassword
function setOldTeacherPassword(password) {
    oldTeacherPassword = password
}

function getOldTeacherPassword(){
    return oldTeacherPassword
}

window.addEventListener('DOMContentLoaded', async (event) => {
    await getTeacherAccountList()
    await getParentAccountList() 
    await getAllStudentList()
    
    document.getElementById('search-teacher-list-name').addEventListener('keyup', (e) => {
        document.querySelectorAll('.account-list-teacher-tbody tr').forEach((row) => {
            row.querySelector('.teacher-name').textContent.toLowerCase().startsWith(e.target.value.toLowerCase()) ? (row.style.display = 'table-row') : (row.style.display = 'none')
        })
    })
    
    document.getElementById('search-teacher-list-name').addEventListener('keyup', (e) => {
        document.querySelectorAll('.account-list-parent-tbody tr').forEach((row) => {
            row.querySelector('.parent-name').textContent.toLowerCase().startsWith(e.target.value.toLowerCase()) ? (row.style.display = 'table-row') : (row.style.display = 'none')
        })
    })

    document.querySelectorAll('.update_teacher').forEach((element, index) => {
        element.addEventListener('click', (e) => {
            document.querySelector('.content-title .title').textContent = '> Teacher Account > Update Teacher Info'
            document.querySelector('.teacher-update-information').style.display = 'block'
            document.querySelector('.teacher-parent-container').style.display = 'none'
            editTeacherInfo(index)
        })
    })

    var teacher_unique_id
    var parent_unique_id

    function editTeacherInfo(index){
        setOldTeacherPassword(teacherList[index][7])
        document.querySelector('.account-list .teacher-update-information #update_teacher_f_name').value = teacherList[index][0]
        document.querySelector('.account-list .teacher-update-information #update_teacher_m_name').value = teacherList[index][1]
        document.querySelector('.account-list .teacher-update-information #update_teacher_l_name').value = teacherList[index][2]
        document.querySelector('.account-list .teacher-update-information #update_teacher_address').value = teacherList[index][3]
        document.querySelector('.account-list .teacher-update-information #update_teacher_grade').value = teacherList[index][4]
        document.querySelector('.account-list .teacher-update-information #update_teacher_contact_number').value = teacherList[index][5]
        document.querySelector('.account-list .teacher-update-information #update_teacher_email').value = teacherList[index][6]
        document.querySelector('.account-list .teacher-update-information #update_teacher_password').value = getOldTeacherPassword()
        teacher_unique_id = teacherList[index][8]
    }

    document.getElementById('update_now_teacher_info').addEventListener('click', (e) => {
        var teacher_f_name = document.getElementById('update_teacher_f_name').value 
        var teacher_m_name = document.getElementById('update_teacher_m_name').value 
        var teacher_l_name = document.getElementById('update_teacher_l_name').value 
        var teacher_address = document.getElementById('update_teacher_address').value 
        var teacher_grade = document.getElementById('update_teacher_grade').value 
        var teacher_contact_number = document.getElementById('update_teacher_contact_number').value 
        var teacher_email = document.getElementById('update_teacher_email').value 
        var teacher_password = document.getElementById('update_teacher_password').value 
        updateTeacherInfo (teacher_f_name, teacher_m_name, teacher_l_name, teacher_address, teacher_grade, teacher_contact_number, teacher_email, teacher_password, getOldTeacherPassword(), teacher_unique_id)
    })

    document.getElementById('cancel_now_teacher_info').addEventListener('click', (e) => {
        document.querySelector('.teacher-update-information').style.display = 'none'
        document.querySelector('.teacher-parent-container').style.display = 'block'
        document.querySelector('.content-title .title').textContent = '> Teacher Account'
    })

    document.querySelectorAll('.view_teacher').forEach((element, index) => {
        element.addEventListener('click', (e) => {
            document.querySelector('.content-title .title').textContent = '> Teacher Account > View Teacher Info'
            document.querySelector('.account-list .teacher-view-information').style.display = 'block'
            document.querySelector('.account-list .teacher-parent-container').style.display = 'none'
            viewTeacherInfo(index)
        })
    })

    function viewTeacherInfo(index){
        document.querySelector('.account-list .teacher-view-information #update_teacher_f_name').value = teacherList[index][0]
        document.querySelector('.account-list .teacher-view-information #update_teacher_m_name').value = teacherList[index][1]
        document.querySelector('.account-list .teacher-view-information #update_teacher_l_name').value = teacherList[index][2]
        document.querySelector('.account-list .teacher-view-information #update_teacher_address').value = teacherList[index][3]
        document.querySelector('.account-list .teacher-view-information #update_teacher_grade').value = teacherList[index][4]
        document.querySelector('.account-list .teacher-view-information #update_teacher_contact_number').value = teacherList[index][5]
        document.querySelector('.account-list .teacher-view-information #update_teacher_email').value = teacherList[index][6]
        document.querySelector('.account-list .teacher-view-information #update_teacher_password').value = teacherList[index][7]
    }

    document.querySelector('.account-list .teacher-view-information #cancel_now_teacher_info').addEventListener('click', (e) => {
        document.querySelector('.teacher-view-information').style.display = 'none'
        document.querySelector('.teacher-parent-container').style.display = 'block'
        document.querySelector('.content-title .title').textContent = '> Teacher Account'
    })

    document.querySelectorAll('.update_parent').forEach((element, index) => {
        element.addEventListener('click', (e) => {
            document.querySelector('.parent-update-information').style.display = 'block'
            document.querySelector('.teacher-parent-container').style.display = 'none'
            document.querySelector('.content-title .title').textContent = '> Parent Account > Update Parent Info'
            editParentInfo(index)
        })
    })

    function editParentInfo (index){
        setOldParentPassword(parentList[index][6])
        document.querySelector('.account-list .parent-update-information #update_parent_f_name').value = parentList[index][0]
        document.querySelector('.account-list .parent-update-information #update_parent_m_name').value = parentList[index][1]
        document.querySelector('.account-list .parent-update-information #update_parent_l_name').value = parentList[index][2]
        document.querySelector('.account-list .parent-update-information #update_parent_address').value = parentList[index][3]
        document.querySelector('.account-list .parent-update-information #update_parent_contact_number').value = parentList[index][4]
        document.querySelector('.account-list .parent-update-information #update_parent_father_name').value = parentList[index][4]
        document.querySelector('.account-list .parent-update-information #update_parent_mother_name').value = parentList[index][4]
        document.querySelector('.account-list .parent-update-information #update_parent_email').value = parentList[index][5]
        document.querySelector('.account-list .parent-update-information #update_parent_password').value = parentList[index][6]
        parent_unique_id = parentList[index][7]
    }

    document.getElementById('update_now_parent_info').addEventListener('click', (e) => {
        var parent_f_name = document.getElementById('update_parent_f_name').value 
        var parent_m_name = document.getElementById('update_parent_m_name').value
        var parent_l_name = document.getElementById('update_parent_l_name').value
        var parent_address = document.getElementById('update_parent_address').value
        var parent_contact_number = document.getElementById('update_parent_contact_number').value
        var parent_email = document.getElementById('update_parent_email').value
        var parent_password = document.getElementById('update_parent_password').value
        console.log(parent_unique_id + "sdflsjdlfkj")
        updateParentInformation(parent_unique_id, parent_f_name, parent_m_name, parent_l_name, parent_address, parent_contact_number, parent_email, parent_password)
    })

    document.getElementById('cancel_now_parent_info').addEventListener('click', (e) => {
        document.querySelector('.parent-update-information').style.display = 'none'
        document.querySelector('.teacher-parent-container').style.display = 'block'
        document.querySelector('.content-title .title').textContent = '> Parent Account'
    })

    document.querySelectorAll('.view_parent').forEach((element, index) => {
        element.addEventListener('click', (e) => {
            document.querySelector('.parent-view-information').style.display = 'block'
            document.querySelector('.teacher-parent-container').style.display = 'none'
            document.querySelector('.content-title .title').textContent = '> Parent Account > View Parent Info'
            viewParentInfo(index)
        })
    })

    function viewParentInfo (index){
        document.querySelector('.account-list .parent-view-information #update_parent_f_name').value = parentList[index][0]
        document.querySelector('.account-list .parent-view-information #update_parent_m_name').value = parentList[index][1]
        document.querySelector('.account-list .parent-view-information #update_parent_l_name').value = parentList[index][2]
        document.querySelector('.account-list .parent-view-information #update_parent_address').value = parentList[index][3]
        document.querySelector('.account-list .parent-view-information #update_parent_contact_number').value = parentList[index][4]
        document.querySelector('.account-list .parent-view-information #update_parent_father_name').value = parentList[index][4]
        document.querySelector('.account-list .parent-view-information #update_parent_mother_name').value = parentList[index][4]
        document.querySelector('.account-list .parent-view-information #update_parent_email').value = parentList[index][5]
        document.querySelector('.account-list .parent-view-information #update_parent_password').value = parentList[index][6]
    }

    document.querySelector('.account-list .parent-view-information #cancel_now_parent_info').addEventListener('click', (e) => {
        document.querySelector('.parent-view-information').style.display = 'none'
        document.querySelector('.teacher-parent-container').style.display = 'block'
        document.querySelector('.content-title .title').textContent = '> Parent Account'
    })

})
