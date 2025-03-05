import React from "react";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import logo from "../images/logo.svg";

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem 2rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 2rem;
  text-align: center;
`;

const Description = styled.div`
  color: #4a5568;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

const ImageCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-weight: 500;
`;

export default () => {
  return (
    <>
      <Header />
      <Container>
        <Content>
          <Section>
            <Title>关于我们</Title>
            <Description>
              <p>
                <strong>Linkworld</strong> 成立于2005年，专注于为消费电子、安防、家电、汽车、通信、绿色能源和工业应用提供高品质定制线缆。
              </p>
              <p>
                我们拥有三个通过ISO 9001和UL认证的工厂，约700名员工。我们在中国和美国的销售团队与工厂各部门保持密切合作，为客户提供快速的设计、制造和营销响应。我们的产品和服务获得了联想、LG、Griffin、Alpine、Gemalto、3M、OEHLBACH等客户的认可和赞誉。
              </p>
              <p>
                经过13年的运营和与客户、供应商的良好合作，我们在解决产品需求方面建立了精密制造系统、质量控制系统、产业集成系统和研发系统的无可争议的价值。
              </p>
              <p>
                <strong>Linkworld</strong> 自2005年以来专注于OEM/ODM线缆组件，目前为联想、LG、LINDY、OEHLBACH、ALTINEX等客户提供AV线缆、USB线缆、转接器等产品，并为Flextronics、3M、Jabil、Alpine、SVI提供各类线束，具有灵活的起订量、短交期、合理的价格和高品质。
              </p>
            </Description>
            <ImageGrid>
              <ImageCard>
                <img src={require('../images/custom/office.png')} alt="办公室" />
                <ImageCaption>办公室</ImageCaption>
              </ImageCard>
              <ImageCard>
                <img src={require('../images/custom/meeting-room.png')} alt="会议室" />
                <ImageCaption>会议室</ImageCaption>
              </ImageCard>
              <ImageCard>
                <img src={require('../images/custom/tdr.png')} alt="TDR 测试" />
                <ImageCaption>TDR测试</ImageCaption>
              </ImageCard>
              <ImageCard>
                <img src={require('../images/custom/reliability.png')} alt="测试机器" />
                <ImageCaption>测试机器</ImageCaption>
              </ImageCard>
              <ImageCard>
                <img src={require('../images/custom/fqc.png')} alt="FQC 质检" />
                <ImageCaption>FQC 质检</ImageCaption>
              </ImageCard>
              <ImageCard>
                <img src={require('../images/custom/fqc2.png')} alt="FQC 质检" />
                <ImageCaption>FQC 质检</ImageCaption>
              </ImageCard>
              <ImageCard>
                <img src={require('../images/custom/production-line.png')} alt="生产线" />
                <ImageCaption>生产线</ImageCaption>
              </ImageCard>
              <ImageCard>
                <img src={require('../images/custom/production-line2.png')} alt="生产线" />
                <ImageCaption>生产线</ImageCaption>
              </ImageCard>
              <ImageCard>
                <img src={require('../images/custom/automatic-soldering.png')} alt="自动焊锡" />
                <ImageCaption>自动焊锡</ImageCaption>
              </ImageCard>
              <ImageCard>
                <img src={require('../images/custom/automatic-tin-dipping.png')} alt="自动浸锡" />
                <ImageCaption>自动浸锡</ImageCaption>
              </ImageCard>
            </ImageGrid>
          </Section>
        </Content>
      </Container>
      <Footer />
    </>
  );
}; 