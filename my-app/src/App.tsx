import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from "./components/home/HomePage";
import DefaultHeader from "./components/containers/default/DefaultHeader";
import CategoryCreatePage from "./components/category/create/CategoryCreatePage";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout";

function App() {
    return (
        <div>
            <DefaultHeader/>
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="categories/create" element={<CategoryCreatePage/>}/>
                </Route>
            </Routes>

        </div>
    );
}

export default App;