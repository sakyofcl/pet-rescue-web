import React, { useEffect, useState } from "react";
import petServices from '../services/pet-service';
import adoptServices from '../services/adopt-service';
import { Spinner } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

export const AdoptListing = (props)=>{
    const [items, setItems] = useState([]);
    const [pet, setPet] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {isAdmin} = useAuth();
    const hasWriteAccess = isAdmin();
    const petAdoptApproved = items.some(x=> x.isApproved === 1);

    useEffect(()=>{
        fetchAdopts();
        fetchPetInfo();
    }, []);

    const fetchAdopts = ()=>{
        setItems([]);
        setIsLoading(true);
        adoptServices.GetAll(props.petId).then((data)=>{
            setItems(data.items);
        }).finally(()=>{
            setIsLoading(false);
        })
    }

    const fetchPetInfo =  ()=>{
        petServices.GetPet(props.petId).then((data)=>{
            setPet(data.items);
        });
    }

    const onApprovedAdopt = (adoptId)=>{
        adoptServices.approvedAdoptRequest(adoptId).then(()=>{
            fetchAdopts();
        })
    }

    const renderRow = (value)=>{

        return (
            <tr>
                <td>{value.adoptId}</td>
                <td>{value.userName}</td>
                <td>{value.isApproved ? 'YES' : 'NO'}</td>
                <td>
                    {hasWriteAccess && value.isApproved === 0 && !petAdoptApproved &&<button type="button" class="btn btn-success" onClick={()=> onApprovedAdopt(value.adoptId)}><i className="fa fa-check" aria-hidden="true"></i></button>}
                </td>
            </tr>
        );
    }

    return (
        <div className="pets-listing">
            <div className="container blog_section">
                <div>
                    <b>{pet?.petName}</b>
                </div>
                <div className="w-100 d-flex justify-content-center mt-4">
                    {isLoading && <Spinner animation="border" />}
                </div>
                <div className="row">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">RN</th>
                                <th scope="col">User Name</th>
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
        </div>
    );
}