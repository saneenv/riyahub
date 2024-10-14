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
import Verify from './components/Verify';
import RegChoose from './components/RegChoose';
import PostedJobs from './components/PostedJobs';
import EditJobPost from './components/EditJobPost';
import ViewProfile from './components/ViewProfile';
import EditEmpReg from './components/EditEmpReg';
import ContactUs from './pages/ContactUs';
import ViewProfile2 from './components/ViewProfile2';
import EditCanReg from './components/EditCanReg';
import MatchingJobs from './components/MatchingJobs';




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
                <Route path='/verify' element={<Verify/>}/>
                <Route path='/regchoose' element={<RegChoose/>}/>
                <Route path='/postedjob' element={<PostedJobs/>}/>
                <Route path='/editjobpost' element={<EditJobPost/>}/>
                <Route path='/viewprofile' element={<ViewProfile/>}/>
                <Route path='/editempreg' element={<EditEmpReg/>}/>
                <Route path='/contact' element={<ContactUs/>}/>
                <Route path='/viewcandidate' element={<ViewProfile2/>}/>
                <Route path='/editcanreg' element={<EditCanReg/>}/>
                <Route path='/matchingjobs' element={<MatchingJobs/>}/>





              </Routes>
        </BrowserRouter>
    </div>
  );                                                                                                                
}

export default App;
