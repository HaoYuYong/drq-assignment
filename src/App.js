import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigationbar';
import Home from './components/home';
import Header from './components/header';
import List from './components/list';
import Create from './components/create';
import Edit from './components/edit';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/list" element={<List />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;