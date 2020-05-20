import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export interface NavBarProps {
    handleChange: any
    search: any
}
 
export interface NavBarState {

}


 
class NavBar extends React.Component<NavBarProps, NavBarState> {

    handleKeyPress(target:any) {
        if(target.charCode === 13){
          var button = document.getElementById("searchMoviesButton") as HTMLButtonElement;
          button.click();
        } 
      }

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
                        <Form inline>
                        <FormControl onChange={this.props.handleChange} onKeyPress={this.handleKeyPress} id="movieSearchBar" type="text" placeholder="Search" className="mr-sm-2" />
                        <Button id="searchMoviesButton" variant="outline-success" onClick={this.props.search}>Search Movies</Button>
                        </Form>
                    </Navbar.Collapse>
                    </Navbar>
            </React.Fragment>
         );
    }
}
 
export default NavBar;