async function connectMetaMask() {
    if (window.ethereum) {
      try {
        // Request MetaMask account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        // Get connected account
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const account = accounts[0]; // First account
        console.log("Connected account:", account);
  
        // Redirect to index.html on successful connection
        window.location.href = "index.html";
      } catch (error) {
        console.error("MetaMask connection failed", error);
        alert("Failed to connect to MetaMask. Please try again.");
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask to continue.");
    }
  }
  
  // Expose the function to the global scope
  window.connectMetaMask = connectMetaMask;
  