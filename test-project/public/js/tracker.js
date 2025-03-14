(function () {
  const TRACKER_URL = "http://172.86.112.235:5000/api/traffic/track";

  function sendTrackingData() {
    const data = {
      pageUrl: window.location.href,
      referrer: document.referrer || "Direct",
      userAgent: navigator.userAgent,
    };

    fetch(TRACKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Tracking data sent successfully", responseData);
      })
      .catch((error) => {
        console.error("Error sending tracking data:", error);
      });
  }

  sendTrackingData();

  if (typeof window !== "undefined" && window.history) {
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      sendTrackingData();
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      sendTrackingData();
    };
  }
})();
