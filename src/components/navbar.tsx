import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import BingeButler from '../images/bingebutler.png';

var test:any;
test = "hey";

export interface NavBarProps {
    handleChange: any
    search?: any
}
 
export interface NavBarState {

}


 
class NavBar extends React.Component<NavBarProps, NavBarState> {

    handleKeyPress(target:any) {
        if(target.charCode === 13){
          //var button = document.getElementById("searchMoviesButton") as HTMLButtonElement;
          //button.click();
          //this.props.handleChange();
          console.log(target.charCode);
          alert("Enter Key pressed");
        } 
      }

    render() { 
        return ( 
            <React.Fragment>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="home"><img src={BingeButler} width="80" height="60"></img>BingeButler</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="discover">Discover</Nav.Link>
                        <Nav.Link href="your-movies">Your Movies</Nav.Link>
                        {/*<button onClick={() => {rateMovie(movieID)}}>Rate Movies</button>*/}
                        </Nav>
                        <Form inline>
                        <FormControl onChange={this.props.handleChange} onKeyPress={this.handleKeyPress} id="movieSearchBar" type="text" placeholder="Search" className="mr-sm-2" />
                        {/* <Button id="searchMoviesButton" onClick={(e:any) => {e.preventDefault(); this.props.handleChange(e)}} variant="outline-success">Search Movies</Button> */}
                        </Form>
                    </Navbar.Collapse>
                    </Navbar>
            </React.Fragment>
         );
    }
}
 
export default NavBar;

export {test};