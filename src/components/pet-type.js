import React, { useEffect, useState } from "react";
import petService from "../services/pet-service";

export const PetType = (props)=>{
    const [items, setItems] = useState([]);

    useEffect(()=>{
        fetchPetTypes();
    }, []);

    const fetchPetTypes = ()=>{
        petService.GetAllPetTypes().then((data)=>{
            setItems(data.items);
        })
    }
    return (
        <select class="custom-select" onChange={props.onChange} value={props.value}>
            <option value="">-- select type --</option>
            {items.map((e,i)=>(
                <option key={i} value={e.typeId}>{e.typeName}</option>
            ))}
        </select>
    );
}