import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ToolsContext = createContext();

export const ToolsProvider = ({ children }) => {
  const allToolsRef = useRef([]);
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredTools, setFeaturedTools] = useState([]);
  const [productOfTheDay, setProductOfTheDay] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStaticData = async () => {
      setLoading(true);
      try {
        // file:// protocol (Electron) resolves absolute paths from filesystem
        // root, so use a relative path there; web uses the absolute path.
        const dataUrl = window.electronAPI ? './data/tools.json' : '/data/tools.json';
        const response = await fetch(dataUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }

        allToolsRef.current = data;

        const limit = 12;
        const pages = Math.ceil(data.length / limit) || 1;
        setTools(data.slice(0, limit));
        setPagination({ page: 1, pages, total: data.length });

        const categoryMap = {};
        data.forEach(tool => {
          if (tool.category) {
            categoryMap[tool.category] = (categoryMap[tool.category] || 0) + 1;
          }
        });
        setCategories(Object.entries(categoryMap).map(([category, count]) => ({ category, count })));

        setFeaturedTools(data.filter(tool => tool.featured));

        const featured = data.find(tool => tool.featured);
        setProductOfTheDay(featured || data[0]);

      } catch (err) {
        setError('Failed to load tools data');
        console.error('Error loading static data:', err);
        setTools([]);
        setCategories([]);
        setFeaturedTools([]);
        setProductOfTheDay(null);
      } finally {
        setLoading(false);
      }
    };

    loadStaticData();
  }, []);

  const fetchTools = (filters = {}) => {
    try {
      let filtered = [...allToolsRef.current];

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
          (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        );
      }

      const sortBy = filters.sortBy || filters.sort;
      if (!sortBy || sortBy === 'popularity') {
        filtered.sort((a, b) => b.popularity - a.popularity);
      } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }

      const page = parseInt(filters.page) || 1;
      const limit = filters.limit || 12;
      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);
      const pages = Math.ceil(filtered.length / limit) || 1;

      setTools(paginated);
      setPagination({ page, pages, total: filtered.length });

      return { tools: paginated, total: filtered.length };
    } catch (err) {
      console.error('Error filtering tools:', err);
      return { tools: [], total: 0 };
    }
  };

  const searchTools = (query, filters = {}) => {
    return fetchTools({ ...filters, search: query });
  };

  const fetchToolById = (id) => {
    return allToolsRef.current.find(tool => tool.name === id) || null;
  };

  const value = {
    tools,
    categories,
    featuredTools,
    productOfTheDay,
    pagination,
    loading,
    error,
    fetchTools,
    fetchCategories: () => {},
    fetchFeaturedTools: () => {},
    fetchProductOfTheDay: () => {},
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
