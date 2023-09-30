import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, onSnapshot, setDoc , orderBy, query, where, deleteDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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


async function getAllStudentList (){
    const colRef = collection(db, 'Student');
    const gradeQuery = query(colRef, orderBy('grade', 'asc'));

    var snapshot = await getDocs(gradeQuery);
    snapshot.docs.forEach((gradeQuery) => {
        renderStudentList(gradeQuery)
    })
}

// async function orderByGradeSY (sy){
//     const colRef = collection(db, "Student");
//     const gradeQuery = query(colRef, where("sy", '==', sy));
//     var snapshot = await getDocs(gradeQuery);
//     snapshot.docs.forEach((gradeQuery) => {
//         renderStudentList(gradeQuery)
//     })
// }

async function orderByGrade (grade){
    const colRef = collection(db, "Student");
    const gradeQuery = query(colRef, where("grade", "==", grade));
    var snapshot = await getDocs(gradeQuery);
    snapshot.docs.forEach((gradeQuery) => {
        renderStudentList(gradeQuery)
    })
}

async function orderBySy (sy, grade){
    const colRef = collection(db, "Student/");
    const schoolYear = query(colRef, where("sy", "==", sy), where("grade", "==", grade));
    var snapshot = await getDocs(schoolYear);
    snapshot.docs.forEach((schoolYear) => {
        renderStudentList(schoolYear)
    })
}

async function getSchoolYear (){
    var select = document.querySelector('.student-list .dropdown .list2 #list1')
    var option = document.createElement('option')

    option.value = '0'
    option.textContent = 'Select Year'
    option.selected = true;
    select.insertBefore(option, select.firstChild);

    const colRef = collection (db, 'School Year')
    const snapshot = await getDocs (colRef)
    snapshot.docs.forEach((doc) => {
        renderSchoolYear(doc)
    })   
}

function renderSchoolYear(doc) {
    var select = document.querySelector('.student-list .dropdown .list2 #list1')
    var option = document.createElement('option')
    option.value = doc.data().sy
    option.textContent = doc.data().sy

    select.appendChild(option)
}

var i = 1;
var studentList = []
function renderStudentList (doc) {
    var tbody = document.querySelector('.student-list .student-table-tbody')

    var tr = document.createElement('tr')
    var td_row_no = document.createElement('td')
    var td_name = document.createElement('td')
    var td_grade = document.createElement('td')
    var td_sy = document.createElement('td')
    var td_div_button = document.createElement('td')
    var div_button = document.createElement('div')

    var span_row_no = document.createElement('span')
    var span_name = document.createElement('span')
    var span_grade = document.createElement('span')
    var span_sy = document.createElement('span')

    studentList.push([doc.id, doc.data().date_enrolled, doc.data().age_on_june, doc.data().surname, doc.data().first_name, doc.data().middle_name, doc.data().date_of_birth, doc.data().place_of_birth, doc.data().age, doc.data().sex, doc.data().home_address, doc.data().contact_no, doc.data().religion, doc.data().school_last_attended, doc.data().address, doc.data().grade_level_in_the_previous_school, doc.data().honor_received, doc.data().name_of_father, doc.data().father_occupation, doc.data().father_contact_no, doc.data().name_of_mother, doc.data().mother_occupation, doc.data().mother_contact_no, doc.data().name, doc.data().relationship, doc.data().contact_no_tel, doc.data().cell_no, doc.data().grade, doc.data().status, doc.data().sy])

    span_row_no.textContent = `${i++}.`
    span_name.textContent = doc.data().first_name + ' ' + doc.data().middle_name + ' ' + doc.data().surname
    span_grade.textContent = doc.data().grade
    span_sy.textContent = doc.data().sy
    
    td_row_no.appendChild(span_row_no)

    tr.className = 'table-light student_tr'
    td_row_no.className = 'no p-3'
    td_name.className = 'p-3 td-student-list-name'
    td_grade.className = 'grade p-3'
    td_sy.className = 'p-3'

    td_row_no.appendChild(span_row_no)
    td_name.appendChild(span_name) 
    td_grade.appendChild(span_grade)
    td_sy.appendChild(span_sy)

    div_button.className = 'd-flex justify-content-center'

    div_button.innerHTML = '<button type="button" class="update_student btn btn-primary mx-1">Update</button>';
    div_button.innerHTML += '<button type="button" class="view_student btn btn-success mx-1">View</button>';

    
    td_div_button.appendChild(div_button)

    tr.appendChild(td_row_no)
    tr.appendChild(td_name)
    tr.appendChild(td_grade)
    tr.appendChild(td_sy)
    tr.appendChild(td_div_button)

    tbody.appendChild(tr)
}

