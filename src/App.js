import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigationbar';
import Content from './components/content';
import Header from './components/header';
import Footer from './components/footer';
import Read from './components/read';
import Create from './components/create';
import Edit from './components/edit';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/content" element={<Content />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read" element={<Read />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;