import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fakeLogin} from "../redux/action";

function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user,setUser] = useState({"username": "", "password": ""});
    const userLogined = useSelector(state => state.userLogined);
    const setValueForUser = (key, value) => {
        const newVal={...user, [key]: value};
        setUser(newVal);
    };
    const login = () => {
        dispatch(fakeLogin(user));
    };
    useEffect(() => {
        if(userLogined){
            navigate("/user");
        }
    },[userLogined,navigate]);
    return(
        <form>
            <label> user Name</label>
            <input
            id="username"
            onChange={e=>setValueForUser("username", e.target.value)}
            type="text"
            />
            <label>Password</label>
            <input id="password"
                   onChange={e=>setValueForUser("password", e.target.value)}
                   type="password"
            />
            <button onClick={login}>Login</button>
        </form>
    );
}
export default Login;