import React, { useEffect, useState } from "react";
import eventServices from '../services/event-service';
import bookServices from '../services/book-service';
import { Modal, Spinner } from "react-bootstrap";
import { EventForm } from "../components/eventForm";
import {BookingListing} from '../components/bookingListing';
import {useAuth} from '../hooks/useAuth';
import { ToastMessage } from "../components/toast-message";

const initialQuery = {
    isApproved: null
}

export const Events = ()=>{
    const [items, setItems] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
    const {isAdmin, isLogin, user} = useAuth();
    const hasWriteAccess = isAdmin();
    const [showToast, setShowToast]= useState(false);
    const [bookedMessage, setBookedMessage] = useState({variant:'', message:''});

    useEffect(()=>{
        fetchEvents();
    }, []);

    const fetchEvents = ()=>{
        setItems([]);
        setIsLoading(true);
        eventServices.GetAllFiltered(initialQuery).then((data)=>{
            setItems(data.items);
        }).finally(()=>{
            setIsLoading(false);
        })
    }

    const CloseForm = ()=>{
        setShow(false);
        fetchEvents();
    }

    const CloseViewBooking = ()=>{
        setShowBooking(false);
        fetchEvents();
    }

    const openForm = (eventId)=>{
        setShow(true);
        setSelectedEventId(eventId);
    }

    const openViewBooking = (eventId)=>{
        setShowBooking(true);
        setSelectedEventId(eventId);
    }

    const onRemoveEvent = (eventId)=>{
        eventServices.remove(eventId).then(()=>{
            fetchEvents();
        })
    }

    const onClickBook = (eventId)=>{
        bookServices.createBooking(eventId, user.userId).then((data)=>{
            setShowToast(true);
            if( 'isAlreadyBooked' in data){
                setBookedMessage({variant:'danger', message:'You already booked'});
            }
            else{
                setBookedMessage({variant:'success', message:'Successfully booked'});
            }
            fetchEvents();
        })
    }

    const renderRow = (value)=>{
        const isBeforeEventHappen = new Date().setHours(0,0,0,0) <= new Date(value.eventDate).setHours(0,0,0,0);
        return (
            <tr>
                <th scope="row">{value.eventId}</th>
                <td>{value.eventName}</td>
                <td>{new Date(value.eventDate).toLocaleDateString("en-US")}</td>
                <td>{value.isApproved ? 'YES' : 'NO'}</td>
                <td>
                    {isLogin() && !hasWriteAccess && value.isApproved===1 && isBeforeEventHappen && <button type="button" class="btn btn-primary mr-2" onClick={()=>{ onClickBook(value.eventId) } } ><i class="fa fa-book" aria-hidden="true"></i></button>}
                    {isLogin() && value.isApproved===1 &&<button type="button" class="btn btn-info mr-2" onClick={()=>{ openViewBooking(value.eventId) } } ><i class="fa fa-eye" aria-hidden="true"></i></button>}
                    {hasWriteAccess && (
                        <>
                            <button type="button" class="btn btn-danger mr-2" onClick={()=>{ onRemoveEvent(value.eventId)}} ><i className="fa fa-remove" aria-hidden="true"></i></button>
                            <button type="button" class="btn btn-warning" onClick={()=>{ openForm(value.eventId)}}><i className="fa fa-edit" aria-hidden="true"></i></button>
                        </>
                    )
                    }

                </td>
            </tr>
        );
    }

    return (
        <div className="pets-listing p-4 vh-100">
            <div className="container">
                <div className="row mb-4">
                    <div className="col d-flex align-items-center">
                        <h3 className="mr-4 text-uppercase m-0 p-0">Events</h3>
                        {isLogin() && !hasWriteAccess && <button type="button" class="btn btn-secondary" onClick={()=>{ openForm(null)}}>Add New Event</button>}
                    </div>
                    <div className="col">
                        <ToastMessage variant={bookedMessage.variant} message={bookedMessage.message} hideTost={setShowToast} show={showToast}/>
                    </div>
                    
                </div>
            </div>

            <div className="container blog_section">
                <div className="w-100 d-flex justify-content-center mt-4">
                    {isLoading && <Spinner animation="border" />}
                </div>
                <div className="row">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Event Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Approved</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            { items.map((e)=> renderRow(e)) }
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={show} onHide={CloseForm} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedEventId ? 'Edit Event' : 'Add New'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <EventForm onCloseForm={CloseForm} selectedEventId={selectedEventId}/> 
                </Modal.Body>
            </Modal>

            <Modal show={showBooking} onHide={CloseViewBooking} size="lg" className="mt-5" >
                <Modal.Header closeButton>
                    <Modal.Title>View Bookings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <BookingListing eventId={selectedEventId}/>
                </Modal.Body>
            </Modal>

        </div>
    );
}