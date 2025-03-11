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

            <ContactCard>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>姓名<span className="required">*</span></Label>
                  <div>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({...formData, name: e.target.value});
                        setErrors({...errors, name: ''});
                      }}
                      placeholder="请输入您的姓名"
                    />
                    {errors.name && <ErrorText>{errors.name}</ErrorText>}
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label>邮箱</Label>
                  <div>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({...formData, email: e.target.value});
                        setErrors({...errors, email: '', phone: ''});
                      }}
                      placeholder="请输入您的邮箱"
                    />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label>电话</Label>
                  <div>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({...formData, phone: e.target.value});
                        setErrors({...errors, email: '', phone: ''});
                      }}
                      placeholder="请输入您的电话"
                    />
                    {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label>公司</Label>
                  <div>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => {
                        setFormData({...formData, company: e.target.value});
                        setErrors({...errors, company: ''});
                      }}
                      placeholder="请输入您的公司名称"
                    />
                  </div>
                </FormGroup>

                <FormGroup className="message-group">
                  <Label>留言</Label>
                  <div>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="请输入您的留言内容"
                      rows={4}
                    />
                  </div>
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

// 修改表单相关的样式组件
const Form = styled.form`
  width: 100%;
  padding: 2rem;
`;

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;  // 左侧标签固定宽度
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1.5rem;

  &.message-group {
    align-items: start;
    margin-top: 0.5rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
  color: #1a202c;
  white-space: nowrap;

  .required {
    color: #ff4d4f;
    margin-left: 4px;
  }
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #0088ff;
    box-shadow: 0 0 0 2px rgba(0,136,255,0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: #0088ff;
    box-shadow: 0 0 0 2px rgba(0,136,255,0.1);
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 2rem;
  background: #0088ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 100px;  // 对齐输入框
  width: fit-content;
  
  &:hover {
    background: #0077ee;
  }

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 4px;
  grid-column: 2;  // 错误信息在输入框下方
`;

export default Contact;