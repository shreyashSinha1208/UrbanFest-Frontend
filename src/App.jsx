import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './ScrollTop'; // import your scroll to top component
import AppRoutes from './AppRoutes';
import './App.css';

function App() {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="w-full font-inter flex justify-center bg-gray-50">
      <div className="w-full max-w-[1480px]">
        <Router>
          <ScrollToTop />
          <AppRoutes loading={loading} />
        </Router>
      </div>
    </div>
  );
}

export default App;
