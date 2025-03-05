import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Header = styled.header`
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all 0.3s ease;
  
  ${props => props.isHome ? `
    background: ${props.isScrolled 
      ? 'rgba(255, 255, 255, 0.85)' 
      : 'rgba(255, 255, 255, 0.1)'};
    backdrop-filter: blur(8px);
  ` : `
    position: sticky;
    background: white;
    border-bottom: 1px solid #e2e8f0;
  `}
`;

const Nav = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 700;
  
  span.link {
    color: ${props => props.isHome && !props.isScrolled ? 'white' : '#0088ff'};
    transition: color 0.3s ease;
  }
  
  span.world {
    background: ${props => props.isHome && !props.isScrolled 
      ? 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)'
      : 'linear-gradient(135deg, #0088ff 0%, #00bfff 100%)'};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 2px;
    transition: all 0.3s ease;
  }
  
  &:hover {
    span.link {
      color: ${props => props.isHome && !props.isScrolled ? '#f0f0f0' : '#0077ee'};
    }
    span.world {
      background: ${props => props.isHome && !props.isScrolled
        ? 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)'
        : 'linear-gradient(135deg, #0077ee 0%, #00aeff 100%)'};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: ${props => props.isHome && !props.isScrolled ? 'white' : '#1a202c'};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: ${props => props.isHome && !props.isScrolled ? 'white' : '#0088ff'};
    transition: width 0.2s ease;
  }

  &:hover {
    color: ${props => props.isHome && !props.isScrolled ? 'rgba(255,255,255,0.8)' : '#0088ff'};
    
    &:after {
      width: 100%;
    }
  }

  ${props => props.active && `
    color: ${props.isHome && !props.isScrolled ? 'white' : '#0088ff'};
  `}
`;

const HeaderComponent = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isHome = currentPath === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "首页" },
    { path: "/products", label: "产品中心" },
    { path: "/solutions", label: "解决方案" },
/*
    { path: "/news", label: "新闻中心" },
*/
    { path: "/about", label: "关于我们" },
    { path: "/contact", label: "联系我们" }
  ];

  return (
    <Header isHome={isHome} isScrolled={isScrolled}>
      <Nav>
        <Logo href="/" isHome={isHome} isScrolled={isScrolled}>
          <span className="link">Link</span>
          <span className="world">World</span>
        </Logo>
        <NavLinks>
          {navItems.map((item) => (
            <NavLink 
              key={item.path}
              href={item.path}
              active={item.path === "/" ? currentPath === "/" : currentPath.startsWith(item.path)}
              isHome={isHome}
              isScrolled={isScrolled}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>
      </Nav>
    </Header>
  );
};

export default HeaderComponent;
