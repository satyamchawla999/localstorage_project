import { ProductContainer,DraftContainer } from "./subComponents";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useProvideAuth";
import { useToasts } from "react-toast-notifications";
import { Space } from "antd";
import { useState } from "react";

import "../Assets/Styles/home.css";

const initialValues = {
  name: "",
  price: "",
  description: "",
  code: "",
  image:null
};

const Home = () => {


  const auth = useAuth();
  const user = JSON.parse(auth.user);

  const [values, setValues] = useState(initialValues);
  const { addToast } = useToasts();



  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = false;

    if(user.role === "Vendor" ) {
      response = await auth.addDraft(values);
    } else {
      response = await auth.addProduct(values);
    }


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

    setValues(initialValues);
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      const file = e.target.files[0];
      const img = URL.createObjectURL(file)
      setValues((prevValues) => ({
        ...prevValues,
        [name]: img,
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <div className="home">

      <Space className="header">

        <h1>Home</h1>

        {auth.user ? <>
            <div> 
              <Link to="/profile"> <p>{user.name}</p></Link> <br/>
              <button onClick={handleLogout}>Logout</button>
            </div>
        </> : <>
            <div> 
              <Link to="/sign-in"> <p>Sign In</p> </Link> <br/>
              <Link to="/sign-up"> <p>Sign Up</p> </Link>
            </div>
        </>}

      </Space>

      <div className="products">
        <div className="productSection">
          <h4>Products</h4>
          <ProductContainer/>
        </div>

        { user && <> 
          {( user.role === "Vendor" || user.role === "Coustmer" )&& <>
            <div className="draft">
              {user.role === "Coustmer" ? <><h4>Cart</h4></> : <><h4>Draft</h4></>}
              <DraftContainer/>
            </div>
          </>} 
        </>}

        {user && 
        <> {user.role !== "Coustmer" && <>
            <div className="formSection">
            <h4>Form</h4>
              <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleInputChange}
                  required
                />

                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleInputChange}
                  required
                />

                <label>Description</label>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleInputChange}
                  required
                ></textarea>

                <label>Product Code</label>
                <input
                  type="number"
                  name="code"
                  value={values.code}
                  onChange={handleInputChange}
                  required
                />

                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                />

                <button className="addButton">
                  {user.role === 'Vendor' ? <>Add To Draft</> : <>Add Product</>}
                </button>
              </form>
            </div>
        
          </>}
        </>}



      </div>
    </div>
  );
};

export default Home;
