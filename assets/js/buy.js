$(document).ready(function(){
    // $('#boughtItems').load('./service.html .AllSelected')
    if(localStorage.getItem("Name")){
        $('#RLogin').val("Sign out")
    }else{
        $('#RLogin').val("Sign in")
    }
    let updateCartTotal = () => {
        let total = 0;
        let cartItemContainer = $('.cart-items')[0];
        let cartRows = cartItemContainer.getElementsByClassName('cart-row');
        for(var i = 0; i < cartRows.length; i++){
            var cartRow = cartRows[i];
            var priceElement = cartRow.getElementsByClassName('cart-price')[0];
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
            var price = parseFloat(priceElement.innerText.replace('$', ""))
            var quantity = quantityElement.value;
            total += price * quantity;
        }
        total = Math.round(total*100) / 100
        $('.cart-total-price').text('$'+total)
    };
    let quantityAdjusted = (event) => {
        let input = event.target
        if(isNaN(input.value) || input.value <= 0){
            input.value = 1;
        }
        updateCartTotal();
    }
    
    let addItemToCart = (title, price, imageSrc) => {
        let cartRow = document.createElement('div');
        cartRow.classList.add('row');
        cartRow.className += " cart-row";
        let cartItems = $('.cart-items')[0];
        let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
        for(var i = 0; i < cartItemNames.length; i++){
            if(cartItemNames[i].innerText == title){
                alert('Item has already been added');
                return;
            }
        }
        let cartRowContents = `
        <div class="cart-item cart-column text-center col-md-4">
            <img src="${imageSrc}" width="100" height="100" class="cart-item-image">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column col-md-4">${price}</span>
        <div class="cart-quantity cart-column col-md-4">
            <input type="number" class="cart-quantity-input" id="myQuantity" value="1" min="1">
            <button class="btn btn-danger remove-btn">Remove</button>
        </div>`;
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow)
        updateCartTotal();
        cartRow.getElementsByClassName('remove-btn')[0].addEventListener("click", remove);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener("change", quantityAdjusted);
    }
    let remove = (event) => {
        let myBtn = event.target
        myBtn.parentElement.parentElement.remove();
        updateCartTotal();
    };
    let cancel = (event) => {
        let cartItems = document.getElementsByClassName('cart-items')[0];
        while(cartItems.hasChildNodes()){
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal();
    };
    
    let buy = (event) => {
        let addedBtn = event.target;
        let shopItem = addedBtn.parentElement.parentElement.parentElement;
        let shopItemTitle = shopItem.getElementsByClassName('card-title')[0].innerText;
        let shopItemPrice = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
        let imageSource = shopItem.getElementsByClassName('card-img-top')[0].src;
        addItemToCart(shopItemTitle, shopItemPrice, imageSource);
    }
    let redirect = (TotalQuantity, TotalPrice) => {
        console.log(TotalQuantity, TotalPrice)
        localStorage.setItem("TotalQuantity", TotalQuantity);
        localStorage.setItem("TotalPrice", TotalPrice);
        location.href  = './buy.html'
    }
    let purchase = () => {
        let priceCalculated = document.getElementsByClassName('cart-total-price')[0];
        priceCalculated = parseFloat(priceCalculated.innerText.replace('$', ""))
        if(priceCalculated == 0){
        $('#purchase').disabled
        return
        }
        let cartItems = $('.cart-items')[0];
        let cartItemQuantities = cartItems.getElementsByClassName('cart-quantity-input');
        let TotalQuantity = 0;
        let  TotalPrice;
        for(var i = 0; i < cartItemQuantities.length; i++){
        TotalQuantity += parseInt(cartItemQuantities[i].value)
        }
        TotalPrice = $('.cart-total-price').text();
        if(localStorage.getItem("Name")){
            redirect(TotalQuantity, TotalPrice);
        }else{
            alert("Please sign in first");
            cancel();
        }
    }
    let loginOut = () => {
        if(localStorage.getItem("Name")){
            localStorage.removeItem("Name");
            $('#RLogin').val("Sign in")
        }else{
            location.href = './login.html'
        }
    }
    $('.shop-item-button').on("click", buy);
    $('.remove-btn').on("click", remove);
    $('.cart-quantity-input').on("change", quantityAdjusted);
    $('#purchase').on("click", purchase);
    $('#cancel').on("click", cancel);
    $('#RLogin').on('click', loginOut)
    


});
