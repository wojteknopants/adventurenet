import './App.css';
import AddPost from './AddPost'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
   
  return (
    <div className="App">
      <AddPost onAdd={undefined}/>
      
    </div>
  );
}

export default App;