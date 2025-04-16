import React,{ useContext, useEffect, useState }  from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GlobalContext } from './context';


const App = () => {
  const{user} = useContext(GlobalContext)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false once user is initialized (regardless of its value)
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  } 

  return (
    <Routes>
      <Route path='/' element={user ? <Navigate to={'/dashboard'}/> : <Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App