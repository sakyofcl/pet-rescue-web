import React, { useEffect, useState } from "react";
import eventServices from '../services/event-service';
import bookServices from '../services/book-service';
import { Spinner } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

export const BookingListing = (props)=>{
    const [items, setItems] = useState([]);
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {isAdmin} = useAuth();
    const hasWriteAccess = isAdmin();

    useEffect(()=>{
        fetchBookings();
        fetchEventInfo();
    }, []);

    const fetchBookings = ()=>{
        setItems([]);
        setIsLoading(true);
        bookServices.GetAll(props.eventId).then((data)=>{
            setItems(data.items);
        }).finally(()=>{
            setIsLoading(false);
        })
    }

    const fetchEventInfo =  ()=>{
        eventServices.GetEvent(props.eventId).then((data)=>{
            setEvent(data.items);
        });
    }

    const onRemoveBooking = (bookingId)=>{
        bookServices.remove(bookingId).then(()=>{
            fetchBookings();
        })
    }

    const renderRow = (value)=>{
        return (
            <tr>
                <td>{value.bookid}</td>
                <td>{value.userName}</td>
                <td>{new Date(value.bookDate).toLocaleDateString("en-US")}</td>
                <td>
                    {hasWriteAccess && <button type="button" class="btn btn-danger" onClick={()=> onRemoveBooking(value.bookid)}><i className="fa fa-remove" aria-hidden="true"></i></button>}
                </td>
            </tr>
        );
    }

    return (
        <div className="pets-listing">
            <div className="container blog_section">
                <div>
                    <b>{event?.eventName}</b>
                    <br/>
                    <b>Date : {event ? new Date(event.eventDate).toLocaleDateString("en-US") : ''}</b>
                </div>
                <div className="w-100 d-flex justify-content-center mt-4">
                    {isLoading && <Spinner animation="border" />}
                </div>
                <div className="row">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">BN</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Booked Date</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            { items.map((e)=> renderRow(e)) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}