import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { useNavigate } from 'react-router-dom';
import { product } from '../api/product';
import axios from 'axios';
import { message } from 'antd';

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
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div``;

const InputLabel = styled.label`
  display: grid;
  grid-template-columns: 100px 1fr;  // 左侧标签固定宽度，右侧自适应
  align-items: center;
  gap: 1.5rem;
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 1.5rem;

  &.message-label {
    align-items: start;
    padding-top: 0.5rem;
  }
`;

const FormField = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  width: 100%;
  color: #1a202c;
  background: #ffffff;
  
  &::placeholder {
    color: #a0aec0;
  }
  
  &:focus {
    outline: none;
    border-color: #0088ff;
    box-shadow: 0 0 0 2px rgba(0,136,255,0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  width: 100%;
  resize: vertical;
  min-height: 120px;
  color: #1a202c;
  background: #ffffff;
  
  &::placeholder {
    color: #a0aec0;
  }
  
  &:focus {
    outline: none;
    border-color: #0088ff;
    box-shadow: 0 0 0 2px rgba(0,136,255,0.2);
  }
`;

const RequiredField = styled.span`
  color: #ff4d4f;
  margin-left: 4px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: #0088ff;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-left: 100px;  // 对齐输入框
  width: fit-content;
  
  &:hover {
    background-color: #006ee6;
  }
  
  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
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

// 添加新的样式组件
const AboutSection = styled.div`
  padding: 5rem 0;
  background-color: #fff;
`;

const AboutContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 1rem;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  color: #4a5568;
  line-height: 1.8;
  font-size: 1.1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  p {
    margin-bottom: 1.5rem;
    text-align: justify;
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 表单验证
    if (!formData.name.trim()) {
      message.error('姓名为必填项');
      return;
    }
    if (!formData.email.trim()) {
      message.error('邮箱为必填项');
      return;
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      message.error('请输入有效的邮箱地址');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('/system/inquiry', {
        name: formData.name,
        email: formData.email,
        message: formData.message || ''
      });

      if (response.data.code === 200) {
        message.success('留言提交成功！');
        // 清空表单
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        message.error(response.data.msg || '提交失败，请稍后重试');
      }
    } catch (error) {
      console.error('提交留言失败:', error);
      message.error('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
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
      
      {/* 添加关于我们部分 */}
      <AboutSection>
        <AboutContainer>
          <AboutHeader>
            <AboutTitle>关于我们</AboutTitle>
          </AboutHeader>
          <AboutContent>
            <div>
              <p>
                Linkworld 成立于2005年，专注于为消费电子、安防、家电、汽车、通信、绿色能源和工业应用提供高品质定制线缆。
              </p>
              <p>
                我们拥有三个通过ISO 9001和UL认证的工厂，约700名员工。我们在中国和美国的销售团队与工厂各部门保持密切合作，为客户提供快速的设计、制造和营销响应。我们的产品和服务获得了联想、LG、Griffin、Alpine、Gemalto、3M、OEHLBACH等客户的认可和赞誉。
              </p>
            </div>
            <div>
              <p>
                经过13年的运营和与客户、供应商的良好合作，我们在解决产品需求方面建立了精密制造系统、质量控制系统、产业集成系统和研发系统的无可争议的价值。
              </p>
              <p>
                Linkworld 自2005年以来专注于OEM/ODM线缆组件，目前为联想、LG、LINDY、OEHLBACH、ALTINEX等客户提供AV线缆、USB线缆、转接器等产品，并为Flextronics、3M、Jabil、Alpine、SVI提供各类线束，具有灵活的起订量、短交期、合理的价格和高品质。
              </p>
            </div>
          </AboutContent>
        </AboutContainer>
      </AboutSection>

      <ProductSection id="products">
        <ProductContainer>
          <ProductHeader>
            <ProductTitle>热门产品</ProductTitle>
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
            <h2>联系我们</h2>
            <p>电话：+86 XXX XXXX XXXX</p>
            <p>邮箱：info@example.com</p>
            <p>地址：广东省深圳市XXXXXX</p>
          </ContactInfo>
          <ContactForm onSubmit={handleSubmit}>
            <InputLabel>
              <span>姓名<RequiredField>*</RequiredField></span>
              <FormField>
                <Input
                  type="text"
                  name="name"
                  placeholder="请输入您的姓名"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormField>
            </InputLabel>
            
            <InputLabel>
              <span>邮箱<RequiredField>*</RequiredField></span>
              <FormField>
                <Input
                  type="email"
                  name="email"
                  placeholder="请输入您的邮箱"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormField>
            </InputLabel>
            
            <InputLabel className="message-label">
              <span>留言</span>
              <FormField>
                <TextArea
                  name="message"
                  rows="4"
                  placeholder="请输入您的留言"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </FormField>
            </InputLabel>
            
            <SubmitButton 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? '提交中...' : '发送信息'}
            </SubmitButton>
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