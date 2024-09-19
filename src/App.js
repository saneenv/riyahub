import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';
import Details from './pages/Details';
import Packages from './pages/Packages';




function App() {
  return (
    <div className="App">
        <BrowserRouter>
              <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/Home' element={<Home/>}/>
                <Route path='/details' element={<Details/>}/>
                <Route path='/packages' element={<Packages/>}/>






              </Routes>
        </BrowserRouter>
    </div>
  );                                                                                                                
}

export default App;
