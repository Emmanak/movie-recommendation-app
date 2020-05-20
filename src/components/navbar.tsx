import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export interface NavBarProps {
    search: any
}
 
export interface NavBarState {
    
}
 
class NavBar extends React.Component<NavBarProps, NavBarState> {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Movie Picker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="#trending">Trending Movies</Nav.Link>
                        <Nav.Link href="#link">Your Movies</Nav.Link>
                        </Nav>
                        <Form>
                        <input id="movieSearchBox" type="text" placeholder="Search" className="form-control" />
                        <Button variant="outline-success" onClick={this.props.search}>Search Movies</Button>
                        </Form>
                    </Navbar.Collapse>
                    </Navbar>
            </React.Fragment>
         );
    }
}
 
export default NavBar;