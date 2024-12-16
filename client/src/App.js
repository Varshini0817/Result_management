import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./pages/staff/Login";
import Register from "./pages/staff/Register"
import Home from "./pages/Home";
import "./styles/theme.css";
import "./styles/layout.css";
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import { Toaster } from 'react-hot-toast';
import StaffMemHome from './pages/staff/StaffMemHome';

function App() {
  const { loading } = useSelector((state) => state.alert);

  return (
    <div className="App">
      {loading && <Spinner/>}
      <Toaster></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path='/register' element={ <Register/>} />
          <Route path='/staffMem' element={ <StaffMemHome/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