var student_unique_id
function getStudentInfo (index){
    document.querySelector('.student-list .enrollment-text #sy').textContent = studentList[index][29]
    student_unique_id = studentList[index][0]
    document.querySelector('.student-list .fill-up-form #date-enrolled').value = studentList[index][1]
    document.querySelector('.student-list .fill-up-form #age-on-june').value = studentList[index][2]
    document.querySelector('.student-list .fill-up-form #surname').value = studentList[index][3]
    document.querySelector('.student-list .fill-up-form #first-name').value = studentList[index][4]
    document.querySelector('.student-list .fill-up-form #middle-name').value = studentList[index][5]
    document.querySelector('.student-list .fill-up-form #date-of-birth').value = studentList[index][6]
    document.querySelector('.student-list .fill-up-form #place-of-birth').value = studentList[index][7]
    document.querySelector('.student-list .fill-up-form #age').value = studentList[index][8]
    document.querySelector('.student-list .fill-up-form #sex').value = studentList[index][9]
    document.querySelector('.student-list .fill-up-form #home-address').value = studentList[index][10]
    document.querySelector('.student-list .fill-up-form #contact-no').value = studentList[index][11]
    document.querySelector('.student-list .fill-up-form #religion').value = studentList[index][12]
    document.querySelector('.student-list .fill-up-form #school-last-attended').value = studentList[index][13]
    document.querySelector('.student-list .fill-up-form #address').value = studentList[index][14]
    document.querySelector('.student-list .fill-up-form #grade-level-in-the-previous-school').value = studentList[index][15]
    document.querySelector('.student-list .fill-up-form #honor-received').value = studentList[index][16]
    document.querySelector('.student-list .fill-up-form #name-of-father').value = studentList[index][17]
    document.querySelector('.student-list .fill-up-form #father-occupation').value = studentList[index][18]
    document.querySelector('.student-list .fill-up-form #father-contact-no').value = studentList[index][19]
    document.querySelector('.student-list .fill-up-form #name-of-mother').value = studentList[index][20]
    document.querySelector('.student-list .fill-up-form #mother-occupation').value = studentList[index][21]
    document.querySelector('.student-list .fill-up-form #mother-contact-no').value = studentList[index][22]
    document.querySelector('.student-list .fill-up-form #name').value = studentList[index][23]
    document.querySelector('.student-list .fill-up-form #relationship').value = studentList[index][24]
    document.querySelector('.student-list .fill-up-form #contact-no-tel').value = studentList[index][25]
    document.querySelector('.student-list .fill-up-form #cell-no').value = studentList[index][26]
    document.querySelector('.student-list .fill-up-form #grade').value = studentList[index][27]
    document.querySelector('.student-list .fill-up-form #status').value = studentList[index][28]
}

