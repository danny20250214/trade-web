import React, { useState } from 'react';
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
  
  .product-title {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 1.5rem;
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
  const product = location.state?.product;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const images = product?.images || [];

  if (!product) {
    navigate('/products');
    return null;
  }

  const handleMouseMove = (e) => {
    if (!isZoomed) return;

    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    image.style.transformOrigin = `${percentX}% ${percentY}%`;
  };

  return (
    <>
      <Header />
      <Container>
        <BreadcrumbNav>
          <a href="/">首页</a> &gt; <a href="/products">产品列表</a> &gt; {product.name}
        </BreadcrumbNav>

        <ProductLayout>
          <ImageSection>
            {images.length > 0 ? (
              <GalleryContainer>
                <MainImageWrapper>
                  <MainImage
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={handleMouseMove}
                    isZoomed={isZoomed}
                  >
                    <img src={images[currentImageIndex]} alt={product.name} />
                  </MainImage>
                </MainImageWrapper>

                <ThumbnailStrip>
                  <ThumbnailScroller>
                    {images.map((image, index) => (
                      <ThumbnailItem
                        key={index}
                        active={index === currentImageIndex}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img src={image} alt={`Thumbnail ${index + 1}`} />
                      </ThumbnailItem>
                    ))}
                  </ThumbnailScroller>
                </ThumbnailStrip>
              </GalleryContainer>
            ) : (
              <NoImage>暂无图片</NoImage>
            )}
          </ImageSection>

          <ProductInfo>
            <h1>{product.name}</h1>
            {product.title && <p className="product-title">{product.title}</p>}


            {<InquiryButton>发送询价</InquiryButton>}
          </ProductInfo>
        </ProductLayout>

        <DetailsSection>
          <h2>产品详情</h2>
          <div
            className="product-content"
            dangerouslySetInnerHTML={{ __html: product.decodedContent }}
          />
        </DetailsSection>
      </Container>
      <Footer />
    </>
  );
};

// 更新样式组件
const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const MainImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  background: #f8f8f8;
`;

const MainImage = styled.div`
  width: 100%;
  height: 100%;
  cursor: ${props => props.isZoomed ? 'zoom-out' : 'zoom-in'};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
    transform: ${props => props.isZoomed ? 'scale(2)' : 'scale(1)'};
  }
`;

const ThumbnailStrip = styled.div`
  width: 100%;
  padding: 10px 0;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 30px;
    z-index: 1;
    pointer-events: none;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, #fff, transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, #fff, transparent);
  }
`;

const ThumbnailScroller = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 0 5px;
  scroll-behavior: smooth;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
    
    &:hover {
      background: #666;
    }
  }
`;

const ThumbnailItem = styled.div`
  flex: 0 0 80px;
  height: 80px;
  border: 2px solid ${props => props.active ? '#0088ff' : '#e2e8f0'};
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  
  &:hover {
    border-color: #0088ff;
    
    img {
      transform: scale(1.1);
    }
  }
`;

const NoImage = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #999;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
`;

export default ProductDetail; 