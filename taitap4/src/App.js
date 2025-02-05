import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import {Route, Routes} from "react-router-dom";
import ListComponent from "./component/ListComponent";
import AddComponent from "./component/AddComponent";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={1000}/>
            <Routes>
                <Route path="/products" element={<ListComponent/>}/>
                <Route path="/products/add" element={<AddComponent/>}/>
            </Routes>
        </>
    );
}

export default App;