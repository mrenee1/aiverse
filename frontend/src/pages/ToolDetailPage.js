import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ExternalLink, Star, TrendingUp, Tag, Share2, Heart, MessageCircle, Calendar, User, Globe } from 'lucide-react';
import { useTools } from '../contexts/ToolsContext';

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
`;

const ToolHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ToolLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid #e2e8f0;
  
  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const ToolInfo = styled.div`
  flex: 1;
`;

const ToolName = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const ToolDescription = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ToolMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
`;

const ToolActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #2563eb;
  }
`;

const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const ScreenshotContainer = styled.div`
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
`;

const ScreenshotImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const TagBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: #f1f5f9;
  color: #475569;
  border-radius: 16px;
  font-size: 0.8rem;
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

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SidebarCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
`;

const SidebarTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #64748b;
  font-size: 0.9rem;
`;

const SimilarTools = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SimilarTool = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background 0.2s;
  
  &:hover {
    background: #f8fafc;
  }
`;

const SimilarToolLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
`;

const SimilarToolInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const SimilarToolName = styled.div`
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SimilarToolCategory = styled.div`
  font-size: 0.8rem;
  color: #64748b;
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

const ErrorMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
`;

function ToolDetailPage() {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [similarTools, setSimilarTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchToolById, fetchTools } = useTools();

  useEffect(() => {
    const fetchTool = async () => {
      try {
        setLoading(true);
        const toolData = await fetchToolById(id);
        if (toolData) {
          setTool(toolData);
          
          // Fetch similar tools from the same category
          const similarData = await fetchTools({
            category: toolData.category,
            limit: 5
          });
          
          // Filter out the current tool
          const filtered = similarData.tools.filter(t => t._id !== id);
          setSimilarTools(filtered);
        } else {
          setError('Tool not found');
        }
      } catch (err) {
        setError('Failed to load tool details');
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [id]);

  const handleVisitWebsite = () => {
    if (tool?.website) {
      window.open(tool.website, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tool.name,
          text: tool.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !tool) {
    return (
      <ErrorMessage>
        <h2>Tool Not Found</h2>
        <p>The tool you're looking for doesn't exist or has been removed.</p>
        <Link to="/tools">
          <PrimaryButton>Back to Tools</PrimaryButton>
        </Link>
      </ErrorMessage>
    );
  }

  return (
    <DetailContainer>
      <MainContent>
        <ToolHeader>
          <ToolLogo 
            src={tool.logo || 'https://via.placeholder.com/80x80/f1f5f9/64748b?text=AI'} 
            alt={tool.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/80x80/f1f5f9/64748b?text=AI';
            }}
          />
          <ToolInfo>
            <ToolName>{tool.name}</ToolName>
            <ToolDescription>{tool.description}</ToolDescription>
            <ToolMeta>
              <MetaItem>
                <Star size={16} />
                <span>{tool.popularity}</span>
              </MetaItem>
              <MetaItem>
                <Globe size={16} />
                <span>{tool.category}</span>
              </MetaItem>
              <MetaItem>
                <Calendar size={16} />
                <span>{new Date(tool.createdAt).toLocaleDateString()}</span>
              </MetaItem>
            </ToolMeta>
          </ToolInfo>
        </ToolHeader>

        <ToolActions>
          <PrimaryButton onClick={handleVisitWebsite}>
            <ExternalLink size={18} />
            Visit Website
          </PrimaryButton>
          <SecondaryButton onClick={handleShare}>
            <Share2 size={18} />
            Share
          </SecondaryButton>
        </ToolActions>

        <TagsContainer>
          {tool.featured && (
            <FeaturedBadge>
              <Star size={12} />
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
          {tool.tags?.map((tag, index) => (
            <TagBadge key={index}>
              <Tag size={12} />
              {tag}
            </TagBadge>
          ))}
        </TagsContainer>

        {tool.screenshot && (
          <Section>
            <SectionTitle>Screenshot</SectionTitle>
            <ScreenshotContainer>
              <ScreenshotImage 
                src={tool.screenshot} 
                alt={`${tool.name} screenshot`}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </ScreenshotContainer>
          </Section>
        )}

        <Section>
          <SectionTitle>About {tool.name}</SectionTitle>
          <p style={{ color: '#64748b', lineHeight: 1.6 }}>
            {tool.description}
          </p>
        </Section>

        <Section>
          <SectionTitle>Key Features</SectionTitle>
          <ul style={{ color: '#64748b', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
            <li>Advanced AI-powered capabilities</li>
            <li>User-friendly interface</li>
            <li>Regular updates and improvements</li>
            <li>Comprehensive documentation</li>
            <li>Active community support</li>
          </ul>
        </Section>
      </MainContent>

      <Sidebar>
        <SidebarCard>
          <SidebarTitle>Quick Info</SidebarTitle>
          <InfoItem>
            <Globe size={16} />
            <span>Category: {tool.category}</span>
          </InfoItem>
          <InfoItem>
            <Star size={16} />
            <span>Popularity: {tool.popularity}</span>
          </InfoItem>
          <InfoItem>
            <Calendar size={16} />
            <span>Added: {new Date(tool.createdAt).toLocaleDateString()}</span>
          </InfoItem>
          {tool.submittedBy && (
            <InfoItem>
              <User size={16} />
              <span>Submitted by: {tool.submittedBy.username}</span>
            </InfoItem>
          )}
        </SidebarCard>

        {similarTools.length > 0 && (
          <SidebarCard>
            <SidebarTitle>Similar Tools</SidebarTitle>
            <SimilarTools>
              {similarTools.map((similarTool) => (
                <SimilarTool key={similarTool._id} to={`/tools/${similarTool._id}`}>
                  <SimilarToolLogo 
                    src={similarTool.logo || 'https://via.placeholder.com/40x40/f1f5f9/64748b?text=AI'} 
                    alt={similarTool.name}
                  />
                  <SimilarToolInfo>
                    <SimilarToolName>{similarTool.name}</SimilarToolName>
                    <SimilarToolCategory>{similarTool.category}</SimilarToolCategory>
                  </SimilarToolInfo>
                </SimilarTool>
              ))}
            </SimilarTools>
          </SidebarCard>
        )}
      </Sidebar>
    </DetailContainer>
  );
}

export default ToolDetailPage;
