import React, { useEffect, useState } from "react";
import { PetType } from "./pet-type";
import { PetModel } from "../model/petModel";
import petService from "../services/pet-service";

export const PetsForm = (props)=>{
    const isEdit = props.selectedPetId ? true : false;
    const [isSaveClick, setIsSaveClick] = useState(false);
    const [pet, setPet]= useState(new PetModel());
    
    useEffect(()=>{
        isEdit && fetchPet();
    },[]);

    const onSaveClicked = ()=>{
        setIsSaveClick(true);
        (isEdit ? petService.update : petService.add)(pet).then((data)=>{
            console.log(data);
            props.onCloseForm();
        }).finally(()=>{
            setIsSaveClick(false);
        })
    }

    const onChange = (value)=>{
        setPet({...pet, ...value});
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
                </div>

                <div class="form-group">
                    <label for="exampleFormControlSelect1">Pet Type</label>
                    <PetType onChange={(e)=> onChange({petType: +e.target.value})} value={pet.petType}/>
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
                    </div>
                </div>

                <div className="form-group">
                    {pet.petImage && <img className="w-100 h-auto" src={pet.petImage} alt=""/>}
                </div>

                <div className="d-flex justify-content-end">
                    <button type="button" class="btn btn-primary mr-2" disabled={isSaveClick} onClick={onSaveClicked}>Save Changes</button>
                    <button type="button" class="btn btn-secondary" onClick={props.onCloseForm}>Close</button>
                </div>
            </form>
        </div>
    );
}