function myScheduledFunction() {
    // This is the function you want to run automatically every 24 hours
    console.log('Scheduled function is running...');
  }
  
  // Schedule the function to run every 5 seconds
  const fiveSeconds = 5 * 1000;
  setInterval(myScheduledFunction, fiveSeconds);
  
  // Initial run (optional)
  myScheduledFunction();
  