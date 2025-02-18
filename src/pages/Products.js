import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { product } from "../api";

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem 2rem;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 3rem;
  }
`;

const MenuContainer = styled.div`
  width: 260px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  @media (min-width: 1024px) {
    position: sticky;
    top: 100px;
  }
`;

const MenuTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
`;

const MenuItem = styled.div`
  padding: 1rem 1.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  background: ${props => props.active ? '#f8fafc' : 'white'};
  color: ${props => props.active ? '#0088ff' : '#4a5568'};
  border-left-color: ${props => props.active ? '#0088ff' : 'transparent'};
  border-bottom: 1px solid #e2e8f0;

  &:hover {
    color: #0088ff;
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SubMenuContainer = styled.div`
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
`;

const SubMenuItem = styled.div`
  padding: 0.85rem 1rem 0.85rem 3.5rem;
  font-size: 0.95rem;
  color: ${props => props.active ? '#0088ff' : '#64748b'};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    color: #0088ff;
    background: rgba(0, 136, 255, 0.05);
  }

  &:before {
    content: '';
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${props => props.active ? '#0088ff' : '#94a3b8'};
  }

  ${props => props.active && `
    background: rgba(0, 136, 255, 0.05);
    font-weight: 500;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: #0088ff;
    }
  `}
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  flex: 1;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  &:hover img {
    transform: scale(1.1);
  }
`;

const ProductContent = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 0.75rem;
`;

const ProductDescription = styled.p`
  color: #4a5568;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ProductSpecs = styled.div`
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
  font-size: 0.875rem;
  color: #718096;
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  &:before {
    content: "•";
    color: #0088ff;
    margin-right: 0.5rem;
  }
