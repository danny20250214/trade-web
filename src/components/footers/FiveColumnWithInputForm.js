import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { useNavigate } from "react-router-dom";

import { ReactComponent as FacebookIcon } from "images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "images/youtube-icon.svg";
import { ReactComponent as LinkedinIcon } from "images/linkedin-icon.svg";

const Container = tw.div`relative bg-gray-900 text-gray-100 -mx-8 -mb-8 px-8`;
const Content = tw.div`max-w-screen-xl mx-auto pt-16 pb-8`;
const FiveColumns = tw.div`flex flex-wrap justify-between`;

const Column = tw.div`w-1/2 md:w-1/5 mb-8 md:mb-0`;
const CompanyColumn = tw.div`w-full md:w-2/5 mb-8 md:mb-0`;

const ColumnHeading = tw.h5`font-bold uppercase mb-4`;

const LinkList = tw.ul`mt-4 text-sm font-medium`;
const LinkListItem = tw.li`mt-3`;
const Link = tw.button`text-gray-300 hover:text-gray-100 transition duration-300 cursor-pointer`;

const LogoContainer = tw.div`flex items-center`;
const LogoText = tw.h5`text-xl font-bold text-gray-100`;

const CompanyDescription = tw.p`mt-4 max-w-xs font-medium text-sm mx-auto md:mx-0 md:mr-4 text-gray-400`;

const SocialLinksContainer = tw.div`mt-4 `;
const SocialLink = styled.a`
  ${tw`inline-block p-2 rounded-full bg-gray-700 text-gray-100 hover:bg-gray-600 transition duration-300 mr-4`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const SubscribeFormContainer = tw.div`mt-6`;
const SubscribeForm = tw.form`mt-4 lg:mt-6 text-sm flex flex-col sm:flex-row`;
const Input = tw.input`bg-transparent border-2 px-4 py-2 rounded-lg sm:rounded-r-none text-gray-100 tracking-wide w-full sm:w-auto`;
const SubscribeButton = tw.button`mt-4 sm:mt-0 w-full sm:w-auto bg-primary-500 text-gray-100 px-8 py-2 rounded-lg font-bold hover:bg-primary-700 transition duration-300 sm:rounded-l-none`;

export default () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: "首页", link: "/" },
    { name: "产品中心", link: "/products" },
    { name: "解决方案", link: "/solutions" },
/*
    { name: "新闻中心", link: "/news" },
*/
    { name: "关于我们", link: "/about" }
  ];

  const supportLinks = [
    { name: "技术支持", link: "/support" },
    { name: "下载中心", link: "/downloads" },
    { name: "常见问题", link: "/faq" },
    { name: "联系我们", link: "/contact" }
  ];

  const legalLinks = [
    { name: "隐私政策", link: "/privacy" },
    { name: "使用条款", link: "/terms" },
    { name: "Cookie政策", link: "/cookie" }
  ];

  return (
    <Container>
      <Content>
        <FiveColumns>
          <CompanyColumn>
            <LogoContainer>
              {/* <LogoImg src={LogoImage} alt="Logo" /> */}
              <LogoText>LinkWorld</LogoText>
            </LogoContainer>
            <CompanyDescription>
              专业的线缆制造商，为消费电子、安防、家电、汽车等领域提供高品质定制线缆解决方案。
            </CompanyDescription>
            <SocialLinksContainer>
              <SocialLink href="https://facebook.com" target="_blank">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank">
                <TwitterIcon />
              </SocialLink>
              <SocialLink href="https://youtube.com" target="_blank">
                <YoutubeIcon />
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank">
                <LinkedinIcon />
              </SocialLink>
            </SocialLinksContainer>
          </CompanyColumn>
          
          <Column>
            <ColumnHeading>快速链接</ColumnHeading>
            <LinkList>
              {quickLinks.map((link, index) => (
                <LinkListItem key={index}>
                  <Link onClick={() => navigate(link.link)}>
                    {link.name}
                  </Link>
                </LinkListItem>
              ))}
            </LinkList>
          </Column>

          <Column>
            <ColumnHeading>技术支持</ColumnHeading>
            <LinkList>
              {supportLinks.map((link, index) => (
                <LinkListItem key={index}>
                  <Link onClick={() => navigate(link.link)}>
                    {link.name}
                  </Link>
                </LinkListItem>
              ))}
            </LinkList>
          </Column>

          <Column>
            <ColumnHeading>法律条款</ColumnHeading>
            <LinkList>
              {legalLinks.map((link, index) => (
                <LinkListItem key={index}>
                  <Link onClick={() => navigate(link.link)}>
                    {link.name}
                  </Link>
                </LinkListItem>
              ))}
            </LinkList>
          </Column>

        </FiveColumns>
      </Content>
    </Container>
  );
};
