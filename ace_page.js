
var firebaseConfig = {
    apiKey: "AIzaSyApzzo4_hHyIe6Z1R0XU4G_NGDifZcu6fU",
    authDomain: "chat-app-28aaf.firebaseapp.com",
    databaseURL: "https://chat-app-28aaf-default-rtdb.firebaseio.com",
    projectId: "chat-app-28aaf",
    storageBucket: "chat-app-28aaf.appspot.com",
    messagingSenderId: "492589434235",
    appId: "1:492589434235:web:c1b22a052dbe15a05be9de",
    measurementId: "G-NR5D0DMXNB"
  };
  
   firebase.initializeApp(firebaseConfig);
   user_name=localStorage.getItem("user_name");
   document.getElementById("user_name").innerHTML="Welcome "+ user_name +"!";
   function addroom(){
         room_name=document.getElementById("room_name").value;
         firebase.database().ref("/").child(room_name).update({
          purpose:"adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location="ace_chat.html";
   }

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
     Room_names = childKey;
    console.log("Room_names"+Room_names);
    row="<div class='room_name' id='"+Room_names+"' onclick='redirectToroomname(this.id)'>#"+Room_names+"</div><hr>";
    document.getElementById("output").innerHTML +=row;
    });});}
getData();
function redirectToroomname(name){
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location="ace_chat.html";
}
function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
}