import axios from "axios";

export async function getAllCategory() {
    try {
        const response = await axios.get("http://localhost:3000/categories")
        return response.data;
    } catch (e){
        console.log(e.message);
        return [];
    }
}