import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Transfers from './components/Transfers';
import AuditTransfers from './components/AuditTransfers';

const App = () => {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <nav className="mb-4">
                    <Link to="/" className="mr-4">Transfers</Link>
                    <Link to="/audit">Audit Transfers</Link>
                </nav>
                <Switch>
                    <Route exact path="/" component={Transfers} />
                    <Route path="/audit" component={AuditTransfers} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
