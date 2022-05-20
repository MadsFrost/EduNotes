import React from "react";
import { initStorage } from "./utils/Storage";
import { HashRouter, Route, Routes } from "react-router-dom";
import Start from "./views/Start";
export default function App() {
  React.useEffect(() => {
      initStorage();
  })
  return (
        <div className='app'>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Start />} />
                </Routes>
            </HashRouter>
        </div>
    );
}