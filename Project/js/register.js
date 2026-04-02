document.getElementById("registerForm").onsubmit = function(e) {
    e.preventDefault();

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let agree = document.getElementById("agree");

    //reset lỗi
    document.querySelectorAll(".error").forEach(el => el.innerText = "");
    document.querySelectorAll("input").forEach(el => el.classList.remove("input-error"));

    let isValidate = true;

    //họ tên
    if(firstName.value.trim() === "") {
        document.getElementById("firstNameError").innerText = "Họ tên không được để trống";
        firstName.classList.add("input-error");
        isValidate = false;
    }

    if(lastName.value.trim() === "") {
        document.getElementById("lastNameError").innerText = "Họ tên không được để trống";
        lastName.classList.add("input-error");
        isValidate = false;
    }

    //email
    if(email.value.trim() === "") {
        document.getElementById("emailError").innerText = "Email không được để trống";
        email.classList.add("input-error");
        isValidate = false;
    } else if(!email.value.includes("@",".")) {
        document.getElementById("emailError").innerText = "Email không hợp lệ";
        email.classList.add("input-error");
        isValidate = false;
    }

    //password
    if(password.value.trim() === "") {
        document.getElementById("passwordError").innerText = "Mật khẩu không được để trống";
        password.classList.add("input-error");
        isValidate = false;
    } else if(password.value.length < 8) {
        document.getElementById("passwordError").innerText = "Mật khẩu tối thiểu 8 ký tự";
        password.classList.add("input-error");
        isValidate = false;
    }

    //checkbox
    if(!agree.checked) {
        document.getElementById("error-text").style.color = "red";
        isValidate = false;
    }

    //nếu hợp lệ
    if(isValidate) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
            users.push ({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("Đăng ký thành công!");
        window.location.href = "login.html";
        }
    };

