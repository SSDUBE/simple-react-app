import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/styles';
import { theme } from './Theme';
import AppRoutes from './Routes';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* TODO to add a backdrop */}
      <Suspense fallback={<></>}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
