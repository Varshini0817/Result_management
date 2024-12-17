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
import ProtectedRoute from './components/ProtectedRoute';
import Students from './pages/staff/Students';
import AddStudent from './pages/staff/AddStudent';
import EditStudent from './pages/staff/EditStudent';
import PublicRoute from './components/PublicRoute';

function App() {
  const { loading } = useSelector((state) => state.alert);

  return (
    <div className="App">
      {loading && <Spinner/>}
      <Toaster></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path = "/login" element={<PublicRoute><Login/></PublicRoute>}/>
          <Route path='/register' element={<PublicRoute><Register/></PublicRoute>} />
          <Route path='/staffMem' element={ 
            <ProtectedRoute>
              <StaffMemHome/>
            </ProtectedRoute>}/>
          <Route path='/staffMem/students' element={
            <ProtectedRoute>
              <Students/>
            </ProtectedRoute>
          }/>
          <Route path='/staffMem/students/add-student' element={
            <ProtectedRoute>
              <AddStudent/>
            </ProtectedRoute>
          }/>

          <Route path='/staffMem/students/edit/:rollNum' element={
            <ProtectedRoute>
              <EditStudent/>
            </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
