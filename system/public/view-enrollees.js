import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, getDocs, where, doc, getDoc, setDoc, deleteDoc, orderBy, query } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
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

async function getEnrollees (){
    const colRef = collection(db, 'Students_Pending_Enrollment')
    const snapshot = await getDocs(colRef)
    snapshot.forEach((doc) => {
        renderStudentsPendingEnrollment(doc)
    })
}

async function getSchoolYear (){
    const colRef = collection(db, 'Enrollment')
    onSnapshot(colRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setSchoolYear(doc.data().sy)
        })
    })
}

function getEnrolleeInfo (index){
    document.querySelector('.view-enrollees .enrollee-information #sy').textContent = 'SY: ' + getSchoolYears()
    setEnrolleeID(enrollees[index][0])
    document.querySelector('.view-enrollees #age-on-june').value = enrollees[index][1]
    document.querySelector('.view-enrollees #surname').value = enrollees[index][2]
    document.querySelector('.view-enrollees #first-name').value = enrollees[index][3]
    document.querySelector('.view-enrollees #middle-name').value = enrollees[index][4]
    document.querySelector('.view-enrollees #date-of-birth').value = enrollees[index][5]
    document.querySelector('.view-enrollees #place-of-birth').value = enrollees[index][6]
    document.querySelector('.view-enrollees #age').value = enrollees[index][7]
    document.querySelector('.view-enrollees #sex').value = enrollees[index][8]
    document.querySelector('.view-enrollees #home-address').value = enrollees[index][9]
    document.querySelector('.view-enrollees #contact-no').value = enrollees[index][10]
    document.querySelector('.view-enrollees #religion').value = enrollees[index][11]
    document.querySelector('.view-enrollees #school-last-attended').value = enrollees[index][12]
    document.querySelector('.view-enrollees #address').value = enrollees[index][13]
    document.querySelector('.view-enrollees #grade-level-in-the-previous-school').value = enrollees[index][14]
    document.querySelector('.view-enrollees #honor-received').value = enrollees[index][15]
    document.querySelector('.view-enrollees #name-of-father').value = enrollees[index][16]
    document.querySelector('.view-enrollees #father-occupation').value = enrollees[index][17]
    document.querySelector('.view-enrollees #father-contact-no').value = enrollees[index][18]
    document.querySelector('.view-enrollees #name-of-mother').value = enrollees[index][19]
    document.querySelector('.view-enrollees #mother-occupation').value = enrollees[index][20]
    document.querySelector('.view-enrollees #mother-contact-no').value = enrollees[index][21]
    document.querySelector('.view-enrollees #name').value = enrollees[index][22]
    document.querySelector('.view-enrollees #relationship').value = enrollees[index][23]
    document.querySelector('.view-enrollees #contact-no-tel').value = enrollees[index][24]
    document.querySelector('.view-enrollees #cell-no').value = enrollees[index][25]
    document.querySelector('.view-enrollees #grade').value = enrollees[index][26]
    document.querySelector('.view-enrollees #status').value = enrollees[index][27]
    setParentID(enrollees[index][28])
}

async function acceptEnrollment () {
    var date = new Date()
    var date_enrolled = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var age_on_june = document.querySelector('.view-enrollees #age-on-june').value
    var surname = document.querySelector('.view-enrollees #surname').value
    var first_name = document.querySelector('.view-enrollees #first-name').value
    var middle_name = document.querySelector('.view-enrollees #middle-name').value
    var date_of_birth = document.querySelector('.view-enrollees #date-of-birth').value
    var place_of_birth = document.querySelector('.view-enrollees #place-of-birth').value
    var age = document.querySelector('.view-enrollees #age').value
    var sex = document.querySelector('.view-enrollees #sex').value
    var home_address = document.querySelector('.view-enrollees #home-address').value
    var contact_no = document.querySelector('.view-enrollees #contact-no').value
    var religion = document.querySelector('.view-enrollees #religion').value
    var school_last_attended  = document.querySelector('.view-enrollees #school-last-attended').value
    var address = document.querySelector('.view-enrollees #address').value
    var grade_level_in_the_previous_school = document.querySelector('.view-enrollees #grade-level-in-the-previous-school').value
    var honor_received = document.querySelector('.view-enrollees #honor-received').value
    var name_of_father = document.querySelector('.view-enrollees #name-of-father').value
    var father_occupation = document.querySelector('.view-enrollees #father-occupation').value
    var father_contact_no = document.querySelector('.view-enrollees #father-contact-no').value
    var name_of_mother = document.querySelector('.view-enrollees #name-of-mother').value
    var mother_occupation = document.querySelector('.view-enrollees #mother-occupation').value
    var mother_contact_no = document.querySelector('.view-enrollees #mother-contact-no').value
    var name = document.querySelector('.view-enrollees #name').value
    var relationship = document.querySelector('.view-enrollees #relationship').value
    var contact_no_tel = document.querySelector('.view-enrollees #contact-no-tel').value
    var cell_no = document.querySelector('.view-enrollees #cell-no').value
    var grade = document.querySelector('.view-enrollees #grade').value
    var status = document.querySelector('.view-enrollees #status').value

    var ref = doc (db, 'Student/', getEnrolleeID())
    const docRef = await setDoc (ref, {
        parent_id : getParentID(),
        date_enrolled: date_enrolled,
        age_on_june : age_on_june, 
        surname : surname,
        first_name : first_name,
        middle_name : middle_name,
        date_of_birth : date_of_birth,
        place_of_birth : place_of_birth,
        age : age,
        sex : sex,
        home_address : home_address,
        contact_no : contact_no,
        religion : religion,
        school_last_attended :school_last_attended,
        address : address, 
        grade_level_in_the_previous_school : grade_level_in_the_previous_school,
        honor_received : honor_received,
        name_of_father : name_of_father,
        father_occupation : father_occupation,
        father_contact_no : father_contact_no,
        name_of_mother : name_of_mother, 
        mother_occupation : mother_occupation,
        mother_contact_no : mother_contact_no,
        name : name,
        relationship : relationship,
        contact_no_tel : contact_no_tel,
        cell_no : cell_no,
        grade : grade,
        status : status,
        enrollment_status : 'Enrolled',
        sy : getSY()
    }).then (() => {
        console.log('enroll successful')
        deleteEnrollee(getEnrolleeID())
    }) 
}
        