`;

const products = {
  hdmi: {
    standard: [
      {
        title: "High Speed 4K HDMI Cable Assembly",
        description: "HDMI A Male to A Male Cable: Supports Ethernet, 3D, 4K video and Audio Return Channel (ARC) Connects Blue-ray players, Fire TV, Apple TV, PS4, PS3, XBox one, Xbox 360, computers and other HDMI-enabled devices to TVs, displays, A/V receivers and more.",
        image: "http://www.linkworldgroup.com/uploads/201817542/small/high-speed-4k-hdmi-cable53267954587.jpg",
        specs: [
          "支持4K视频",
          "支持3D",
          "支持ARC",
          "支持以太网"
        ]
      },
      {
        title: "Flat HDMI 2.0 Cable with Spectra7 IC",
        description: "Flat HDMI2.0 Cable for security: Supports Ethernet, 3D, 4K video and Audio Return Channel (ARC). With Spectra7 HT8181 IC, Support 4K2K 60Hz and 18Gbps.",
        image: "http://www.linkworldgroup.com/uploads/201817542/small/flat-hdmi-cable-spectra7-53267954587.jpg",
        specs: [
          "支持4K@60Hz",
          "带宽：18Gbps",
          "Spectra7 HT8181芯片",
          "支持ARC"
        ]
      },
      {
        title: "360-Degree Swivel HDMI Cable",
        description: "360 degree swivel adjustable right/left angled lead HDMI cable. A premium quality HDMI A to HDMI A cable suitable for HDTV, Home Theater, and business class projector based applications.",
        image: "http://www.linkworldgroup.com/uploads/201817542/small/360-swivel-hdmi-cable53267954587.jpg",
        specs: [
          "360度旋转设计",
          "支持HDTV",
          "适用家庭影院",
          "商用投影"
        ]
      }
    ],
    automotive: [
      {
        title: "Automotive HDMI Type E Cable",
        description: "Automotive HDMI Type E cable for in-vehicle infotainment systems",
        image: "http://www.linkworldgroup.com/uploads/201817542/small/automotive-hdmi-type-e-cable53267954587.jpg",
        specs: [
          "车载专用设计",
          "Type E接口",
          "抗干扰设计",
          "高可靠性"
        ]
      }
    ]
  },
  aoc: [
    {
      title: "HDMI 2.0 Active Optical Cable",
      description: "HDMI 2.0 active optical cable(AOC) is used to extend the transmission distance between HDMI source and sink devices. The transmission distance can be up to 100M through a hybrid cable consisting of optical fibers and copper wires.",
      image: "http://www.linkworldgroup.com/uploadfile/2018/0802/20180802024618716.jpg",
      specs: [
        "传输距离：100米",
        "支持4K@60Hz",
        "混合光电设计",
        "支持HDMI 2.0"
      ]
    }
  ],
  usb: {
    usb31: [
      {
        title: "AOC USB3.0 AM To AF Cable",
        description: "AOC USB3.0 AM to AF adapter,support 5G,length up to 100meter",
        image: "http://www.linkworldgroup.com/uploadfile/2020/1202/20201202163712_75208.jpg",
        specs: [
          "支持5G传输",
          "长度可达100米",
          "Type A公对母",
          "光纤传输技术"
        ]
      },
      {
        title: "AOC Type C To Type C Cable",
        description: "Type-C to Type-C AOC for Video/Audio,support 4k/60Hz,21.6G bandwidth",
        image: "http://www.linkworldgroup.com/uploadfile/2020/1202/20201202163654_97360.jpg",
        specs: [
          "支持4K@60Hz",
          "带宽：21.6G",
          "Type-C接口",
          "支持视频音频"
        ]
      }
    ]
  }
};

const menuItems = [
  {
    key: 'hdmi',
    label: 'HDMI线缆',
    children: [
      { key: 'standard', label: '标准HDMI线缆' },
      { key: 'micro', label: 'Micro HDMI线缆' },
      { key: 'mini', label: 'Mini HDMI线缆' },
      { key: 'ultra-slim', label: '超薄HDMI线缆' },
      { key: 'engineering', label: '工程HDMI线缆' },
      { key: 'vr', label: 'VR线缆' },
      { key: 'hdmi21', label: 'HDMI 2.1' }
    ]
  },
  {
    key: 'aoc',
    label: 'AOC线缆'
  },
  {
    key: 'fiber',
    label: '光纤HDMI线缆'
  },
  {
    key: 'usb',
    label: 'USB线缆',
    children: [
      { key: 'usb31', label: 'USB3.1线缆' },
      { key: 'usb30', label: 'USB3.0线缆' },
      { key: 'usb20', label: 'USB2.0线缆' }
    ]
  },
  {
    key: 'dp',
    label: 'DP Mini DP线缆',
    children: [
      { key: 'dp', label: 'DP线缆' },
      { key: 'mini-dp', label: 'Mini DP线缆' }
    ]
  },
  {
    key: 'dvi-vga',
    label: 'DVI VGA线缆',
    children: [
      { key: 'dvi', label: 'DVI线缆' },
      { key: 'vga', label: 'VGA线缆' }
    ]
  },
  {
    key: 'adapters',
    label: '转接器',
    children: [
      { key: 'type-c', label: 'Type C转接器' },
      { key: 'hdmi-adapter', label: 'HDMI转接器' },
      { key: 'dp-adapter', label: 'DP转接器' }
    ]
  },
  {
    key: 'harness',
    label: '线束',
    children: [
      { key: 'consumption', label: '消费类线束' },
      { key: 'automotive', label: '汽车线束' },
      { key: 'industrial', label: '工业线束' },
      { key: 'security', label: '安防线束' }
    ]
  }
];

export default () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 获取分类树
  const fetchCategories = async () => {
    try {
      const response = await product.getCategoryTree();
      if (response.code === 200) {
        setCategories(response.data);
        // 默认选择第一个分类
        if (response.data[0]?.children?.[0]) {
          setSelectedCategory(response.data[0].children[0]);
        }
      }
    } catch (error) {
      console.error('获取分类树失败:', error);
    }
  };

  // 获取产品列表
  const fetchProducts = async (categoryId) => {
    setLoading(true);
    try {
      const response = await product.getProducts({
        pageNum: 1,
        pageSize: 10,
        categoryId
      });
      
      if (response.code === 200) {
        const formattedProducts = response.rows.map(item => ({
          id: item.id,
          title: item.title,
          description: item.name,
          image: item.context.match(/src="([^"]+)"/)?.[1] || '',
          specs: [
            `产品编号: ${item.code}`,
            item.remark ? `备注: ${item.remark}` : '暂无备注',
            `创建时间: ${new Date(item.createTime).toLocaleDateString()}`
          ]
        }));
        setProducts(formattedProducts);
      }
    } catch (error) {
      console.error('获取产品列表失败:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // 初始化加载分类
  useEffect(() => {
    fetchCategories();
  }, []);

  // 当选中分类变化时加载产品
  useEffect(() => {
    if (selectedCategory?.id) {
      fetchProducts(selectedCategory.id);
    }
  }, [selectedCategory]);

  // 渲染分类菜单
  const renderCategoryMenu = (categories) => {
    return categories.map((category) => (
      <React.Fragment key={category.id}>
        <MenuItem
          active={selectedCategory?.id === category.id}
          onClick={() => !category.disabled && setSelectedCategory(category)}
          disabled={category.disabled}
        >
          {category.label}
        </MenuItem>
        {category.children && selectedCategory?.id === category.id && (
          <SubMenuContainer>
            {category.children.map((subCategory) => (
              <SubMenuItem
                key={subCategory.id}
                active={selectedCategory?.id === subCategory.id}
                onClick={(e) => {
                  e.stopPropagation();
                  !subCategory.disabled && setSelectedCategory(subCategory);
                }}
                disabled={subCategory.disabled}
              >
                {subCategory.label}
              </SubMenuItem>
            ))}
          </SubMenuContainer>
        )}
      </React.Fragment>
    ));
  };

  const renderProducts = () => {
    if (loading) {
      return <div style={{ textAlign: 'center', padding: '2rem' }}>加载中...</div>;
    }

    if (products.length === 0) {
      return <div style={{ textAlign: 'center', padding: '2rem' }}>暂无产品数据</div>;
    }

    return products.map((product) => (
      <ProductCard key={product.id}>
        <ProductImage>
          <img src={product.image} alt={product.title} />
        </ProductImage>
        <ProductContent>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductSpecs>
            {product.specs.map((spec, index) => (
              <SpecItem key={index}>{spec}</SpecItem>
            ))}
          </ProductSpecs>
        </ProductContent>
      </ProductCard>
    ));
  };

  return (
    <>
      <Header />
      <Container>
        <Content>
          <TabsContainer>
            <MenuContainer>
              <MenuTitle>产品分类</MenuTitle>
              {renderCategoryMenu(categories)}
            </MenuContainer>

            <ProductGrid>
              {renderProducts()}
            </ProductGrid>
          </TabsContainer>
        </Content>
      </Container>
      <Footer />
    </>
  );
}; 