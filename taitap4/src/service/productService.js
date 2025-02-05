import axios from "axios";

export async function searchProducts(searchName, categoryId) {
    let url = `http://localhost:3000/products?name_like=${searchName}&categories.id=${categoryId}&_sort=name&_order=asc`;
    if (!categoryId) {
        url = `http://localhost:3000/products?name_like=${searchName}&_sort=name&_order=asc`;
    }
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

export async function addProduct(product) {
    try {
        const response = await axios.post("http://localhost:3000/products", product);
        return response.data;
    } catch (e) {
        console.log(e.message);
    }
}

export async function findProductById(id) {
    try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        return response.data;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}