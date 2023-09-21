
export const PetsInformCard = (props)=>{
    return (
        <div>
          <div class="box">
            <div class="img-box"><img className="w-100 h-auto" src={props.image} alt="cat" /></div>
            <div class="detail-box">
              <h5 className="mb-3">{props.address}</h5>
              <p>{props.message}</p>
              <div className="d-flex">
                <button type="button" class="btn btn-danger w-50" onClick={()=> props.onRemovePetInform(props.informId)}>Remove</button>
              </div>
            </div>
          </div>
        </div>
    );
}