import { useAuth } from "../../Hooks/useProvideAuth";
import ProductItem from "./ProductItem";
import '../../Assets/Styles/productContainer.css'

const ProductContainer = ()=>{
    const auth = useAuth();
    const products = JSON.parse(auth.products);

    return(
        <div className="productContainer">

            { (products && products.length !==0 )? <>

                {
                products.map(((product)=>(
                    <ProductItem 
                        product={product}
                        key={product.code}
                    />
                )))
                }
            
            </> : <>
                <img className="" src={require("../../Assets/Images/empty.jpg")} />
            </>}
            
            

        </div>
    )
;}

export default ProductContainer;