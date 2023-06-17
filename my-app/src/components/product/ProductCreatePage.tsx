import {ICategorySelect, IProductCreate} from "./types";
import * as yup from "yup";
import { useFormik } from "formik";
import classNames from "classnames";
import {useEffect, useRef, useState} from "react";
import http from "../../http";
import {APP_ENV} from "../../env";
import { Editor } from '@tinymce/tinymce-react';

const ProductCreatePage = () => {

    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState<ICategorySelect[]>([]);

    useEffect(() => {
        http
            .get<ICategorySelect[]>("api/category/select")
            .then((resp) => setCategories(resp.data));
    }, []);


    const initValues: IProductCreate = {
        name: "",
        price: 0,
        category_id: 0,
        images: [],
        description: "",
    };

    const createSchema = yup.object({
        name: yup.string().required("Вкажіть назву"),
        price: yup
            .number()
            .min(0.00001, "Ціна має бути більшим 0")
            .required("Вкажіть ціну"),
        category_id: yup.number().min(1, "Вкажіть категорію"),
        description: yup.string().required("Вкажіть опис"),
        images: yup
            .array()
            .of(yup.number())
            .min(1, "Мінімального одна фотка для товару")
            .required("Оберіть хочаб одне фото"),
    });

    const onSubmitFormikData = (values: IProductCreate) => {
        console.log("Formik valid data send server", values);
    };

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: onSubmitFormikData,
        validationSchema: createSchema,
    });
    const onSelectImage = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.addEventListener("change", (e: any) => {
            const files = e.target.files;
            if (files) {
                const file = files[0];
                setFieldValue("images", [...values.images, file]);
            }
        });
        input.click();
    };

    const onDeleteImage = (index: any) => {
        const updatedImages = [...values.images];
        updatedImages.splice(index, 1);
        setFieldValue("images", updatedImages);
    };
    const {values, errors, touched, handleChange, handleSubmit, setFieldValue} = formik;


    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current);
        }

    };

        return (
            <>
                <h1 className="text-center">Додати товар</h1>
                <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Назва
                        </label>
                        <input
                            type="text"
                            className={classNames("form-control", {
                                "is-invalid": errors.name && touched.name,
                            })}
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        {errors.name && touched.name && (
                            <div className="invalid-feedback">{errors.name}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            Ціна
                        </label>
                        <input
                            type="text"
                            className={classNames("form-control", {
                                "is-invalid": errors.price && touched.price,
                            })}
                            id="price"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                        />
                        {errors.price && touched.price && (
                            <div className="invalid-feedback">{errors.price}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category_id" className="form-label">
                            Оберіть категорію
                        </label>
                        <select
                            className={classNames("form-select", {
                                "is-invalid": errors.category_id && touched.category_id,
                            })}
                            defaultValue={values.category_id}
                            onChange={handleChange}
                            name="category_id"
                            id="category_id"
                        >
                            <option value={0} disabled>
                                Оберіть категорію
                            </option>
                            {categories.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && touched.category_id && (
                            <div className="invalid-feedback">{errors.category_id}</div>
                        )}
                    </div>


                    <div>
                        <label htmlFor="category_id" className="form-label">
                           Опис товару
                        </label>
                        <Editor
                            apiKey='oz3g5q60zrulvmmlb6h6kgc0w7q07d49yvzo1bshgus5sxxy'
                            onInit={(evt: any, editor: any) => editorRef.current = editor}
                            id="description"
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                        {errors.description && touched.description && (
                            <div className="invalid-feedback">{errors.description}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-md-3">
                                <img
                                    className="img-fluid"
                                    width="100px"
                                    src={APP_ENV.BASE_URL + "uploads/plus.png"}
                                    alt="Оберіть фото"
                                    style={{cursor: "pointer"}}
                                    onClick={onSelectImage}
                                />
                            </div>
                            {values.images.map((img, index) => (
                                <div className="col-md-3" key={index}>
                                    <div>
                                        <button className="btn btn-danger" onClick={() => onDeleteImage(index)}>x
                                        </button>
                                    </div>
                                    <img
                                        className="img-fluid"
                                        src={URL.createObjectURL(img)}
                                        alt="Оберіть фото"
                                        style={{cursor: "pointer"}}

                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Додати
                    </button>
                </form>
            </>
        );
    };

export default ProductCreatePage;