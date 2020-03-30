$(document).ready(function(){
    $('#login').on('click', check);
    
    $('#register').on('click', check);
    
});
let change = function() {
    console.log("HEEEEEEE")
    // location.href = './service.html';
}
let check = function() {

if(localStorage.getItem("Name") && localStorage.getItem("Name") != "undefined"){
    alert('Please Log out first');
    change()
}else{
    let Name = $('#email').val();
    localStorage.setItem("Name", Name);
    change()
}}