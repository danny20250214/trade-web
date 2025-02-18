import React from "react";
import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css'; // 只需要这一个样式文件即可

// 页面导入
import Home from "./pages/Home";
import Products from "./pages/Products";
import Solutions from "./pages/Solutions";
import News from "./pages/News";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import JoinUs from "pages/JoinUs";
import ProfilePage from "pages/Profile";
import About from "pages/About";
import PartnerSurvey from "pages/PartnerSurvey";
import Navigation from "pages/Navigation";
import ProductDetail from './pages/ProductDetail';

// 初始化主题
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
};

export default function App() {
  const [isDark, setIsDark] = React.useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });

  React.useEffect(() => {
    initTheme();
    
    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {  // 只有在用户没有手动设置主题时才跟随系统
        setIsDark(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return (
    <>
      <GlobalStyles />
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: '#3b82f6', // 使用您项目中的主色调
            borderRadius: 4,
            fontSize: 13,
          },
        }}
      >
        <Router>
          <Routes>
            {/* 主要页面路由 */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/news" element={<News />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* 其他页面路由 */}
            <Route path="/navigation" element={<Navigation />} />
            <Route path="/join" element={<JoinUs />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/partner-survey" element={<PartnerSurvey />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </>
  );
}
