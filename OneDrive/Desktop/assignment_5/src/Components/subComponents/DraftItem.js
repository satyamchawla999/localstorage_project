import { useAuth } from '../../Hooks/useProvideAuth';
import { useToasts } from "react-toast-notifications";

import '../../Assets/Styles/draftItem.css'

const DraftItem =(props)=>{

    const auth = useAuth();
    const user = JSON.parse(auth.user);
    const item = props.item;
    const { addToast } = useToasts();

    const handleSubmit = async ()=>{
        
        const response = await auth.addProduct(item);

        if (response === true) {
            addToast("Product Added Successfully", {
              appearance: "success",
              autoDismiss: true,
            });
          } else {
            addToast("Product with Same Code Already Exists", {
              appearance: "error",
              autoDismiss: true,
            });
          }

    }


    const handleDelete = async ()=> {

        const response = await auth.deleteDraft(item.code);

        if (response === true) {
          addToast("Product Deleted Successfully", {
            appearance: "success",
            autoDismiss: true,
          });
        } else {
          addToast("Error In Deleting Product", {
            appearance: "error",
            autoDismiss: true,
          });
        }
        
    }


    return(
        <div className="draftItem">
            <div className="draftImageBlock">
                <img src={item.image} alt="#"></img>
            </div>

            <div className="draftInfoBlock">
                <p>Name : {item.name}</p>
                <p>Price : {item.price}</p>
                <p>About : {item.description}</p>
                <p>Code : {item.code}</p> 
                <br></br>

                {user.role === "Vendor" && <>
                  <button style={{backgroundColor:"#1C6BE4"}} onClick={handleSubmit} >Add Product</button>
                </>}
                <button style={{backgroundColor:"red"}} onClick={handleDelete}>Delete</button>
            </div>
            
            
        </div>
    )
}

export default DraftItem;