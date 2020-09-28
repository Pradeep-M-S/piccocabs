// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDiW8e2qm1Kay_WAjqRcaZVEIavkTvYJGw",
  authDomain: "test-proj-picco.firebaseapp.com",
  databaseURL: "https://test-proj-picco.firebaseio.com",
  projectId: "test-proj-picco",
  storageBucket: "test-proj-picco.appspot.com",
  messagingSenderId: "98274567879",
  appId: "1:98274567879:web:1c5bd279301cb7daf580e2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let message = document.querySelector(".message").value;
  console.log(name, email, message);

  saveContactInfo(name, email, message);

  document.querySelector(".contact-form").reset();

  sendEmail(name, email, message);
}

// Save infos to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    message: message,
  });

  retrieveInfos();
}

function retrieveInfos() {
  let ref = firebase.database().ref("infos");
  ref.on("value", gotData);
}

//retrieve infos
function gotData(data) {
  let info = data.val();
  let keys = Object.keys(info);

  for (let i = 0; i < keys.length; i++) {
    let infoData = keys[i];
    let name = info[infoData].name;
    let email = info[infoData].email;
    let message = info[infoData].message;
    console.log(name, email, message);

    let infosResults = document.querySelector(".infosResults");

    infoResults.inneHTML += `<div>
    <p><strong>${name}</strong></p>
    <p><strong>${email}</strong></p>
    <p><strong>${message}</strong></p>
    </div>`;
  }
}

retrieveInfos();

//send email info to our email

function sendEmail(name, email, message) {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "pradeepmsblogspot@gmail.com",
    Password: "ibxdnieqkadegcua",
    From: "pradeepmsblogspot@gmail.com",
    To: "pradeepms200076@gmail.com",
    Subject: `${name} Sent you a message`,
    Body: `Name : ${name} <br/>  Email : ${email}  <br/>  Message : ${message}`,
  }).then((message) => alert("Mail Sent Successfully"));
}
