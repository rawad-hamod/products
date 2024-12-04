// get total
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let submit = document.getElementById("submit");
let count = document.getElementById("count");
let category = document.getElementById("category");
let mode = "create";
let tmp;
// console.log(title, price,taxes,ads,discount,total,submit,count,category)
function gettotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#400";
  }
}

// create product
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}
// submit
submit.onclick = function () {
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  // clean data

  if (mode === "create") {
    if (newpro.count > 1) {
      for (let i = 1; i <= newpro.count; i++) {
        datapro.push(newpro);
      }
    } else {
      datapro.push(newpro);
    }
  } else {
    datapro[tmp] = newpro;
    submit.innerHTML = "create";
    count.style.display = "block";
  }
  // save local storage
  localStorage.setItem("product", JSON.stringify(datapro));

  cleardata();
  showdata();
};
function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read data
function showdata() {
  let table = `<thead>  <tr>
    <th>id</th>
    <th>title</th>
    <th>price</th>
    <th>taxes</th>
    <th>ads</th>
    <th>discount</th>
    <th>total</th>
    <th>category</th>
    <th>update</th>
    <th>delete</th>

    </tr>
   </thead>`;
  for (let i = 0; i < datapro.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updatedata(${i})">update</button></td>
    <td><button onclick="deletedata(${i})">delete</button></td>
    
</tr>

`;
    document.getElementById("table").innerHTML = table;
    // create delete btn

    let deleteallbtn = document.getElementById("deleteall");
    if (datapro.length > 0) {
      deleteallbtn.innerHTML = `<button onclick='deleteall()'>delete all(${datapro.length})</button>`;
    } else {
      deleteallbtn.innerHTML = "";
    }
  }
  gettotal();
}

showdata();

// delete

function deletedata(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showdata();
}
// delete all
function deleteall() {
 
  localStorage.clear();
  document.getElementById("table").innerHTML = "";
   document.getElementById("deleteall").innerHTML="";

}

function updatedata(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  count.style.display = "none";
  submit.innerHTML = "update";
  mode = "update";
  tmp = i;
  scroll({ top: 0, behavior: "smooth" });
  gettotal();
}

//  search

let searchmode = "title";

function getsearchmode(id) {
  let search = document.getElementById("search");
  if (id == "searchtitle") {
    searchmode = "title";
    search.placeholder = "search by title";
    console.log(id)
  } else {
    searchmode = "category";
    search.placeholder = "search by category";
  }
  search.focus();
}

function searchdata(value) {
  let table = `<thead>  <tr>
    <th>id</th>
    <th>title</th>
    <th>price</th>
    <th>taxes</th>
    <th>ads</th>
    <th>discount</th>
    <th>total</th>
    <th>category</th>
    <th>update</th>
    <th>delete</th>

    </tr>
   </thead>`;
  if ((searchmode = "title")) {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].title.includes(value)) {
        {
          table += `
    <tr>
    <td>${i + 1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updatedata(${i})">update</button></td>
    <td><button onclick="deletedata(${i})">delete</button></td>
    
</tr>

`;
        }
      }
    }
  } else {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].category.includes(value)) {
        {
          table += `
        <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatedata(${i})">update</button></td>
        <td><button onclick="deletedata(${i})">delete</button></td>
        
    </tr>
    
    `;
        }
      }
    }
  }
  document.getElementById("table").innerHTML = table;
}
