'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, House, Lock, PersonFill, PersonPlusFill, Search, Building } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        {currentUser ? (
          <Navbar.Brand href="/search">
            <Image src="../corponector.png" alt="Corponector Logo" width="100" />
          </Navbar.Brand>
        ) : (
          <Navbar.Brand href="/">
            <Image src="../corponector.png" alt="Corponector Logo" width="100" />
          </Navbar.Brand>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-center">
            <Nav.Link id="home-nav" href="/" key="home" active={pathName === '/'}>
              <House className="px-1" size={25} />
              Home
            </Nav.Link>
            {(currentUser || role === 'ADMIN' || role === 'USER') && (
              <Nav.Link id="search-nav" href="/search" key="search" active={pathName === '/search'}>
                <Search className="px-1" size={25} />
                Search
              </Nav.Link>
            )}
            {currentUser && role === 'STUDENT' && (
              <Nav.Link id="student-nav" href="/student" active={pathName === '/student'}>
                <PersonFill className="px-1" size={25} />
                Student
              </Nav.Link>
            )}
            {currentUser && role === 'COMPANY' && (
              <Nav.Link id="company-nav" href="/company" active={pathName === '/company'}>
                <Building className="px-1" size={25} />
                Company
              </Nav.Link>
            )}
            {currentUser && role === 'ADMIN' && (
              <Nav.Link id="admin-nav" href="/admin" key="admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
