document.getElementById("policy-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const taxRate = parseFloat(document.getElementById("tax-rate").value);
    const spending = parseFloat(document.getElementById("spending").value);
    const inflationRate = parseFloat(document.getElementById("inflation-rate").value);
    const gdpGrowth = parseFloat(document.getElementById("gdp-growth").value);
  
    const token = localStorage.getItem("token");
  
    fetch("http://localhost:5000/simulate/advanced", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ taxRate, spending, inflationRate, gdpGrowth })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById("simulation-output").innerHTML = `
        <p>Economic Growth: ${data.economicGrowth}</p>
        <p>Unemployment Rate: ${data.unemploymentRate}</p>
        <p>Spending Impact: ${data.spendingImpact}</p>
      `;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

// authentication
if (data.isAuthenticated) {
    document.getElementById('welcome-message').textContent = `Welcome, ${data.username}`;
};

// 
document.addEventListener('DOMContentLoaded', () => {
    fetch('/auth/check-session')
      .then((response) => response.json())
      .then((data) => {
        const navLinks = document.getElementById('nav-links');
  
        if (data.isAuthenticated) {
          navLinks.innerHTML = `
            <li><a href="home.html">Home</a></li>
            <li><a href="index.html">Simulation Tool</a></li>
            <li><a href="/auth/logout">Logout</a></li>
          `;
        } else {
          navLinks.innerHTML = `
            <li><a href="home.html">Home</a></li>
            <li><a href="login.html">Login</a></li>
            <li><a href="register.html">Register</a></li>
          `;
        }
      })
      .catch((err) => console.error('Error fetching session data:', err));
});


  