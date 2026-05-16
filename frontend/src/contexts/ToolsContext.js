import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ToolsContext = createContext();

export const useTools = () => {
  const context = useContext(ToolsContext);
  if (!context) {
    throw new Error('useTools must be used within a ToolsProvider');
  }
  return context;
};

export const ToolsProvider = ({ children }) => {
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredTools, setFeaturedTools] = useState([]);
  const [productOfTheDay, setProductOfTheDay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchCategories();
    fetchFeaturedTools();
    fetchProductOfTheDay();
  }, []);

  const fetchTools = async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/tools', { params });
      setTools(response.data.tools);
      setPagination(response.data.pagination);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch tools:', error);
      return { tools: [], pagination: {} };
    } finally {
      setLoading(false);
    }
  };

  const fetchToolById = async (id) => {
    try {
      const response = await axios.get(`/api/tools/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch tool:', error);
      return null;
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/tools/categories/list');
      setCategories(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
  };

  const fetchFeaturedTools = async () => {
    try {
      const response = await axios.get('/api/tools/featured/list');
      setFeaturedTools(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch featured tools:', error);
      return [];
    }
  };

  const fetchProductOfTheDay = async () => {
    try {
      const response = await axios.get('/api/tools/product-of-the-day/today');
      setProductOfTheDay(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product of the day:', error);
      return null;
    }
  };

  const searchTools = async (query, params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/tools/search/query', { 
        params: { q: query, ...params } 
      });
      setTools(response.data.tools);
      setPagination(response.data.pagination);
      return response.data;
    } catch (error) {
      console.error('Failed to search tools:', error);
      return { tools: [], pagination: {} };
    } finally {
      setLoading(false);
    }
  };

  const submitTool = async (toolData) => {
    try {
      const response = await axios.post('/api/submissions', toolData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Submission failed' 
      };
    }
  };

  const getUserSubmissions = async (params = {}) => {
    try {
      const response = await axios.get('/api/submissions/my', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to fetch submissions' 
      };
    }
  };

  const value = {
    tools,
    categories,
    featuredTools,
    productOfTheDay,
    loading,
    pagination,
    fetchTools,
    fetchToolById,
    fetchCategories,
    fetchFeaturedTools,
    fetchProductOfTheDay,
    searchTools,
    submitTool,
    getUserSubmissions
  };

  return (
    <ToolsContext.Provider value={value}>
      {children}
    </ToolsContext.Provider>
  );
};
