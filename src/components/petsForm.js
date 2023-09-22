import React, { useEffect, useState } from "react";
import * as yup from 'yup';
import { PetType } from "./pet-type";
import { PetModel } from "../model/petModel";
import petService from "../services/pet-service";
import {useFormValidations} from '../hooks/useFormValidations';
import {ErrorMessage, wrapWithErrorObject} from '../hooks/error-message';

const PET_VALIDATION_SCHEMA = () => yup.object().shape({
    petName: yup.string().nullable().trim().required('Required'),
    petType: yup.string().nullable().trim().required('Required'),
    petImage: yup.string().nullable().trim().required('Required')
});

export const PetsForm = (props)=>{
    const isEdit = props.selectedPetId ? true : false;
    const [isSaveClick, setIsSaveClick] = useState(false);
    const [pet, setPet]= useState(new PetModel());
    const [validationErrors, onFormValidate, isFormValid] = useFormValidations(PET_VALIDATION_SCHEMA);
    const Error = wrapWithErrorObject(ErrorMessage, validationErrors);
    
    useEffect(()=>{
        isEdit && fetchPet();
    },[]);

    const onSaveClicked = ()=>{
        onFormValidate(pet).then(() => {
            setIsSaveClick(true);
            (isEdit ? petService.update : petService.add)(pet).then((data)=>{
                console.log(data);
                props.onCloseForm();
            }).finally(()=>{
                setIsSaveClick(false);
            })
        });
    }

    const onChange = (value)=>{
        const constructedValues = {...pet, ...value};
        setPet(constructedValues);
        onFormValidate(constructedValues);
    }

    const fetchPet = ()=>{
        petService.GetPet(props.selectedPetId).then((data)=>{
            setPet(data.items);
        });
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result;
            onChange({petImage: base64String});
          };
          reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <div className="pet-form">
            <form>
                <div class="form-group">
                    <label>Pet Name</label>
                    <input type="text" class="form-control" value={pet.petName} onChange={(e)=> onChange({petName: e.target.value})}/>
                    <Error propertyName={'petName'} />
                </div>

                <div class="form-group">
                    <label for="exampleFormControlSelect1">Pet Type</label>
                    <PetType onChange={(e)=> onChange({petType: e.target.value ? +e.target.value : null})} value={pet.petType}/>
                    <Error propertyName={'petType'} />
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" rows="3" value={pet.description} onChange={(e)=> onChange({description: e.target.value})}></textarea>
                </div>

                <div className="form-group">
                    <label>Upload Pet Image</label>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" accept="image/png, image/jpeg" onChange={handleFileChange}/>
                        <label class="custom-file-label" >Choose file</label>
                        <Error propertyName={'petImage'} />
                    </div>
                </div>

                <div className="form-group">
                    {pet.petImage && <img className="w-100 h-auto" src={pet.petImage} alt=""/>}
                </div>

                <div className="d-flex justify-content-end">
                    <button type="button" class="btn btn-primary mr-2" disabled={isSaveClick || !isFormValid} onClick={onSaveClicked}>Save Changes</button>
                    <button type="button" class="btn btn-secondary" onClick={props.onCloseForm}>Close</button>
                </div>
            </form>
        </div>
    );
}