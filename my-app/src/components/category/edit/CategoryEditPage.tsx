import { useFormik } from "formik";
import { ChangeEvent, FormEvent, useState } from "react";
import * as yup  from "yup";
import classNames from "classnames";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import http from "../../../http";
import {ICategoryEdit} from "./types";
import {ICategoryItem} from "../../home/types";

 const CategoryEditPage = () => {
//
//
//
//
//     const navigator = useNavigate();
//
//
//     const initValues : ICategoryEdit = {
//         // name: category.name,
//         // image: null,
//         // description: category.description,
//     };
//
//     const createSchema=yup.object({
//         name: yup.string().required("Вкажіть назву"),
//         description: yup.string().required("Вкажіть опис"),
//     });
//
//
//     const onSubmitFormikData = (values: ICategoryEdit) => {
//         console.log("Formik send data", values);
//         http.put("api/category/{id}", values, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//         })
//             .then(resp => {
//                 //console.log("Create date in server", resp);
//                 navigator("/");
//             });
//     }
//
//     const formik = useFormik({
//         initialValues: initValues,
//         validationSchema: createSchema,
//         onSubmit: onSubmitFormikData
//     });
//
//     const {values, errors, touched, handleSubmit, handleChange} = formik;
//
//     const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files != null) {
//             const file =  e.target.files[0];
//             formik.setFieldValue(e.target.name, file);
//         }
//     };
//
//
//     }
//
//     return (
//         <>
//             <h1 className="text-center">Додати категорію</h1>
//             <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="name" className="form-label">
//                         Назва
//                     </label>
//                     <input
//                         type="text"
//                         className={classNames("form-control", {"is-invalid": errors.name && touched.name})}
//                         id="name"
//                         name="name"
//                         value={values.name}
//                         onChange={handleChange}
//                     />
//                     {errors.name && touched.name && <div className="invalid-feedback">{errors.name}</div>}
//
//                 </div>
//
//                 <div className="mb-3">
//                     <label htmlFor="image" className="form-label">
//                         Фото
//                     </label>
//                     <input
//                         type="file"
//                         className={classNames("form-control", {"is-invalid": errors.image && touched.image})}
//                         id="image"
//                         name="image"
//                         onChange={onImageChangeHandler}
//                     />
//                 </div>
//
//                 <div className="form-floating mb-3">
//           <textarea
//               className={classNames("form-control", {"is-invalid": errors.description && touched.description})}
//               placeholder="Вкажіть опис"
//               id="description"
//               name="description"
//               style={{ height: "100px" }}
//               value={values.description}
//               onChange={handleChange}
//           ></textarea>
//                     {errors.description && touched.description && <div className="invalid-feedback">{errors.description}</div>}
//                     <label htmlFor="description">Опис</label>
//                 </div>
//
//                 <button type="submit" className="btn btn-primary">
//                     Додати
//                 </button>
//             </form>
//         </>
//     );
//
 };
export default CategoryEditPage;
