import React, { useEffect, useState } from "react";
import { EventModel } from "../model/eventModel";
import eventService from "../services/event-service";
import { Form } from "react-bootstrap";

export const EventForm = (props)=>{
    const isEdit = props.selectedEventId ? true : false;
    const [isSaveClick, setIsSaveClick] = useState(false);
    const [event, setEvent]= useState(new EventModel());

    useEffect(()=>{
        isEdit && fetchEvent();
    },[]);

    const onSaveClicked = ()=>{
        setIsSaveClick(true);
        (isEdit ? eventService.update : eventService.add)(event).then(()=>{
            props.onCloseForm();
        }).finally(()=>{
            setIsSaveClick(false);
        })
    }

    const onChange = (value)=>{
        setEvent({...event, ...value});
    }

    const fetchEvent = ()=>{
        eventService.GetEvent(props.selectedEventId).then((data)=>{
            setEvent(data.items);
        });
    }

    return (
        <div className="pet-form">
            <form>
                <div class="form-group">
                    <label>Event Name</label>
                    <input type="text" class="form-control" value={event.eventName} onChange={(e)=> onChange({eventName: e.target.value})}/>
                </div>

                <div class="form-group">
                    <label>Event Date</label>
                    <input type="date" class="form-control" onChange={(e)=> onChange({eventDate: e.target.value})}/>
                </div>
                {isEdit &&
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" value={event.isApproved} onChange={(e)=> onChange({isApproved: !event.isApproved})} checked={event.isApproved}/>
                    <label class="form-check-label">Approved</label>
                </div>
                }

                <div className="d-flex justify-content-end">
                    <button type="button" class="btn btn-primary mr-2" disabled={isSaveClick} onClick={onSaveClicked}>Save Changes</button>
                    <button type="button" class="btn btn-secondary" onClick={props.onCloseForm}>Close</button>
                </div>
            </form>
        </div>
    );
}