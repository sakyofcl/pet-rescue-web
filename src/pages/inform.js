import React, { useEffect, useState } from "react";
import * as yup from 'yup';
import { PetsInformCard } from "../components/pet-inform-card";
import { Spinner } from "react-bootstrap";
import informService from "../services/inform-service";
import { InformModel } from "../model/informModel";
import {useAuth} from '../hooks/useAuth';
import { ToastMessage } from "../components/toast-message";
import {useFormValidations} from '../hooks/useFormValidations';
import {ErrorMessage, wrapWithErrorObject} from '../hooks/error-message';


const INFORM_VALIDATION_SCHEMA = () => yup.object().shape({
    address: yup.string().nullable().trim().required('Required'),
    message: yup.string().nullable().trim().required('Required'),
    image: yup.string().nullable().trim().required('Required')
});

export const Inform = ()=>{
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaveClick, setIsSaveClick] = useState(false);
    const [inform, setInform]= useState(new InformModel());
    const {isAdmin} = useAuth();
    const hasWriteAccess = isAdmin();
    const [showToast, setShowToast]= useState(false);
    const [validationErrors, onFormValidate, isFormValid] = useFormValidations(INFORM_VALIDATION_SCHEMA);
    const Error = wrapWithErrorObject(ErrorMessage, validationErrors);
  

    useEffect(()=>{
      fetchInform();
    }, []);

    const onRemovePetInform= (informId)=>{
      informService.remove(informId).then(()=>{
        fetchInform();
      })
    }

    const fetchInform = ()=>{
      setItems([]);
      setIsLoading(true);
      informService.GetAll().then((data)=>{
          setItems(data.items);
      }).finally(()=>{
          setIsLoading(false);
      })
    }

    const onChange = (value)=>{
      const constructedValues = {...inform, ...value};
      setInform(constructedValues);
      onFormValidate(constructedValues);
    }

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          onChange({image: base64String});
        };
        reader.readAsDataURL(selectedFile);
      }
    };

    const onSaveClicked = ()=>{
      onFormValidate(inform).then(() => {
        setIsSaveClick(true);
        informService.add(inform).then((data)=>{
            fetchInform();
            setInform(new InformModel());
            setShowToast(true);
        }).finally(()=>{
            setIsSaveClick(false);
        })
      });
    }

    return (

        <section className="contact_section  long_section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="form_container">
                  <div className="heading_container">
                    <h2>
                      Inform About Pets
                    </h2>
                    <ToastMessage variant="success" message={"Successfully informed."} hideTost={setShowToast} show={showToast}/>
                  </div>
                  <div>
                    <div>
                      <input type="text" placeholder="Address" value={inform.address} onChange={(e)=> onChange({address: e.target.value})}/>
                      <Error propertyName={'address'} />
                    </div>
                    <div>
                      <input type="text" className="message-box" placeholder="Message" value={inform.message} onChange={(e)=> onChange({message: e.target.value})}/>
                      <Error propertyName={'message'} />
                    </div>
                    <div>

                    <div class="input-group mb-3">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" accept="image/png, image/jpeg" onChange={handleFileChange}/>
                            <label class="custom-file-label">Choose file</label>
                            
                        </div>
                        
                    </div>
                    <Error propertyName={'image'} />

                    </div>
                    <div className="btn_box">
                      <button disabled={isSaveClick || !isFormValid} onClick={onSaveClicked}>
                        SEND
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="map_container">
                  <div className="map">
                    {inform.image && <img className="w-100 h-auto" src={inform.image} alt=""/>}
                  </div>
                </div>
              </div>
            </div>
            {hasWriteAccess &&
            <>
              <div className="row">
                  <div className="w-100 d-flex justify-content-center mt-4">
                      {isLoading && <Spinner animation="border" />}
                  </div>
              </div>
              <div className="row"> 
                  {items.map((e,i)=>(
                    <div className="col-md-4" key={i}>
                      <PetsInformCard {...e} onRemovePetInform={onRemovePetInform}/>
                    </div>
                  ))} 
              </div>
            </>
            }
          </div>
        </section>
    );
}