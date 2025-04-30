import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Action 
import { getProductDetails } from "../redux/actions/productactions";
import { addToCart } from "../redux/actions/cartActions";
const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && match.params.id !== product.id) {
      dispatch(getProductDetails(match.params.id))
    }
  }, [dispatch, product, match])

  const addToCartHandler = () => {
    dispatch(addToCart(product.id, qty));
    history.push("/cart");
  }
  return (
    <div className="productscreen">
      {loading ? <h2> Loading...</h2> : error ? <h2>{error}</h2> : (

        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img
                src={product.imageUrl}
                alt={product.name}
              />
            </div>
            <div className="left__info">
              <p className="left__name">{product.name}</p>
              <p>Price  ₹{product.price} </p>
              <p>
                {product.description}
              </p>
            </div>
          </div>

          <div className="productscreen__right">
            <div className="right__info">
              <p>
                price:
                <span> ₹{product.price} </span>
              </p>
              {/* <p>{product.countInStock}</p> */}
              <p>
                Status: <span>{product.countInStock > 0 ? "In stock" : "out of stock"} </span>
              </p>
              <p>
                Qty
                <select>
                  <option value="1">1</option>
                  <option value="1">2</option>
                  <option value="1">3</option>
                  <option value="1">4</option>
                  <option value="1">5</option>
                </select>
              </p>
              <p>
                <button type="buttton" onClick={addToCartHandler}>Add To cart</button>
              </p>
            </div>
          </div>
        </>

      )}

    </div>
  );
};
export default ProductScreen;
