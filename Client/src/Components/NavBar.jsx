import { Container, Nav, Navbar, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Notifications from './Chats/notifications'
// eslint-disable-next-line react/prop-types
const NavBar = ({ user }) => {

    function logout() {
        localStorage.removeItem("userChat")
        window.location.pathname = "/login"
    }
    return (
        <Navbar bg='dark' className='mb-4 shadow' style={{ height: "3.75rem" }}>
            <Container>
                <Link to="/" className='text-dark text-decoration-none fst-italic '><h2 className='text-info'>ChattApp</h2></Link>

                {/* eslint-disable-next-line react/prop-types */}
                <span className='text-warning'>Logged in as {user?.name} </span>
                <Nav>
                    <Stack direction='horizontal' gap={3}>
                        {
                            !user ?
                                <>
                                    <Link to="/login" className=' text-white text-decoration-none  '><p className='m-0'>login</p></Link>
                                    <Link to="/register" className=' text-white text-decoration-none  '><p className='m-0'>Register</p></Link>
                                </>
                                :
                                <>
                                    <Notifications />
                                    <Link className=' text-white text-decoration-none' onClick={logout}><p className='m-0'>logout</p></Link>
                                </>
                        }

                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar
