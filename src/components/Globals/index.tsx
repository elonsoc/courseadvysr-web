import React from "react"
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const TopLevel: React.FC = ({ children }) => {


    return (
        <React.StrictMode>
            <Router history={history}>
                <>
                    <div id="base" style={{ height: 'auto' }}>
                        {React.Children.map(children, (child) => {
                            return child;
                        })}
                    </div>
                </>
            </Router>
        </React.StrictMode>
    )
}

export default TopLevel;