import './App.css';
import Routers from './routes/app.routes';
import {BrowserRouter} from "react-router-dom";
import { createBrowserHistory } from 'history';

function App(props) {
  const history = createBrowserHistory();
  return (
    <BrowserRouter history={history}>
     <Routers/>
     </BrowserRouter>
  );
}
export default App;
