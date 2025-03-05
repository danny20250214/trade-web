import React from "react";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { useParams } from 'react-router-dom';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #1a202c;
  text-align: center;
  margin-bottom: 3rem;
`;

const SolutionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SolutionCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SolutionImage = styled.div`
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const SolutionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0088ff;
  margin-bottom: 1rem;
`;

const SolutionContent = styled.div`
  color: #4a5568;
  line-height: 1.8;

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const Solution = () => {
  const { type } = useParams();  // 获取路由参数

  // 根据 type 参数显示不同的内容
  const getSolutionContent = () => {
    switch(type) {
      case 'high-frequency':
        return {
          title: '高频解决方案',
          content: '...'  // 具体内容
        };
      // 添加其他类型的处理
      default:
        return {
          title: '解决方案',
          content: '...'
        };
    }
  };

  const { title, content } = getSolutionContent();

  return (
    <>
      <Header />
      <Container>
        <Title>解决方案</Title>
        <SolutionGrid>
          <SolutionCard>
            <SolutionImage>
              <img src={require('../images/custom/solution-vr.png')} alt="VR解决方案" />
            </SolutionImage>
            <SolutionTitle>VR光学解决方案</SolutionTitle>
            <SolutionContent>
              <p>我们提供专业的VR光学解决方案，包括：</p>
              <ul>
                <li>高清晰度光学镜片设计与制造</li>
                <li>大视场角光学系统开发</li>
                <li>轻量化光学模组定制</li>
                <li>防蓝光护眼技术应用</li>
              </ul>
              <p>适用于游戏、教育、医疗等多个领域的VR设备开发。</p>
            </SolutionContent>
          </SolutionCard>

          <SolutionCard>
            <SolutionImage>
              <img src={require('../images/custom/solution-ar.png')} alt="AR解决方案" />
            </SolutionImage>
            <SolutionTitle>AR光学解决方案</SolutionTitle>
            <SolutionContent>
              <p>专业的AR光学方案，特点包括：</p>
              <ul>
                <li>高透光率光学系统</li>
                <li>轻薄型光波导设计</li>
                <li>广色域显示技术</li>
                <li>定制化光学镀膜服务</li>
              </ul>
              <p>为AR眼镜、头显等设备提供完整的光学解决方案。</p>
            </SolutionContent>
          </SolutionCard>

          <SolutionCard>
            <SolutionImage>
              <img src={require('../images/custom/solution-mr.png')} alt="MR解决方案" />
            </SolutionImage>
            <SolutionTitle>MR混合现实方案</SolutionTitle>
            <SolutionContent>
              <p>创新的MR光学解决方案：</p>
              <ul>
                <li>实虚结合光学系统设计</li>
                <li>高精度空间定位支持</li>
                <li>快速光学校准技术</li>
                <li>环境光适应系统</li>
              </ul>
              <p>为下一代混合现实设备提供核心光学技术支持。</p>
            </SolutionContent>
          </SolutionCard>

          <SolutionCard>
            <SolutionImage>
              <img src={require('../images/custom/solution-custom.png')} alt="定制化方案" />
            </SolutionImage>
            <SolutionTitle>定制化光学方案</SolutionTitle>
            <SolutionContent>
              <p>根据客户需求提供定制服务：</p>
              <ul>
                <li>光学系统设计与优化</li>
                <li>原型样品开发与测试</li>
                <li>量产工艺优化</li>
                <li>质量控制体系建设</li>
              </ul>
              <p>为客户提供从设计到量产的一站式服务。</p>
            </SolutionContent>
          </SolutionCard>
        </SolutionGrid>
      </Container>
      <Footer />
    </>
  );
};

export default Solution;