import React from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap'
import MaterialIcon from 'material-icons-react'
import {LinkContainer} from 'react-router-bootstrap'
import './styles.css'
import { withRouter } from 'react-router-dom'


const Header = withRouter(({history})=>{
    function disconnect(){
        localStorage.removeItem('token');
        history.push('/');
    }

    return(
        <Navbar bg="dark" variant="dark" sticky='top'>
        <Navbar.Brand>Ecommerce</Navbar.Brand>
        <Nav className="mr-auto">
            <LinkContainer to="/sales">
                <Nav.Link>Pedidos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
                <Nav.Link>Produtos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/clients">
                <Nav.Link>Clientes</Nav.Link>
            </LinkContainer>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                <Button id='exit' onClick={()=>window.confirm('Deseja mesmo sair?')&&disconnect()} className="d-flex justify-content-center align-items-center" variant='outline-light'>
                    <MaterialIcon icon="exit_to_app" color="#fff"/>
                      Sair
                </Button>
            </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
})

export default Header;