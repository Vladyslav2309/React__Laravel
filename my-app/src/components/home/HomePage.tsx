import axios from "axios";
import classNames from "classnames";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {ICategoryItem, ICategoryResponse, ICategorySearch} from "./types";
import {Pagination} from "@mui/material";
import {number} from "yup";
import {APP_ENV} from "../../env";
import http from "../../http";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import iconDelete from "../icons/IconDelete";
import IconDelete from "../icons/IconDelete";
import {Simulate} from "react-dom/test-utils";
import compositionStart = Simulate.compositionStart;
import {AuthUserActionType} from "../auth/types";
import {useDispatch} from "react-redux";
import Alert from 'react-bootstrap/Alert';
import IconEdit from "../icons/IconEdit";
import CategoryEditPage from "../category/edit/CategoryEditPage";
import Loading from "../loader/Loading";


const HomePage = () => {
    const navigator = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleCatch = () => {
        setShowAlert(true);
    };

    const [search, setSearch] = useState<ICategorySearch>({
        page: searchParams.get("page") || 1,
    });

    const [category, setCategory] = useState<ICategoryResponse>({
        data: [],
        total: 0,
        current_page: 0,
        last_page: 0,
    });

    useEffect(() => {
        http
            .get<ICategoryResponse>(`api/category`, {
                params: search,
            })
            .then((resp) => {
                //setList(resp.data.data);
                setCategory(resp.data);
            })
            .catch((bad) => {
                console.log("Bad request", bad);
            });
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [search]);

    const {data, last_page, current_page, total} = category;
    const buttons = [];
    for (let i = 1; i <= last_page; i++) {
        buttons.push(i);
    }

    function deleteCategory(category: ICategoryItem) {
        http.delete(`/api/category/${category.id}`)
            .then(response => {
                setSearch({...search});
            })
            .catch(error => {
                handleCatch()
            });

    }

    function editCategory(category: ICategoryItem) {
        http.put(`/api/category/${category.id}`)
            .then(response => {
                alert("Видалено!")
            })
            .catch(error => {
                handleCatch()
            });
    }

    const pagination = buttons.map((page) => (
        <li className={classNames("page-item", {"active": page === current_page})}>
            <Link
                className="page-link"
                to={"?page=" + page}
                onClick={() => setSearch({...search, page})}
            >
                {page}
            </Link>
        </li>
    ));


    const dataView = data.map((category) => (
        <tr key={category.id}>
            <th>
                <img src={`${APP_ENV.BASE_URL}/uploads/50_${category.image}`} alt="Фотка" width={50}/>
            </th>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td><Stack direction="row" alignItems="center" spacing={1}>
                <IconButton onClick={() => editCategory(category)} aria-label="edit" size="small">
                    <IconEdit/>
                </IconButton>
            </Stack>
            </td>
            <td><Stack direction="row" alignItems="center" spacing={1}>
                <IconButton onClick={() => deleteCategory(category)} aria-label="delete" size="small">
                    <IconDelete/>
                </IconButton>
            </Stack>
            </td>

        </tr>
    ));

    const dispatch = useDispatch();

    const loginUser = () => {
        console.log("Вхід у систему");
        dispatch({type: AuthUserActionType.LOGIN_USER});
    }

    const logoutUser = () => {
        console.log("Вийти із системи");

        dispatch({type: AuthUserActionType.LOGOUT_USER});
    }
    return (
        <>

            {isLoading ? (<Loading/>) : (
                <>
                    {showAlert && (
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                            Ви не авторизовані, видалення неможливе.
                        </Alert>
                    )}
                    <h1 className="container text-center">Список категорій</h1>
                    <div className="container text-center">
                        <div className="row row-cols-sm-5">

                            <Link className="btn btn-success" to="/categories/create">
                                Додати
                            </Link>
                            <h5>Усього записів: {total}</h5>
                        </div>
                    </div>

                    {data.length === 0 ? (
                        <h2>Дані відсутні</h2>
                    ) : (
                        <>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Фото</th>
                                    <th scope="col">Назва</th>
                                    <th scope="col">Опис</th>
                                </tr>
                                </thead>
                                <tbody>{dataView}</tbody>
                            </table>

                            <div className="col-md-8 offset-md-3">
                                <Stack spacing={2}>
                                    <Pagination count={last_page} showFirstButton page={current_page}
                                                onChange={(_, n) => setSearch({...search, page: n})} showLastButton/>
                                </Stack>
                            </div>
                        </>
                    )}
                </>
            )}

        </>
    );
};

export default HomePage;