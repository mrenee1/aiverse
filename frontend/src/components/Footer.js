import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Github, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const FooterContainer = styled.footer`
  background: #1e293b;
  color: #94a3b8;
  padding: 3rem 0 1.5rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: #94a3b8;
  transition: color 0.2s;
  
  &:hover {
    color: #3b82f6;
  }
`;

const ExternalLink = styled.a`
  color: #94a3b8;
  transition: color 0.2s;
  
  &:hover {
    color: #3b82f6;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #334155;
  border-radius: 8px;
  color: #94a3b8;
  transition: all 0.2s;
  
  &:hover {
    background: #3b82f6;
    color: white;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #334155;
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #64748b;
  font-size: 0.9rem;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 640px) {
    gap: 1rem;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>AIverse</h3>
            <p>
              Discover and explore 1,000+ AI tools in one comprehensive directory. 
              Find the perfect AI solutions for your needs, from productivity to development.
            </p>
            <SocialLinks>
              <SocialLink href="https://twitter.com/aiverse" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </SocialLink>
              <SocialLink href="https://github.com/aiverse" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </SocialLink>
              <SocialLink href="https://linkedin.com/company/aiverse" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </SocialLink>
              <SocialLink href="https://facebook.com/aiverse" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </SocialLink>
              <SocialLink href="https://instagram.com/aiverse" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Product</h3>
            <FooterLinks>
              <FooterLink to="/tools">Browse Tools</FooterLink>
              <FooterLink to="/categories">Categories</FooterLink>
              <FooterLink to="/featured">Featured Tools</FooterLink>
              <FooterLink to="/submit">Submit Tool</FooterLink>
              <FooterLink to="/deals">Deals</FooterLink>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Company</h3>
            <FooterLinks>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/press">Press</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Resources</h3>
            <FooterLinks>
              <FooterLink to="/help">Help Center</FooterLink>
              <FooterLink to="/api">API</FooterLink>
              <FooterLink to="/partners">Partners</FooterLink>
              <FooterLink to="/newsletter">Newsletter</FooterLink>
              <FooterLink to="/status">Status</FooterLink>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Legal</h3>
            <FooterLinks>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/cookies">Cookie Policy</FooterLink>
              <FooterLink to="/gdpr">GDPR</FooterLink>
              <FooterLink to="/licenses">Licenses</FooterLink>
            </FooterLinks>
          </FooterSection>
        </FooterGrid>
        
        <FooterBottom>
          <Copyright>
            © 2024 AIverse. All rights reserved.
          </Copyright>
          <BottomLinks>
            <FooterLink to="/terms">Terms</FooterLink>
            <FooterLink to="/privacy">Privacy</FooterLink>
            <ExternalLink href="mailto:contact@aiverse.com">Contact</ExternalLink>
            <FooterLink to="/about">About</FooterLink>
          </BottomLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
