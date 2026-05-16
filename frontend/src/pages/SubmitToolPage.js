import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Plus, CheckCircle, AlertCircle } from 'lucide-react';
import { useTools } from '../contexts/ToolsContext';
const SubmitContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const PageSubtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.95rem;
`;

const Required = styled.span`
  color: #ef4444;
  margin-left: 0.25rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const TagInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  font-size: 0.9rem;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  color: #475569;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #e2e8f0;
  }
`;

const RemoveTag = styled.span`
  cursor: pointer;
  color: #64748b;
  
  &:hover {
    color: #ef4444;
  }
`;

const HelpText = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PrimaryButton = styled(Button)`
  background: #3b82f6;
  color: white;
  border: none;
  
  &:hover:not(:disabled) {
    background: #2563eb;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(Button)`
  background: white;
  color: #64748b;
  border: 1px solid #d1d5db;
  
  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: #dcfce7;
  color: #166534;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: #fee2e2;
  color: #991b1b;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const categories = [
  'Artificial Intelligence',
  'Productivity',
  'Marketing',
  'Developer Tools',
  'Design',
  'SEO',
  'Chatbots',
  'Social Media',
  'Content Creation',
  'No Code',
  'Writing',
  'Customer Support',
  'Blogging',
  'Sales',
  'Productized Services',
  'Website Builders',
  'Analytics',
  'iOS',
  'Developer APIs',
  'Video',
  'Building Products',
  'Mac',
  'Feedback Tools',
  'Education',
  'Email'
];

function SubmitToolPage() {
  const navigate = useNavigate();
  const { submitTool } = useTools();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    category: '',
    tags: []
  });
  
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Tool name is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!formData.website.trim()) {
      setError('Website URL is required');
      return false;
    }
    if (!formData.category) {
      setError('Category is required');
      return false;
    }
    
    // Validate URL format
    try {
      new URL(formData.website);
    } catch {
      setError('Please enter a valid website URL');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const result = await submitTool(formData);
      if (result.success) {
        setSuccess(true);
        setFormData({
          name: '',
          description: '',
          website: '',
          category: '',
          tags: []
        });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <SubmitContainer>
        <FormCard>
          <SuccessMessage>
            <CheckCircle size={20} />
            <div>
              <strong>Tool submitted successfully!</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
                Your tool has been submitted for review and will be available on our platform once approved by our team.
              </p>
            </div>
          </SuccessMessage>
          
          <ButtonGroup>
            <SecondaryButton onClick={() => navigate('/tools')}>
              Browse Tools
            </SecondaryButton>
            <PrimaryButton onClick={() => {
              setSuccess(false);
            }}>
              Submit Another Tool
            </PrimaryButton>
          </ButtonGroup>
        </FormCard>
      </SubmitContainer>
    );
  }

  return (
    <SubmitContainer>
      <PageHeader>
        <PageTitle>Submit an AI Tool</PageTitle>
        <PageSubtitle>
          Help the community discover new AI tools by submitting your favorite ones. 
          All submissions are reviewed before being published.
        </PageSubtitle>
      </PageHeader>

      <FormCard>
        {error && (
          <ErrorMessage>
            <AlertCircle size={20} />
            {error}
          </ErrorMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <FormSection>
            <Label>
              Tool Name <Required>*</Required>
            </Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., ChatGPT, Midjourney, Notion AI"
              required
            />
            <HelpText>
              The official name of the AI tool
            </HelpText>
          </FormSection>

          <FormSection>
            <Label>
              Description <Required>*</Required>
            </Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Briefly describe what this AI tool does and its key features..."
              required
            />
            <HelpText>
              Keep it concise and informative (max 500 characters)
            </HelpText>
          </FormSection>

          <FormSection>
            <Label>
              Website URL <Required>*</Required>
            </Label>
            <Input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://example.com"
              required
            />
            <HelpText>
              Direct link to the tool's official website
            </HelpText>
          </FormSection>

          <FormSection>
            <Label>
              Category <Required>*</Required>
            </Label>
            <Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <HelpText>
              Choose the most appropriate category for this tool
            </HelpText>
          </FormSection>

          <FormSection>
            <Label>Tags</Label>
            <form onSubmit={handleAddTag}>
              <TagInput
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(e);
                  }
                }}
              />
            </form>
            <TagsContainer>
              {formData.tags.map((tag) => (
                <Tag key={tag}>
                  {tag}
                  <RemoveTag onClick={() => handleRemoveTag(tag)}>
                    ×
                  </RemoveTag>
                </Tag>
              ))}
            </TagsContainer>
            <HelpText>
              Add up to 10 relevant tags (press Enter or click Add to add a tag)
            </HelpText>
          </FormSection>

          <ButtonGroup>
            <SecondaryButton type="button" onClick={() => navigate('/tools')}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={loading}>
              <Plus size={18} />
              {loading ? 'Submitting...' : 'Submit Tool'}
            </PrimaryButton>
          </ButtonGroup>
        </Form>
      </FormCard>
    </SubmitContainer>
  );
}

export default SubmitToolPage;
