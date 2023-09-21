import React from "react";
import { Alert, Toast } from "react-bootstrap";

export const ToastMessage = (props)=> {
    return(
        <Toast autohide={true} delay={3000} show={props.show} onClose={() => props.hideTost(false)} className="w-100">
            <Toast.Body className="w-100">
                <Alert variant={props.variant} show={true} className="mb-0 w-100" >{props.message}</Alert>
            </Toast.Body>
        </Toast>
    ) 
}