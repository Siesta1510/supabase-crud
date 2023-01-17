import React, { useContext } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Image,
  Button,
} from "react-bootstrap";
import { LoadUser } from "../context/LoadUserContext";
import { FaSignOutAlt } from "react-icons/fa";
import { supabase } from "../config/supabase";
import { useNavigate, Link } from "react-router-dom";

function NavbarTop() {
  const { user,deleteUser } = useContext(LoadUser);
  const navigate = useNavigate();
  console.log(user?.user_metadata);

  const signOut = async () => {
    const { data, error } = await supabase.auth.signOut();
    data ? "" : navigate("/login");
    deleteUser();
  };

  console.log(user);
  return (
    <div style={{ height: "60px" }}>
      <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link to={'/'}>Bla Bla</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/beverage">Home Page</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/list">Storage</Link>
              </Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link>{user?.user_metadata?.full_name}</Nav.Link>
              <Image
                roundedCircle
                width="45px"
                src={user?.user_metadata?.avatar_url || ""}
                alt=""
              />

              {!user  ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign In
                </Button>
              )
              : (
                <FaSignOutAlt
                  onClick={signOut}
                  color="white"
                  height="40px"
                  cursor="pointer"
                  size="30"
                  style={{ marginTop: "5px" }}
                />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarTop;
