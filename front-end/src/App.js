// routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// pages
import Home from '../components/page-components/Home';
import Menu from '../components/page-components/Menu';
import About from '../components/page-components/About';
import Cart from '../components/page-components/Cart';
import Status from '../components/page-components/Status';

import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/" component={ Home } exact />
                <Route path="/menu" component={ Menu } />
                <Route path="/about" component={ About } /> 
                <Route path="/cart" component={ Cart } />
                <Route path="/status" component={ Status } />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
