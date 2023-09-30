import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, addDoc, setDoc, getDoc , updateDoc, onSnapshot, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
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

async function getPaymentList (){
    const colRef = collection(db, 'Payment')
    let cachedDocs = new Set();
    onSnapshot(colRef, (querySnapshot) => {

        deleteTableRow()
        querySnapshot.docChanges().forEach((change) => {
            const doc = change.doc;
            const docId = doc.id;
        
            if (change.type === 'added') {
                if (!cachedDocs.has(docId)) {
                    cachedDocs.add(docId);
                    renderViewPaymentList(doc)
                }
            }
        });
    });


    // const colRef = collection(db, 'Payment');
    // var snapshot = await getDocs(colRef); 
    // snapshot.docs.forEach((doc) => {
    //     renderViewPaymentList(doc)
    // })
}

async function orderByStatus (status){
    const colRef = collection(db, 'Payment');
    const gradeQuery = query(colRef, where("status", "==", status));
    var snapshot = await getDocs(gradeQuery);
    snapshot.docs.forEach((gradeQuery) => {
        renderViewPaymentList(gradeQuery)
    })
}

async function addFees (fees_name, fees_amount, date_time){
    try {
        await addDoc(collection(db, 'Fees/'), {
            fees_name : fees_name,
            fees_amount : fees_amount,
            date_time : date_time
        }).then (() => {
            document.querySelector('.view-payment .payment-add-information .add-fees-container .fees-name-input-container span').textContent = 'success'
            document.querySelector('.view-payment .payment-add-information .add-fees-container .fees-name-input-container span').style.color = 'green'
            document.querySelector('.view-payment .payment-add-information .add-fees-container .fees-name-input-container span').style.display = 'block'
            delay(2000).then(() => {
                document.querySelector('.view-payment .payment-add-information .add-fees-container .fees-name-input-container span').style.display = 'none'
                document.querySelector('.view-payment .payment-add-information .add-fees-container #fees-name').value = ''
                document.querySelector('.view-payment .payment-add-information .add-fees-container #fees-amount').value = ''
            })
            getFees()
        })
    } catch (error) {
        console.log(error.message)
    }
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getUpdateFees (){
    const colRef = collection(db, 'Fees')
    const date_time = query(colRef, orderBy ('date_time', 'desc'))
    let cachedDocs = new Set();
    onSnapshot(date_time, (querySnapshot) => {

        deleteTableRowInFees()
        querySnapshot.docChanges().forEach((change) => {
            const doc = change.doc;
            const docId = doc.id;
        
            if (change.type === 'added') {
                if (!cachedDocs.has(docId)) {
                    cachedDocs.add(docId);
                    renderUpdateFees(doc)
                }
            }
        });
    });
}

async function getFees3 (){
    const colRef = collection(db, 'Fees')
    const snapshot = await getDocs (colRef)
    snapshot.docs.forEach((doc) => {
        displayUpdateFees(doc)
    })
}

var fees1 = []
function displayUpdateFees (doc){
    var tbody = document.querySelector('.view-payment .payment-update-information .payment-section .payment-container .payment-fees-added-tbody')
    var tr = document.createElement('tr')

    var td_fees = document.createElement('td')
    var td_ammount = document.createElement('td')
    var td_button = document.createElement('td')

    var div_button = document.createElement('div')

    var span_fees = document.createElement('span')
    var span_amount = document.createElement('span')

    span_fees.textContent = doc.data().fees_name
    span_amount.textContent = doc.data().fees_amount

    fees1.push([doc.id, doc.data().fees_name, doc.data().fees_amount])
    div_button.innerHTML = '<button type="button" class="remove_fees_to_payment btn btn-danger mx-1"><i class="fa-solid fa-xmark"></i></button>';


    td_fees.appendChild(span_fees)
    td_ammount.appendChild(span_amount)
    td_button.appendChild(div_button)

    tr.appendChild(td_fees)
    tr.appendChild(td_ammount)
    tr.appendChild(td_button)

    tbody.appendChild(tr)

    div_button.querySelectorAll('.remove_fees_to_payment').forEach((removeBtn, index) => {
        removeBtn.addEventListener('click', () => {
            tr.remove()
            const selectedDocId = doc.id
            const indexToRemove = fees.findIndex(item => item[0] === selectedDocId);
            console.log(indexToRemove)
            if (indexToRemove !== -1){
                fees1.splice(indexToRemove, 1)
                console.log(fees)
            }
        })
    })
}

function renderUpdateFees (doc){
    var tbody = document.querySelector('.view-payment .payment-update-information .payment-section .payment-container .payment-fees-tbody')
    var tr = document.createElement('tr')

    var td_fees = document.createElement('td')
    var td_ammount = document.createElement('td')
    var td_button = document.createElement('td')

    var div_button_add = document.createElement('div')
    var div_button_update = document.createElement('div')

    var span_fees = document.createElement('span')
    var span_amount = document.createElement('span')

    td_button.className = 'add-update-fees'
    span_fees.textContent = doc.data().fees_name
    span_amount.textContent = doc.data().fees_amount
    div_button_add.innerHTML = '<button type="button" class="add_fees_to_payment btn btn-primary mx-1"><i class="fa-solid fa-check"></i></button>';


    td_fees.appendChild(span_fees)
    td_ammount.appendChild(span_amount)
    td_button.appendChild(div_button_add)
    td_button.appendChild(div_button_update)

    tr.appendChild(td_fees)
    tr.appendChild(td_ammount)
    tr.appendChild(td_button)

    tbody.appendChild(tr)

    div_button_add.addEventListener('click', () => {
        console.log(doc.id)
        displayAddFees(doc)
    })

    div_button_update.addEventListener('click', () => {
        console.log(doc.id)
        updateFees(doc)
    })
}


async function getFees (){
    const colRef = collection(db, 'Fees')
    const date_time = query(colRef, orderBy ('date_time', 'desc'))
    let cachedDocs = new Set();
    onSnapshot(date_time, (querySnapshot) => {

        deleteTableRowInFees()
        querySnapshot.docChanges().forEach((change) => {
            const doc = change.doc;
            const docId = doc.id;
        
            if (change.type === 'added') {
                if (!cachedDocs.has(docId)) {
                    cachedDocs.add(docId);
                    renderFees(doc)
                }
            }
        });
    });
}

async function getFees2 (){
    const colRef = collection(db, 'Fees')
    const snapshot = await getDocs (colRef)
    snapshot.docs.forEach((doc) => {
        displayAddFees(doc)
    })
}

function renderFees (doc){
    var tbody = document.querySelector('.view-payment .payment-add-information .payment-section .payment-container .payment-fees-tbody')
    var tr = document.createElement('tr')

    var td_fees = document.createElement('td')
    var td_ammount = document.createElement('td')
    var td_button = document.createElement('td')

    var div_button_add = document.createElement('div')
    var div_button_update = document.createElement('div')

    var span_fees = document.createElement('span')
    var span_amount = document.createElement('span')

    td_button.className = 'add-update-fees'
    span_fees.textContent = doc.data().fees_name
    span_amount.textContent = doc.data().fees_amount
    div_button_add.innerHTML = '<button type="button" class="add_fees_to_payment btn btn-primary mx-1"><i class="fa-solid fa-check"></i></button>';
    div_button_update.innerHTML = '<button type="button" class="update_fees_to_payment btn btn-success mx-1"><i class="fa-solid fa-pen"></i></button>';


    td_fees.appendChild(span_fees)
    td_ammount.appendChild(span_amount)
    td_button.appendChild(div_button_add)
    td_button.appendChild(div_button_update)

    tr.appendChild(td_fees)
    tr.appendChild(td_ammount)
    tr.appendChild(td_button)

    tbody.appendChild(tr)

    div_button_add.addEventListener('click', () => {
        console.log(doc.id)
        displayAddFees(doc)
    })

    div_button_update.addEventListener('click', () => {
        console.log(doc.id)
        updateFees(doc)
    })
}

function updateFees (doc) {
    document.querySelector('.view-payment .payment-add-information .payment-section .update-fees-container').style.display = 'block'
    document.querySelector('.view-payment .payment-add-information .payment-section .update-fees-container #fees-name').value = doc.data().fees_name
    document.querySelector('.view-payment .payment-add-information .payment-section .update-fees-container #fees-amount').value = doc.data().fees_amount

    document.querySelector('.view-payment .payment-add-information .payment-section .update-fees-container #update-fees-btn').addEventListener('click', () => {
        var name = document.querySelector('.view-payment .payment-add-information .payment-section .update-fees-container #fees-name').value
        var amount = document.querySelector('.view-payment .payment-add-information .payment-section .update-fees-container #fees-amount').value
        updateNowFees(doc.id, name, amount, doc.data().date_time)
    })
}

async function updateNowFees (id, name, amount, date_time) {
    var ref = doc(db, 'Fees/' + id)
    const docRef = await setDoc(ref, {
        fees_name : name,
        fees_amount : amount,
        date_time : date_time
    }).then (() => {
        getFees()
        console.log('Payment updated successfully')
        document.querySelector('.view-payment .payment-add-information .payment-section .update-fees-container').style.display = 'none'
    })
}

var fees = []
function displayAddFees (doc){
    var tbody = document.querySelector('.view-payment .payment-add-information .payment-section .payment-container .payment-fees-added-tbody')
    var tr = document.createElement('tr')

    var td_fees = document.createElement('td')
    var td_ammount = document.createElement('td')
    var td_button = document.createElement('td')

    var div_button = document.createElement('div')

    var span_fees = document.createElement('span')
    var span_amount = document.createElement('span')

    span_fees.textContent = doc.data().fees_name
    span_amount.textContent = doc.data().fees_amount

    fees.push([doc.id, doc.data().fees_name, doc.data().fees_amount])
    div_button.innerHTML = '<button type="button" class="remove_fees_to_payment btn btn-danger mx-1"><i class="fa-solid fa-xmark"></i></button>';


    td_fees.appendChild(span_fees)
    td_ammount.appendChild(span_amount)
    td_button.appendChild(div_button)

    tr.appendChild(td_fees)
    tr.appendChild(td_ammount)
    tr.appendChild(td_button)

    tbody.appendChild(tr)

    div_button.querySelectorAll('.remove_fees_to_payment').forEach((removeBtn, index) => {
        removeBtn.addEventListener('click', () => {
            tr.remove()
            const selectedDocId = doc.id
            const indexToRemove = fees.findIndex(item => item[0] === selectedDocId);
            console.log(indexToRemove)
            if (indexToRemove !== -1){
                fees.splice(indexToRemove, 1)
                console.log(fees)
            }
        })
    })
}

function deleteTableRowInFeesFour(){
    var table_body = document.querySelectorAll('.view-payment .payment-update-information .payment-fees-tbody tr')
    for (const row of table_body){
      row.remove()
    }
}

function deleteTableRowInFeesThree(){ 
    u = 1
    var table_body = document.querySelectorAll('.view-payment .payment-update-information .payment-history .payment-history-tbody tr')
    for (const row of table_body){
      row.remove()
    }
}

function deleteTableRowInFeesFive(){ 
    var table_body = document.querySelectorAll('.view-payment .payment-update-information .payment-fees-added-tbody tr')
    for (const row of table_body){
      row.remove()
    }
}

function deleteTableRowInFeesTwo(){ 
    var table_body = document.querySelectorAll('.view-payment .payment-add-information .payment-fees-added-tbody tr')
    for (const row of table_body){
      row.remove()
    }
}

function deleteTableRowInFees(){
    var table_body = document.querySelectorAll('.view-payment .payment-add-information .payment-fees-tbody tr')
    for (const row of table_body){
      row.remove()
    }
}

var x = 1
function deleteTableRow(){
    x = 1
    var table_body = document.querySelectorAll('.view-payment-list-table-tbody tr')
    for (const row of table_body){
      row.remove()
    }
}

async function getParentName (span_context, userID){
    const colRef = doc (db, 'Pupil/' + userID)
    const snapshot = await getDoc(colRef);
    if (snapshot.exists()){
        span_context.textContent = snapshot.data().f_name + ' ' + snapshot.data().m_name + ' ' + snapshot.data().l_name
    }
}

async function getPaymentParentName (userID){
    const colRef = doc (db, 'Pupil/' + userID)
    const snapshot = await getDoc(colRef);
    if (snapshot.exists()){
        document.querySelector('.view-payment .payment-update-information .payment-section .payment-header .name').textContent = snapshot.data().f_name + ' ' + snapshot.data().m_name + ' ' + snapshot.data().l_name
    }
}

function renderViewPaymentList (doc) {
    var table = document.querySelector('.view-payment-list-table')
    var tbody = document.querySelector('.view-payment-list-table-tbody')
  
    var tr = document.createElement('tr')
    var td_row_no = document.createElement('td')
    var td_name = document.createElement('td')
    var td_div_button = document.createElement('td')

    var div_button = document.createElement('div')

    var span_row_no = document.createElement('span')
    var span_name = document.createElement('span')

    span_row_no.textContent = `${x++}.`

    getParentName(span_name, doc.data().id)
    div_button.innerHTML = '<button type="button" class="btn btn-primary mx-1">Update</button>';
  
    tr.className = 'table-light table-striped'

    td_row_no.className = 'row-no text-center p-3'
    td_name.className = 'text-center p-3 td-payment-student-name'
    td_div_button.className = 'text-center'


    td_row_no.appendChild(span_row_no)
    td_name.appendChild(span_name)
    td_div_button.appendChild(div_button)

    tr.appendChild(td_row_no)
    tr.appendChild(td_name)
    tr.appendChild(td_div_button)
  
    tbody.appendChild(tr)
    table.appendChild(tbody)

    div_button.addEventListener('click', () => {
        document.querySelector('.content-title .title').textContent = '> Update Payment Info'
        document.querySelector('.view-payment-container').style.display = 'none'
        document.querySelector('.payment-update-information').style.display = 'block'
        getUpdateFees()
        deleteTableRowInFeesFour()
        deleteTableRowInFeesThree()
        setPaymentId(doc.id)
        setId1(doc.data().id)
        getPaymentParentName(doc.data().id)
        getHistory()
    })
}

var userId
function setPaymentId(userID){
    userId = userID
}

function getPaymentId(){
    return userId
}

async function getParentList (){
    const colRef = collection (db, 'Pupil')
    const snapshot = await getDocs (colRef)
    snapshot.docs.forEach((doc) => {
        renderParents(doc)
    })
}

function renderParents(doc) {
    var select = document.querySelector('.view-payment .payment-add-information #payment-list')
    var option = document.createElement('option')
    option.value = doc.id
    option.textContent = doc.data().f_name + ' ' + doc.data().m_name + ' ' + doc.data().l_name

    select.appendChild(option)
}

async function updatePayment (userID, sy){
    try {
        const docRef = doc(db, 'Payment', userID); // Get a reference to the document you want to update

        const feesObject = fees1.reduce((acc, cur, i) => {
            acc[i] = cur;
            return acc;
        }, {});

        await addDoc(collection(db, 'Payment History/'), {
            fees: feesObject,
            sy : sy,
            id : getId1()
        }).then (() => {
            alert('Payment updated successfully!');
            deleteTableRowInFeesThree()
            getHistory()
            document.querySelector('.view-payment .payment-update-information .payment-section .total-amount-paid-text-input input').value = ''
            document.querySelector('.view-payment .payment-update-information .payment-section .payment-header #sy1').value = ''
            document.querySelector('.view-payment .payment-update-information .payment-section .payment-header #sy2').value = ''
        })
    } catch (error) {
        console.log(error.message)
    }
}

async function  addPayment() {
    var sy1 = document.querySelector('.view-payment .payment-add-information .payment-section .payment-header #sy1').value
    var sy2 = document.querySelector('.view-payment .payment-add-information .payment-section .payment-header #sy2').value
    var id = getId()

    
      
    addDoc(collection(db, 'Payment'),{ 
        sy : sy1 + ' - ' + sy2,
        id : id
    }).then(() => {
        const feesObject = fees.reduce((acc, cur, i) => {
            acc[i] = cur;
            return acc;
        }, {});
        addDoc(collection(db, 'Payment History'), {
            fees : feesObject,
            sy : sy1 + ' - ' + sy2,
            id : id
        }).then(() => {
            alert('Payment successfully added!');
            deleteTableRowInFeesTwo()
            document.querySelector('.view-payment .payment-add-information .payment-section .total-amount-paid-text-input input').value = ''
            document.querySelector('.view-payment .payment-add-information .payment-section .payment-header #sy1').value = ''
            document.querySelector('.view-payment .payment-add-information .payment-section .payment-header #sy2').value = ''
        }).catch((error) => {
            console.log(error.message);
            alert('Please select Payment Name!');
        })
    }).catch((error) => {
        console.log(error.message);
        alert('Please select Payment Name!');
    })
}

var id
function setId (renderID){
    id = renderID
}

function getId(){
    return id
}

var id1 
function setId1(idvalue) {
    id1 = idvalue
}

function getId1 (){
    return id1
}

async function getHistory (){
    const colRef = collection (db, 'Payment History')
    const history = query(colRef, where('id', '==', getId1()), orderBy('sy', 'desc'))
    const snapshot = await getDocs(history)
    snapshot.docs.forEach((doc, index) => {
        const feesArray = Object.values(doc.data().fees);
        feesArray.forEach((fee, i) => {
            renderPaymentHistory(fee, doc)
        });
    });
}

var u = 1
function renderPaymentHistory (fee, doc){
    const tbody = document.querySelector('.view-payment .payment-update-information .payment-history .payment-history-tbody')
    const tr = document.createElement('tr')

    var td_row_no = document.createElement('td')
    var td_fee_name = document.createElement('td')
    var td_fee_amount = document.createElement('td')
    var td_sy = document.createElement('td')

    var span_row_no = document.createElement('span')
    var span_fee_name = document.createElement('span')
    var span_fee_amount = document.createElement('span')
    var span_sy = document.createElement('span')

    td_sy.className = 'td_sy'
    
    span_row_no.textContent = `${u++}.`
    span_fee_name.textContent = fee[1]
    span_fee_amount.textContent = fee[2]
    span_sy.textContent = doc.data().sy

    td_row_no.appendChild(span_row_no)
    td_fee_name.appendChild(span_fee_name)
    td_fee_amount.appendChild(span_fee_amount)
    td_sy.appendChild(span_sy)

    tr.appendChild(td_row_no)
    tr.appendChild(td_fee_name)
    tr.appendChild(td_fee_amount)
    tr.appendChild(td_sy)

    tbody.appendChild(tr)
}
window.addEventListener('DOMContentLoaded', async (event) => {
    await getPaymentList()
    await getParentList()
    await getFees()

    document.querySelector('.view-payment .payment-update-information .payment-history .search-payment-date #payment-date').addEventListener('keyup', (e) => {
        document.querySelectorAll('.view-payment .payment-update-information .payment-history .payment-history-tbody tr').forEach((row) => {
            row.querySelector('.view-payment .payment-update-information .payment-history .payment-history-tbody .td_sy').textContent.toLowerCase().startsWith(e.target.value.toLowerCase()) ? (row.style.display = 'table-row') : (row.style.display = 'none')
        })
    })

    document.querySelector('.view-payment .payment-update-information .payment-section .payment-fees-container div #add-all').addEventListener('click', () => {
        deleteTableRowInFeesFive()
        getFees3()
        document.querySelector('.view-payment .payment-add-information .payment-section .total-amount-paid-text-input input').value = ''
    })

    document.querySelector('.view-payment .payment-add-information .payment-section .payment-fees-container div #add-all').addEventListener('click', () => {
        deleteTableRowInFeesTwo()
        getFees2()
        document.querySelector('.view-payment .payment-add-information .payment-section .total-amount-paid-text-input input').value = ''
    })

    document.querySelector('.view-payment .payment-add-information .payment-section .payment-header .dropdown #payment-list').addEventListener('change', () => {
        document.querySelector('.view-payment .payment-add-information .payment-section .payment-header #sy1').value = ''
        document.querySelector('.view-payment .payment-add-information .payment-section .payment-header #sy2').value = ''
        deleteTableRowInFeesTwo()
        document.querySelector('.view-payment .payment-add-information .payment-section .total-amount-paid-text-input input').value = ''

        const selectedOption = document.querySelector('.view-payment .payment-add-information .payment-section .payment-header .dropdown #payment-list option:checked');
        const selectedValue = selectedOption.value;
        setId(selectedValue)
    });

    document.querySelector('.view-payment .payment-add-information .payment-section .update-fees-container #done-btn').addEventListener('click', () => {
        document.querySelector('.view-payment .payment-add-information .payment-section .update-fees-container').style.display = 'none'
    })
    
    document.querySelector('.view-payment .payment-add-information .add-fees-btn').addEventListener('click', () => {
        document.querySelector('.view-payment .payment-add-information .add-fees-container').style.display = 'block'
        document.querySelector('.view-payment .payment-add-information .add-fees-container .fees-name-input-container span').style.display = 'none'
    })

    var isClickedAddFees = true
    document.querySelector('.view-payment .payment-add-information .add-fees-container .add-fees-btn-container #add-fees-btn').addEventListener('click', () => {
        var fees_name = document.querySelector('.view-payment .payment-add-information .add-fees-container #fees-name').value
        var fees_amount = document.querySelector('.view-payment .payment-add-information .add-fees-container #fees-amount').value
        
        if (isClickedAddFees === true){
            if (fees_name === '' || fees_amount === ''){
                delay(2000).then(() => {
                    document.querySelector('.view-payment .payment-add-information .add-fees-container .fees-name-input-container span').textContent = 'Failed'
                    document.querySelector('.view-payment .payment-add-information .add-fees-container .fees-name-input-container span').style.color = 'red'
                    document.querySelector('.view-payment .payment-add-information .add-fees-container .fees-name-input-container span').style.display = 'block'
                })
            } else {
                isClickedAddFees = false
                var date = new Date()
                let date_time = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();
                addFees(fees_name, fees_amount, date_time)
                delay(2000).then(() => {
                    isClickedAddFees = true
                })
            }
        }
        
    })

    document.querySelector('.view-payment .payment-add-information .add-fees-container .add-fees-btn-container #done-btn').addEventListener('click', () => {
        document.querySelector('.view-payment .payment-add-information .add-fees-container').style.display = 'none'
    })

    document.getElementById('payment-list').addEventListener('change', (e) => {
        var status = document.getElementById('payment-list').value;
        deleteTableRow()
        orderByStatus(status)
        if(status == 0){
            getPaymentList()
        }
    })

    document.getElementById('search-student-payment-list-name').addEventListener('keyup', (e) => {
        document.querySelectorAll('.view-payment-list-table-tbody tr').forEach((row) => {
            row.querySelector('.td-payment-student-name').textContent.toLowerCase().startsWith(e.target.value.toLowerCase()) ? (row.style.display = 'table-row') : (row.style.display = 'none')
        })
    })

    document.querySelector('.view-payment .payment-update-information .payment-section .total-amount-paid-text-input .add-btn #add-payment').addEventListener('click', () => {
        let sum = 0;
        document.querySelectorAll('.view-payment .payment-update-information .payment-section .payment-container .payment-fees-added-tbody tr td:nth-child(2)').forEach((element) => {
            sum += parseFloat(element.textContent);
        });
        document.querySelector('.view-payment .payment-update-information .payment-section .total-amount-paid-text-input input').value = sum.toFixed(2);
    })

    document.querySelector('.view-payment .payment-add-information .payment-section .total-amount-paid-text-input .add-btn #add-payment').addEventListener('click', () => {
        let sum = 0;
        document.querySelectorAll('.view-payment .payment-add-information .payment-section .payment-container .payment-fees-added-tbody tr td:nth-child(2)').forEach((element) => {
            sum += parseFloat(element.textContent);
        });
        document.querySelector('.view-payment .payment-add-information .payment-section .total-amount-paid-text-input input').value = sum.toFixed(2);
    })

    document.querySelector('.view-payment .add-payment-btn #add-payment').addEventListener('click', () => {
        document.querySelector('.content-title .title').textContent = ' > Add Payment'
        document.querySelector('.view-payment .view-payment-container').style.display = 'none'
        document.querySelector('.view-payment .payment-add-information').style.display = 'block'
        getFees()
    })

    
    var isAddPayment = true
    document.querySelector('.view-payment .payment-add-information .payment-section #add-payment-manual').addEventListener('click', () => {
        var sy1 = document.querySelector('.view-payment .payment-add-information .payment-section .payment-header #sy1').value
        var sy2 = document.querySelector('.view-payment .payment-add-information .payment-section .payment-header #sy2').value
        if(sy1 === '' || sy2 === ''){
            alert('Please input School Year (S.Y)!')
        } else {
            if (isAddPayment === true) {
                isAddPayment = false
                var add = document.querySelector('.view-payment .payment-add-information .payment-section .total-amount-paid-text-input input').value

                if (add === '') {
                    alert('Please add fees!')
                } else {
                    delay(2000).then(() => {
                        addPayment()
                        isAddPayment = true
                    })
                }
            }
        }
    })

    var isAddPayment = true
    document.querySelector('.view-payment .payment-update-information .payment-section #add-payment-manual').addEventListener('click', () => {
        if (isAddPayment === true) {
            isAddPayment = false
            var add = document.querySelector('.view-payment .payment-update-information .payment-section .total-amount-paid-text-input input').value
            if (add === '') {
                alert('Please add fees!')
            } else {
                var sy1 = document.querySelector('.view-payment .payment-update-information .payment-section .payment-header #sy1').value
                var sy2 = document.querySelector('.view-payment .payment-update-information .payment-section .payment-header #sy2').value
                
                if (sy1 === '' || sy2 === '') {
                    alert('Please select School Year!')
                } else {
                    updatePayment(getPaymentId(), sy1 + ' - ' + sy2)
                    delay(2000).then(() => {
                        isAddPayment = true
                    })
                }
            }
        }
    })

    document.querySelector('.view-payment .payment-add-information #back').addEventListener('click', () => {
        document.querySelector('.content-title .title').textContent = ''
        document.querySelector('.view-payment .view-payment-container').style.display = 'block'
        document.querySelector('.view-payment .payment-add-information').style.display = 'none'
        getPaymentList()
    })

    document.querySelector('.view-payment .payment-update-information .payment-section #back').addEventListener('click', () => {
        document.querySelector('.content-title .title').textContent = ''
        document.querySelector('.view-payment .payment-update-information').style.display = 'none'
        document.querySelector('.view-payment .view-payment-container').style.display = 'block'
        deleteTableRowInFeesThree()
        document.querySelector('.view-payment .payment-update-information .payment-section .total-amount-paid-text-input input').value = ''
    })
    
    document.querySelectorAll('.view_student_payment').forEach((element, index) => {
        element.addEventListener('click', () => {
        })
    })

})