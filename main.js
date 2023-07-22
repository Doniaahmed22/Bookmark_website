var markName = document.getElementById('markName');
var markLink = document.getElementById('markLink');
var productsArray = [];
var linkValid = /^(https|http):(\/\/)www.[a-zA-Z0-9]{3,}.com$/;
var check;
// =linkValid.test(markLink.value);
// console.log("check is "+check);


if (localStorage.getItem('products') != null) {
    productsArray = JSON.parse(localStorage.getItem('products'));
    displayProduct();
}
function getProducts() {
    check = linkValid.test(markLink.value);
    console.log("check is " + check);

    var productObject = {
        name: markName.value,
        link: markLink.value,
    }
    if (search(productObject.name) == false || productsArray.length == 0) {
        console.log("search   " + search(productObject.name));
        if (check) {
            productsArray.push(productObject);
            localStorage.setItem("products", JSON.stringify(productsArray));
            console.log(productsArray);
            displayProduct();
            clear();
        }
        else {
            document.getElementById("p1").innerHTML = "enter url like this https://www.example.com";
        }
    }
}

function displayProduct() {
    var cartona = ``;
    for (var i = 0; i < productsArray.length; i++) {
        cartona += `
            <tr>
                <td>${i}</td>
                <td>${productsArray[i].name}</td>
                <td>${productsArray[i].link}</td>
                <td><button class="btn btn-danger" onclick="visit(${i})">Visit</button></td>
                <td><button class="btn btn-danger" onclick="del(${i})">Delete</button></td>
            </tr>
        `
    }
    document.getElementById('demo').innerHTML = cartona;
}

function clear() {
    markName.value = "";
    markLink.value = "";
    document.getElementById("p1").innerHTML= "";
}

function search(search) {
    var cartona = ``;
    for (var i = 0; i < productsArray.length; i++) {
        if (productsArray[i].name.toLowerCase() == search.toLowerCase()) {
            cartona += `
            <tr>
                <td>${i}</td>
                <td>${productsArray[i].name}</td>
                <td>${productsArray[i].link}</td>
                <td><button class="btn btn-danger" onclick="visit(${i})">Visit</button></td>
                <td><button class="btn btn-danger" onclick="del(${i})">Delete</button></td>
                
            </tr>
        `
        }

        console.log("len  " + cartona.length);
        console.log(cartona);
        if (cartona.length != 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

function visit(i) {
    window.location.href = productsArray[i].link;
}

function del(i) {
    productsArray.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(productsArray));
    displayProduct();
}
