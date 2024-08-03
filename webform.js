/* This was a class final project with the following requirements:
   Done--Include at least 2 event handlers.
   Done--Use at least one custom type.
   Done--Add methods to the custom type using
     its prototype property.
   Done--AVOID inline event handlers.
   Done--AVOID global scope whenever possible.
   Yes--All code must be your own.
   Yes--At least 100 lines of JS code.
   Post class work: Added input validation
*/
(function () {
    const main = document.querySelector("main"); //for placing new HTML
    const formBtn = document.getElementById("btn-contact");
    const form = document.getElementById("newForm");
    let student;
    let sect1;
    var errMessage = "";


    //required entry validation
    async function required(entry, label) {
        let input = entry;
        let name = label;
        if (input.length == 0) {
            errMessage += "Please fill in the required " + document.getElementById(name).placeholder + ".\n";
            return false;
        } else {
        // console.log(input, name);
        return true;
        }
    }

    //email validation
    async function validateEmail(vE) {
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let result = validRegex.test(vE);
        if (result == false) {
            errMessage += "Please enter a valid email address.\n";
            return false;
        } else {
            return true;
        }
    }

    //telephone validation
    async function validateTel(vT) {
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let result = phoneno.test(vT);
        if (result == false) {
            errMessage += "Please enter a valid phone number.\n";
            return false;
        } else {
            return true;
        }
    }

    formBtn.addEventListener("click", createForm);

    function createForm(evt) {
        evt.preventDefault();
        formBtn.remove();
        form.innerHTML = `
    <div class="contact-name newForm">
      <label for="fname">*First Name:<br /></label>
      <input type="text" class="fname" id="fname" placeholder="First Name" required />
      <p></p>
      <label for="lname">*Last Name:<br /></label>
      <input type="text" class="lname" id="lname" placeholder="Last Name" required />
      <p></p>
      <label for="email">*Email Address:<br /></label>
      <input type="email" class="email" id="email" placeholder="Email" autocomplete="email" required />
      <p></p>
      <label for="tel">*Phone Number:<br /></label>
      <input type="tel" class="phone" id="tel" placeholder="Phone Number" autocomplete="tel-area-code" required />
      <p></p>
      <label for="address1">Address Line 1:<br /></label>
      <input type="text" class="address" id="address1" placeholder="Address">
      <p></p>
      <label for="address2">Address Line 2:<br /></label>
      <input type="text" class="address" id="address2" placeholder="Address">
      <p></p>
      <label for="city">City/Town:<br /></label>
      <input type="text" class="city" id="city" placeholder="City or Town">
      <p></p>
      <label for="state">State:<br /></label>
      <input type="text" class="state" id="state" placeholder="State">
      <p></p>
      <label for="zip">Zip Code:<br /></label>
      <input type="text" class="zip" id="zip" placeholder="Zip Code">
      <p></p>
      <button id="btn-submit" class="btn-submit">submit</button>
      </div>
      `;
        //console.log(form);
        const btnSubmit = document.getElementById("btn-submit");
        //event listener for form submission button
        //POST method can be added for a real site
        form.addEventListener("click", async function (e) {
            e.preventDefault();
            if (e.target.classList.contains("btn-submit")) {
                //populate new object on contact object
                student = new Contact(
                    document.getElementById("fname").value,
                    document.getElementById("lname").value,
                    document.getElementById("email").value,
                    document.getElementById("tel").value,
                    document.getElementById("address1").value,
                    document.getElementById("address2").value,
                    document.getElementById("city").value,
                    document.getElementById("state").value,
                    document.getElementById("zip").value
                );
                // console.log(student);
                var entryFname = await required(student.fName, "fname");
                var entryLname = await required(student.lName, "lname");
                var entryEmail = await required(student.email, "email");
                var entryTel = await required(student.tel, "tel");
                var validEmail = await validateEmail(student.email);
                // console.log(student.email);
                // console.log(validEmail);
                var validTel = await validateTel(student.tel);
                // console.log(student.tel);
                // console.log(validTel);
                if (
                    (entryFname === true) &&
                    (entryLname === true) &&
                    (entryEmail === true) &&
                    (entryTel === true) &&
                    (validEmail === true) &&
                    (validTel === true)
                ) {
                    submitBtn(e);
                    return student;
                } else {
                    // console.log(errMessage);
                    alert(errMessage);
                }
                errMessage = "";
            }
        });
    }
    //'turn off' form with CSS class to keep info and add student outro
    // .remove or .innerHTML = '' also works fine if info isn't needed later
    // but I wanted to add an 'edit info' feature...
    // 'confirm info' button clears to outro & could POST method in future
    function submitBtn(evt) {
        //console.log(student);
        evt.target.parentElement.parentElement.classList.add("display-none");
        const h2 = document.getElementById("opening");
        //console.log(h2, h2.textContent);
        h2.textContent = `${student.fName}, thank you for connecting with us!`;
        sect1 = document.createElement("section");
        sect1.classList.add("contact");
        sect1.id = "contact";
        sect1.innerHTML = `
    Here is your submitted primary contact information:<br /><br />
    ${student.comboName()}<br />
    Email: ${student.email}<br />
    Phone: ${student.tel}<br /><br />
    We may mail you some literature from time to time at the following address:<br /><br />
    ${student.comboAddress()}<br /><br />
    <button id="btn-edit" class="btn-edit">edit info</button><br /><br />
    <button id="btn-confirm" class="btn-confirm">confirm info</button>
    `;
        //console.log(sect1);
        main.appendChild(sect1);
        editBtn();
        confirmBtn();
    }
    //event listener for info edit button
    function editBtn() {
        sect1 = document.getElementById("contact");
        sect1.addEventListener("click", function (e) {
            e.preventDefault();
            if (e.target.classList.contains("btn-edit")) {
                form.classList.remove("display-none");
                sect1.remove(); //id is unique, so it needs to be removed
                //console.log(main);
            }
        });
    }
    //event listener for info confirm button
    function confirmBtn() {
        sect1 = document.getElementById("contact");
        const h = document.getElementById("opening");
        sect1.addEventListener("click", function (e) {
            e.preventDefault();
            if (e.target.classList.contains("btn-confirm")) {
                h.innerHTML = `Thanks, ${student.fName}!<br />Hope to see you soon!`;
                sect1.remove(); //id is unique, so it needs to be removed
            }
        });
    }
    //custom type object
    function Contact(
        fName,
        lName,
        email,
        tel,
        address1,
        address2,
        city,
        state,
        zip
    ) {
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.tel = tel;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
    //method on prototype
    Contact.prototype.comboName = function () {
        const combine = `${this.fName} ${this.lName}`;
        return combine;
    };
    //another method on prototype
    Contact.prototype.comboAddress = function () {
        const mailAddress = `
    ${this.address1} ${this.address2}<br />
    ${this.city}, ${this.state}  ${this.zip}
    `;
        return mailAddress;
    };



})(); // All wrapped in an IIFE!