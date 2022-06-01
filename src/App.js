import { Login, Registration, Home, Cart, ProductShow, ProductDetails } from "./pages/page";
import { Container, Nav, Navbar, DropdownButton, Dropdown } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { Store } from "./Store";

function App() {
  const { state2, dispatch2, dispatch } = useContext(Store);

  let handleSignOut = () => {
    dispatch2({ type: "USER_LOGOUT" });
  };
  return (
    <BrowserRouter>
      <Navbar sticky="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me">
            <Link className="nav-link active" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/products">
              Products
            </Link>
            <Link className="nav-link me-3" to="/cartpage">
              Cart
            </Link>
            {state2.userInfo ? (
              <DropdownButton id="dropdown-basic-button" title={state2.userInfo.name}>
                <Dropdown.Item onClick={handleSignOut}>Log Out</Dropdown.Item>
              </DropdownButton>
            ) : (
              <Link className="nav-link" to="/login">
                Sign In
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <ToastContainer position="top-right" limit={1} autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<ProductShow />}></Route>
        <Route path="/products/:slug" element={<ProductDetails />}></Route>
        <Route path="/cartpage" element={<Cart />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { Container, Nav, Navbar } from "react-bootstrap";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import CartPage from "./Pages/CartPage";

// import Home from "./Pages/Home";
// import Products from "./Pages/Products";
// import ProductsDeatils from "./Pages/ProductsDeatils";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Navbar bg="dark" variant="dark">
//           <Container>
//             <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//             <Nav className="me">
//               <Link className="nav-link active" to="/">
//                 Home
//               </Link>
//               <Link className="nav-link" to="/products">
//                 Products
//               </Link>
//             </Nav>
//           </Container>
//         </Navbar>
//         <Routes>
//           <Route path="/" element={<Home />}></Route>
//           <Route path="/products" element={<Products />}></Route>
//           <Route path="/products/:slug" element={<ProductsDeatils />}></Route>
//           <Route path="/cartpage" element={<CartPage />}></Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
