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

const Title2 = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Title3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: #1a202c;
  margin-bottom: 1rem;
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
`;

const InfoCard = styled.div`
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  line-height: 1.8;
  color: #2d3748;

  h5 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1a202c;
  }

  p {
    margin-bottom: 0.5rem;
  }
`;

const Timeline = styled.ul`
  list-style: none;
  padding-left: 0;
  border-left: 3px solid #e2e8f0;
  margin-top: 2rem;
`;

const TimelineItem = styled.li`
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;

  &::before {
    content: '';
    position: absolute;
    left: -0.45rem;
    top: 0.25rem;
    width: 0.75rem;
    height: 0.75rem;
    background-color: #3182ce;
    border-radius: 50%;
  }

  span {
    font-weight: bold;
    color: #2d3748;
  }
`;

export default () => {
    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Section>
                        <Title2>公司概况</Title2>
                        <Description>
                            {/*<p><strong>东莞市和吉电子有限公司</strong> 成立于2005年，是一家专注于消费电子、安防、家电、汽车、通信、绿色能源和工业应用领域的高品质定制线缆制造商。</p>*/}
                            {/*<p>公司在中国及美国均设有销售与客户服务团队，拥有三家通过 ISO9001 和 UL 认证的工厂，员工约700人。我们致力于为客户提供快速响应的设计、制造与销售服务。</p>*/}
                            {/*<p>多年来与联想、LG、Griffin、Alpine、Gemalto、3M、OEHLBACH 等国际品牌合作，积累了丰富的 OEM/ODM 定制经验。</p>*/}

                            <div>
                                <p>
                                    <strong>东莞市和吉电子有限公司</strong>成立于2005年，专注于为消费电子、安防、家电、汽车、通信、绿色能源和工业应用提供高品质定制线缆。
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
                                    公司自2005年以来专注于OEM/ODM线缆组件，目前为联想、LG、LINDY、OEHLBACH、ALTINEX等客户提供AV线缆、USB线缆、转接器等产品，并为Flextronics、3M、Jabil、Alpine、SVI提供各类线束，具有灵活的起订量、短交期、合理的价格和高品质。
                                </p>
                            </div>
                        </Description>

                        <Title2>发展历程</Title2>
                        <Timeline>
                            <TimelineItem><span>2004年</span> 成立香港LINKWORLD公司</TimelineItem>
                            <TimelineItem><span>2005年</span> 东莞市和吉电子有限公司成立</TimelineItem>
                            <TimelineItem><span>2010年</span> 开始为联想、LG等品牌提供AV/USB线缆产品</TimelineItem>
                            <TimelineItem><span>2015年</span> 成立利杰电子科技有限公司</TimelineItem>
                            <TimelineItem><span>2021年</span> 完成工厂自动化设备升级</TimelineItem>
                        </Timeline>

                        <Title2>旗下公司</Title2>
                        <InfoGrid>
                            <InfoCard>
                                <h5>香港 LINKWORLD INDUSTRIAL CO., LTD</h5>
                                <p>成立时间: 2004年6月</p>
                                <p>地址: 香港九龍旺角通菜街1A-1L 威達商業大廈10/F1003室</p>
                                <p>电话: 00852-39625160</p>
                                <p>传真: 00852-39625160</p>
                            </InfoCard>

                            <InfoCard>
                                <h5>东莞和吉电子有限公司</h5>
                                <p>成立时间: 2006年8月</p>
                                <p>注册资金: 人民币100万</p>
                                <p>公司人数: 115人</p>
                                <p>工厂面积: 7000平米</p>
                                <p>地址: 东莞市塘厦镇178工业区民业街21号</p>
                                <p>电话: 86-769-87922496</p>
                                <p>传真: 86-769-87922491</p>
                            </InfoCard>

                            <InfoCard>
                                <h5>利杰电子科技有限公司</h5>
                                <p>成立时间: 2015年6月</p>
                                <p>公司人数: 350人</p>
                                <p>厂房面积: 1000平米</p>
                                <p>地址: 东莞市塘厦镇四村正龙横路5号4楼</p>
                                <p>电话: 0769-82011812</p>
                                <p>传真: 0769-82011812</p>
                            </InfoCard>
                        </InfoGrid>
                        <br/>
                        <Title2>详情介绍</Title2>
                        <iframe src={require('../docs/1.pdf')} width="100%" height="800px"></iframe>

                    </Section>
                </Content>
            </Container>
            <Footer />
        </>
    );
};
