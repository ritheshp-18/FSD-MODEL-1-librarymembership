document.getElementById("memberForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const memberId = document.getElementById("memberId").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const department = document.getElementById("department").value;
    const membershipType = document.getElementById("membershipType").value;

    const member = {
        memberId,
        name,
        email,
        phone,
        department,
        membershipType
    };

    try {

        const response = await fetch("/api/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(member)
        });

        const data = await response.json();

        const message = document.getElementById("message");

        if (data.success) {

            message.innerHTML = "Member added successfully!";
            message.style.color = "green";

            document.getElementById("memberForm").reset();

        } else {

            message.innerHTML = data.message;
            message.style.color = "red";
        }

    } catch (error) {

        document.getElementById("message").innerHTML =
            "Server error";

        document.getElementById("message").style.color = "red";
    }

});


async function findMembership() {

    const memberId =
        document.getElementById("searchMemberId").value;

    const result =
        document.getElementById("result");

    if (!memberId) {
        result.innerHTML = "Please enter Member ID";
        return;
    }

    try {

        const response =
            await fetch("/api/members/" + memberId);

        const data = await response.json();

        if (data.success) {

            result.innerHTML =
                "<b>Member ID:</b> " +
                data.memberId +
                "<br><b>Membership Type:</b> " +
                data.membershipType;

        } else {

            result.innerHTML = data.message;
        }

    } catch (error) {

        result.innerHTML = "Server error";
    }
}


async function loadMembers() {

    const membersDiv =
        document.getElementById("members");

    try {

        const response =
            await fetch("/api/members");

        const data = await response.json();

        membersDiv.innerHTML = "";

        data.members.forEach(member => {

            const div =
                document.createElement("div");

            div.className = "member";

            div.innerHTML =
                "<b>Member ID:</b> " + member.memberId +
                "<br><b>Name:</b> " + member.name +
                "<br><b>Email:</b> " + member.email +
                "<br><b>Phone:</b> " + member.phone +
                "<br><b>Department:</b> " + member.department +
                "<br><b>Membership Type:</b> " + member.membershipType;

            membersDiv.appendChild(div);

        });

    } catch (error) {

        membersDiv.innerHTML = "Unable to load members";
    }
}