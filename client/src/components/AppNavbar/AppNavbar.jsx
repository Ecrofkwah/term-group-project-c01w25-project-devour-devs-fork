import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom'
import './AppNavbar.css';


function AppNavbar({loginUser}) {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => setExpanded((prev) => !prev)
  
  const handleNavSelect = () => {
    if (window.innerWidth < 992){
      setExpanded(false)
    }
  }
  
  return (
    <div className="navbar-container">
      <Navbar collapseOnSelect className="shadow-sm" expand="lg" variant='dark' expanded={expanded}>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>RecipeConnect</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle}/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {loginUser ? (<>
                <NavLink to='#' className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleLogout}>Logout</NavLink>
              </>) : (<>
                <NavLink to='/login' className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleNavSelect}>Login</NavLink>
                <NavLink to='/register' className={ ({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleNavSelect}>Register</NavLink>
              </>
              )}
              
              <NavDropdown title="More" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={NavLink} to='/1' className={({isActive}) => isActive ? "active" : ""}>Something 1</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/2' className={({isActive}) => isActive ? "active" : ""}>Something 2</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/3' className={({isActive}) => isActive ? "active" : ""}>Something 3</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar
