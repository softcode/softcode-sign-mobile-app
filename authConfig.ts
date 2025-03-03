import { PublicClientApplication } from "@azure/msal-browser";
// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito


import * as dotenv from 'dotenv';
dotenv.config();

export const aadClientId = process.env.VITE_CLIENT_ID || "";
export const authority = process.env.VITE_AUTHORITY || "";


// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: aadClientId,
    authority: authority,
    redirectUri: `${window.location.protocol}//${window.location.host}`,
    postLogoutRedirectUri: `${window.location.protocol}//${window.location.host}/#notrigger`,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: isIE || isEdge || isFirefox,
  },
  system: {
    allowPlatformBroker: false, // Disables WAM Broker
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
  // domainHint: "sj.se",
  redirectStartPage: "/",
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

export const msalInstance = new PublicClientApplication(msalConfig);

console.log("msal: ", msalConfig.auth);
