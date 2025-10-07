import type { Configuration, PopupRequest } from '@azure/msal-browser';

// Configuración de MSAL para Azure AD
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_AD_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_AD_TENANT_ID || 'common'}`,
    redirectUri: import.meta.env.VITE_AZURE_AD_REDIRECT_URI || window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0: // Error
            console.error(message);
            break;
          case 1: // Warning
            console.warn(message);
            break;
          case 2: // Info
            console.info(message);
            break;
          case 3: // Verbose
            console.debug(message);
            break;
        }
      },
    },
  },
};

 export const loginRequest: PopupRequest = {
    scopes: ['api://0d040e46-3aa2-4341-9378-cc202c1f97c2/access_as_user'], // ← Cambiar aquí
  };

  export const tokenRequest = {
    scopes: ['api://0d040e46-3aa2-4341-9378-cc202c1f97c2/access_as_user'], // ← Y aquí
  };