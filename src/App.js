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
import SearchedJobs from './components/SearchedJobs';
import JobCategory from './pages/JobCategory';
import Jobs from './pages/Jobs';
import JobId from './pages/JobId';
import EnablePackage from './pages/EnablePackage';
import CompanyDetails from './pages/CompanyDetails';
import AppliedCan from './components/AppliedCan';
import StaffReg from './pages/StaffReg';
import ViewProfile3 from './components/ViewProfile3';
import CanApplied from './components/CanApplied';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import MartialStatus from './components/MartialStatus';
import DeleteProfiles from './components/DeleteProfiles';
import Services from './pages/Services';
import AppliedCanAll from './components/AppliedCanAll';
import Whatsapp from './pages/Whatsapp';
import DateSearch from './pages/DateSearch';
import EnableJobPost from './pages/EnableJobPost';
import EnableStaff from './pages/EnableStaff';
import AddLocation from './pages/AddLocation';
import AddCompanyType from './pages/AddCompanyType';
import AddJobs from './pages/AddJobs';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home/>}/>
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
                <Route path='/searchedjobs' element={<SearchedJobs/>}/>
                <Route path='/jobcategories' element={<JobCategory/>}/>
                <Route path='/jobs' element={<Jobs/>}/>
                <Route path='/jobid' element={<JobId/>}/>
                <Route path='/enablepackage' element={<EnablePackage/>}/>
                <Route path='/companydetails' element={<CompanyDetails/>}/>
                <Route path='/appliedcan' element={<AppliedCan/>}/>
                <Route path='/staffreg' element={<StaffReg/>}/>
                <Route path='/viewstaff' element={<ViewProfile3/>}/>
                <Route path='/canapplied' element={<CanApplied/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/terms' element={<Terms/>}/>
                <Route path='/privacy' element={<Privacy/>}/>
                <Route path='/martialstatus' element={<MartialStatus/>}/>
                <Route path='/deleteprofiles' element={<DeleteProfiles/>}/>
                <Route path='/services' element={<Services/>}/>
                <Route path='/appliedcanall' element={<AppliedCanAll/>}/>
                <Route path='/whatsapp' element={<Whatsapp/>}/>
                <Route path='/datesearch' element={<DateSearch/>}/>
                <Route path='/enablejobpost' element={<EnableJobPost/>}/>
                <Route path="/enablestaff" element={<EnableStaff />} />
                <Route path="/addlocation" element={<AddLocation />} />
                <Route path="/addcompanytype" element={<AddCompanyType />} />
                <Route path="/addjobs" element={<AddJobs />} />




             </Routes>
        </BrowserRouter>
    </div>
  );                                                                                                                
}

export default App;
