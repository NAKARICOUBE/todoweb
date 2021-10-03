const logInModal = document.querySelector(".logInModal");
const logInForm = document.querySelector("#logInForm");
const logInInput = logInForm.querySelector("input");
const Greegting = document.getElementById("Greeting");
const cancleBtn = document.querySelectorAll(".cancle");
const logOutBtn = document.querySelector("#logOut");
const headerLogIn = document.querySelector(".headerLogIn");
const beforeLogIn = document.querySelector(".beforeLogIn");
const afterLogIn = document.querySelector(".afterLogIn");
const USER_KEY = "username";
const HIDDEN_CLASS = "hidden";

const savedUsername = localStorage.getItem(USER_KEY);

function handleSubmit(event){
    event.preventDefault();
    logInModal.classList.add(HIDDEN_CLASS);
    const value = logInInput.value ;
    localStorage.setItem(USER_KEY, value);
    headerLogIn.innerText = value;
    paintUser(value);
}


function paintUser(username){
    Greeting.innerText = `Hello, ${username}`;
}


function CancleLogInModal() {
    logInModal.classList.add(HIDDEN_CLASS);
}

function ShowLogInModal() {
    if(savedUsername === null){
        logInModal.classList.remove(HIDDEN_CLASS);

    } else {
        logInModal.classList.remove(HIDDEN_CLASS);
        beforeLogIn.classList.add(HIDDEN_CLASS);
        afterLogIn.classList.remove(HIDDEN_CLASS);
        paintUser(savedUsername);
    }
}

logInForm.addEventListener("submit", handleSubmit);
cancleBtn[0].addEventListener("click", CancleLogInModal);
cancleBtn[1].addEventListener("click", CancleLogInModal);
headerLogIn.addEventListener("click", ShowLogInModal);
logOutBtn.addEventListener("click", logOut = () => {
   localStorage.removeItem(USER_KEY);
   location.reload();
});

if(savedUsername !== null){
    headerLogIn.innerText = savedUsername;

}
const quotes = [
    {
        quote : "Passion is the genesis of genius",
        author : "Tony Robbins",
    },
    {
        quote:"You still have enough time to make your dream come true",
        author:"Peter pans",
    },
    {
        quote:"Sometimes the right path isn't the easiest one",
        author:"Pocahontas",
    },
    {
        quote:"Remember, you are the one who can fill the world with sunshine",
        author:"Snow White",
    },
    {
        quote:"If tou don't know where you want to go, then it doesn't matter which path you take",
        author:"Alice in wonderland",
    },
    {
        quote:"A true friend looks at the tears hidden in forced smile",
        author:"Winnie the Pooh",
    },
    {
        quote:"If you cannot say something nice, say nothing at all",
        author:"Bambi",
    },
    {
        quote:"Even though it may seem silly or wrong, you must try.",
        author:"MR.Kitting",
    },
    {
        quote:"Continue to study and learn new skills",
        author:"MR.Kitting",
    },
    {
        quote:"You became what you study",
        author:"MR.Kitting",
    },
];
    
    

    


function randomQuote() {
    const quoteInput = document.querySelector(".quote li:first-child");
    const authorInput = document.querySelector(".quote li:last-child");  
    const todaysQuote = quotes[Math.floor(Math.random()*quotes.length)];
    quoteInput.innerText = todaysQuote.quote;
    authorInput.innerText = todaysQuote.author;
}

randomQuote();
setInterval(randomQuote , 10000);
const toDoForm = document.getElementById("toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#toDoList");
const listBox = document.querySelector(".listBox");
const listToDo = document.querySelector(".listToDo");
const listCheck = document.querySelector(".listCheck");
const listMenuToDo = document.querySelector(".listMenuToDo");
const listMenuCheck = document.querySelector(".listMenuCheck");
const showList = document.querySelector(".showList");
const TODO_KEY = "todo";
const OPACITY_CLASS = "opacity";

let toDoArr = [];

