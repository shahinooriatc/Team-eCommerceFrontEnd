import React, { useContext, useEffect } from "react";
import { Button, Col, Container, ListGroup, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import { Helmet } from "react-helmet-async";

const Cart = () => {
  let navigate = useNavigate();
  const { state, dispatch, state2, dispatch2 } = useContext(Store);

  const { cart } = state;
  const product = state ? state.cart.cartItem : "";
  const ProductSubTotal = product.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const delivaryCharge = ProductSubTotal < 500 ? 20 : 0;
  const totalItems = cart.cartItem.reduce((acc, curr) => acc + curr.quantity, 0);

  let updateCart = (item, quantity) => {
    dispatch({ type: "ADD-TO-CART", payload: { ...item, quantity } });
  };
  let handleDelete = (item) => {
    dispatch({ type: "REMOVE-TO-CART", payload: { ...item } });
  };
  useEffect(() => {
    if (!state2.userInfo) {
      navigate("/");
    }
  }, [state2.userInfo]);
  return (
    <>
      <Helmet>
        <title>Cart Page</title>
      </Helmet>
      <Container>
        <Row className="mt-4">
          <Col lg={8}>
            <ListGroup className="w-100" horizontal>
              <ListGroup.Item variant="primary" className="w-100">
                Name
              </ListGroup.Item>
              <ListGroup.Item variant="primary" className="w-100">
                Image
              </ListGroup.Item>
              <ListGroup.Item variant="primary" className="w-100">
                Price
              </ListGroup.Item>
              <ListGroup.Item variant="primary" className="w-100">
                horizontally!
              </ListGroup.Item>
              <ListGroup.Item variant="primary" className="w-100">
                Delele
              </ListGroup.Item>
            </ListGroup>
            {state.cart.cartItem.map((item) => (
              <ListGroup className="w-100" horizontal>
                <ListGroup.Item className="w-100">{item.name}</ListGroup.Item>
                <ListGroup.Item className="w-100">
                  <img className="w-25" src={item.image} alt="" />
                </ListGroup.Item>
                <ListGroup.Item className="w-100">
                  {" "}
                  <b>$ {item.price}</b>{" "}
                </ListGroup.Item>
                <ListGroup.Item className="w-100">
                  <div>
                    {" "}
                    <Button
                      onClick={() => updateCart(item, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>{" "}
                    <b>{item.quantity}</b>{" "}
                    <Button
                      onClick={() => updateCart(item, item.quantity + 1)}
                      disabled={item.quantity === item.stock}
                    >
                      +
                    </Button>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="w-100">
                  {" "}
                  <Button onClick={() => handleDelete(item)} variant="danger">
                    Delete
                  </Button>{" "}
                </ListGroup.Item>
              </ListGroup>
            ))}
          </Col>
          <Col lg={4}>
            <div className="card p-3">
              <div style={{ marginTop: "15px", marginLeft: "30px" }}>
                <Row style={{ background: "#49a4ce", color: "white", margin: "10px 0px" }}>
                  <Col>
                    <h5>Total Items:</h5>
                  </Col>
                  <Col style={{ textAlign: "center" }}>
                    <h5>{totalItems}</h5>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <h5>Sub Total</h5>
                  </Col>
                  <Col style={{ textAlign: "center" }}>
                    <h5>${ProductSubTotal}</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h5>Delivery Fee</h5>
                  </Col>
                  <Col style={{ textAlign: "center" }}>
                    <h5>${delivaryCharge}</h5>
                  </Col>
                </Row>
              </div>
              <hr style={{ backgroundColor: "#B1D182" }} />
              <div style={{ marginTop: "25px", marginLeft: "30px" }}>
                <Row>
                  <Col>
                    <h5>Total</h5>
                  </Col>
                  <Col style={{ textAlign: "center" }}>
                    <h5>${ProductSubTotal + delivaryCharge}</h5>
                  </Col>
                </Row>
              </div>
              <div style={{ textAlign: "center" }}>
                <button className="chack_out_button">CheckOut</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
