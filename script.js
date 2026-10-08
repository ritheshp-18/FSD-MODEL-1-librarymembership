document.getElementById("libraryForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let registerNumber = document.getElementById("registerNumber").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let department = document.getElementById("department").value;
    let membership = document.getElementById("membership").value;
    let address = document.getElementById("address").value.trim();

    let phonePattern = /^[0-9]{10}$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !registerNumber || !email || !phone ||
        !department || !membership || !address) {
        alert("Please fill all fields.");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Enter a valid email address.");
        return;
    }

    if (!phonePattern.test(phone)) {
        alert("Phone number must contain exactly 10 digits.");
        return;
    }

    let memberId = "LIB" + Math.floor(10000 + Math.random() * 90000);

    let success = document.getElementById("success");

    success.innerHTML =
        "<b>Registration Successful!</b><br>" +
        "Member Name: " + name + "<br>" +
        "Membership ID: " + memberId + "<br>" +
        "Membership Type: " + membership;

    success.style.display = "block";
});