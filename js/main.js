const cardContainer = document.querySelector(".card-container");
let cardIconEdit, cardIconRemove;
let overlay = document.getElementById("overlay");
let form_new = document.getElementById("form-new");
let form_edit = document.getElementById("form-edit");
let contentTodo = document.getElementById("contentTodo");
let contentDoing = document.getElementById("contentDoing");
let contentFinished = document.getElementById("contentFinished");

let tagTodo = document.querySelector(".todo .tag");
let tagDoing = document.querySelector(".doing .tag");
let tagFinished = document.querySelector(".finished .tag");

const container = document.getElementsByClassName("container");
const newTask = document.getElementsByClassName("newTask");

function createCard(category, title, desc) {
  let card = document.createElement("div");

  card.classList.add("card", "mt-4");

  const now = new Date();
  const dateString = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  card.innerHTML = `
    <div class="head-card">
      <div class="category">
          <a href="#">${category}</a>
          <p class="mt-1">${title}</p>
      </div>
    <div class="icons mt-1 ml-2">
        <a onclick="openFormEdit(this)"><i class="edit-icon fa-solid fa-pen-to-square"></i></a>
        <a onclick="removeCard(this)"><i class="remove-icon fa-solid fa-trash"></i></a>
    </div>
    </div>
    <div class="line mt-2"></div>
    <div class="description mt-2">
        ${desc}
    </div>
    <div class="date mt-2">
        <i class="fa-regular fa-clock"></i>
        ${dateString}
    </div>`;

  return card;
}

function validateInput(element) {
  let value = element.value.trim();
  if (value) {
    element.classList.add("input-success");
    return true;
  } else {
    element.classList.remove("input-success");
  }
}

function closeForm(modal, formRemove) {
  modal.classList.remove(formRemove);
}

function openForm(modal, formAdd) {
  modal.classList.add(formAdd);
}

function openFormNew() {
  overlay.style.display = "block";
  form_new.style.display = "block";
}

function closeForm() {
  overlay.style.display = "none";
  form_new.style.display = "none";
  form_edit.style.display = "none";
}

function openFormEdit(element) {
  overlay.style.display = "block";
  form_edit.style.display = "block";
  
  let card = element.closest(".card");

  let cardCategory = card.querySelector(".category a").textContent.trim();
  let cardTitle = card.querySelector(".category p").textContent.trim();
  let cardDesc = card.querySelector(".description").textContent.trim();

  document.getElementById("edit-category").value = cardCategory;
  document.getElementById("edit-title").value = cardTitle;
  document.getElementById("edit-description").value = cardDesc;

  const cardEle = createCard(
    document.getElementById("edit-category").value,
    document.getElementById("edit-title").value,
    document.getElementById("edit-description").value
  );

  form_edit.onsubmit = function (e) {
    e.preventDefault();

    if (document.getElementById("todo").checked) {
      contentTodo.appendChild(cardEle);
      increaseTag(tagTodo);
    } else if (document.getElementById("doing").checked) {
      contentDoing.appendChild(cardEle);
      increaseTag(tagDoing);
    } else if (document.getElementById("finished").checked) {
      contentFinished.appendChild(cardEle);
      increaseTag(tagFinished);
    }

    removeCard(element);

    closeForm();
  };
}

function removeCard(link) {
  let card = link.closest(".card");
  let parentCard = card.parentNode;
  parentCard.removeChild(card);

  const parentClassList = parentCard.classList;

  for (let i = 0; i < parentClassList.length; i++) {
    if (parentClassList[i] == "contentTodo") {
      decreaseTag(tagTodo);
    } else if (parentClassList[i] == "contentDoing") {
      decreaseTag(tagDoing);
    } else if (parentClassList[i] == "contentFinished") {
      decreaseTag(tagFinished);
    }
  }
}

function increaseTag(tag) {
  tag.innerHTML = Number.parseInt(tag.innerHTML) + 1;
}

function decreaseTag(tag) {
  if (Number.parseInt(tag.innerHTML) == 0) {
    tag.innerHTML = 0;
  } else {
    tag.innerHTML = Number.parseInt(tag.innerHTML) - 1;
  }
}

form_new.onsubmit = function (e) {
  e.preventDefault();

  const inputCategory = document.getElementById("new-category").value;
  const inputTitle = document.getElementById("new-title").value;
  const inputDescription = document.getElementById("new-description").value;

  const card = createCard(inputCategory, inputTitle, inputDescription);

  contentTodo.appendChild(card);

  increaseTag(tagTodo);

  closeForm();
};
