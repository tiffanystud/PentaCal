const logIn = document.querySelector("#log-in");
const darkMode = document.querySelector("#dark-mode");
const logOut =  document.querySelector("#log-out");
const usrName = document.querySelector("#usrName");
const pwd = document.querySelector("#pwd");
const store = createStore({ usrName: null, pwd: null, isLoggedIn: false, darkMode: false, cals: []});

class Calendar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <h2>${this.data.name}</h2>
        <p>${this.data.type} calendar</p>
        <p>Events:</p>
        <div class="events"></div>
        `;
        this.events = this.events.sort((a, b) => new Date(a.date) - new Date(b.date));
        for (let event of this.events) {
            let div = document.createElement("div");
            div.classList.add("event");
            div.innerHTML = `
            <h4>${event.name}</h4>
            <p>Date: ${event.date}</p>
            <p>Description: ${event.description}</p>
            <p>Location: ${event.location}</p>
            `;
            document.querySelector(".events").appendChild(div);
        }
    }
}

function driver() {
    usrName.value = "";
    pwd.value = "";
}

customElements.define("calendar-box", Calendar);

store.subscribe("log", (state) => {
  console.log("State changed:", state);
});

store.subscribe("logOut", (state) => {
    logOut.style.display = "none";
    document.querySelector("#status").textContent = "Successfully logged out!";
    document.querySelector("#status").style.display = "block";
    setTimeout(() => {
        document.querySelector("#status").style.display = "none";
    }, 2000);
    document.querySelector("#logged-in").style.display = "none";
    document.querySelector("#cals").innerHTML = "";
    document.querySelector("#top-info").textContent = "Welcome to Cal. Please log in.";
});

store.subscribe("displayCals", async (state) => {
    if (!store.getState().isLoggedIn) {
        return false;
    }

    for (let cal of state.cals) {
        let div = document.createElement("calendar-box");
        div.data = cal;
        let resp = await fetch(`http://localhost:8000/events?calId=${cal.id}`);
        let reso = await resp.json();
        div.events = reso;
        document.querySelector("#cals").appendChild(div);
    }

    console.log("Calendars spawned");
});

if (store.getState().darkMode) {
    document.body.style.backgroundColor = "gray";
}

darkMode.addEventListener("click", () => {
    if (!store.getState().darkMode) {
        store.setState({usrName: store.getState().usrName, pwd: store.getState().pwd, isLoggedIn: store.getState().isLoggedIn, darkMode: true, cals: store.getState().cals}, ["log"]);
        document.body.style.backgroundColor = "gray";
    } else {
        store.setState({usrName: store.getState().usrName, pwd: store.getState().pwd, isLoggedIn: store.getState().isLoggedIn, darkMode: false, cals: store.getState().cals}, ["log"]);
        document.body.style.backgroundColor = "white";
    }
})

logIn.addEventListener("click", async () => {
    let resp = await fetch("http://localhost:8000/users");
    let reso = await resp.json();
    for (let user of reso) {
        document.querySelector("#status").style.display = "none";

        if (user.name === usrName.value && user.pwd === pwd.value) {
            let usersCalsResp = await fetch(`http://localhost:8000/users_calendars?userId=${user.id}`);
            let usersCalsReso = await usersCalsResp.json();
            let calsResp = await fetch(`http://localhost:8000/calendars`);
            let calsReso = await calsResp.json();
            let cals = [];
            for (let userCal of usersCalsReso) {
                for (let cal of calsReso) {
                    if (userCal.calId === cal.id) {
                        cals.push(cal);
                    }
                }
            }
            store.setState({usrName: user.name, pwd: user.pwd, isLoggedIn: true, darkMode: store.getState().darkMode, cals: cals}, ["log", "displayCals"]);
            logOut.style.display = "inline";
            userFound = true;
            document.querySelector("#top-info").textContent = `Welcome ${store.getState().usrName}!`;
            usrName.value = "";
            pwd.value = "";
            break;
        }
    }

    if (store.getState().isLoggedIn) {
        document.querySelector("#logged-in").style.display = "block";
        setTimeout(() => {
            document.querySelector("#logged-in").style.display = "none";
        }, 2000);
    } else {
        document.querySelector("#status").textContent = "Incorrect username or password, try again"; 
        document.querySelector("#status").style.display = "block"; 
        return;
    }
});

logOut.addEventListener("click", () => {
    store.setState({ usrName: null, pwd: null, isLoggedIn: false, darkMode: store.getState().darkMode, cals: []}, ["log", "logOut"]);
});

driver();