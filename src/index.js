import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import vConsole from './vConsole'
import App from './App'



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <CssBaseline>
        <App/>
    </CssBaseline>
)