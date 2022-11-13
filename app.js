function saveToLocalStorage(event) {
  event.preventDefault();
  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;
  // localStorage.setItem('name', name);
  // localStorage.setItem('email', email);
  // localStorage.setItem('phonenumber', phonenumber)
  const obj = {
    amount,
    description,
    category,
  };


  axios.post("https://crudcrud.com/api/14678404bf4b4997bbc6155bef06b246/UsersData",obj)
  .then((response)=>{
    showNewExpenseOnScreen(response.data);
    console.log(response)
})
.catch((error)=>{
  console.log(error)
})


  // localStorage.setItem(obj.description, JSON.stringify(obj));
  // showNewExpenseOnScreen(obj);
  console.log(obj);
}

window.addEventListener("DOMContentLoaded", load);
function load() {
  const localStorageObj = localStorage;
  // console.log(localStorageObj);
  console.log(localStorageObj);
  const localstoragekeys = Object.keys(localStorageObj);
  console.log(localstoragekeys);

  for (var i = 0; i < localstoragekeys.length; i++) {
    const key = localstoragekeys[i];
    const userExpensesString = localStorageObj[key];
    const userExpensesObj = JSON.parse(userExpensesString);
    showNewExpenseOnScreen(userExpensesObj);
    console.log(userExpensesObj);
  }
}

function showNewExpenseOnScreen(expense) {
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";
  // console.log(localStorage.getItem(user.emailId))
  if (localStorage.getItem(expense.description) !== null) {
    removeUserFromScreen(expense.description);
  }

  const parentNode = document.getElementById("listOfExpenses");
  const childHTML = `<li id=${expense.description}> ${expense.amount} - ${expense.description} - ${expense.category}
                                        <button onclick=deleteUser('${expense.description}')> Delete Expense </button>
                                 <button onclick=editUserDetails('${expense.amount}','${expense.description}','${expense.category}')>Edit Expense </button>
                                     </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User

function editUserDetails(amount, description, category) {
  document.getElementById("amount").value = amount;
  document.getElementById("description").value = description;
  document.getElementById("category").value = category;

  // deleteUser(description);
}

// deleteUser('abc@gmail.com')

function deleteUser(description) {
  console.log(description);
  localStorage.removeItem(description);
  removeUserFromScreen(description);
}

function removeUserFromScreen(description) {
  const parentNode = document.getElementById("listOfExpenses");
  const childNodeToBeDeleted = document.getElementById(description);
  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}