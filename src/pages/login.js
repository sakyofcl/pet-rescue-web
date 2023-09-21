import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { UserModel } from "../model/userModel";
import userService from '../services/user-service';
import { ToastMessage } from "../components/toast-message";

export const Login = ()=>{
    const [isSaveClick, setIsSaveClick] = useState(false);
    const [user, setUser]= useState(new UserModel());
    const [showToast, setShowToast]= useState(false);

    const onSaveClicked = ()=>{
        setIsSaveClick(true);
        userService.loginUser(user).then((data)=>{
            if(data.items.length){
                userService.saveUserInLocalStorage(data.items[0]);
                window.location.href='/';
            }
            else{
                setShowToast(true);
            }
        }).finally(()=>{
            setIsSaveClick(false);
        })
    }

    const onChange = (value)=>{
        setUser({...user, ...value});
    }

    return (
        <div className="login-page">
            <div class="container">
                <div class="row justify-content-center align-items-center vh-100" >
                    <div class="col-4">
                        <div class="card">
                            <div class="card-header d-flex justify-content-center">
                                Login
                            </div>
                            <div class="card-body">
                                <ToastMessage variant="danger" message={"Username or Password Wrong!"} hideTost={setShowToast} show={showToast}/>

                                <form action="" autocomplete="off">
                                    <div class="form-group">
                                        <label>User Name</label>
                                        <input type="text" class="form-control" name="username" value={user.userName} onChange={(e)=> onChange({userName: e.target.value})}/>
                                    </div>
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input type="password" class="form-control" name="password" value={user.password} onChange={(e)=> onChange({password: e.target.value})}/>
                                    </div>
                                    <button type="button" id="sendlogin" class="btn btn-primary"  disabled={isSaveClick} onClick={onSaveClicked}>login</button>
                                    <NavLink className="btn btn-secondary ml-4" to="/" >Return Home</NavLink>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}