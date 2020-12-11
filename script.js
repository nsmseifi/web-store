var doc = window.document;
var data = window.mydata;
var cats = ['women_cat', 'men_cat', 'kids_cat'];

window.onload = function() {
  // debugger;
  render_category('women_cat');
  render_category('men_cat');
  render_category('kids_cat');

  doc.querySelector('#nav-all').onclick = function(e) {
    reset_display();
  };
  doc.querySelector('#nav-women').onclick = function(e) {
    // debugger;
    var new_cats = [...cats];
    reset_display();
    new_cats.splice(0, 1);
    for (let c of new_cats) hide_category(c);
  };
  doc.querySelector('#nav-men').onclick = function(e) {
    // debugger;
    var new_cats = [...cats];
    reset_display();
    new_cats.splice(1, 1);
    for (let c of new_cats) hide_category(c);
  };
  doc.querySelector('#nav-kids').onclick = function(e) {
    // debugger;
    var new_cats = [...cats];
    reset_display();
    new_cats.splice(2, 1);
    for (let c of new_cats) hide_category(c);
  };
};

function render_card(card_data) {
  var c_div = doc.createElement('div');
  c_div.className = 'col-sm';
  var img_div = doc.createElement('div');
  var c_img = doc.createElement('img');
  c_img.src = card_data.imageUrl;
  c_img.className = 'nsm-img';
  c_img.alt = card_data.name;
  c_img.style.maxHeight = '120px';

  img_div.appendChild(c_img);
  img_div.style.textAlign = 'center';

  var c_name = doc.createElement('p');
  c_name.className = 'card_notes';
  c_name.textContent = card_data.name;

  var modal_trigger = doc.createElement('a');
  modal_trigger.href = '#';
  modal_trigger.id = card_data.name;
  modal_trigger.textContent = 'Read more';
  modal_trigger.style.fontSize = 'small';
  modal_trigger.style.textAlign = 'center';
  modal_trigger.style.display = 'block';
  // modal_trigger.href = "modal.html";
  // modal_trigger.target = "#modal_item"
  // modal_trigger.className = "btn btn-secondary popover-test";
  // c_name.appendChild(modal_trigger);
  modal_trigger.onclick = function(e) {
    render_modal_card(card_data);

    $('#modal_item').modal();
  };

  var c_price = doc.createElement('p');
  c_price.textContent = formatprice(card_data.price);
  c_price.style.textAlign = 'center';

  c_div.appendChild(img_div);
  c_div.appendChild(c_name);
  c_div.appendChild(c_price);
  c_div.appendChild(modal_trigger);

  return c_div;
}

function render_category(category_name) {
  // debugger;
  var items = filter_cat_data(category_name);
  var cont = doc.createElement('div');
  cont.className = 'container';
  cont.id = category_name;
  var title = doc.createElement('h4');
  title.textContent = category_name.split('_')[0].toUpperCase();
  cont.appendChild(title);
  var c_row = doc.createElement('div');
  c_row.className = 'row';
  for (let item of items) c_row.appendChild(render_card(item));

  cont.appendChild(c_row);
  document.getElementById(category_name).appendChild(c_row);
  return cont;
}

function filter_cat_data(cat_name) {
  var cat_list = [];
  for (let item of data) {
    if (item.category.indexOf(cat_name) > -1) cat_list.push(item);
  }
  return cat_list;
}

function hide_category(category_name) {
  var cat = doc.getElementById(category_name);
  cat.style.display = 'none';
}

function change_category_display(category_name) {
  var x = doc.getElementById(category_name);
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}

function reset_display() {
  for (let cat of cats) {
    var item = doc.getElementById(cat);
    item.style.display = 'block';
  }
}

function formatprice(number) {
  const price = number;
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(price);
};

function render_modal_card(card_data) {
  var mdl = doc.getElementById('modal_body');
  mdl.innerHTML = '';
  var row = doc.createElement('div');
  row.className = 'row';

  var img_div = doc.createElement('div');
  var c_img = doc.createElement('img');
  c_img.src = card_data.imageUrl;
  c_img.className = 'nsm-img';
  c_img.alt = card_data.name;
  c_img.style.maxHeight = '300px';

  img_div.appendChild(c_img);

  var c_price = doc.createElement('p');
  c_price.textContent = formatprice(card_data.price);
  c_price.style.textAlign = 'center';

  var left_dive = doc.createElement('div');
  left_dive.appendChild(c_img);
  left_dive.appendChild(c_price);
  left_dive.className = 'col-sm';

  var c_data = doc.createElement('div');
  c_data.className = 'col-sm';
  var c_name = doc.createElement('p');
  c_name.className = ' cat_font';
  c_name.textContent = card_data.name;

  var description = doc.createElement('p');
  description.textContent = card_data.description;

  c_data.appendChild(c_name);
  c_data.appendChild(description);

  row.appendChild(left_dive);
  row.appendChild(c_data);
  mdl.appendChild(row);
  return row;
};

let form = doc.getElementById("contact-form");
let sbmit = doc.getElementById("submit");
sbmit.onclick = (event) => {
    form.classList.add("was-validated");
};

let rst = doc.getElementById("reset");
rst.onclick = (event) => {
    form.classList.remove("was-validated");
};

let postalcode = doc.getElementById("postalcode");
postalcode.oninput = (event) => {
  let pst = postalcode.nodeValue;
  let reg = /^[A-Za-z]\d\[A-Za-z][ -]?\d[A-Za-z]\d$/;
  if (!reg.test(pst)) {
    postalcode.setCustomValidity("please enter valid postal code.");
  }
};


form.onsubmit = (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
};

let orderPb = doc.getElementById("orderpb");
let orderDetail = doc.getElementById("orderDetail");
function radiochange(event) {
  // console.log(event.target.value);
  debugger;
  if (event.target.value=="order")
    orderDetail.style.display = "block";
  else 
    orderDetail.style.display = "none";
    
};
