import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
`;

const BreadcrumbNav = styled.div`
  margin-bottom: 2rem;
  color: #666;
  
  a {
    color: #0088ff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ProductInfo = styled.div`
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #1a202c;
  }
  
  .product-name {
    color: #666;
    margin-bottom: 1rem;
  }
  
  .product-code {
    margin: 1rem 0;
    color: #666;
    
    strong {
      color: #333;
    }
  }
  
  .product-specs {
    margin: 1.5rem 0;
    
    h3 {
      margin-bottom: 1rem;
      color: #333;
    }
    
    ul {
      list-style: none;
      padding: 0;
      
      li {
        margin: 0.5rem 0;
        color: #666;
        
        &:before {
          content: "•";
          color: #0088ff;
          margin-right: 0.5rem;
        }
      }
    }
  }
`;

const DetailsSection = styled.div`
  margin-top: 3rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #1a202c;
  }

  .product-content {
    margin-top: 1.5rem;
    
    img {
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      
      th, td {
        padding: 0.75rem;
        border: 1px solid #e2e8f0;
      }
      
      th {
        background: #f8fafc;
        font-weight: 600;
      }
    }
    
    p {
      margin: 1rem 0;
      line-height: 1.6;
    }

    ul, ol {
      padding-left: 1.5rem;
      margin: 1rem 0;
    }
  }
`;

const InquiryButton = styled.button`
  background: #0088ff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 2rem;
  
  &:hover {
    background: #0077ee;
  }
`;

const RelatedProducts = styled.div`
  margin-top: 3rem;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }
`;

const RelatedProductCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .content {
    padding: 1rem;
    
    h3 {
      margin: 0;
      font-size: 1.1rem;
      color: #1a202c;
    }
  }
`;

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 检查并打印完整的 location 对象，用于调试
  console.log('Location:', location);
  
  // 如果没有 state 或 product，重定向到产品列表
  if (!location.state?.product) {
    console.log('No product data found, redirecting...');
    navigate('/products');
    return null;
  }

  const product = location.state.product;
  
  // 打印产品数据，用于调试
  console.log('Product data:', product);

  return (
    <>
      <Header />
      <Container>
        <BreadcrumbNav>
          <a href="/">首页</a> &gt; <a href="/products">产品列表</a> &gt; {product.title || '产品详情'}
        </BreadcrumbNav>
        
        <ProductLayout>
          <ImageSection>
            {product.image && (
              <img src={product.image} alt={product.title || '产品图片'} />
            )}
          </ImageSection>
          
          <ProductInfo>
            <h1>{product.title || '未命名产品'}</h1>
            {product.name && <p className="product-name">{product.name}</p>}
            
            {product.code && (
              <div className="product-code">
                <strong>产品编码：</strong> {product.code}
              </div>
            )}
            
            {/* 移除 specs 相关的渲染，先专注于显示产品内容 */}
            <InquiryButton>发送询价</InquiryButton>
          </ProductInfo>
        </ProductLayout>
        
        <DetailsSection>
          <h2>产品详情</h2>
          {product.decodedContent && (
            <div 
              className="product-content"
              dangerouslySetInnerHTML={{ __html: product.decodedContent }}
            />
          )}
        </DetailsSection>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail; 