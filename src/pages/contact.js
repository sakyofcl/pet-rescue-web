import React, { useEffect, useState } from "react";
import contactServices from '../services/contact-service';
import { Spinner } from "react-bootstrap";
import {ContactModel} from '../model/contactModel';
import {useAuth} from '../hooks/useAuth';
import { ToastMessage } from "../components/toast-message";

export const Contact = ()=>{
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveClick, setIsSaveClick] = useState(false);
  const [contact, setContact]= useState(new ContactModel());
  const [showToast, setShowToast]= useState(false);
  const {isAdmin} = useAuth();
  const hasWriteAccess = isAdmin();

  const onSaveClicked = ()=>{
      setIsSaveClick(true);
      contactServices.add(contact).then(()=>{
          fetchContacts();
          setContact(new ContactModel());
          setShowToast(true);
      }).finally(()=>{
          setIsSaveClick(false);
      })
  }

  const onChange = (value)=>{
    setContact({...contact, ...value});
  }

  useEffect(()=>{
      fetchContacts();
  }, []);

  const fetchContacts = ()=>{
      setItems([]);
      setIsLoading(true);
      contactServices.GetAllFiltered().then((data)=>{
          setItems(data.items);
      }).finally(()=>{
          setIsLoading(false);
      })
  }

  const onRemoveContact = (contactId)=>{
      contactServices.remove(contactId).then(()=>{
        fetchContacts();
      })
  }

  const renderRow = (value)=>{
    return (
        <tr>
            <td>{value.name}</td>
            <td>{value.phone}</td>
            <td>{value.message}</td>
            <td>
                <button type="button" class="btn btn-danger mr-2" onClick={()=>{ onRemoveContact(value.contactId)}} ><i className="fa fa-remove" aria-hidden="true"></i></button>
            </td>
        </tr>
    );
  }


    return (

        <section className="contact_section  long_section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="form_container">
                  <div className="heading_container">
                    <h2>
                      Contact Us
                    </h2>
                    <ToastMessage variant="success" message={"Successfully send."} hideTost={setShowToast} show={showToast}/>
                  </div>
                  <form action="">
                    <div>
                      <input type="text" placeholder="Your Name"  value={contact.name} onChange={(e)=> onChange({name: e.target.value})} />
                    </div>
                    <div>
                      <input type="text" placeholder="Phone Number" value={contact.phone} onChange={(e)=> onChange({phone: e.target.value})}/>
                    </div>
                    <div>
                      <input type="text" className="message-box" placeholder="Message" value={contact.message} onChange={(e)=> onChange({message: e.target.value})}/>
                    </div>
                    <div className="btn_box">
                      <button disabled={isSaveClick} onClick={onSaveClicked}>
                        SEND
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="map_container">
                  <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7919.922715184441!2d80.34887553981136!3d7.013827570538791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae309ed4736f5e9%3A0xa4d6f47be783794e!2sGanepalla!5e0!3m2!1sen!2slk!4v1694270204712!5m2!1sen!2slk" title="contact location" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {hasWriteAccess &&
          <div className="pets-listing p-4 vh-100">

            <div className="container blog_section">
                <div className="w-100 d-flex justify-content-center mt-4">
                    {isLoading && <Spinner animation="border" />}
                </div>
                <div className="row">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Message</th>
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
          }
        </section>
    );
}