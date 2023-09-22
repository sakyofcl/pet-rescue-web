import React, { useEffect, useState } from "react";
import * as yup from 'yup';
import { EventModel, getCurrentDate } from "../model/eventModel";
import eventService from "../services/event-service";
import {useFormValidations} from '../hooks/useFormValidations';
import {ErrorMessage, wrapWithErrorObject} from '../hooks/error-message';


const EVENT_VALIDATION_SCHEMA = () => yup.object().shape({
    eventName: yup.string().nullable().trim().required('Required'),
    eventDate: yup.string().nullable().trim().required('Required')
});

export const EventForm = (props)=>{
    const isEdit = props.selectedEventId ? true : false;
    const [isSaveClick, setIsSaveClick] = useState(false);
    const [event, setEvent]= useState(new EventModel());
    const [validationErrors, onFormValidate, isFormValid] = useFormValidations(EVENT_VALIDATION_SCHEMA);
    const Error = wrapWithErrorObject(ErrorMessage, validationErrors);

    useEffect(()=>{
        isEdit ? fetchEvent() : onFormValidate(event);
    },[]);

    const onSaveClicked = ()=>{
        onFormValidate(event).then(() => {
            setIsSaveClick(true);
            (isEdit ? eventService.update : eventService.add)(event).then(()=>{
                props.onCloseForm();
            }).finally(()=>{
                setIsSaveClick(false);
            })
        });
    }

    const onChange = (value)=>{
        const constructedValues = {...event, ...value};
        setEvent(constructedValues);
        onFormValidate(constructedValues);
    }

    const fetchEvent = ()=>{
        eventService.GetEvent(props.selectedEventId).then((data)=>{
            setEvent({...data.items, eventDate: getCurrentDate(data.items.eventDate ) });
        });
    }

    return (
        <div className="pet-form">
            <form>
                <div class="form-group">
                    <label>Event Name</label>
                    <input type="text" class="form-control" value={event.eventName} onChange={(e)=> onChange({eventName: e.target.value})}/>
                    <Error propertyName={'eventName'} />
                </div>

                <div class="form-group">
                    <label>Event Date</label>
                    <input type="date" class="form-control" value={event.eventDate} onChange={(e)=> onChange({eventDate: e.target.value ? e.target.value : null})}/>
                    <Error propertyName={'eventDate'} />
                </div>
                
                {isEdit &&
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" value={event.isApproved} onChange={(e)=> onChange({isApproved: !event.isApproved})} checked={event.isApproved}/>
                    <label class="form-check-label">Approved</label>
                </div>
                }

                <div className="d-flex justify-content-end">
                    <button type="button" class="btn btn-primary mr-2" disabled={isSaveClick || !isFormValid} onClick={onSaveClicked}>Save Changes</button>
                    <button type="button" class="btn btn-secondary" onClick={props.onCloseForm}>Close</button>
                </div>
            </form>
        </div>
    );
}