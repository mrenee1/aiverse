import React, { createContext, useContext, useState, useEffect } from 'react';

const ToolsContext = createContext();

export const ToolsProvider = ({ children }) => {
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredTools, setFeaturedTools] = useState([]);
  const [productOfTheDay, setProductOfTheDay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load static data from JSON file
  useEffect(() => {
    const loadStaticData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/data/tools.json');
        const data = await response.json();
        setTools(data);
        
        // Extract categories
        const categoryMap = {};
        data.forEach(tool => {
          if (tool.category) {
            categoryMap[tool.category] = (categoryMap[tool.category] || 0) + 1;
          }
        });
        setCategories(Object.entries(categoryMap).map(([category, count]) => ({ category, count })));
        
        // Set featured tools
        setFeaturedTools(data.filter(tool => tool.featured));
        
        // Set product of the day (first featured tool)
        const featured = data.find(tool => tool.featured);
        setProductOfTheDay(featured || data[0]);
        
      } catch (err) {
        setError('Failed to load tools data');
        console.error('Error loading static data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStaticData();
  }, []);

  // Filter tools locally
  const fetchTools = (filters = {}) => {
    let filtered = [...tools];
    
    if (filters.category) {
      filtered = filtered.filter(tool => tool.category === filters.category);
    }
    if (filters.featured) {
      filtered = filtered.filter(tool => tool.featured);
    }
    if (filters.deals) {
      filtered = filtered.filter(tool => tool.deals);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Sort
    if (filters.sort === 'popularity') {
      filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (filters.sort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 12;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    
    return { tools: paginated, total: filtered.length };
  };

  // Search tools locally
  const searchTools = (query, filters = {}) => {
    return fetchTools({ ...filters, search: query });
  };

  // Get tool by ID
  const fetchToolById = (id) => {
    return tools.find(tool => tool.name === id) || tools[0];
  };

  const value = {
    tools,
    categories,
    featuredTools,
    productOfTheDay,
    loading,
    error,
    fetchTools,
    fetchCategories: () => {}, // No-op since categories are loaded with tools
    fetchFeaturedTools: () => {}, // No-op since featured tools are loaded with tools
    fetchProductOfTheDay: () => {}, // No-op since product of day is loaded with tools
    searchTools,
    fetchToolById
  };

  return (
    <ToolsContext.Provider value={value}>
      {children}
    </ToolsContext.Provider>
  );
};

export const useTools = () => {
  const context = useContext(ToolsContext);
  if (!context) {
    throw new Error('useTools must be used within a ToolsProvider');
  }
  return context;
};
