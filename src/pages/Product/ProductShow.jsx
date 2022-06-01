import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Store } from "../../Store";
import Review from "../Review/Review";

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

const ProductShow = () => {
  let { state, dispatch: CtxDispatch, state2, dispatch2 } = useContext(Store);
  const params = useParams();
  let navigate = useNavigate();
  const [{ loading, product }, dispatch] = useReducer(reducer, { loading: false, product: [] });
  console.log(state);

  useEffect(() => {
    const ProductsLoad = async () => {
      dispatch({ type: "FETCH-REQUEST" });
      try {
        let { data } = await axios.get("https://blooming-oasis-95004.herokuapp.com/product");
        dispatch({ type: "FETCH-SUCCESS", payload: data });
      } catch (err) {}
    };
    ProductsLoad();
  }, []);
  let updateCart = (item, quantity) => {
    CtxDispatch({ type: "ADD-TO-CART", payload: { ...item, quantity } });
  };
  let hanldeAddToCart = (product) => {
    if (state2.userInfo) {
      let existingItem = state.cart.cartItem.find((item) => item._id == product._id);
      let quantity = existingItem ? existingItem.quantity + 1 : 1;
      CtxDispatch({ type: "ADD-TO-CART", payload: { ...product, quantity } });
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
    <Container>
      <Helmet>
        <title>Products Page</title>
      </Helmet>
      <Row>
        {product.map((item) => (
          <Col className="mt-5" style={{ cursor: "pointer" }} lg={3}>
            <Card className="cardItem">
              <Link style={{ textDecoration: "none", color: "black" }} to={`/products/${item.slug}`}>
                <Card.Img variant="top" src={item.image} />
              </Link>
              <Card.Body>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Card.Title>{item.name}</Card.Title>
                  <p>{item.BrandName}</p>
                </div>
                <h3 style={{ margin: "0px" }}> $ {item.price} </h3> <br />
                <Review rating={item.rating} review={item.NumberOfReview} /> <br />
                <Card.Text>{item.discription.substring(0, 50)}...</Card.Text>
                {state.cart.cartItem.map(
                  (cartItem) =>
                    item._id === cartItem._id &&
                    cartItem.quantity && (
                      <div>
                        {" "}
                        <Button
                          onClick={() => updateCart(cartItem, cartItem.quantity - 1)}
                          disabled={cartItem.quantity === 1}
                        >
                          -
                        </Button>{" "}
                        <b>{cartItem.quantity}</b>{" "}
                        <Button
                          onClick={() => updateCart(cartItem, cartItem.quantity + 1)}
                          disabled={cartItem.quantity === cartItem.stock}
                        >
                          +
                        </Button>
                      </div>
                    )
                )}
                <Button onClick={() => hanldeAddToCart(item)} className="mt-3" variant="primary">
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductShow;
