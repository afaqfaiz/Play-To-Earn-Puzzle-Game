async function connectMetaMask() {
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');
    const loader = document.getElementById('loader');
    const tickAnimation = document.getElementById('tickAnimation');
  
    // Start loader animation
    loader.style.display = 'flex';
    tickAnimation.style.display = 'none'; // Ensure tick is hidden at start
    statusText.textContent = "Connecting to MetaMask...";
  
    // Simulate animation for 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));
  
    try {
      // Attempt to connect MetaMask
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        // Get connected account
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const account = accounts[0]; // First account
        console.log("Connected account:", account);
  
        // Show tick animation
        loader.style.display = 'none';
        tickAnimation.style.display = 'block';
        statusText.textContent = "Successfully Connected!";
  
        // Simulate tick animation for 5 seconds before redirect
        await new Promise(resolve => setTimeout(resolve, 5000));
  
        // Save connection status in sessionStorage
        sessionStorage.setItem('metaMaskConnected', 'true');
  
        // Redirect to index.html
        window.location.href = "index.html";
      } else {
        throw new Error("MetaMask not detected");
      }
    } catch (error) {
      console.error("MetaMask connection failed", error);
      loader.style.display = 'none';
      statusText.textContent = "Connection failed. Please try again.";
    }
  }
  
  // Handle page load: Check if MetaMask should be disconnected
  function checkConnection() {
    const connected = sessionStorage.getItem('metaMaskConnected');
    if (connected) {
      window.location.href = "index.html";
    }
  }

  function checkConnectiongame() {
    const connected = sessionStorage.getItem('metaMaskConnected');
    const statusIcon = document.getElementById('connectionStatusIcon');
    const statusText = document.getElementById('connectionStatusText');
    console.log("in the game ", connected);
  
    if (connected === 'true') {
      // Show the tick icon for connected state
      statusIcon.classList.remove('disconnected');
      statusIcon.classList.add('connected');
      statusIcon.textContent = '✔'; // Add a tick icon
    } else {
      // Show the disconnected state
      statusIcon.classList.remove('connected');
      statusIcon.classList.add('disconnected');
      statusIcon.textContent = ''; // Remove tick icon
      statusText.textContent = "Not Connected";
    }
  }
  
  
  // Clear MetaMask connection state on page unload (game close)

  // Expose the functions globally
  window.connectMetaMask = connectMetaMask;
  window.checkConnection = checkConnection;
  window.checkConnectiongame = checkConnectiongame;
  window.addEventListener('load', checkConnectiongame);

  