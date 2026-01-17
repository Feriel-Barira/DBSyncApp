import Interventions from "./Interventions";
import Mecaniciens from "./Mecaniciens";
import {useState} from 'react'
function App() {
const [refresh, setRefresh] = useState(false);
  return (
    <div>
      <h1>GPro–DivaTex Maintenance Interface</h1>
      <Interventions refresh={refresh} setRefresh={setRefresh}/>
      <Mecaniciens refresh={refresh}/>
    </div>
  );
}

export default App;
