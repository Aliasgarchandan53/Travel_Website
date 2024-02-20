import './App.css';
import Navbar from './components/Navbar';
import tarvelpic from './components/travels.jpeg';
import Datadisplay from './components/dataDisplay';

function App() {
  return (
    <>
      <div className='main'>
      <Navbar />
      <img className="displayPicture" src={tarvelpic}></img>
      <Datadisplay />
      </div>
    </>
  );
}

export default App;
