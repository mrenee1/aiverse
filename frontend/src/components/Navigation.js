import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Menu, X, Plus } from 'lucide-react';
const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  height: 70px;
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #3b82f6;
  text-decoration: none;
  
  &:hover {
    color: #2563eb;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #64748b;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: #3b82f6;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 300px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  right: 0.75rem;
  color: #94a3b8;
  size: 18px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PrimaryButton = styled(Button)`
  background: #3b82f6;
  color: white;
  
  &:hover {
    background: #2563eb;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: #64748b;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 1rem;
  display: ${props => props.open ? 'block' : 'none'};
  z-index: 999;
`;

const MobileMenuLink = styled(Link)`
  display: block;
  padding: 0.75rem;
  color: #64748b;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  
  &:hover {
    background: #f1f5f9;
    color: #3b82f6;
  }
`;

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <NavContainer>
        <NavContent>
          <Logo>AIverse</Logo>
          
          <NavLinks>
            <NavLink to="/tools">Analytics</NavLink>
            <NavLink to="/submit">Submit Tool</NavLink>
            <NavLink to="/subscribe">Subscribe</NavLink>
          </NavLinks>

          <NavActions>
            <SearchContainer>
              <form onSubmit={handleSearch}>
                <SearchInput
                  type="text"
                  placeholder="Search AI tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon size={18} />
              </form>
            </SearchContainer>

            <PrimaryButton onClick={() => navigate('/submit')}>
              <Plus size={16} />
              Submit Tool
            </PrimaryButton>

            <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </MobileMenuButton>
          </NavActions>
        </NavContent>
      </NavContainer>

      <MobileMenu open={mobileMenuOpen}>
        <MobileMenuLink to="/tools" onClick={() => setMobileMenuOpen(false)}>
          Analytics
        </MobileMenuLink>
        <MobileMenuLink to="/submit" onClick={() => setMobileMenuOpen(false)}>
          Submit Tool
        </MobileMenuLink>
        <MobileMenuLink to="/subscribe" onClick={() => setMobileMenuOpen(false)}>
          Subscribe
        </MobileMenuLink>
      </MobileMenu>
    </>
  );
}

export default Navigation;
