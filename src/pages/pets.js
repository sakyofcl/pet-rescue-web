import React, { useEffect, useState } from "react";
import { PetsCard } from "../components/petsCard";
import petServices from '../services/pet-service';
import { Modal, Spinner } from "react-bootstrap";
import { PetType } from "../components/pet-type";
import { PetsForm } from "../components/petsForm";
import {useAuth} from '../hooks/useAuth';
import adoptServices from '../services/adopt-service';
import {AdoptListing} from '../components/adoptListing';
import { ToastMessage } from "../components/toast-message";

const initialQuery = {
    searchText: "",
    petType : null
}
export const Pets = ()=>{
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState(initialQuery);
    const [selectedPetId, setSelectedPetId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const {isAdmin , user} = useAuth();
    const hasWriteAccess = isAdmin();
    const [showAdopt, setShowAdopt] = useState(false);
    const [showToast, setShowToast]= useState(false);
    const [adoptMessage, setAdoptMessage] = useState({variant:'', message:''});

    const onChange = (value)=>{
        setQuery({...query, ...value});
    }

    useEffect(()=>{
        fetchPets();
    }, []);

    const fetchPets = ()=>{
        setItems([]);
        setIsLoading(true);
        petServices.GetAllFiltered(query).then((data)=>{
            setItems(data.items);
        }).finally(()=>{
            setIsLoading(false);
        })
    }

    const CloseForm = ()=>{
        setShow(false);
        fetchPets();
    }
    const openForm = (petId)=>{
        setShow(true);
        setSelectedPetId(petId);
    }

    const onRemovePet= (petId)=>{
        petServices.remove(petId).then(()=>{
            fetchPets();
        })
    }

    const onClickAdoptPet = (petId)=>{
        adoptServices.createAdoptRequest(petId, user.userId).then((data)=>{
            setShowToast(true);
            if( 'isAlreadyMakeAdoptRequest' in data){
                setAdoptMessage({variant:'danger', message:'You already send adopt request.'});
            }
            else{
                setAdoptMessage({variant:'success', message:'Successfully send adopt request.'});
            }
            fetchPets();
        })
    }

    const CloseViewAdopt = ()=>{
        setShowAdopt(false);
        fetchPets();
    }

    const openViewAdopt = (petId)=>{
        setShowAdopt(true);
        setSelectedPetId(petId);
    }

    return (
        <div className="pets-listing p-4">
            <div className="container">
                <div className="row mb-4">
                    <div className="col d-flex align-items-center">
                        <h3 className="mr-4 text-uppercase m-0 p-0">Pets Showcases</h3>
                        {hasWriteAccess && <button type="button" class="btn btn-secondary" onClick={()=>{ openForm(null)}}>Add New Pet</button>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="search!" value={query.searchText} onChange={(e)=> onChange({searchText: e.target.value}) }/>
                            <PetType onChange={(e)=> onChange({petType: +e.target.value})}/>
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button" onClick={()=> fetchPets()}>Filter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container blog_section">
                <div className="w-100 d-flex justify-content-center mt-4">
                    {isLoading && <Spinner animation="border" />}
                    <ToastMessage variant={adoptMessage.variant} message={adoptMessage.message} hideTost={setShowToast} show={showToast}/>
                </div>

                <div className="row">
                    {items.map((e,i)=>(
                        <div className="col-md-4" key={i}>
                            <PetsCard {...e} onEditPet={openForm} onRemovePet={onRemovePet} onClickAdoptPet={onClickAdoptPet} onClickViewAdopt={openViewAdopt}/>
                        </div>
                    ))}
                </div>
            </div>

            <Modal show={show} onHide={CloseForm} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPetId ? 'Edit Pet' : 'Add New'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PetsForm onCloseForm={CloseForm} selectedPetId={selectedPetId}/>
                </Modal.Body>
            </Modal>

            <Modal show={showAdopt} onHide={CloseViewAdopt} size="lg" className="mt-5" >
                <Modal.Header closeButton>
                    <Modal.Title>View Adopts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <AdoptListing petId={selectedPetId}/>
                </Modal.Body>
            </Modal>

        </div>
    );
}