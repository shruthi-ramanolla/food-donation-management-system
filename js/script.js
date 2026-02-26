document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("donationForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const foodName = document.getElementById("foodName").value;
            const quantity = document.getElementById("quantity").value;
            const location = document.getElementById("location").value;
            const foodType = document.getElementById("foodType").value;
            const time = document.getElementById("donationTime").value;


const donation = {
    foodName,
    quantity,
    location,
    foodType,
    time,
    status:"pending",
    deliverdTo:"Not Delivered"
};

            let donations = JSON.parse(localStorage.getItem("donations")) || [];
            donations.push(donation);
            localStorage.setItem("donations", JSON.stringify(donations));

            document.getElementById("successMessage").innerText = "✅ Donation Submitted Successfully!";

            form.reset();
        });
    }

});
// Display donations in NGO page
const donationList = document.getElementById("donationList");

if (donationList) {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];

    if (donations.length === 0) {
        donationList.innerHTML = "<p>No donations available.</p>";
    } else {
        donations.forEach((donation, index) => {
            const card = document.createElement("div");
            card.className = "donation-card";

            card.innerHTML = `
                <h3>${donation.foodName}</h3>
                <p><strong>Quantity:</strong> ${donation.quantity} plates</p>
                <p><strong>Location:</strong> ${donation.location}</p>
                <p><strong>Type:</strong> ${donation.foodType}</p>
                <p><strong>Time:</strong> ${donation.time}</p>
                <p><strong>Status:</strong> ${donation.status}</p>
                <p><strong>Delivered To:</strong> ${donation.deliveredTo}</p>
                <button class="accept-btn" onclick="acceptDonation(${index})">Accept</button>
            `;

            donationList.appendChild(card);
        });
    }
}

// Accept donation function
function acceptDonation(index) {
    let donations = JSON.parse(localStorage.getItem("donations")) || [];

    const destination = prompt("Enter delivery location (Where food is delivered):");

    if (destination) {
        donations[index].status = "Delivered";
        donations[index].deliveredTo = destination;

        localStorage.setItem("donations", JSON.stringify(donations));

        alert("✅ Donation Delivered Successfully!");
        location.reload();
    }
}
// Admin Dashboard Display
const adminTable = document.getElementById("adminTable");
const totalDonations = document.getElementById("totalDonations");

if (adminTable) {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];

    let count = 0;
let finalCount = donations.length;

const counter = setInterval(() => {
    if (count < finalCount) {
        count++;
        totalDonations.innerText = count;
    } else {
        clearInterval(counter);
    }
}, 100);

    donations.forEach(donation => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${donation.foodName}</td>
            <td>${donation.quantity} plates</td>
            <td>${donation.location}</td>
            <td>${donation.foodType}</td>
            <td>${donation.time}</td>
            <td>${donation.status}</td>
            <td>${donation.deliveredTo}</td>
        `;

        adminTable.appendChild(row);
    });
}
// Demo Login System
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const role = document.getElementById("role").value;

        if (role === "donor") {
            window.location.href = "donor.html";
        } 
        else if (role === "ngo") {
            window.location.href = "ngo.html";
        } 
        else if (role === "admin") {
            window.location.href = "admin.html";
        }
    });
}