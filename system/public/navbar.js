var li_elements = document.querySelectorAll(".navbar-containers li")
var item_elements = document.querySelectorAll(".item");

for (var i = 0; i < li_elements.length; i++){
    li_elements[i].addEventListener('click', function(){
        li_elements.forEach(function(li){
            li.classList.remove("active");
        })
        this.classList.add("active");
        var li_value = this.getAttribute ("data-li");
        item_elements.forEach(function(item){
            item.style.display = "none";
        })
        if (li_value == 'dashboard') {
            document.querySelector("." + li_value).style.display = 'block'
            document.querySelector('.content-title span').textContent = 'Dashboard'
            document.querySelector('.content-title .title').textContent = ''
        } else if (li_value == 'student-list') {
            document.querySelector("." + li_value).style.display = 'block'
            document.querySelector('.content-title span').textContent = 'Pupils List'
            document.querySelector('.content-title .title').textContent = ''
        } else if (li_value == 'add-account') {
            document.querySelector("." + li_value).style.display = 'block'
            document.querySelector('.content-title span').textContent = 'Add Account'
            document.querySelector('.content-title .title').textContent = ''
        } else if (li_value == 'account-list') {
            document.querySelector("." + li_value).style.display = 'block'
            document.querySelector('.content-title span').textContent = 'Account List'
            document.querySelector('.content-title .title').textContent = ' > Teacher Account'
        } else if (li_value == 'view-enrollees') {
            document.querySelector("." + li_value).style.display = 'block'
            document.querySelector('.content-title span').textContent = 'View Enrollees'
            document.querySelector('.content-title .title').textContent = ''
        } else if (li_value == 'view-payment') {
            document.querySelector("." + li_value).style.display = 'block'
            document.querySelector('.content-title span').textContent = 'View Payment'
            document.querySelector('.content-title .title').textContent = ''
        } else if (li_value == 'add-subject') {
            document.querySelector('.' + li_value).style.display = 'block'
            document.querySelector('.content-title span').textContent = 'Add Subject'
            document.querySelector('.content-title .title').textContent = ''
        }
    })
}







