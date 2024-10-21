const bookForm = document.getElementById("bookForm");

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const full_name = bookForm.full_name.value;
  const phone_no = bookForm.phone_no.value;
  const email = bookForm.email.value;
  const passenger = bookForm.passenger.value;
  const date = bookForm.date.value;
  const time = bookForm.time.value;
  const location = bookForm.location.value;
  const destination = bookForm.destination.value;

  const full_nameErr = document.querySelector(".full_nameErr");
  const phone_noErr = document.querySelector(".phone_noErr");
  const emailErr = document.querySelector(".emailErr");
  const passengerErr = document.querySelector(".passengerErr");
  const dateErr = document.querySelector(".dateErr");
  const timeErr = document.querySelector(".timeErr");
  const locationErr = document.querySelector(".locationErr");
  const destinationErr = document.querySelector(".destinationErr");


  const full_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  const phone_noReg = /^[0-9]+$/;
  const emailReg = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;
  const locationReg = /^[a-zA-Z0-9\s,'-]+$/;


  full_nameErr.innerHTML = "";
  phone_noErr.innerHTML = "";
  emailErr.innerHTML = "";
  passengerErr.innerHTML = "";
  dateErr.innerHTML = "";
  timeErr.innerHTML = "";
  locationErr.innerHTML = "";
  destinationErr.innerHTML = "";


  if (!full_nameReg.test(full_name)) {
    full_nameErr.innerHTML = "Invalid fullname format";
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

  if (passenger == "") {
    passengerErr.innerHTML = "Select Number of passenger";
    return;
  }

  if (date == "") {
    dateErr.innerHTML = "Select date";
    return;
  }

  if (time == "") {
    timeErr.innerHTML = "Select time for pickup";
    return;
  }

  if (!locationReg.test(location)) {
    locationErr.innerHTML = "Enter Location you are right now!";
    return;
  }

  if (!locationReg.test(destination)) {
    destinationErr.innerHTML = "Enter where you are going";
    return;
  }

  const data = {full_name, phone_no, email, passenger, date, time, location, destination};

  fetch("/booking", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
})