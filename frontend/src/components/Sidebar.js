import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronDown, ChevronRight, X } from 'lucide-react';

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 70px;
  width: 280px;
  height: calc(100vh - 70px);
  background: white;
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
  z-index: 998;
  transform: translateX(${props => props.open ? '0' : '-100%'});
  transition: transform 0.3s ease;
  
  @media (max-width: 1024px) {
    transform: translateX(${props => props.open ? '0' : '-100%'});
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SidebarTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  
  @media (max-width: 1024px) {
    display: block;
  }
`;

const CategoryList = styled.div`
  padding: 1rem 0;
`;

const CategorySection = styled.div`
  margin-bottom: 0.5rem;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #f8fafc;
  }
`;

const CategoryName = styled.span`
  font-weight: 500;
  color: #475569;
  font-size: 0.9rem;
`;

const CategoryCount = styled.span`
  background: #f1f5f9;
  color: #64748b;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const SubcategoryList = styled.div`
  background: #f8fafc;
  overflow: hidden;
  max-height: ${props => props.expanded ? '500px' : '0'};
  transition: max-height 0.3s ease;
`;

const SubcategoryItem = styled(Link)`
  display: block;
  padding: 0.5rem 1.5rem 0.5rem 3rem;
  color: #64748b;
  font-size: 0.85rem;
  transition: all 0.2s;
  
  &:hover {
    background: #e2e8f0;
    color: #3b82f6;
  }
  
  &.active {
    background: #dbeafe;
    color: #2563eb;
    border-left: 3px solid #3b82f6;
  }
`;

const categories = [
  {
    name: 'Artificial Intelligence',
    count: 156,
    subcategories: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Computer Vision']
  },
  {
    name: 'Productivity',
    count: 98,
    subcategories: ['Task Management', 'Time Tracking', 'Automation', 'Note Taking']
  },
  {
    name: 'Marketing',
    count: 87,
    subcategories: ['Email Marketing', 'Social Media', 'Content Marketing', 'SEO']
  },
  {
    name: 'Developer Tools',
    count: 124,
    subcategories: ['Code Generation', 'Testing', 'Documentation', 'APIs']
  },
  {
    name: 'Design',
    count: 76,
    subcategories: ['UI Design', 'Graphic Design', 'Logo Design', 'Prototyping']
  },
  {
    name: 'SEO',
    count: 54,
    subcategories: ['Keyword Research', 'Link Building', 'Rank Tracking', 'Analytics']
  },
  {
    name: 'Chatbots',
    count: 43,
    subcategories: ['Customer Service', 'Sales', 'Marketing', 'Support']
  },
  {
    name: 'Social Media',
    count: 62,
    subcategories: ['Management', 'Analytics', 'Scheduling', 'Content Creation']
  },
  {
    name: 'Content Creation',
    count: 89,
    subcategories: ['Writing', 'Video', 'Audio', 'Graphics']
  },
  {
    name: 'No Code',
    count: 71,
    subcategories: ['Website Builders', 'App Builders', 'Automation', 'Databases']
  },
  {
    name: 'Writing',
    count: 68,
    subcategories: ['Copywriting', 'Grammar', 'Translation', 'Summarization']
  },
  {
    name: 'Customer Support',
    count: 45,
    subcategories: ['Help Desk', 'Ticketing', 'Live Chat', 'Knowledge Base']
  },
  {
    name: 'Blogging',
    count: 52,
    subcategories: ['Content Ideas', 'SEO', 'Distribution', 'Analytics']
  },
  {
    name: 'Sales',
    count: 58,
    subcategories: ['CRM', 'Lead Generation', 'Email Outreach', 'Analytics']
  },
  {
    name: 'Productized Services',
    count: 34,
    subcategories: ['Consulting', 'Design', 'Development', 'Marketing']
  },
  {
    name: 'Website Builders',
    count: 41,
    subcategories: ['E-commerce', 'Landing Pages', 'Portfolio', 'Blog']
  },
  {
    name: 'Analytics',
    count: 63,
    subcategories: ['Web Analytics', 'Data Visualization', 'Reporting', 'Insights']
  },
  {
    name: 'iOS',
    count: 28,
    subcategories: ['App Development', 'Testing', 'Analytics', 'Monetization']
  },
  {
    name: 'Developer APIs',
    count: 47,
    subcategories: ['REST APIs', 'GraphQL', 'Webhooks', 'SDKs']
  },
  {
    name: 'Video',
    count: 55,
    subcategories: ['Editing', 'Generation', 'Transcription', 'Analytics']
  },
  {
    name: 'Building Products',
    count: 39,
    subcategories: ['MVP', 'Prototyping', 'Testing', 'Launch']
  },
  {
    name: 'Mac',
    count: 31,
    subcategories: ['Productivity', 'Development', 'Design', 'Utilities']
  },
  {
    name: 'Feedback Tools',
    count: 26,
    subcategories: ['Surveys', 'Polls', 'Reviews', 'Testimonials']
  },
  {
    name: 'Education',
    count: 48,
    subcategories: ['Online Learning', 'Tutoring', 'Assessment', 'Content Creation']
  },
  {
    name: 'Email',
    count: 37,
    subcategories: ['Marketing', 'Automation', 'Analytics', 'Templates']
  }
];

function Sidebar({ open, onToggle }) {
  const [expandedCategories, setExpandedCategories] = useState({});
  const location = useLocation();

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const isActiveCategory = (categoryName) => {
    return location.pathname.includes(`/tools?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <SidebarContainer open={open}>
      <SidebarHeader>
        <SidebarTitle>Categories</SidebarTitle>
        <CloseButton onClick={onToggle}>
          <X size={20} />
        </CloseButton>
      </SidebarHeader>
      
      <CategoryList>
        {categories.map((category) => (
          <CategorySection key={category.name}>
            <CategoryHeader onClick={() => toggleCategory(category.name)}>
              <CategoryName>{category.name}</CategoryName>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CategoryCount>{category.count}</CategoryCount>
                {expandedCategories[category.name] ? (
                  <ChevronDown size={16} color="#64748b" />
                ) : (
                  <ChevronRight size={16} color="#64748b" />
                )}
              </div>
            </CategoryHeader>
            
            <SubcategoryList expanded={expandedCategories[category.name]}>
              {category.subcategories.map((subcategory) => (
                <SubcategoryItem
                  key={subcategory}
                  to={`/tools?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(subcategory)}`}
                  className={isActiveCategory(category.name) ? 'active' : ''}
                >
                  {subcategory}
                </SubcategoryItem>
              ))}
            </SubcategoryList>
          </CategorySection>
        ))}
      </CategoryList>
    </SidebarContainer>
  );
}

export default Sidebar;
