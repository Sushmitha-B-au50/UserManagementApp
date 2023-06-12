import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './components/navbar';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/home';
import UserListing from './components/userListing';
import CreateUser from './components/createUser';
import EditUser from './components/editUser';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Listing" element={<UserListing/>}/>
          <Route path="/AddUser" element={<CreateUser/>}/>
          <Route path="/EditUser/:id" element={<EditUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
