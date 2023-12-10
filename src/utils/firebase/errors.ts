export const errors = (code: string) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "There is already a registered user.";
    case "auth/invalid-login-credentials":
    case "auth/invalid-credential":
      return "Your login information is incorrect.";
    case "auth/quota-exceeded":
      return "Exceeded daily quota for email sign-in.";
    case "messaging/failed-service-worker-registration":
      return "Failed service worker registration";
    case "messaging/unsupported-browser":
      return "Your browser is not supported.";
    case "auth/requires-recent-login":
      return "Please log in again to delete your account.";
    case "auth/unauthorized-continue-uri":
      return "This domain address is not supported.";
    case "auth/too-many-requests":
      return "Too many request.<br/>Please try again in a few minutes.";
    case "messaging/permission-blocked":
      return "Please allow notifications to use the app.";
  }

  return "an unexpected error has occurred.";
};
