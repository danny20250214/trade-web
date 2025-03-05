import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem 2rem;
`;

const DetailTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 2rem;
`;

const DetailContent = styled.div`
  color: #4a5568;
  line-height: 1.8;

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin: 2rem 0 1rem;
  }

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

const solutionDetails = {
  'high-frequency': {
    title: '高频线缆解决方案',
    content: `...`
  },
  'automotive': {
    title: '汽车线缆解决方案',
    content: `
      <h3>方案概述</h3>
      <p>为确保车辆安全、一致、平稳运行，我们提供全面的汽车线缆解决方案。</p>
      
      <h3>产品类型</h3>
      <ul>
        <li>同轴电缆</li>
        <li>天线线缆</li>
        <li>娱乐系统线缆</li>
        <li>汽车线束</li>
      </ul>

      <h3>应用领域</h3>
      <ul>
        <li>车载娱乐系统</li>
        <li>车载通信系统</li>
        <li>安全控制系统</li>
        <li>动力传动系统</li>
      </ul>
    `
  },
  'industrial': {
    // ... 工业线缆解决方案详情
  },
  'security': {
    // ... 安防线缆解决方案详情
  }
};

const SolutionDetail = () => {
  const { type } = useParams();
  const solution = solutionDetails[type];

  return (
    <>
      <Header />
      <Container>
        <Content>
          <DetailTitle>{solution?.title}</DetailTitle>
          <DetailContent dangerouslySetInnerHTML={{ __html: solution?.content }} />
        </Content>
      </Container>
      <Footer />
    </>
  );
};

export default SolutionDetail;