import { useAuth } from "../../Hooks/useProvideAuth";
import { useToasts } from "react-toast-notifications";

import "../../Assets/Styles/productItem.css";

const ProductItem = (props) => {
  const product = props.product;
  const auth = useAuth();
  const user = JSON.parse(auth.user);
  const { addToast } = useToasts();

  const handleClick = async () => {
    const response = await auth.deleteProduct(product.code);

    if (response === true) {
      addToast("Product Deleted !", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast("Error In Deleting Product", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleAddToCart = async () => {
    const response = await auth.addDraft(product);

    if (response === true) {
      addToast("Product Added to Cart !", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast("Error In Adding Product", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="productItem">
      <div className="imageBlock">
        <img src={product.image} alt="#"></img>
      </div>

      <div className="infoBlock">
        <p>Name : {product.name}</p>
        <p>Price : {product.price}</p>
        <p>About : {product.description}</p>
        <p>Code : {product.code}</p>

        {user && (
          <>
            {user.role === "Admin" && (
              <>
                <button className="itemButton" onClick={handleClick}>
                  Delete Product
                </button>
              </>
            )}

            {user.role === "Coustmer" && (
              <>
                <button className="itemButton" style={{backgroundColor:"#1C6BE4"}} onClick={handleAddToCart}>
                  Add To Cart
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
