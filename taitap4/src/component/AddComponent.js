import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {getAllCategory} from "../service/categoriesService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import {addProduct} from "../service/productService";

function AddComponent() {
    const [categoryList, setCategoryList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const list = await getAllCategory();
            setCategoryList(list)
        }
        fetchData();
    }, []);

    const initialValues = {
        code: "",
        name: "",
        describe: "",
        categories:"",
        price: 0,
        quantity: 0,
        startDate: ""
    }

    const validationSchema = Yup.object({
        code: Yup.string().required("Mã sản phẩm không được để trống")
            .matches(/^PROD-\d{4}$/, "Mã phải bắt đầu bằng 'PROD-' và có 4 số"),
        name: Yup.string().required("Tên sản phẩm không được để trống"),
        describe: Yup.string().required("Mô tả sản phẩm không được để trống"),
        categories: Yup.string().required("Loại sản phẩm không được để trống"),
        quantity: Yup.number().required("Số lượng không được để trống").positive("Số lượng phải là số dương"),
        startDate: Yup.date().required("Ngày tạo không được để trống").max(new Date(), "Ngày tạo không được lớn hơn ngày hiện tại"),
        price: Yup.number().required("Giá sản phẩm không được để trống").positive("Giá sản phẩm phải là số dương")
    })


    const handleAddProduct = async (value) => {
        let product = {
            ...value,
            categories: JSON.parse(value.categories),
        }
        await addProduct(product);
        toast.success("Đã thêm sản phẩm thành công!");
        navigate("/products");
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleAddProduct} validationSchema={validationSchema}>
                <Form>
                    <div className="container mt-5">
                        <h3 className="text-center mb-4">Thêm Mới Sản Phẩm</h3>

                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6">

                                <div className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <label className="form-label mb-0" style={{width: "150px"}}>Mã sản phẩm:</label>
                                        <Field type="text" name="code" className="form-control" />
                                    </div>
                                    <ErrorMessage name="code" component="div" style={{ color: "red", marginTop: "5px" }} />
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <label className="form-label mb-0" style={{width: "150px"}}>Tên sản phẩm:</label>
                                        <Field type="text" name="name" className="form-control" />
                                    </div>
                                    <ErrorMessage name="name" component="div" style={{ color: "red", marginTop: "5px" }} />
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <label className="form-label mb-0" style={{width: "150px"}}>Mô tả sản phẩm:</label>
                                        <Field type="text" name="describe" className="form-control" />
                                    </div>
                                    <ErrorMessage name="describe" component="div" style={{ color: "red", marginTop: "5px" }} />
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <label className="form-label mb-0" style={{width: "150px"}}>Loại sản phẩm:</label>
                                        <Field as="select" name="categories" className="form-select">
                                            <option value="">-----Chọn-----</option>
                                            {categoryList.map((category) => (
                                                <option key={category.id} value={JSON.stringify(category)}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </Field>
                                    </div>
                                    <ErrorMessage name="categories" component="div" style={{ color: "red", marginTop: "5px" }} />
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <label className="form-label mb-0" style={{width: "150px"}}>Giá:</label>
                                        <Field type="number" name="price" className="form-control" />
                                    </div>
                                    <ErrorMessage name="price" component="div" style={{ color: "red", marginTop: "5px" }} />
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <label className="form-label mb-0" style={{width: "150px"}}>Số lượng:</label>
                                        <Field type="text" name="quantity" className="form-control" />
                                    </div>
                                    <ErrorMessage name="quantity" component="div" style={{ color: "red", marginTop: "5px" }} />
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <label className="form-label mb-0" style={{width: "150px"}}>Ngày nhập:</label>
                                        <Field type="date" name="startDate" className="form-control" />
                                    </div>
                                    <ErrorMessage name="startDate" component="div" style={{ color: "red", marginTop: "5px" }} />
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-20">Thêm</button>
                                    <button type="reset" className="btn btn-secondary w-20">Huỷ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>

    );
}

export default AddComponent;