import React, { useState } from "react";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';  // 添加 useNavigate

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #1a202c;
  text-align: center;
  margin-bottom: 3rem;
`;

const SolutionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SolutionCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const SolutionImage = styled.div`
  height: 240px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${SolutionCard}:hover & img {
    transform: scale(1.05);
  }
`;

const SolutionContent = styled.div`
  padding: 2rem;
`;

const SolutionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 1rem;
`;

const SolutionDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ReadMore = styled.a`
  display: inline-flex;
  align-items: center;
  color: #0088ff;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #006ee6;
  }
  
  &:after {
    content: '→';
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }
  
  &:hover:after {
    transform: translateX(4px);
  }
`;

const solutions = [
  {
    title: "高频线缆解决方案",
    image: "http://www.linkworldgroup.com/Content/upload/2018378721/201808021507303410241.jpg",
    description: "为满足当今科技行业对更快、更小、更集成的电子产品的发展趋势，Linkworld始终致力于紧跟市场趋势，提供各类多媒体线缆，如USB 3.1、HDMI2.0、DP1.4、光纤HDMI线缆等，为智能家居应用、智能手机、平板电脑和手持设备提供全面的解决方案。",
    link: "/solutions/high-frequency"
  },
  {
    title: "汽车线缆解决方案",
    image: "http://www.linkworldgroup.com/Content/upload/2018378721/201808021509533703516.jpg",
    description: "为确保车辆安全、一致、平稳运行，Linkworld始终致力于为所有连接部件提供高质量、耐用和性能稳定的线缆，包括同轴电缆、天线线、娱乐系统线缆（如HDMI、LVDS、USB线缆）以及符合美国、日本和德国标准的汽车线束。",
    link: "/solutions/automotive"
  },
  {
    title: "工业线缆解决方案",
    image: "http://www.linkworldgroup.com/Content/upload/2018378721/201808021540598958960.jpg",
    description: "Linkworld工业线缆，包括高柔性伺服电缆、编码器电缆、线束等，广泛应用于各类机械生产和机器人设备及其控制系统，用于柔性控制、内部连接和电力传输。高柔性线缆特别适用于拖链系统以及其他频繁往复运动的场合。",
    link: "/solutions/industrial"
  },
  {
    title: "安防线缆解决方案",
    image: "http://www.linkworldgroup.com/Content/upload/2018378721/201808021516345149100.jpg",
    description: "Linkworld Industrial为客户提供完整的安防互联解决方案。我们致力于整合供应链，为客户提供最具竞争力的解决方案和高质量的服务。",
    link: "/solutions/security"
  }
];

// 修改 LearnMoreButton 样式组件
const LearnMoreButton = styled(Link)`
  display: inline-block;
  background: #0088ff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  text-decoration: none;
  
  &:hover {
    background: #0077ee;
    color: white;
  }
`;

const Solutions = () => {
  const navigate = useNavigate();

  const handleLearnMore = (type) => {
    navigate(`/solutions/${type}`);
  };

  return (
    <>
      <Header />
      <Container>
        <Content>
          <PageTitle>解决方案</PageTitle>
          <SolutionGrid>
            {solutions.map((solution, index) => (
              <SolutionCard key={index}>
                <SolutionImage>
                  <img src={solution.image} alt={solution.title} />
                </SolutionImage>
                <SolutionContent>
                  <SolutionTitle>{solution.title}</SolutionTitle>
                  <SolutionDescription>{solution.description}</SolutionDescription>
                </SolutionContent>
              </SolutionCard>
            ))}
          </SolutionGrid>
        </Content>
      </Container>
      <Footer />
    </>
  );
};

export default Solutions;