import {useAuth} from '../hooks/useAuth';

export const PetsCard = (props)=>{
    const {isAdmin, isLogin} = useAuth();
    const hasWriteAccess = isAdmin();
    return (
        <div>
          <div class="box">
            <div class="img-box"><img src={props.petImage} alt="cat" /></div>
            <div class="detail-box">
              <h5 className="mb-3">{props.petName}</h5>
              <p><i>{props.typeName}</i></p>
              <p>{props.description}</p>
              <div className="d-flex mb-3">
                {isLogin() && !hasWriteAccess && <button type="button" class="btn btn-primary w-100" onClick={()=> props.onClickAdoptPet(props.petId)}>Request For Adopt</button>}
              </div>
              <div className="d-flex mb-3">
                {hasWriteAccess && (
                  <>
                    <button type="button" class="btn btn-warning w-50 mr-3" onClick={()=> props.onEditPet(props.petId)}>Edit</button>
                    <button type="button" class="btn btn-danger w-50" onClick={()=> props.onRemovePet(props.petId)}>Remove</button>
                  </>
                )}
              </div>
              <div className="d-flex">
                {hasWriteAccess && <button type="button" class="btn btn-primary w-100" onClick={()=> props.onClickViewAdopt(props.petId)}>View</button>}
              </div>
            </div>
          </div>
        </div>
    );
}