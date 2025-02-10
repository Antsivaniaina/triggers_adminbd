import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Transfers from './components/Transfers';
import AuditTransfers from './components/AuditTransfers';

const App = () => {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <nav className="mb-4 flex justify-between">
                    <Link to="/transfers" className="text-blue-500 hover:underline">Transfers</Link>
                    <Link to="/audit-transfers" className="text-blue-500 hover:underline">Audit Transfers</Link>
                </nav>
                <Switch>
                    <Route path="/transfers" component={Transfers} />
                    <Route path="/audit-transfers" component={AuditTransfers} />
                    <Route path="/" exact component={Transfers} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
