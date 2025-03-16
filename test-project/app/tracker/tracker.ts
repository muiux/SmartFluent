type TrackingData = {
  pageUrl: string;
  referrer: string;
  userAgent: string;
};

const Tracker = {
  trackerUrl: "" as string,

  initialize(trackerUrl: string | undefined): void {
    if (!trackerUrl) {
      return;
    }

    this.trackerUrl = trackerUrl;

    if (typeof window === "undefined") return;

    this.sendTrackingData();

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = (
      data: any,
      unused: string,
      url?: string | URL | null,
    ) => {
      originalPushState.call(window.history, data, unused, url);
      this.sendTrackingData();
    };

    window.history.replaceState = (
      data: any,
      unused: string,
      url?: string | URL | null,
    ) => {
      originalReplaceState.call(window.history, data, unused, url);
      this.sendTrackingData();
    };
  },

  sendTrackingData(): void {
    if (!this.trackerUrl) {
      return;
    }

    const data: TrackingData = {
      pageUrl: window.location.href,
      referrer: document.referrer || "Direct",
      userAgent: navigator.userAgent,
    };

    fetch(this.trackerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
};

export default Tracker;
