const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = form.username.value;
  const password = form.password.value;

  const authenticated = authentication(username, password);

  if (authenticated) {
    alert("You are logged in successfully");
    window.location.href = "admin.html";
  } else {
    alert("Wrong Email or Password!");
  }
});

function authentication(username, password) {
//admin
  if (username === "admin" && password === "admin123") {
    return true;
  } else {
    return false;
  }

    
}