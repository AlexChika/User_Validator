// Dom
const form = select("form");
const f_Name = select("#firstname");
const s_Name = select("#secondname");
const username = select("#username");
const email = select("#email");
const password = select("#password");
const password2 = select("#password2");
const code = select("code");
const submit = select("#btn");
const loginBtn = select("#login-btn");
const signupBtn = select("#signup");
const logoutBtn = select("#logout");
const signinBtn = document.querySelectorAll(".signin");
const allElements = document.querySelectorAll(".fields");
const loginName = select("#login-name");
const loginPassword = select("#login-password");
const loginMessage = select("#login-message");
const welcomeName = select("#user");
const profileName = select("#profile-name");
let passed = false;
let data;
// functions
// select elements from the Dom
function select(input) {
  const element = document.querySelector(input);
  if (element) {
    return element;
  } else {
    throw `${input} not found`;
  }
}
//getting and setting LocalStorage
function get() {
  let storage;
  if (localStorage.getItem("data")) {
    storage = JSON.parse(localStorage.getItem("data"));
  } else {
    storage = [];
  }
  return storage;
}
function set(data) {
  let storage = get();
  const userExists = storage.filter((user) => {
    if (user.email === data.email || user.user === data.user) {
      return true;
    }
  });
  if (userExists.length > 0) {
    submission("error", "User Exists", "signup_page", 3000);
    if (data.user === userExists[0].user) {
      showError(username, "Username exist");
    }
    if (data.email === userExists[0].email) {
      showError(email, "Email exist");
    }
  } else {
    storage.push(data);
    localStorage.setItem("data", JSON.stringify(storage));
    welcomeName.textContent = `${
      data.name.charAt(0).toUpperCase() + data.name.slice(1)
    } ${data.secondName.charAt(0).toUpperCase() + data.secondName.slice(1)}`;
    submission("success", "Submission success", "welcome_page", 1000);
    setTimeout(() => {
      f_Name.value = "";
      s_Name.value = "";
      username.value = "";
      email.value = "";
      password.value = "";
      password2.value = "";
      allElements.forEach((field) => {
        field.className = "fields";
        field.querySelector("input").setAttribute("data-id", "false");
        submit.parentElement.className = "btn-con";
      });
    }, 1100);
  }
}
function updateMessage(a, b, c, d, e, f) {
  if (
    a.dataset.id === "true" &&
    b.dataset.id === "true" &&
    c.dataset.id === "true" &&
    d.dataset.id === "true" &&
    e.dataset.id === "true" &&
    f.dataset.id === "true"
  ) {
    submit.parentElement.className = "btn-con success";
    passed = true;
  } else {
    submit.parentElement.className = "btn-con error";
    passed = false;
  }
}
// show error message
function showError(x, y) {
  // fields is the parent element in the Dom
  const fields = x.parentElement;
  fields.className = "fields error";
  const small = fields.querySelector("small");
  small.textContent = y;
  x.setAttribute("data-id", "false");
  updateMessage(f_Name, s_Name, username, email, password, password2);
}
// show success message
function showSuccess(x) {
  // fields is the parent element in the Dom
  const fields = x.parentElement;
  fields.className = "fields success";
  x.setAttribute("data-id", "true");
  updateMessage(f_Name, s_Name, username, email, password, password2);
}
// Check for empty fields
function isEmpty(x) {
  const y = x.querySelector("input");
  if (y.value.trim() === "") {
    showError(y, "Field cannot be empty");
  }
}
function checkData(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${input.name} cannot be less than ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${input.name} should be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}
function checkMatch(x, y) {
  if (y.value === x.value && y.value !== "") {
    showSuccess(y);
  } else {
    showError(y, `${y.name} did not match`);
  }
}
function checkEmail(x) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(x)) {
    showSuccess(email);
  } else {
    showError(email, `${email.name} is not valid`);
  }
}
function submission(status, text, page, time) {
  code.parentElement.className = "form-container " + status;
  code.textContent = text;
  setTimeout(() => {
    code.parentElement.className = "form-container";
    code.textContent = "";
    document.body.className = page;
  }, time);
}
function loginStatus(element, status, text) {
  const login = element.parentElement;
  login.className = "login" + " " + status;
  element.textContent = text;
  setTimeout(() => {
    login.className = "login";
    element.textContent = "";
  }, 2000);
}
function showDetails(name, password) {
  let storage = get();
  const user = storage.filter((data) => {
    if (
      data.password === password &&
      (data.user === name.toLowerCase() || data.email === name.toLowerCase())
    ) {
      return data;
    }
  });
  if (user.length > 0) {
    render(user);
  } else {
    loginStatus(loginMessage, "error", "Password or Email is incorrect");
  }
}
function render(data) {
  const [userDetails] = data;
  const { name, secondName, user, email } = userDetails;
  const profileBody = document.querySelector(".profile-body");
  profileName.textContent = `${user}`;

  profileBody.innerHTML = `
    <div>
              <i class="bi bi-person-check-fill"></i>
              <p class="">${user}</p>
            </div>
            <div>
              <i class="bi bi-person-rolodex"></i>
              <p>${
                name.charAt(0).toUpperCase() +
                name.slice(1) +
                " " +
                secondName.charAt(0).toUpperCase() +
                secondName.slice(1)
              }</p>
            </div>
            <div>
              <i class="bi bi-envelope-check-fill"></i>
              <p>${email}</p>
            </div>
            <div>
              <i class="bi bi-geo-alt-fill"></i>
              <p>Lagos Nigeria</p>
            </div>
  
  `;
  document.body.className = "profile_page";
}
// events
f_Name.addEventListener("keyup", (e) => {
  checkData(f_Name, 3, 15);
});
s_Name.addEventListener("keyup", (e) => {
  checkData(s_Name, 3, 15);
});
username.addEventListener("keyup", (e) => {
  checkData(username, 4, 15);
});
password.addEventListener("keyup", (e) => {
  checkData(password, 6, 15);
  checkMatch(password, password2);
});
password2.addEventListener("keyup", (e) => {
  checkMatch(password, password2);
});
email.addEventListener("keyup", (e) => {
  checkEmail(email.value);
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  allElements.forEach((fields) => {
    isEmpty(fields);
  });
  updateMessage(f_Name, s_Name, username, email, password, password2);
  if (passed) {
    data = {
      name: f_Name.value,
      secondName: s_Name.value,
      user: username.value.toLowerCase(),
      email: email.value.toLowerCase(),
      password: password.value,
    };
    set(data);
  } else {
    submission("error", "Submission failed", "signup_page", 3000);
  }
});

// pages event Listeners
signinBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.body.className = "login_page";
  });
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (loginName.value === "" || loginPassword.value === "") {
    loginStatus(loginMessage, "error", "Please fill in all fields");
  } else if (loginName.value.length < 3 || loginPassword.value.length < 3) {
    loginStatus(loginMessage, "error", "Please fill in correct details");
  } else {
    showDetails(loginName.value, loginPassword.value);
  }
});
signupBtn.addEventListener("click", () => {
  document.body.className = "signup_page";
});
logoutBtn.addEventListener("click", () => {
  document.body.className = "signup_page";
});
