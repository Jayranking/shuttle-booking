const vehicleForm = document.getElementById("vehicleForm");

vehicleForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const vehicle_model = vehicleForm.vehicle_model.value;
  const plate_no = vehicleForm.plate_no.value;
  const img = vehicleForm.img;
  const amount = vehicleForm.amount.value.replace(/,/g, '');
  const description = vehicleForm.description.value;


  const vehicle_modelErr = document.querySelector(".vehicle_modelErr");
  const plate_noErr = document.querySelector(".plate_noErr");
  const imageErr = document.querySelector(".imageErr");
  const amountErr = document.querySelector(".amountErr");
  const descriptionErr = document.querySelector(".descriptionErr");

  vehicle_modelErr.innerHTML = "";
  plate_noErr.innerHTML = "";
  imageErr.innerHTML = "";
  amountErr.innerHTML = "";
  descriptionErr.innerHTML = "";

  const vehicle_modelReg = /\b[A-Za-z0-9\-]+\b/;
  const plate_noReg = /^[A-Za-z0-9]{1,3}\s?[A-Za-z0-9]{1,4}$/;
  const amountReg = /^[0-9]+$/;
  const descriptionReg = /^[a-zA-Z0-9\s,.'()\-!]+$/;

  if (!vehicle_modelReg.test(vehicle_model)) {
    vehicle_modelErr.innerHTML = "Invalid vehicle name format";
    return;
  }

  if (!plate_noReg.test(plate_no)) {
    plate_noErr.innerHTML = "Invalid plate number format";
    return;
  }

  if (img.files.length == 0) {
    imageErr.innerHTML = "Upload Vehicle image";
    return;
  }

  if (!amountReg.test(amount)) {
    amountErr.innerHTML = "Enter a reasonable amount";
    return;
  }

  if (!descriptionReg.test(description)) {
    descriptionErr.innerHTML = "Type your description correctly!";
    return;
  }

  const formData = new FormData();

  formData.append("vehicle_model", vehicle_model);
  formData.append("plate_no", plate_no);
  formData.append("img", img.files[0]);
  formData.append("amount", amount);
  formData.append("description", description);



  fetch("/vehicle", {
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
