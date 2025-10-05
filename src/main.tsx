import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './services/msalConfig.ts';
import './index.css';
import App from './App.tsx';

// Crear instancia de MSAL
const msalInstance = new PublicClientApplication(msalConfig);

// Inicializar MSAL
msalInstance.initialize().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </StrictMode>
  );
});  