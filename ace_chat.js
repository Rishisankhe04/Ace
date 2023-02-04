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
   room_name=localStorage.getItem("room_name");
   function send(){
         msg=document.getElementById("msg").value;
         firebase.database().ref(room_name).push({
               name:user_name,
               message:msg,
               like:0
         });
         document.getElementById("msg").value="";
   }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
       console.log("message_data",message_data);
    chat_name=message_data["name"];
    message=message_data["message"];
    like=message_data["like"];
    name_with_tag="<h4>"+chat_name+"<img class='user_tick' src='tick.png'></h4>";
    message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
    like_button="<button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updatelike(this.id)'>";
    span_with_tag="<span class='glyphicon glyphicon-thumps-up'>Like: "+like+"</span> </button>";
    row=name_with_tag+message_with_tag+like_button+span_with_tag;
    document.getElementById("output").innerHTML+=row;
    } });  }); }
getData();
function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
}
function updatelike(message_id){
    console.log("clicked on like button");
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    updated_likes=Number(likes)+1;
    console.log("updated_likes", updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
          like:updated_likes
    });
}