let model = document.getElementById("dialog");
const openDialog = () => {
    if (model.style.display === "block") {
        model.style.display = "none";
    } else {
        model.style.display = "block";
    }
    document.getElementById("thinksForm").reset();
};

let dialog = document.getElementById("dialog")
const closeDialog = () => {
    dialog.style.display = "none";
}

// selectorler , global olarak kullanılacak html elemen selectorleri
const thinksItemsEl = document.getElementById("todoList");

let ThinksToDo = {
    Title: '',
    Description: '',
    ThinksID: 0,
    isComplete: false,
};

//oluşturduğum her thinkstodo objesini thinkstodoArray dizisine atmak için bu diziyi oluşturdum.
let ThinksToDoArray = [];

function randomID() {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}


//Div'in içini dolduruyor.
const addThinksItemToHtml = (thinkstodoItem) => {
    const thinksListEl = document.getElementById("todoList");
    const thinksItemHtml = `<div class="content  ${thinkstodoItem.isComplete ? "todo-checked" : ""}" data-id="${thinkstodoItem.ThinksID}">
    <button data-id="${thinkstodoItem.ThinksID}" onclick="completeTask(this)"></button>
    <div class="flex-col articles">
        <h5 class="flex-col" id="todo-title">${thinkstodoItem.Title}</h5>
        <span class="flex-row" id="todo-description">${thinkstodoItem.Description}</span>
    </div>
    <img class="remove-thiks" src="./assets/images/delete.png" onclick="removeTask(${thinkstodoItem.ThinksID})" alt="">
</div>`;
    thinksListEl.insertAdjacentHTML("beforeend", thinksItemHtml);
};

// Localstorage'e ThinksToDoArray array'ini kaydeder
const saveThinksToDoLS = () => {
    localStorage.setItem("thinkstodoItemsLS", JSON.stringify(ThinksToDoArray));
};

const addThinksToDo = () => {
    let thinkstodoItem = {
        ...ThinksToDo,
        ThinksID: randomID(),
        Title: document.getElementsByName("input-title")[0].value,
        Description: document.getElementsByName("input-description")[0].value,
    };

    addThinksItemToHtml(thinkstodoItem);

    // girilen her thinkstodoItem objesini ThinksToDoArray dizisine attım.
    ThinksToDoArray = [...ThinksToDoArray, thinkstodoItem]; // ThinksToDoArray.push(thinkstodoItem);
    saveThinksToDoLS();
};

// checkbox div'ine tıklandığında taskı todo-checked tasarımına dönüştürür
const completeTask = (e) => {
    e.parentNode.classList.toggle("todo-checked");

    for (let i = 0; i < ThinksToDoArray.length; i++) {
        if (ThinksToDoArray[i].ThinksID == e.dataset.id) {
            ThinksToDoArray[i].isComplete = !ThinksToDoArray[i].isComplete;
            console.log(ThinksToDoArray);
            saveThinksToDoLS();
        }
    }
};

// delete ikonuna tıklanan elemanı htmlden ve todos arrayden siler bunu LS'e kaydeder
const removeTask = (id) => {
    const thinkItemsEl = document.getElementsByClassName("content");

    for (let i = 0; i < thinkItemsEl.length; i++) {
        if (thinkItemsEl[i].dataset.id == id) thinkItemsEl[i].remove();
    }

    ThinksToDoArray = ThinksToDoArray.filter((item) => {
        if (item.ThinksID != id) return item;
    });
    saveThinksToDoLS();
};

// sayfa refresh edildiğinde listeyi ul'ye ekliyoruz
const ListThinks = () => {
    thinksItemsEl.innerHTML = "";
    ThinksToDoArray.forEach(item => {
        addThinksItemToHtml(item);
    });
};

const thinkItemsLS = localStorage.getItem("thinkstodoItemsLS");

// thinkItemsLS değişkeni Localstorage'de var mı ? varsa bunları yap
if (thinkItemsLS) {
    ThinksToDoArray = JSON.parse(thinkItemsLS);
    ListThinks();
}