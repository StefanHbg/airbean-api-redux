// routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// pages
import Home from './components/page-components/Home';
import Menu from './components/page-components/Menu';
import About from './components/page-components/About';
import Status from './components/page-components/Status';
// css
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" component={ Home } exact />
                    <Route path="/menu" component={ Menu } />
                    <Route path="/about" component={ About } /> 
                    <Route path="/status" component={ Status } />
                </Switch>
            </Router>
            <div id="iphone" data-testid="iphone"></div>
            <div id="made-by">
                <h3>Project made by:</h3>
                <hr />
                <p>Stefan Dimitrijevic & Filip Mitrovic</p> 
            </div>
        </div>
    );
}

export default App;
