let guests = 1;

function submitRSVP() {
  let formValid = validate();

  if (formValid) {
    let firstName = document.getElementById("firstNameInput").value;
    let lastName = document.getElementById("lastNameInput").value;
    let data = {
      name: `${firstName} ${lastName}`,
      attending: document.querySelector('input[name="rsvp-selection"]:checked')
        .value,
    };
    if (data.attending == "true") {
      data.preference = document.querySelector(
        'input[name="accomodation-selection"]:checked'
      ).value;
    }
    console.log(data);

    let submitButton = document.getElementById("submitButton");
    submitButton.disabled = true;
    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';

    axios({
      method: "POST",
      url: "https://save-rsvp-l7qtbm5yfa-uc.a.run.app",
      data: data,
    })
      .then((response) => {
        let modalElement = document.getElementById("rsvpModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        let submitButton = document.getElementById("submitButton");
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit";
        resetForm();
        let toastElement = document.getElementById("toast");
        toastElement.querySelector(".toast-body").innerHTML = response.data;
        const toast = new bootstrap.Toast(toastElement, { autohide: false });
        toast.show();
      })
      .catch((error) => {
        let toastElement = document.getElementById("toast");
        toastElement.querySelector(".toast-body").innerHTML =
          error.response.data;
        const toast = new bootstrap.Toast(toastElement, { autohide: false });
        toast.show();
        let submitButton = document.getElementById("submitButton");
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit";
      });
  }
}

function validate() {
  const forms = document.querySelectorAll(".needs-validation");
  let formValid = true;

  Array.from(forms).forEach((form) => {
    if (!form.checkValidity()) {
      formValid = false;
    }
    form.classList.add("was-validated");
  });

  return formValid;
}

function resetForm() {
  let formElement = document.getElementById("rsvpForm");
  formElement.reset();
  const forms = document.querySelectorAll(".was-validated");

  Array.from(forms).forEach((form) => {
    form.classList.remove("was-validated");
  });
}

function addAccomodationSelection() {
  let accomodationSelectionSection = document.getElementById(
    "accomodationSelection"
  );
  accomodationSelectionSection.innerHTML = "";
  if (
    document.querySelector('input[name="rsvp-selection"]:checked').value ==
    "true"
  ) {
    let campingSelection = document.createElement("div");
    campingSelection.classList.add("col", "text-end");
    let cabinSelection = document.createElement("div");
    cabinSelection.classList.add("col", "text-center");
    let eitherSelection = document.createElement("div");
    eitherSelection.classList.add("col", "text-start");
    campingSelection.innerHTML = `
      <input class="btn-check form-check"
        type="radio"
        name="accomodation-selection"
        id="campingInput"
        autocomplete="off"
        value="camping"
        required>
      <label class="btn btn-colored" for="campingInput">Camping</label>`;
    cabinSelection.innerHTML = `
        <input class="btn-check form-check"
          type="radio"
          name="accomodation-selection"
          id="cabinInput"
          autocomplete="off"
          value="cabin"
          required>
        <label class="btn btn-colored" for="cabinInput">Cabin</label>`;
    eitherSelection.innerHTML = `
        <input class="btn-check form-check"
          type="radio"
          name="accomodation-selection"
          id="eitherInput"
          autocomplete="off"
          value="either"
          required>
        <label class="btn btn-colored" for="eitherInput">Either</label>`;
    accomodationSelectionSection.appendChild(campingSelection);
    accomodationSelectionSection.appendChild(cabinSelection);
    accomodationSelectionSection.appendChild(eitherSelection);
  } else {
    accomodationSelectionSection.innerHTML = "";
  }
}

function addGuest() {
  guests += 1;
  let guestContainer = document.getElementById("nameContainer");
  let guestRow = document.createElement("div");
  guestRow.classList.add("row");
  guestRow.innerHTML = `
      <div class="col-sm form-floating mb-3"><input class="form-control needs-validation input-colored"
          id="firstNameInput${guests}"
          type="text"
          name="firstName${guests}"
          placeholder="First Name"
          required><label class="ms-3 label-colored"
          for="firstNameInput${guests}">First Name</label>
        <div class="invalid-feedback feedback-white">Please provide your first name.</div>
      </div>
      <div class="col-sm form-floating mb-3"><input class="form-control needs-validation input-colored"
          id="lastNameInput${guests}"
          type="text"
          name="lastName${guests}"
          placeholder="Last Name"
          required><label class="ms-3 label-colored"
          for="lastNameInput${guests}">Last Name</label>
        <div class="invalid-feedback feedback-white">Please provide your last name</div>
      </div>
      <div class="col-sm-1 form-floating mb-3">
        <button class="btn btn-outline-light btn-colored form-control py-3"><i
            class="fa-solid fa-trash"></i></button>
      </div>`;
  guestContainer.appendChild(guestRow);
}

function removeGuest() {

}
