import { useFormik } from "formik";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import * as yup  from "yup";
import classNames from "classnames";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import http from "../../../http";
import {APP_ENV} from "../../../env";
import {IUserCreate} from "./types";

const  RegistrationPage = () => {

    const navigator = useNavigate();


    const initValues : IUserCreate = {

        firstName: "",
        lastName: "",
        email:"",
        phone:"",
        password: "",
        password_confirmation: "",
        image: null
    };

    const createSchema=yup.object({
        firstName: yup.string().required("Вкажіть прізвище"),
        lastName: yup.string().required("Вкажіть ім'я"),
        email: yup.string().required("Вкажіть електронну пошту"),
        password: yup.string().required("Вкажіть пароль"),
        phone: yup.string().required("Введіть номер телефону"),
        image: yup.string().required("Додайте фото")
    });


    const onSubmitFormikData = (values:  IUserCreate) => {
        console.log("Formik send data", values);
        http.post("api/auth/register", values, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(resp => {
                //console.log("Create date in server", resp);
                navigator("/");
            });
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });

    const {values, errors, touched, handleSubmit, handleChange} = formik;

    const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null) {
            const file =  e.target.files[0];
            formik.setFieldValue(e.target.name, file);
        }
    };


    return (
        <>
            <h1 className="text-center">Реєстрація користувача</h1>
            <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Прізвище
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", {"is-invalid": errors.firstName && touched.firstName})}
                        id="firstName"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && touched.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Ім'я
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", {"is-invalid": errors.lastName && touched.lastName})}
                        id="lastName"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && touched.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", {"is-invalid": errors.email && touched.email})}
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                       Номер телефону
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", {"is-invalid": errors.phone && touched.phone})}
                        id="phone"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && touched.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>


                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Пароль
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", {"is-invalid": errors.password && touched.password})}
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && touched.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Повторіть пароль
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", {"is-invalid": errors. password_confirmation && touched.password_confirmation})}
                        id="password_confirmation"
                        name="password_confirmation"
                        value={values.password_confirmation}
                        onChange={handleChange}
                    />
                    {errors.password_confirmation && touched.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Фото
                    </label>
                    <input
                        type="file"
                        className={classNames("form-control", {"is-invalid": errors.image && touched.image})}
                        id="image"
                        name="image"
                        onChange={onImageChangeHandler}
                    />
                    {errors.image && touched.image && <div className="invalid-feedback">{errors.image}</div>}
                </div>

                <button type="submit" className="btn btn-primary">
                    Додати
                </button>
            </form>
        </>
    );
};
export default RegistrationPage;