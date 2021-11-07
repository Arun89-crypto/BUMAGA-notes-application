import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Notespage from './Components/Notespage/Notespage';
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/notes' element={<Notespage />} />
      </Routes>
    </Router>
  );
}

export default App;
