import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import store from './components/redux/store.js';
import { GlobalProvider } from './components/auth/GlobalProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <GlobalProvider>         {/* Global Context Provider */}
        <App />
      </GlobalProvider>
    </Provider>
  </StrictMode>,
)
