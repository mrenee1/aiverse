import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Star, TrendingUp, ArrowRight, Sparkles, Download, Apple } from 'lucide-react';
import { useTools } from '../contexts/ToolsContext';
import ToolCard from '../components/ToolCard';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  margin-bottom: 3rem;
  color: white;
`;

const HeroTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 2rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #2563eb;
  }
`;

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-weight: 500;
`;

const ProductOfTheDay = styled.section`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  background: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background 0.2s;
  
  &:hover {
    background: #f1f5f9;
  }
`;

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f6f8fb 0%, #e9ecef 100%);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  color: #64748b;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CategoryBadge = styled.span`
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PrimaryButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #2563eb;
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

const FeaturedSection = styled.section`
  margin-bottom: 3rem;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CategoriesSection = styled.section`
  margin-bottom: 3rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const CategoryCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #3b82f6;
  }
`;

const CategoryName = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const CategoryCount = styled.span`
  color: #64748b;
  font-size: 0.9rem;
`;

const DownloadSection = styled.section`
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const DownloadContent = styled.div`
  flex: 1;
`;

const DownloadTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const DownloadDescription = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const DownloadFeatures = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const DownloadFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const DownloadButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  
  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SecondaryDownloadButton = styled(DownloadButton)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { 
    productOfTheDay, 
    featuredTools, 
    categories, 
    fetchProductOfTheDay, 
    fetchFeaturedTools, 
    fetchCategories 
  } = useTools();

  useEffect(() => {
    fetchProductOfTheDay();
    fetchFeaturedTools();
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/tools?category=${encodeURIComponent(category)}`);
  };

  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>Discover 1,000+ AI Tools</HeroTitle>
        <HeroSubtitle>
          Find the perfect AI tools for your needs - from productivity to development, 
          marketing to design, all in one comprehensive directory.
        </HeroSubtitle>
        
        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search for AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">
              <Search size={20} />
            </SearchButton>
          </form>
        </SearchContainer>
      </HeroSection>

      <StatsSection>
        <StatCard>
          <StatNumber>1,000+</StatNumber>
          <StatLabel>AI Tools</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>25</StatNumber>
          <StatLabel>Categories</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>50+</StatNumber>
          <StatLabel>Featured Tools</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>100K+</StatNumber>
          <StatLabel>Monthly Users</StatLabel>
        </StatCard>
      </StatsSection>

      <DownloadSection>
        <DownloadContent>
          <DownloadTitle>
            <Apple size={28} />
            Download Mac App
          </DownloadTitle>
          <DownloadDescription>
            Get the AIverse Mac desktop app for the best experience. Works offline with all features included.
          </DownloadDescription>
          <DownloadFeatures>
            <DownloadFeature>
              <Download size={16} />
              <span>Works Offline</span>
            </DownloadFeature>
            <DownloadFeature>
              <Star size={16} />
              <span>1,000+ AI Tools</span>
            </DownloadFeature>
            <DownloadFeature>
              <Sparkles size={16} />
              <span>Native Performance</span>
            </DownloadFeature>
          </DownloadFeatures>
        </DownloadContent>
        <DownloadButtonGroup>
          <DownloadButton href="https://github.com/mrenee1/aiverse/releases" target="_blank" rel="noopener noreferrer">
            <Download size={20} />
            Download for Mac
          </DownloadButton>
          <SecondaryDownloadButton href="https://github.com/mrenee1/aiverse" target="_blank" rel="noopener noreferrer">
            <ArrowRight size={20} />
            View on GitHub
          </SecondaryDownloadButton>
        </DownloadButtonGroup>
      </DownloadSection>

      {productOfTheDay && (
        <ProductOfTheDay>
          <SectionHeader>
            <SectionTitle>
              <Sparkles size={24} />
              Product of the Day
            </SectionTitle>
          </SectionHeader>
          
          <ProductCard>
            <ProductImage 
              src={productOfTheDay.screenshot || productOfTheDay.logo} 
              alt={productOfTheDay.name}
              onError={(e) => {
                e.target.src = productOfTheDay.logo;
              }}
            />
            <ProductInfo>
              <ProductName>{productOfTheDay.name}</ProductName>
              <ProductDescription>{productOfTheDay.description}</ProductDescription>
              <ProductMeta>
                <CategoryBadge>{productOfTheDay.category}</CategoryBadge>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                  <Star size={16} />
                  <span>{productOfTheDay.popularity}</span>
                </div>
              </ProductMeta>
            </ProductInfo>
            <ProductActions>
              <PrimaryButton onClick={() => navigate(`/tools/${productOfTheDay.name}`)}>
                View Details
              </PrimaryButton>
              <SecondaryButton onClick={() => window.open(productOfTheDay.website, '_blank')}>
                Visit Website
              </SecondaryButton>
            </ProductActions>
          </ProductCard>
        </ProductOfTheDay>
      )}

      <CategoriesSection>
        <SectionHeader>
          <SectionTitle>Browse Categories</SectionTitle>
          <ViewAllButton onClick={() => navigate('/tools')}>
            View All Tools
            <ArrowRight size={16} />
          </ViewAllButton>
        </SectionHeader>
        
        <CategoriesGrid>
          {categories.slice(0, 8).map((category) => (
            <CategoryCard 
              key={category.category}
              onClick={() => handleCategoryClick(category.category)}
            >
              <CategoryName>{category.category}</CategoryName>
              <CategoryCount>{category.count} tools</CategoryCount>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </CategoriesSection>

      {featuredTools.length > 0 && (
        <FeaturedSection>
          <SectionHeader>
            <SectionTitle>
              <TrendingUp size={24} />
              Featured Tools
            </SectionTitle>
            <ViewAllButton onClick={() => navigate('/tools?featured=true')}>
              View All Featured
              <ArrowRight size={16} />
            </ViewAllButton>
          </SectionHeader>
          
          <ToolsGrid>
            {featuredTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
          </ToolsGrid>
        </FeaturedSection>
      )}
    </HomeContainer>
  );
}

export default HomePage;
