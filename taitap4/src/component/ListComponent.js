import React, {useEffect, useRef, useState} from "react";
import {searchProducts} from "../service/productService";
import {getAllCategory} from "../service/categoriesService";
import {Link} from "react-router-dom";

function ListComponent(){
    const [productList, setProductList] = useState(null);
    const [categoryList, setCategoryList] = useState([]);

    const searchNameRef = useRef();
    const categoryIdRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const searchName = searchNameRef.current.value;
            const categoryId = categoryIdRef.current.value;
            const list = await searchProducts(searchName, categoryId);
            setProductList(list);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const categories = await getAllCategory();
            setCategoryList(categories);
        }
        fetchData()
    }, []);

    function formatDate(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleSearch = async () => {
        const searchName = searchNameRef.current.value;
        const categoryId = categoryIdRef.current.value;
        const list = await searchProducts(searchName, categoryId);
        setProductList(list);
    }

    return(
        <>
            <h1 className="text-center mb-4">Danh sách sản phẩm</h1>

            <p className="text-center mb-4">
                <Link to="/products/add" className="btn btn-success">
                    Thêm mới sản phẩm
                </Link>
            </p>

            <div className="container">
                <form className="mb-4">
                    <div className="row justify-content-center">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="productName" className="form-label">Tên sản phẩm:</label>
                            <input
                                id="productName"
                                ref={searchNameRef}
                                placeholder="Nhập tên sản phẩm"
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-3 mb-3">
                            <label htmlFor="categoryId" className="form-label">Loại sản phẩm:</label>
                            <select
                                id="categoryId"
                                ref={categoryIdRef}
                                className="form-select"
                            >
                                <option value="">------Chọn------</option>
                                {categoryList.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-2 mb-3 d-flex align-items-end">
                            <button
                                type="button"
                                onClick={handleSearch}
                                className="btn btn-primary w-40"
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </form>

                {productList && productList.length === 0 ? (
                    <div className="alert alert-warning text-center" role="alert">
                        Không có sản phẩm nào phù hợp với tìm kiếm của bạn.
                    </div>
                ) : (
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Thể loại</th>
                            <th>Số lượng</th>
                            <th>Giá sản phẩm</th>
                            <th>Ngày nhập</th>
                        </tr>
                        </thead>
                        <tbody>
                        {productList && productList.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.code}</td>
                                <td>{product.name}</td>
                                <td>{product.categories.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price} Vnđ</td>
                                <td>{formatDate(product.startDate)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>

    );
}

export default ListComponent;