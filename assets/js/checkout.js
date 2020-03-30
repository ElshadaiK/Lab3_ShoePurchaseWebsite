$(document).ready(function(){
    check();
    $('#checkout').on("click", purchase);
    $('#cancel').on("click", cancel);

    
});
let check = function() {

if(localStorage.getItem("TotalQuantity") && localStorage.getItem("TotalPrice")){
    let TotalQuantity = localStorage.getItem("TotalQuantity");
    let TotalPrice = localStorage.getItem("TotalPrice");
    let Name = localStorage.getItem("Name");
    let TotalItemsBought = document.createElement('div');
    let TotalPriceBought = document.createElement('div');
    let BoughtBy = document.createElement('div');
    TotalItemsBought.innerHTML = TotalQuantity;
    TotalPriceBought.innerHTML = TotalPrice;
    BoughtBy.innerHTML = Name;
    let TotalItems = $('.totalItems')[0];
    let TotalPrices = $('.totalPrice')[0];
    let BoughtByName = $('.purchasedBy')[0];
    TotalItems.append(TotalItemsBought)
    TotalPrices.append(TotalPriceBought)
    BoughtByName.append(BoughtBy)
}}
let purchase = () => {
    alert('Thank you for Shopping with us');
    location.href = './index.html'
}
let cancel = () => {
    location.href = './service.html'
};