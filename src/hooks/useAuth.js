import { useState, useEffect } from "react";
import userService from '../services/user-service';

export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(userService.getUserFromLocalStorage());
    }, []);

    const isAdmin = ()=> isLogin() && user.isAdmin ? true : false;

    const isLogin = () => user != null;

    const logout = ()=>{
        userService.clearLocalStorage();
        window.location.href='/';
    }

    return {user, isLogin, isAdmin, logout};
}