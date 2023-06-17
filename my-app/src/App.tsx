import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from "./components/home/HomePage";
import DefaultHeader from "./components/containers/default/DefaultHeader";
import CategoryCreatePage from "./components/category/create/CategoryCreatePage";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout";
import LoginPage from "./components/auth/login/LoginPage";
import RegistrationPage from "./components/auth/registration/RegistrationPage";
import CategoryEditPage from "./components/category/edit/CategoryEditPage";
import {ICategoryItem} from "./components/home/types";
import ProductCreatePage from "./components/product/ProductCreatePage";

function App() {
    // @ts-ignore
    return (
        <div>
            <DefaultHeader/>
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="categories/create" element={<CategoryCreatePage/>}/>
                    <Route path="register" element={<RegistrationPage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="products/create" element={<ProductCreatePage/>}/>
                </Route>
            </Routes>

        </div>
    );
}

export default App;
