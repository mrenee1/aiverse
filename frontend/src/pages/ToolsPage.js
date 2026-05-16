import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Grid, List, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { useTools } from '../contexts/ToolsContext';
import ToolCard from '../components/ToolCard';

const ToolsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
`;

const ControlsSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchContainer = styled.div`
  flex: 1;
  min-width: 300px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #3b82f6;
    background: #f8fafc;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
`;

const ViewButton = styled.button`
  padding: 0.75rem;
  border: none;
  background: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.active ? '#2563eb' : '#f8fafc'};
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
`;

const ResultsCount = styled.span`
  color: #64748b;
`;

const ActiveFilters = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterTag = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: #3b82f6;
  color: white;
  border-radius: 16px;
  font-size: 0.8rem;
  cursor: pointer;
  
  &:hover {
    background: #2563eb;
  }
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ToolsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListItem = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s;
  
  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ListImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const ListContent = styled.div`
  flex: 1;
`;

const ListTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const ListDescription = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ListMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    border-color: #3b82f6;
    background: #f8fafc;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid #f1f5f9;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
`;

const EmptyStateTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 1rem;
`;

function ToolsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const { 
    tools, 
    loading, 
    pagination, 
    fetchTools, 
    searchTools 
  } = useTools();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    if (params.search) {
      setSearchQuery(params.search);
      searchTools(params.search, params);
    } else {
      fetchTools(params);
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }
    params.delete('page'); // Reset to first page
    setSearchParams(params);
  };

  const handleFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page'); // Reset to first page
    setSearchParams(params);
  };

  const handleSort = (sortBy) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', sortBy);
    params.delete('page'); // Reset to first page
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    setSearchParams(params);
  };

  const removeFilter = (key) => {
    handleFilter(key, '');
  };

  const activeFilters = [];
  if (searchParams.get('category')) {
    activeFilters.push({ key: 'category', value: searchParams.get('category') });
  }
  if (searchParams.get('search')) {
    activeFilters.push({ key: 'search', value: searchParams.get('search') });
  }
  if (searchParams.get('featured')) {
    activeFilters.push({ key: 'featured', value: 'Featured' });
  }
  if (searchParams.get('deals')) {
    activeFilters.push({ key: 'deals', value: 'Deals' });
  }

  const renderPagination = () => {
    const { page, pages } = pagination;
    const buttons = [];
    
    // Previous button
    buttons.push(
      <PaginationButton
        key="prev"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </PaginationButton>
    );
    
    // Page numbers
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(pages, page + 2);
    
    if (startPage > 1) {
      buttons.push(
        <PaginationButton key={1} onClick={() => handlePageChange(1)}>
          1
        </PaginationButton>
      );
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1">...</span>);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PaginationButton
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === page ? 'active' : ''}
        >
          {i}
        </PaginationButton>
      );
    }
    
    if (endPage < pages) {
      if (endPage < pages - 1) {
        buttons.push(<span key="ellipsis2">...</span>);
      }
      buttons.push(
        <PaginationButton key={pages} onClick={() => handlePageChange(pages)}>
          {pages}
        </PaginationButton>
      );
    }
    
    // Next button
    buttons.push(
      <PaginationButton
        key="next"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === pages}
      >
        Next
      </PaginationButton>
    );
    
    return buttons;
  };

  return (
    <ToolsContainer>
      <PageHeader>
        <PageTitle>AI Tools Directory</PageTitle>
        <PageSubtitle>
          Discover and explore the best AI tools for your needs
        </PageSubtitle>
      </PageHeader>

      <ControlsSection>
        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon size={20} />
          </form>
        </SearchContainer>

        <FilterContainer>
          <FilterButton onClick={() => handleFilter('featured', 'true')}>
            <Star size={16} />
            Featured
          </FilterButton>
          
          <FilterButton onClick={() => handleFilter('deals', 'true')}>
            <TrendingUp size={16} />
            Deals
          </FilterButton>

          <Select
            value={searchParams.get('sortBy') || 'popularity'}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="popularity">Most Popular</option>
            <option value="name">Name (A-Z)</option>
            <option value="createdAt">Newest First</option>
            <option value="category">Category</option>
          </Select>

          <ViewToggle>
            <ViewButton
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </ViewButton>
            <ViewButton
              active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </ViewButton>
          </ViewToggle>
        </FilterContainer>
      </ControlsSection>

      {activeFilters.length > 0 && (
        <ResultsInfo>
          <ResultsCount>
            Showing {tools.length} of {pagination.total} tools
          </ResultsCount>
          <ActiveFilters>
            {activeFilters.map((filter) => (
              <FilterTag
                key={filter.key}
                onClick={() => removeFilter(filter.key)}
              >
                {filter.value}
                ×
              </FilterTag>
            ))}
          </ActiveFilters>
        </ResultsInfo>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : tools.length === 0 ? (
        <EmptyState>
          <EmptyStateTitle>No tools found</EmptyStateTitle>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </EmptyState>
      ) : viewMode === 'grid' ? (
        <ToolsGrid>
          {tools.map((tool) => (
            <ToolCard key={tool._id} tool={tool} />
          ))}
        </ToolsGrid>
      ) : (
        <ToolsList>
          {tools.map((tool) => (
            <ListItem key={tool._id}>
              <ListImage
                src={tool.logo || 'https://via.placeholder.com/60x60/f1f5f9/64748b?text=AI'}
                alt={tool.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/60x60/f1f5f9/64748b?text=AI';
                }}
              />
              <ListContent>
                <ListTitle>{tool.name}</ListTitle>
                <ListDescription>{tool.description}</ListDescription>
                <ListMeta>
                  <span style={{ background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '16px', fontSize: '0.8rem' }}>
                    {tool.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#64748b' }}>
                    <Star size={14} />
                    <span>{tool.popularity}</span>
                  </div>
                </ListMeta>
              </ListContent>
            </ListItem>
          ))}
        </ToolsList>
      )}

      {pagination.pages > 1 && (
        <Pagination>
          {renderPagination()}
        </Pagination>
      )}
    </ToolsContainer>
  );
}

export default ToolsPage;
