const reg_form = document.getElementById("reg_form");

reg_form.addEventListener("submit", (e) => {
  e.preventDefault();

  const full_name = reg_form.full_name.value;
  const username = reg_form.username.value;
  const phone_no = reg_form.phone_no.value;
  const email = reg_form.email.value;
  const img = reg_form.img;
  const date = reg_form.date.value;
  const password = reg_form.password.value;
  const confirm_pwd = reg_form.confirm_pwd.value;

  const full_nameErr = document.querySelector(".full_nameErr");
  const usernameErr = document.querySelector(".usernameErr");
  const phone_noErr = document.querySelector(".phone_noErr");
  const emailErr = document.querySelector(".emailErr");
  const imageErr = document.querySelector(".imageErr");
  const dateErr = document.querySelector(".dateErr");
  const passwordErr = document.querySelector(".passwordErr");
  const confirm_pwdErr = document.querySelector(".confirm_pwdErr");

  const full_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  const usernameReg = /^[a-zA-Z][a-zA-Z0-9_.]{2,19}$/;
  const phone_noReg = /^[0-9]+$/;
  const emailReg = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;
  const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  full_nameErr.innerHTML = "";
  usernameErr.innerHTML = "";
  phone_noErr.innerHTML = "";
  emailErr.innerHTML = "";
  imageErr.innerHTML = "";
  dateErr.innerHTML = "";
  passwordErr.innerHTML = "";
  confirm_pwdErr.innerHTML = "";

  if (!full_nameReg.test(full_name)) {
    full_nameErr.innerHTML = "Invalid fullname format";
    return;
  }

  if (!usernameReg.test(username)) {
    usernameErr.innerHTML = "Invalid username format";
    return;
  }

  if (!phone_noReg.test(phone_no)) {
    phone_noErr.innerHTML = "Invalid phone number input";
    return;
  }

  if (!emailReg.test(email)) {
    emailErr.innerHTML = "Invalid email input";
    return;
  }

  if (img.files.length == 0) {
    imageErr.innerHTML = "Upload your profile picture";
    return;
  }

  if (date == "") {
    dateErr.innerHTML = "Select today's date";
    return;
  }

  if (!passwordReg.test(password)) {
    passwordErr.innerHTML = "Invalid password input";
    return;
  }

  if (password !== confirm_pwd) {
    confirm_pwdErr.innerHTML = "Passwords do not match";
    return
  }

  const formData = new FormData();

  formData.append("full_name", full_name);
  formData.append("username", username);
  formData.append("phone_no", phone_no);
  formData.append("email", email);
  formData.append("img", img.files[0]);
  formData.append("date", date);
  formData.append("password", password);

  fetch("/auth/register", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      //     'Content-Type': 'application/json'
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {        
        $(document).ready(() => { 
          iziToast.success({
            title: "Ok",
            message: data.msg,
          });
        });

        setInterval(() => {
          window.location.href = data.redirectURL;
        }, 2000);
      }
      if (data.error) {
        // Invoke the toast component
        $(document).ready(() => {
          iziToast.error({
            title: "Error",
            message: data.error,
          });
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});
