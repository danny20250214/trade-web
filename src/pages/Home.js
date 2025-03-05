import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

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
  filter: grayscale(100%);
  transition: filter 0.3s ease;
  &:hover {
    filter: grayscale(0);
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

// 在 export default 组件内添加产品部分
const products = [
  {
    category: "HDMI系列",
    name: "8K HDMI 2.1光纤线缆",
    description: "支持8K@60Hz、4K@120Hz超高清视频传输",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1",
    badge: "新品",
    features: [
      "48Gbps超高带宽",
      "支持动态HDR",
      "最大传输距离100米",
      "向下兼容HDMI 2.0"
    ]
  },
  {
    category: "USB系列",
    name: "USB4 Type-C线缆",
    description: "全功能USB4接口，支持高速数据传输",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1",
    badge: "热销",
    features: [
      "40Gbps传输速率",
      "100W快速充电",
      "8K视频传输",
      "雷电3兼容"
    ]
  },
  {
    category: "光纤系列",
    name: "工业级光纤连接器",
    description: "高可靠性光纤传输解决方案",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1",
    badge: "专业",
    features: [
      "IP67防护等级",
      "抗拉抗压",
      "极低信号损耗",
      "使用寿命长"
    ]
  }
];

// 删除第一个默认导出
const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    require('../images/slider/1.png'),
    require('../images/slider/2.png'),
    require('../images/slider/3.png'),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header />
      <Container>
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

        <ProductSection>
          <ProductContainer>
            <ProductHeader>
              <ProductTitle>产品中心</ProductTitle>
              <ProductSubtitle>
                专业的线缆制造技术，为您提供全方位的连接解决方案
              </ProductSubtitle>
            </ProductHeader>
            
            <ProductGrid>
              {products.map((product, index) => (
                <ProductCard key={index}>
                  <ProductImage>
                    <img src={product.image} alt={product.name} />
                    {product.badge && <ProductBadge>{product.badge}</ProductBadge>}
                  </ProductImage>
                  <ProductContent>
                    <ProductCategory>{product.category}</ProductCategory>
                    <ProductName>{product.name}</ProductName>
                    <ProductDescription>{product.description}</ProductDescription>
                    <ProductFeatures>
                      {product.features.map((feature, idx) => (
                        <ProductFeature key={idx}>
                          <FeatureIcon>•</FeatureIcon>
                          {feature}
                        </ProductFeature>
                      ))}
                    </ProductFeatures>
                  </ProductContent>
                </ProductCard>
              ))}
            </ProductGrid>
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
              <PartnerLogo src="http://www.linkworldgroup.com/uploads/201817542/small/lenovo-logo53267954587.jpg" alt="Lenovo" />
              <PartnerLogo src="http://www.linkworldgroup.com/uploads/201817542/small/lg-logo53267954587.jpg" alt="LG" />
              <PartnerLogo src="http://www.linkworldgroup.com/uploads/201817542/small/griffin-logo53267954587.jpg" alt="Griffin" />
              <PartnerLogo src="http://www.linkworldgroup.com/uploads/201817542/small/alpine-logo53267954587.jpg" alt="Alpine" />
              <PartnerLogo src="http://www.linkworldgroup.com/uploads/201817542/small/gemalto-logo53267954587.jpg" alt="Gemalto" />
              <PartnerLogo src="http://www.linkworldgroup.com/uploads/201817542/small/3m-logo53267954587.jpg" alt="3M" />
            </PartnersGrid>
          </ProductContainer>
        </PartnersSection>

        <NewsSection>
          <NewsList>
            <NewsItem>
              <NewsDate>2024-03-20</NewsDate>
              <NewsTitle>公司成功参展2024年香港春季电子展</NewsTitle>
            </NewsItem>
            <NewsItem>
              <NewsDate>2024-03-15</NewsDate>
              <NewsTitle>新一代8K HDMI线缆正式投产</NewsTitle>
            </NewsItem>
            <NewsItem>
              <NewsDate>2024-03-10</NewsDate>
              <NewsTitle>获得ISO 14001环境管理体系认证</NewsTitle>
            </NewsItem>
          </NewsList>
        </NewsSection>

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
      </Container>
      <Footer />
    </>
  );
}; 

// Add the export statement
export default HomePage;