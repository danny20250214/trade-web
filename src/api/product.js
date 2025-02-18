import axios from './axios';

export const product = {
  // 获取产品列表
  getProducts: async (params) => {
    try {
      const response = await axios.get('/system/product/list', { params });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '获取产品列表失败'
      };
    }
  },
  
  // 获取分类树
  getCategoryTree: async () => {
    try {
      const response = await axios.get('/system/category/treeselect');
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '获取分类树失败'
      };
    }
  }
}; 