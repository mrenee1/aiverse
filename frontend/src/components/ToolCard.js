import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ExternalLink, Sparkles, Star, Tag, TrendingUp } from 'lucide-react';

const CardContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #3b82f6;
  }
`;

const ToolHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ToolLogo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
`;

const ToolInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ToolName = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
  line-height: 1.3;
`;

const ToolDescription = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ToolMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const ToolCategory = styled.span`
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ToolStats = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.8rem;
`;

const ToolTags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
`;

const TagBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 500;
`;

const FeaturedBadge = styled(TagBadge)`
  background: #fef3c7;
  color: #92400e;
`;

const DealsBadge = styled(TagBadge)`
  background: #dcfce7;
  color: #166534;
`;

const PopularBadge = styled(TagBadge)`
  background: #dbeafe;
  color: #1e40af;
`;

const ToolLink = styled.a`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f1f5f9;
  color: #64748b;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #3b82f6;
    color: white;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const PrimaryButton = styled.button`
  flex: 1;
  padding: 0.5rem 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2563eb;
  }
`;

const SecondaryButton = styled.button`
  flex: 1;
  padding: 0.5rem 0.75rem;
  background: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

function ToolCard({ tool }) {
  const navigate = useNavigate();

  const handleExternalLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(tool.website, '_blank', 'noopener,noreferrer');
  };

  return (
    <Link to={`/tools/${encodeURIComponent(tool.name)}`}>
      <CardContainer>
        <ToolLink 
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleExternalLink}
        >
          <ExternalLink size={16} />
        </ToolLink>
        
        <ToolHeader>
          <ToolLogo 
            src={tool.logo || 'https://via.placeholder.com/48x48/f1f5f9/64748b?text=AI'} 
            alt={tool.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/48x48/f1f5f9/64748b?text=AI';
            }}
          />
          <ToolInfo>
            <ToolName>{tool.name}</ToolName>
            <ToolDescription>{tool.description}</ToolDescription>
          </ToolInfo>
        </ToolHeader>
        
        <ToolMeta>
          <ToolCategory>{tool.category}</ToolCategory>
          <ToolStats>
            <Star size={14} />
            <span>{tool.popularity}</span>
          </ToolStats>
        </ToolMeta>
        
        <CardActions>
          <PrimaryButton onClick={(e) => { e.preventDefault(); navigate(`/tools/${encodeURIComponent(tool.name)}`); }}>
            View Details
          </PrimaryButton>
          <SecondaryButton onClick={() => window.open(tool.website, '_blank')}>
            Visit Website
          </SecondaryButton>
        </CardActions>
        
        <ToolTags>
          {tool.featured && (
            <FeaturedBadge>
              <Sparkles size={12} />
              Featured
            </FeaturedBadge>
          )}
          {tool.deals && (
            <DealsBadge>
              <Tag size={12} />
              Deals
            </DealsBadge>
          )}
          {tool.popularity > 500 && (
            <PopularBadge>
              <TrendingUp size={12} />
              Popular
            </PopularBadge>
          )}
        </ToolTags>
      </CardContainer>
    </Link>
  );
}

export default ToolCard;
