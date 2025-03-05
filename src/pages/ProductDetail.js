import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import axios from "../api/axios";
import { message } from 'antd';  // 添加这行导入


// 首先定义所有基础样式组件
const BaseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const InquiryButton = styled(BaseButton)`
  background-color: #0088ff;
  color: white;
  
  &:hover {
    background-color: #0077ee;
  }
`;

const ChatButton = styled(BaseButton)`
  background-color: #25D366;
  color: white;
  
  &:hover {
    background-color: #128C7E;
  }
`;

const SubmitButton = styled(BaseButton)`
  background: #0088ff;
  color: white;
  width: 100%;
  justify-content: center;
  
  &:hover {
    background: #0077ee;
  }
`;

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

// 然后定义主组件
const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isInquiryModalOpen, setInquiryModalOpen] = useState(false);

  // 处理图片数组的函数
  const getImages = (productImages) => {
    if (!productImages) return [];
    if (Array.isArray(productImages)) return productImages;
    if (typeof productImages === 'string') {
      try {
        return productImages.split(',').filter(Boolean);
      } catch (error) {
        console.error('Error processing images:', error);
        return [];
      }
    }
    return [];
  };

  // 使用处理函数获取图片数组
  const images = getImages(product?.images);

  console.log('Product:', product); // 调试用
  console.log('Images:', images); // 调试用

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

  // 处理咨询记录提交
  const handleInquirySubmit = async (formData) => {
    try {
      const response = await axios.post('/system/inquiry', {
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        remark: formData.message
      });

      if (response.data.code === 200) {
        message.success('询价提交成功！');
        setInquiryModalOpen(false);
      } else {
        message.error(response.data.msg || '提交失败，请稍后重试');
      }
    } catch (error) {
      console.error('提交询价出错:', error);
      message.error('网络错误，请稍后重试');
    }
  };

  // 添加 handleChat 函数
  const handleChat = () => {
    const whatsappNumber = "8613926866959";
    const messageText = `I'm interested in ${product.name}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`, '_blank');
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

            <ButtonGroup>
              <InquiryButton onClick={() => setInquiryModalOpen(true)}>
                <EmailIcon />
                发送询价
              </InquiryButton>
              <ChatButton onClick={handleChat}>
                <WhatsAppIcon />
                在线咨询
              </ChatButton>
            </ButtonGroup>

            <SocialMediaBar>
              <SocialButton href="https://www.facebook.com/your-page" target="_blank">
                <FacebookIcon />
              </SocialButton>
              <SocialButton href="https://twitter.com/your-handle" target="_blank">
                <TwitterIcon />
              </SocialButton>
              <SocialButton href="https://www.linkedin.com/company/your-company" target="_blank">
                <LinkedInIcon />
              </SocialButton>
              <SocialButton onClick={() => window.alert('WeChat ID: YourWeChatID')}>
                <WeChatIcon />
              </SocialButton>
              <SocialButton onClick={() => window.alert('QQ: YourQQNumber')}>
                <QQIcon />
              </SocialButton>
            </SocialMediaBar>
          </ProductInfo>
        </ProductLayout>

        <DetailsSection>
          <h2>产品详情</h2>
          <div
            className="product-content"
            dangerouslySetInnerHTML={{ __html: product.decodedContent }}
          />
        </DetailsSection>

        {/* 询价弹框 */}
        <Modal
          isOpen={isInquiryModalOpen}
          onClose={() => setInquiryModalOpen(false)}
        >
          <InquiryForm onSubmit={handleInquirySubmit} product={product} />
        </Modal>
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

// 询价表单组件
const InquiryForm = ({ onSubmit, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I am interested in ${product.name}`
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // 验证姓名
    if (!formData.name.trim()) {
      newErrors.name = '请输入姓名';
    }
    
    // 验证邮箱格式
    if (formData.email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = '请输入正确的邮箱格式';
      }
    }
    
    // 验证手机号格式
    if (formData.phone) {
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = '请输入正确的手机号格式';
      }
    }
    
    // 验证邮箱和手机号至少填一个
    if (!formData.email && !formData.phone) {
      newErrors.email = '邮箱和手机号至少填写一个';
      newErrors.phone = '邮箱和手机号至少填写一个';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>产品询价</h2>
      <FormGroup>
        <Label>姓名 *</Label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => {
            setFormData({...formData, name: e.target.value});
            setErrors({...errors, name: ''});
          }}
        />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}
      </FormGroup>
      <FormGroup>
        <Label>邮箱</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({...formData, email: e.target.value});
            setErrors({...errors, email: '', phone: ''});
          }}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </FormGroup>
      <FormGroup>
        <Label>电话</Label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => {
            setFormData({...formData, phone: e.target.value});
            setErrors({...errors, email: '', phone: ''});
          }}
        />
        {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
      </FormGroup>
      <FormGroup>
        <Label>留言</Label>
        <Textarea
         /* value={formData.message}*/
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          rows={4}
          required
        />
      </FormGroup>
      <SubmitButton type="submit">提交询价</SubmitButton>
    </Form>
  );
};

// 添加错误提示样式
const ErrorText = styled.span`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 4px;
`;

// 弹框组件
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

// 新增样式组件
const SocialMediaBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f0f0f0;
  color: #333;
  transition: all 0.3s ease;
  cursor: pointer;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    background: ${props => props.color || '#0088ff'};
    color: white;
    transform: translateY(-2px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  max-width: 500px;
  width: 90%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0088ff;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #0088ff;
  }
`;

// 社交媒体图标组件
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 2.396 4.352 2.393 4.771 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const WeChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.81-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.595-6.348zM5.959 5.69a.994.994 0 1 1 0 1.987.994.994 0 0 1 0-1.987zm5.461 0a.994.994 0 1 1 0 1.987.994.994 0 0 1 0-1.987zM24 15.086c0-3.453-3.361-6.259-7.5-6.259-4.14 0-7.5 2.806-7.5 6.259 0 3.454 3.36 6.26 7.5 6.26.848 0 1.668-.124 2.434-.346a.742.742 0 0 1 .616.084l1.634.956a.28.28 0 0 0 .143.047c.139 0 .25-.114.25-.253 0-.062-.025-.123-.041-.183l-.335-1.271a.506.506 0 0 1 .183-.572C22.95 18.728 24 17.008 24 15.086zm-9.941-1.578a.853.853 0 1 1 0 1.706.853.853 0 0 1 0-1.706zm4.688 0a.853.853 0 1 1 0 1.706.853.853 0 0 1 0-1.706z"/>
  </svg>
);

const QQIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.527 4.632 17.316 0 12 0S4.473 4.632 4.473 9.241c0 .274.013.804.014.836l-1.08 2.695a38.97 38.97 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.480.888-.106 1.243.509.486 1.374.679 2.416.679 1.173 0 2.444-.25 3.569-.688.285-.112.581-.112.866-.001 1.125.438 2.396.689 3.57.689 1.042 0 1.907-.193 2.416-.679.374-.355.328-.923-.106-1.243-.482-.356-1.233-.647-1.845-.835 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.582-1.39-.439-4.673z"/>
  </svg>
);

// 添加缺失的图标组件
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default ProductDetail;