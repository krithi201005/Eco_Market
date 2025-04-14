document.getElementById("show-signup").addEventListener("click", function() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("signup-section").style.display = "block";
});

document.getElementById("show-login").addEventListener("click", function() {
    document.getElementById("signup-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
});

// Login Form Submission
document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const errorMsg = document.getElementById("login-error");

    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    errorMsg.textContent = data.message;
    errorMsg.style.color = data.success ? "green" : "red"; // Green for success, Red for error

    if (data.success) {
        setTimeout(() => window.location.href = "../../index.html", 1500);
    }
});

// Signup Form Submission
document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const errorMsg = document.getElementById("signup-error");

    const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (data.success) {
        errorMsg.textContent = "Account created successfully!";
        errorMsg.style.color = "green"; 

        // Wait 2s before switching to login form
        setTimeout(() => {
            document.getElementById("show-login").click();
        }, 2000);
    } else {
        errorMsg.textContent = data.message;
        errorMsg.style.color = "red"; 
    }
});