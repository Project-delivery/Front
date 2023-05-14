import React from "react";
import {Routes, Route} from "react-router-dom";
import {CreateUserPage} from "./pages/CreateUser_page";
import Authorization_page from "./pages/Authorization_page";
import {Search_page} from "./pages/Search_page";
import {AdminWindow} from "./pages/AdminWindow";
import {CreateAddress} from "./pages/CreateAddress";
import {WorkerWindow} from "./pages/WorkerWindow";
import {ValidatorWindow} from "./pages/ValidatorWindow";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={ <Authorization_page />} />
                <Route path={"/create_user"} element={ <CreateUserPage /> } />
                <Route path={"/search"} element={ <Search_page /> } />
                <Route path={"/admin_window"} element={ <AdminWindow /> } />
                <Route path={"/create_address"} element={ <CreateAddress />} />
                <Route path={"/worker_window"} element={ <WorkerWindow /> } />
                <Route path={"/validator_window"} element={ <ValidatorWindow />} />
            </Routes>
        </>
    )
}
export default App;