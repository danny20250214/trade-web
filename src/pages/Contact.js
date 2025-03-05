import React, { useState } from "react";  // 修改这行，添加 useState
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { ReactComponent as MapPinIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as PhoneIcon } from "feather-icons/dist/icons/phone.svg";
import { ReactComponent as MailIcon } from "feather-icons/dist/icons/mail.svg";
import { message } from 'antd';
import axios from "../api/axios";

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #1a202c;
  text-align: center;
  margin-bottom: 3rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ContactTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0088ff;
  margin-bottom: 1.5rem;
`;

const ContactInfo = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  svg {
    width: 20px;
    height: 20px;
    margin-right: 1rem;
    color: #0088ff;
    flex-shrink: 0;
  }
`;

const InfoText = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('/system/inquiry', {
          name: formData.name,
          email: formData.email,
          mobile: formData.phone,
          company: formData.company,
          remark: formData.message
        });

        if (response.data.code === 200) {
          message.success('提交成功！');
          // 重置表单
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            message: ''
          });
        } else {
          message.error(response.data.msg || '提交失败，请稍后重试');
        }
      } catch (error) {
        console.error('提交出错:', error);
        message.error('网络错误，请稍后重试');
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Title>联系我们</Title>
          <ContactGrid>
            <ContactCard>
              <ContactTitle>深圳办事处</ContactTitle>
              <ContactInfo>
                <InfoRow>
                  <MapPinIcon />
                  <InfoText>深圳市宝安区福永街道凤凰工业园</InfoText>
                </InfoRow>
                <InfoRow>
                  <PhoneIcon />
                  <InfoText>+86 139 2686 6959</InfoText>
                </InfoRow>
                <InfoRow>
                  <MailIcon />
                  <InfoText>sales@linkworld.com</InfoText>
                </InfoRow>
              </ContactInfo>
            </ContactCard>

            {/* 询价表单 */}
            <ContactCard>
              <Form onSubmit={handleSubmit}>
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
                  <Label>公司</Label>
                  <Input
                    type="company"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({...formData, company: e.target.value});
                      setErrors({...errors, company: ''});
                    }}
                  />
                  {errors.company && <ErrorText>{errors.company}</ErrorText>}
                </FormGroup>
                <FormGroup>
                  <Label>留言</Label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                  />
                </FormGroup>
                <SubmitButton type="submit">提交咨询</SubmitButton>
              </Form>
            </ContactCard>
          </ContactGrid>
        </Content>
      </Container>
      <Footer />
    </>
  );
};

// 样式组件
const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #0088ff;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #0088ff;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #0088ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background: #0077ee;
  }
`;

const ErrorText = styled.span`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 4px;
  display: block;
`;

export default Contact;