function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const username = localStorage.getItem(USER_KEY);
    const toDoObj = {
        value: newToDo,
        id: Date.now(),
        username: username,
    };
    toDoArr.push(toDoObj);
    paintToDo(toDoObj);
    saveToDo();
}

function paintToDo(newToDo){
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    span.innerText = newToDo.value;
    const button = document.createElement("button");
    button.className = "fas fa-trash";
    button.addEventListener("click",deleteTodo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function saveToDo(){
    localStorage.setItem(TODO_KEY, JSON.stringify(toDoArr));
}

function deleteTodo(event){
    const li = event.target.parentElement;
    li.remove();
    toDoArr = toDoArr.filter((item) => item.id != parseInt(li.id));
    saveToDo();
}

function handleToggleToDoCheck(e) {
    if(e === 0) {
        listToDo.classList.remove(HIDDEN_CLASS);
        listCheck.classList.add(HIDDEN_CLASS);
        listMenuToDo.style = "background-color: #2B2E31; color: white";
        listMenuCheck.style = "background-color: #3E4043";
    } else {
        listCheck.classList.remove(HIDDEN_CLASS);
        listToDo.classList.add(HIDDEN_CLASS);
        listMenuCheck.style = "background-color: #2B2E31; color: white";
        listMenuToDo.style = "background-color: #3E4043";
    }
}

handleToggleToDoCheck(0);


function handleToggleShowList() {
    listBox.classList.toggle(HIDDEN_CLASS);
    showList.classList.toggle(OPACITY_CLASS);
}

toDoForm.addEventListener("submit", handleToDoSubmit);
showList.addEventListener("click", handleToggleShowList);
const savedToDos = localStorage.getItem(TODO_KEY);
if(savedToDos != null){
    const parsedToDos = JSON.parse(savedToDos);
    toDoArr = parsedToDos;
    parsedToDos.forEach(paintToDo);
} 



const background = document.querySelector(".background");
const dot = document.querySelectorAll(".dot");
const prev = document.getElementsByClassName("prev");
const next = document.getElementsByClassName("next");
const backgroundText = document.querySelector("backgroundText");
const ACITVE_CLASS = "active";

const bgArr = ["bgimg/austria.jpg","bgimg/amsterdam.jpg","bgimg/czech.jpg","bgimg/italyvenice.jpg"];


let counter = 0;

function prevNextBg(e) {
    if(e === 1){
        counter++;
        if(dot[counter] === undefined) {
            counter = 0;
            dotBg(counter);
        } else {
            dotBg(counter);
        }
        
    } else if(e === -1) {
        counter--;
        if(dot[counter] === undefined) {
            counter = dot.length-1;
            dotBg(counter);
        } else {
            dotBg(counter);
        }
    }
}

function dotBg(e) {
    const countArr = [];
    for(let i=0; i<dot.length; i++) {
        countArr[i] = i;
    }
    background.style = `background-image: url(${bgArr[e]})`;
    dot[e].classList.add(ACITVE_CLASS);
    countArr.splice(e,1);
    
    for(let i=0; i<countArr.length; i++) {
        dot[countArr[i]].classList.remove(ACITVE_CLASS);
    }
}

function randomBg() {
    const randomValue = Math.floor(Math.random()*bgArr.length);
    background.style = `background-image: url(${bgArr[randomValue]})`;
    dotBg(randomValue);
}

randomBg();

const clockValue = document.getElementById("clock");


function handleClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clockValue.innerText = `${hours}:${minutes}:${seconds}`;
}

handleClock();
setInterval(handleClock, 1000);
const API_KEY = "d11016c35d7f999b1ca6615066e74a82";


function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            const weatherDegreeInfo = document.querySelector(".weatherDegreeInfo span");
            const geolocationInfo = document.querySelector(".geolocationInfo span");
            weatherDegreeInfo.innerText = `${data.weather[0].main},  ${Math.floor(data.main.temp)}℃`;
            geolocationInfo.innerText = data.name;
        });
    
}
function onGeoError() {}





navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