async function deleteEnrollee (unique_id){
    var colRef = doc(db, 'Students_Pending_Enrollment/', unique_id)
    await deleteDoc (colRef)
    .then(() => {
        location.reload()
    })
}

var enrollees = []
var x = 1
function renderStudentsPendingEnrollment (doc) {
    var table = document.querySelector('.view-enrollees-list-table') 
    var tbody = document.querySelector('.view-enrollees-tbody')
    
    var tr = document.createElement('tr')
    var td_row_no = document.createElement('td')
    var td_name = document.createElement('td')
    var td_grade = document.createElement('td')
    var td_div_button = document.createElement('td')
    var div_button = document.createElement('div')
    
    var span_row_no = document.createElement('span')
    var span_name = document.createElement('span')
    var span_grade = document.createElement('span')
    
        
    span_row_no.textContent = `${x++}.`
    span_name.textContent = doc.data().first_name + ' ' + doc.data().middle_name + ' ' + doc.data().surname
    span_grade.textContent = doc.data().grade
    
    enrollees.push([doc.id, doc.data().age_on_june, doc.data().surname, doc.data().first_name, doc.data().middle_name, doc.data().date_of_birth, doc.data().place_of_birth, doc.data().age, doc.data().sex, doc.data().home_address, doc.data().contact_no, doc.data().religion, doc.data().school_last_attended, doc.data().address, doc.data().grade_level_in_the_previous_school, doc.data().honor_received, doc.data().father_name, doc.data().father_occupation, doc.data().father_contact_no, doc.data().mother_name, doc.data().mother_occupation, doc.data().mother_contact_no, doc.data().name, doc.data().relationship, doc.data().tel_no, doc.data().cell_no, doc.data().grade, doc.data().checkbox, doc.data().parent_id])
    setSY(doc.data().sy)

    div_button.innerHTML = '<button type="button" class="info_enroll btn btn-primary mx-1" style="width: 100px">Info</button>';
    div_button.innerHTML += '<button type="button" class="decline_enroll btn btn-danger mx-1">Decline</button>'
    
    td_row_no.className = 'row-no text-center p-3'
    td_name.className = 'text-center p-3'
    td_grade.className = 'text-center p-3'
    td_div_button.className = 'text-center'
    
    tr.className = 'table-light table-striped'
    
    td_row_no.appendChild(span_row_no)
    td_name.appendChild(span_name)
    td_grade.appendChild(span_grade)
    td_div_button.appendChild(div_button)
    
    tr.appendChild(td_row_no)
    tr.appendChild(td_name)
    tr.appendChild(td_grade)
    tr.appendChild(td_div_button)
    
    tbody.appendChild(tr)
    table.appendChild(tbody)
}

var sy
function setSchoolYear (schoolYear){
    sy = schoolYear
}

function getSchoolYears(){ 
    return sy
}

var parent_id
function setParentID (unique_id){
    parent_id = unique_id
}

function getParentID (){
    return parent_id
}

var enrolle_id
function setEnrolleeID (unique_id){
    enrolle_id = unique_id
}

function getEnrolleeID (){
    return enrolle_id
}

var sy
function setSY (setSy) {
    sy = setSy
}

function getSY (){
    return sy
}

window.addEventListener('DOMContentLoaded', async(event) => {
    await getEnrollees()
    await getSchoolYear()

    document.querySelectorAll('.view-enrollees .view-enrollees-tbody .info_enroll').forEach((element, index) => {
        element.addEventListener('click', (e) => {
            document.querySelector('.view-enrollees-container').style.display = 'none'
            document.querySelector('.enrollee-information').style.display = 'block'
            getEnrolleeInfo(index)
        })
    })

    document.getElementById('close-enrollment').addEventListener('click', () => {
        document.querySelector('.view-enrollees-container').style.display = 'block'
        document.querySelector('.enrollee-information').style.display = 'none'
    })

    document.getElementById('accept-enrollment').addEventListener('click', () => {
        acceptEnrollment ()
    })
})