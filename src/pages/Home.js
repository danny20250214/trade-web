import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { useNavigate } from 'react-router-dom';
import { product } from '../api/product';

// 导入所需图片
import { ReactComponent as ArrowRightIcon } from "feather-icons/dist/icons/arrow-right.svg";

const Container = styled.div`
  position: relative;
`;

const HeroSection = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1') center/cover no-repeat;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 10;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  @media (min-width: 1024px) {
    font-size: 3.75rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const ActionButton = styled.a`
  display: inline-block;
  padding: 0.75rem 2rem;
  font-weight: bold;
  border-radius: 9999px;
  background-color: #0088ff;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    background-color: #006ee6;
  }
`;

const ProductSection = styled.div`
  padding: 5rem 0;
  background-color: #f7fafc;
`;

const ProductContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ProductHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const ProductTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a202c;
  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

const ProductSubtitle = styled.p`
  margin-top: 1rem;
  font-size: 1.25rem;
  color: #4a5568;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.div`
  position: relative;
  height: 16rem;
  width: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const ProductBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #0088ff;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
`;

const ProductContent = styled.div`
  padding: 1.5rem;
`;

const ProductCategory = styled.p`
  color: #0088ff;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  color: #4a5568;
  font-size: 1rem;
`;

const ProductFeatures = styled.ul`
  margin-top: 1rem;
  & > * + * {
    margin-top: 0.5rem;
  }
`;

const ProductFeature = styled.li`
  display: flex;
  align-items: center;
  color: #4a5568;
`;

const FeatureIcon = styled.span`
  margin-right: 0.5rem;
  color: #0088ff;
`;

const NewsSection = styled.div`
  padding: 5rem 0;
`;

const NewsList = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const NewsItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const NewsDate = styled.span`
  color: #718096;
  margin-right: 1rem;
`;

const NewsTitle = styled.h4`
  font-size: 1.125rem;
  color: #2d3748;
  transition: color 0.3s ease;
  &:hover {
    color: #0088ff;
  }
`;

// 新增样式组件
const StatsSection = styled.div`
  padding: 5rem 0;
  background-color: #1a202c;
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatBox = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const PartnersSection = styled.div`
  padding: 5rem 0;
  background-color: #f7fafc;
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const PartnerLogo = styled.img`
  width: 100%;
  max-width: 120px;
  margin: 0 auto;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ContactSection = styled.div`
  padding: 5rem 0;
  background-color: #1a365d;
  color: white;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ContactInfo = styled.div``;

const ContactForm = styled.form``;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  border: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  border: none;
`;

const SubmitButton = styled.button`
  background-color: #0088ff;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #006ee6;
  }
`;

// 轮播组件
const Carousel = styled.div`
  position: relative;
  overflow: hidden;
  height: 500px;
`;

const CarouselSlide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
  transform: translateX(${props => props.offset}%);
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductItem = styled.div`
  cursor: pointer;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    require('../images/slider/1.png'),
    require('../images/slider/2.png'),
    require('../images/slider/3.png'),
  ];
  const [products, setProducts] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (pageNum = 1) => {
    try {
      const response = await product.getProducts({
        pageNum,
        pageSize: 10
      });
      console.log('API Response:', response);
      if (response.code === 200) {
        setProducts(response);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  // 处理加载更多
  const handleLoadMore = () => {
    if (!loading && pagination.current * pagination.pageSize < pagination.total) {
      fetchProducts(pagination.current + 1);
    }
  };

  // 处理产品点击
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <Container>
      <Header />
      <HeroSection>
        {/* 产品轮播 */}
        <Carousel>
          {slides.map((slide, index) => (
            <CarouselSlide key={index} offset={(index - currentSlide) * 100}>
              <CarouselImage src={slide} alt="Slider Image" />
            </CarouselSlide>
          ))}
        </Carousel>

        {/* 公司数据统计 */}
        <StatsSection>
          <StatsGrid>
            <StatBox>
              <StatNumber>700+</StatNumber>
              <StatLabel>LinkWorld专业员工</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>3</StatNumber>
              <StatLabel>现代化工厂</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>50+</StatNumber>
              <StatLabel>合作国家</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>19</StatNumber>
              <StatLabel>年行业经验</StatLabel>
            </StatBox>
          </StatsGrid>
        </StatsSection>
      </HeroSection>
      
      <ProductSection id="products">
        <ProductContainer>
          <ProductHeader>
            <ProductTitle>产品中心</ProductTitle>
            <ProductSubtitle>
              专业的线缆制造技术，为您提供全方位的连接解决方案
            </ProductSubtitle>
          </ProductHeader>
          
          <div className="product-list">
            {products && products.rows && products.rows.map((product) => (
              <ProductItem 
                key={product.id} 
                onClick={() => handleProductClick(product)}
              >
                <div className="product-image">
                  {product.images && (
                    <img 
                      src={product.images.split(',')[0]} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default-product.png';
                      }}
                    />
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.title}</p>
                </div>
              </ProductItem>
            ))}
          </div>
        </ProductContainer>
      </ProductSection>

      {/* 合作伙伴logo墙 */}
      <PartnersSection>
        <ProductContainer>
          <ProductHeader>
            <ProductTitle>全球客户与合作伙伴</ProductTitle>
            <ProductSubtitle>
              我们与全球知名企业建立了长期稳定的合作关系
            </ProductSubtitle>
          </ProductHeader>
          <PartnersGrid>
            <PartnerLogo src={require("../images/log/lenovo.png")} alt="Lenovo" />
            <PartnerLogo src={require("../images/log/img.png")} alt="LG" />
            <PartnerLogo src={require("../images/log/img_2.png")} alt="Griffin" />
            <PartnerLogo src={require("../images/log/img_3.png")} alt="Alpine" />
            <PartnerLogo src={require("../images/log/img_4.png")} alt="Gemalto" />
            <PartnerLogo src={require("../images/log/img_5.png")} alt="3M" />
            <PartnerLogo src={require("../images/log/img_6.png")} alt="3M" />
            <PartnerLogo src={require("../images/log/img_7.png")} alt="3M" />
            <PartnerLogo src={require("../images/log/img_8.png")} alt="3M" />
            <PartnerLogo src={require("../images/log/img_9.png")} alt="3M" />
            <PartnerLogo src={require("../images/log/img_10.png")} alt="3M" />
            <PartnerLogo src={require("../images/log/img_11.png")} alt="3M" />
          </PartnersGrid>
        </ProductContainer>
      </PartnersSection>


      {/* 联系我们区域 */}
      <ContactSection>
        <ContactGrid>
          <ContactInfo>
            <h2 style={{fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>联系我们</h2>
            <p style={{marginBottom: '1rem'}}>电话：+86 XXX XXXX XXXX</p>
            <p style={{marginBottom: '1rem'}}>邮箱：info@example.com</p>
            <p>地址：广东省深圳市XXXXXX</p>
          </ContactInfo>
          <ContactForm>
            <Input type="text" placeholder="您的姓名" />
            <Input type="email" placeholder="电子邮箱" />
            <TextArea rows="4" placeholder="请输入您的留言"></TextArea>
            <SubmitButton type="submit">发送信息</SubmitButton>
          </ContactForm>
        </ContactGrid>
      </ContactSection>
      
      <Footer />
      <style jsx>{`
        .product-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          padding: 20px;
        }

        .product-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-info {
          padding: 15px;
        }

        .product-info h3 {
          margin: 0 0 10px;
          font-size: 18px;
        }

        .product-info p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
      `}</style>
    </Container>
  );
};

export default Home;