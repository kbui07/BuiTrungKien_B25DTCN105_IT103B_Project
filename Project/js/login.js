document.getElementById("loginForm").onsubmit = function(e) {
    e.preventDefault();

    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let loginError = document.getElementById("loginError");

    //reset lỗi
    emailError.innerText = "";
    passwordError.innerText = "";
    loginError.innerText = "";
    email.classList.remove("input-error");
    password.classList.remove("input-error");

    let isValidate = true;

    //email
    if(email.value.trim() === "") {
        emailError.innerText = "Email không được để trống";
        email.classList.add("input-error");
        isValidate = false;
    }

    //password
    if(password.value.trim() === "") {
        passwordError.innerText = "Mật khẩu không được để trống";
        password.classList.add("input-error");
        isValidate = false;
    }

    if(!isValidate) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let findUser = users.find(u =>
        u.email === email.value && u.password === password.value
    );
    if(!findUser) {
        loginError.innerText = "Email hoặc mật khẩu không đúng";
        return; 
    }

    localStorage.setItem("currentUser", JSON.stringify(findUser));

    alert("Đăng nhập thành công");
    window.location.href = "subject-manager.html";
} 