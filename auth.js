// auth.js

function signup() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
  
        firebase.database().ref("users/" + uid).set({
          name: name,
          email: email
        });
  
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        alert("Signup successful!");
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert("Signup failed: " + error.message);
      });
  }
  
  function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
  
        firebase.database().ref("users/" + uid).once("value")
          .then((snapshot) => {
            const userData = snapshot.val();
            localStorage.setItem("userName", userData.name || "Unknown");
            localStorage.setItem("userEmail", email);
            alert("Login successful!");
            window.location.href = "dashboard.html";
          });
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  }
  