function getViewStudentInfo (index){
    document.querySelector('.student-list .student-view-information .enrollment-text #sy').textContent = getSchoolYears()
    student_unique_id = studentList[index][0]
    document.querySelector('.student-list .student-view-information.student-view-information .fill-up-form #date-enrolled').value = studentList[index][1]
    document.querySelector('.student-list .student-view-information .fill-up-form #age-on-june').value = studentList[index][2]
    document.querySelector('.student-list .student-view-information .fill-up-form #surname').value = studentList[index][3]
    document.querySelector('.student-list .student-view-information .fill-up-form #first-name').value = studentList[index][4]
    document.querySelector('.student-list .student-view-information .fill-up-form #middle-name').value = studentList[index][5]
    document.querySelector('.student-list .student-view-information .fill-up-form #date-of-birth').value = studentList[index][6]
    document.querySelector('.student-list .student-view-information .fill-up-form #place-of-birth').value = studentList[index][7]
    document.querySelector('.student-list .student-view-information .fill-up-form #age').value = studentList[index][8]
    document.querySelector('.student-list .student-view-information .fill-up-form #sex').value = studentList[index][9]
    document.querySelector('.student-list .student-view-information .fill-up-form #home-address').value = studentList[index][10]
    document.querySelector('.student-list .student-view-information .fill-up-form #contact-no').value = studentList[index][11]
    document.querySelector('.student-list .student-view-information .fill-up-form #religion').value = studentList[index][12]
    document.querySelector('.student-list .student-view-information .fill-up-form #school-last-attended').value = studentList[index][13]
    document.querySelector('.student-list .student-view-information .fill-up-form #address').value = studentList[index][14]
    document.querySelector('.student-list .student-view-information .fill-up-form #grade-level-in-the-previous-school').value = studentList[index][15]
    document.querySelector('.student-list .student-view-information .fill-up-form #honor-received').value = studentList[index][16]
    document.querySelector('.student-list .student-view-information .fill-up-form #name-of-father').value = studentList[index][17]
    document.querySelector('.student-list .student-view-information .fill-up-form #father-occupation').value = studentList[index][18]
    document.querySelector('.student-list .student-view-information .fill-up-form #father-contact-no').value = studentList[index][19]
    document.querySelector('.student-list .student-view-information .fill-up-form #name-of-mother').value = studentList[index][20]
    document.querySelector('.student-list .student-view-information .fill-up-form #mother-occupation').value = studentList[index][21]
    document.querySelector('.student-list .student-view-information .fill-up-form #mother-contact-no').value = studentList[index][22]
    document.querySelector('.student-list .student-view-information .fill-up-form #name').value = studentList[index][23]
    document.querySelector('.student-list .student-view-information .fill-up-form #relationship').value = studentList[index][24]
    document.querySelector('.student-list .student-view-information .fill-up-form #contact-no-tel').value = studentList[index][25]
    document.querySelector('.student-list .student-view-information .fill-up-form #cell-no').value = studentList[index][26]
    document.querySelector('.student-list .student-view-information .fill-up-form #grade').value = studentList[index][27]
    document.querySelector('.student-list .student-view-information .fill-up-form #status').value = studentList[index][28]
}

