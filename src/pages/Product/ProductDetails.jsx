import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Col, Container, Row, Spinner, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import Review from "../Review/Review";
import { Store } from "../../Store";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH-REQUEST":
      return { ...state, loading: true };

    case "FETCH-SUCCESS":
      return { ...state, loading: false, product: action.payload };

    default:
      return state;
  }
};

const ProductDetails = () => {
  let navigate = useNavigate();
  let { state, dispatch: CtxDispatch, state2, dispatch2 } = useContext(Store);
  const [{ loading, product }, dispatch] = useReducer(reducer, { loading: false, product: {} });
  const params = useParams();

  useEffect(() => {
    const ProductsLoad = async () => {
      dispatch({ type: "FETCH-REQUEST" });
      try {
        let { data } = await axios.get(`https://blooming-oasis-95004.herokuapp.com/product/${params.slug}`);

        dispatch({ type: "FETCH-SUCCESS", payload: data });
      } catch (err) {}
    };
    ProductsLoad();
  }, []);

  let hanldeAddToCart = (product) => {
    if (state2.userInfo) {
      let existingItem = state.cart.cartItem.find((item) => item._id == product._id);
      let quantity = existingItem ? existingItem.quantity + 1 : 1;
      CtxDispatch({ type: "ADD-TO-CART", payload: { ...product, quantity } });
      navigate("/cartpage");
    } else {
      alert("please login your account");
      navigate("/login");
    }
  };

  return loading ? (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Spinner animation="border" />
    </div>
  ) : (
    <>
      <Container>
        <Helmet>
          <title>Product Deatils</title>
        </Helmet>
        <Row className="mt-5">
          <Col lg={5}>
            <InnerImageZoom width={600} src={product.image} zoomScale={2.8} zoomSrc={product.image} />
          </Col>
          <Col lg={5}>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
              <h1>{product.name}</h1>
              <p>{product.BrandName}</p>
            </div>
            <div style={{ display: "flex" }}>
              <h2 style={{ marginRight: "80px" }}>$ {product.price}</h2>
              {product.stock > 0 ? (
                <h5 style={{ color: "green" }} className="mt-2">
                  In Stock
                </h5>
              ) : (
                <h5 style={{ color: "red" }} className="mt-2">
                  Out of Stock
                </h5>
              )}
            </div>
            <Review rating={product.rating} review={product.NumberOfReview} />
            <h4 className="mt-4">TotalSale: {product.totalSale}</h4>
            <h4 className="mt-4">Stock: {product.stock}</h4>
            <Card.Text className="mt-4">{product.discription}</Card.Text>

            <Button onClick={() => hanldeAddToCart(product)} className="mt-3" variant="primary">
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
