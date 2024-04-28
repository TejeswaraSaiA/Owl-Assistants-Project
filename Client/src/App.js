import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './Dashboard/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      
      <Router>
      <Routes>
        <Route path="/" element={<Layout/>} />
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
