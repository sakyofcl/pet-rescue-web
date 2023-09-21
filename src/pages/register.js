import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { UserModel } from "../model/userModel";
import userService from '../services/user-service';


export const Register = ()=>{
    const [isSaveClick, setIsSaveClick] = useState(false);
    const [user, setUser]= useState(new UserModel());
    const navigate = useNavigate();
    
    const onSaveClicked = ()=>{
        setIsSaveClick(true);
        userService.add(user).then(()=>{
            navigate('/login'); 
        }).finally(()=>{
            setIsSaveClick(false);
        })
    }

    const onChange = (value)=>{
        setUser({...user, ...value});
    }

    return (
        <div className="register-page">
            <div class="container">
                <div class="row justify-content-center align-items-center vh-100" >
                    <div class="col-4">
                        <div class="card">
                            <div class="card-header d-flex justify-content-center">
                                Register
                            </div>
                            <div class="card-body">

                                <form action="" autocomplete="off">
                                    <div class="form-group">
                                        <label>User Name</label>
                                        <input type="text" class="form-control" name="username" value={user.userName} onChange={(e)=> onChange({userName: e.target.value})}/>
                                    </div>
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input type="password" class="form-control" name="password" value={user.password} onChange={(e)=> onChange({password: e.target.value})}/>
                                    </div>
                                    <div class="form-group">
                                        <label>Confirm Password</label>
                                        <input type="password" class="form-control" name="cpassword" value={user.confirmPassword} onChange={(e)=> onChange({confirmPassword: e.target.value})}/>
                                    </div>
                                    <div class="form-group">
                                        <label>Phone</label>
                                        <input type="text" class="form-control" name="phone" value={user.phone} onChange={(e)=> onChange({phone: e.target.value})}/>
                                    </div>
                                    <button type="button" id="sendlogin" class="btn btn-primary" disabled={isSaveClick} onClick={onSaveClicked}>Register</button>
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