import React, { useState } from "react";
import * as yup from 'yup';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { UserModel } from "../model/userModel";
import userService from '../services/user-service';
import {useFormValidations} from '../hooks/useFormValidations';
import {ErrorMessage, wrapWithErrorObject} from '../hooks/error-message';


const REGISTER_VALIDATION_SCHEMA = () => yup.object().shape({
    userName: yup.string().nullable().trim().required('Required'),
    password: yup.string().nullable().trim().min(5,'minimum 5 charecter need').required('Required'),
    confirmPassword: yup.string().nullable().trim().min(5,'minimum 5 charecter need').test('passwords-match', 'Passwords must match', function(value){
        return this.parent.password === value
    }).required('Required'),
    phone: yup.string().nullable().max(10,'invalid phone number').min(10, 'invalid phone number')
});

export const Register = ()=>{
    const [isSaveClick, setIsSaveClick] = useState(false);
    const [user, setUser]= useState(new UserModel());
    const navigate = useNavigate();
    const [validationErrors, onFormValidate, isFormValid] = useFormValidations(REGISTER_VALIDATION_SCHEMA);
    const Error = wrapWithErrorObject(ErrorMessage, validationErrors);
    
    const onSaveClicked = ()=>{
        onFormValidate(user).then(() => {
            setIsSaveClick(true);
            userService.add(user).then(()=>{
                navigate('/login'); 
            }).finally(()=>{
                setIsSaveClick(false);
            })
        });
    }

    const onChange = (value)=>{
        const constructedValues = {...user, ...value};
        setUser(constructedValues);
        onFormValidate(constructedValues);
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
                                        <Error propertyName={'userName'} />
                                    </div>
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input type="password" class="form-control" name="password" value={user.password} onChange={(e)=> onChange({password: e.target.value})}/>
                                        <Error propertyName={'password'} />
                                    </div>
                                    <div class="form-group">
                                        <label>Confirm Password</label>
                                        <input type="password" class="form-control" name="cpassword" value={user.confirmPassword} onChange={(e)=> onChange({confirmPassword: e.target.value})}/>
                                        <Error propertyName={'confirmPassword'} />
                                    </div>
                                    <div class="form-group">
                                        <label>Phone</label>
                                        <input type="text" class="form-control" name="phone" value={user.phone} onChange={(e)=> onChange({phone: e.target.value})}/>
                                        <Error propertyName={'phone'} />
                                    </div>
                                    <button type="button" id="sendlogin" class="btn btn-primary" disabled={isSaveClick || !isFormValid} onClick={onSaveClicked}>Register</button>
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