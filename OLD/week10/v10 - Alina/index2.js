import "./component.js"

let wrapper = document.getElementById("friends");

let friends = [{name: "Måns"}, {name: "Sara"}, {name: "Robin"}];

function getFriends(friends){
    friends.forEach (friend => {
        let card = document.createElement("friend-card");
        card.friend = friend;
        wrapper.appendChild(card);
        
    })
}
getFriends(friends);