function updateStudentInfo (){
    var date_enrolled = document.querySelector('.student-list #date-enrolled').value
    var age_on_june = document.querySelector('.student-list #age-on-june').value
    var surname = document.querySelector('.student-list #surname').value
    var first_name = document.querySelector('.student-list #first-name').value
    var middle_name = document.querySelector('.student-list #middle-name').value
    var date_of_birth = document.querySelector('.student-list #date-of-birth').value
    var place_of_birth = document.querySelector('.student-list #place-of-birth').value
    var age = document.querySelector('.student-list #age').value
    var sex = document.querySelector('.student-list #sex').value
    var home_address = document.querySelector('.student-list #home-address').value
    var contact_no = document.querySelector('.student-list #contact-no').value
    var religion = document.querySelector('.student-list #religion').value
    var school_last_attended  = document.querySelector('.student-list #school-last-attended').value
    var address = document.querySelector('.student-list #address').value
    var grade_level_in_the_previous_school = document.querySelector('.student-list #grade-level-in-the-previous-school').value
    var honor_received = document.querySelector('.student-list #honor-received').value
    var name_of_father = document.querySelector('.student-list #name-of-father').value
    var father_occupation = document.querySelector('.student-list #father-occupation').value
    var father_contact_no = document.querySelector('.student-list #father-contact-no').value
    var name_of_mother = document.querySelector('.student-list #name-of-mother').value
    var mother_occupation = document.querySelector('.student-list #mother-occupation').value
    var mother_contact_no = document.querySelector('.student-list #mother-contact-no').value
    var name = document.querySelector('.student-list #name').value
    var relationship = document.querySelector('.student-list #relationship').value
    var contact_no_tel = document.querySelector('.student-list #contact-no-tel').value
    var cell_no = document.querySelector('.student-list #cell-no').value
    var grade = document.querySelector('.student-list #grade').value
    var status = document.querySelector('.student-list #status').value

    const colRef = doc(db, 'Student/' + student_unique_id)
    setDoc(colRef, { 
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
        status : status   
    }).then(() => {
        console.log("Document successfully updated!");
        location.reload()
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
}

function deleteTableRow(){
    i = 1
    var table_body = document.querySelectorAll('.student-table-tbody tr')
    for (const row of table_body){
        row.remove()
    }
}

var sy
function setSchoolYear (schoolYear){
    sy = schoolYear
}

function getSchoolYears(){ 
    return sy
}

window.addEventListener('DOMContentLoaded', async (event) => {
    await getAllStudentList()
    await getSchoolYear()
    // await getSchoolYear()

    document.getElementById('search-student-list-name').addEventListener('keyup', (e) => {
        document.querySelectorAll('.student-table-tbody tr').forEach((row) => {
            row.querySelector('.td-student-list-name').textContent.toLowerCase().startsWith(e.target.value.toLowerCase()) ? (row.style.display = 'table-row') : (row.style.display = 'none')
        })
    })

    document.querySelector('.student-list .dropdown .list1 #list').addEventListener('change', (e) => {
        var grade = document.getElementById('list').value;
        // var sy = document.querySelector('.student-list .dropdown .list2 #list').value;
        deleteTableRow()
        orderByGrade(grade)
        document.querySelector('.student-list .dropdown .list2').style.display = 'block'

        if (grade === '0'){
            getAllStudentList()
            document.querySelector('.student-list .dropdown .list2').style.display = 'none'
        }
    })

    document.querySelector('.student-list .dropdown .list2 #list1').addEventListener('change', () => {
        var grade = document.querySelector('.student-list .dropdown .list1 #list').value;
        var sy = document.querySelector('.student-list .dropdown .list2 #list1').value;
        deleteTableRow()
        orderBySy(sy, grade)

        if (sy === '0') {
            getAllStudentList()
        }
    })

    document.querySelectorAll('.student-list .update_student').forEach((element, index) => {
        element.addEventListener('click', (e) =>{
            e.preventDefault()
            document.querySelector('.student-list .student-update-information').style.display = 'block'
            document.querySelector('.student-list .student-list-container').style.display = 'none'
            getStudentInfo(index)
        })
    });

    document.querySelectorAll('.student-list .view_student').forEach((element, index) => {
        element.addEventListener('click', (e) =>{
            e.preventDefault()
            document.querySelector('.student-list .student-view-information').style.display = 'block'
            document.querySelector('.student-list .student-list-container').style.display = 'none'
            getViewStudentInfo(index)
        })
    });


    document.querySelector('.student-list .student-update-information .enroll-btn #update-student-info').addEventListener('click', () => {
        updateStudentInfo ()
    })

    document.querySelector('.student-list .student-update-information .enroll-btn #back').addEventListener('click', () => {
        document.querySelector('.student-list .student-update-information').style.display = 'none'
        document.querySelector('.student-list .student-list-container').style.display = 'block'
    })

    document.querySelector('.student-list .student-view-information .enroll-btn #back').addEventListener('click', () => {
        document.querySelector('.student-list .student-view-information').style.display = 'none'
        document.querySelector('.student-list .student-list-container').style.display = 'block'
    })
})