import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';
import Details from './pages/Details';
import Packages from './pages/Packages';
import CandidateReg from './components/CandidateReg';
import JobPost from './components/JobPost';
import EmployeeReg from './components/EmployeeReg';
import Login from './components/Login';




function App() {
  return (
    <div className="App">
        <BrowserRouter>
              <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/Home' element={<Home/>}/>
                <Route path='/details' element={<Details/>}/>
                <Route path='/packages' element={<Packages/>}/>
                <Route path='/canreg' element={<CandidateReg/>}/>
                <Route path='/jobpost' element={<JobPost/>}/>
                <Route path='/empreg' element={<EmployeeReg/>}/>
                <Route path='/login' element={<Login/>}/>










              </Routes>
        </BrowserRouter>
    </div>
  );                                                                                                                
}

export default App;
