import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { product } from "../api";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";

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
  flex-direction: row;
  gap: 3rem;
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
  font-weight: ${props => props.active ? '600' : '500'};
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
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  
  ${MenuItem} {
    background: ${props => props.active ? '#f1f5f9' : '#ffffff'};
    font-size: ${props => props.level > 1 ? '0.9rem' : '1rem'};
    
    &:hover {
      background: #f8fafc;
    }
  }
`;

const ProductListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  border-top: 1px solid #e2e8f0;
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ProductTitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .no-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    color: #999;
  }
`;

const ProductCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    ${ProductName} {
      color: #0088ff;
    }
    
    img {
      transform: scale(1.1);
    }
  }
`;

const ProductContent = styled.div`
  padding: 1rem;
`;

const ProductDescription = styled.p`
  color: #4a5568;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ProductSpecs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SpecItem = styled.span`
  background: #f1f5f9;
  color: #64748b;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const ProductInfo = styled.div`
  padding: 1rem;
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
      { key: 'ultra-slgit remote set-url origin git@github.com:danny20250214/trade-web.gitim', label: '超薄HDMI线缆' },
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

const CategorySubmenu = ({ category, selectedCategory, onSelect, level = 1 }) => {
  const isSelected = selectedCategory?.id === category.id;
  const hasChildren = category.children && category.children.length > 0;
  const isParentSelected = hasChildren && category.children.some(child => 
    child.id === selectedCategory?.id || 
    child.children?.some(grandChild => grandChild.id === selectedCategory?.id)
  );
  
  return (
    <React.Fragment>
      <MenuItem
        active={isSelected}
        onClick={() => !category.disabled && onSelect(category)}
        style={{ 
          paddingLeft: `${level * 1.5}rem`,
          backgroundColor: isParentSelected ? '#f8fafc' : 'white'
        }}
      >
        {category.label || category.name}
      </MenuItem>
      {hasChildren && (isSelected || isParentSelected || level === 1) && (
        <SubMenuContainer>
          {category.children.map((subCategory) => (
            <CategorySubmenu
              key={subCategory.id}
              category={subCategory}
              selectedCategory={selectedCategory}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </SubMenuContainer>
      )}
    </React.Fragment>
  );
};

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  // 获取分类树
  const fetchCategories = async () => {
    try {
      const response = await product.getCategoryTree();
      if (response.code === 200) {
        // 确保数据结构正确
        const processCategories = (categories) => {
          return categories.map(category => ({
            ...category,
            children: category.children ? processCategories(category.children) : []
          }));
        };
        
        const processedCategories = processCategories(response.data);
        setCategories(processedCategories);
        
        // 默认选择第一个分类
        if (processedCategories.length > 0) {
          // 找到第一个可用的叶子节点
          const findFirstLeaf = (cats) => {
            for (const cat of cats) {
              if (!cat.children || cat.children.length === 0) {
                return cat;
              }
              const leaf = findFirstLeaf(cat.children);
              if (leaf) return leaf;
            }
            return null;
          };
          
          const firstLeaf = findFirstLeaf(processedCategories);
          if (firstLeaf) {
            setSelectedCategory(firstLeaf);
          }
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
        pageNum: currentPage,
        pageSize: pageSize,
        categoryId
      });
      
      if (response.code === 200) {
        const formattedProducts = response.rows.map(item => {
          // 处理图片字段，获取第一个图片地址
          const imageUrls = item.images ? item.images.split(',') : [];
          const firstImage = imageUrls.length > 0 ? imageUrls[0].trim() : '';

          let decodedContent = '';
          try {
            decodedContent = decodeURIComponent(escape(atob(item.context)));
          } catch (error) {
            console.error("Base64 解码失败", error);
            decodedContent = item.context || '';
          }

          return {
            id: item.id,
            title: item.title || '',
            name: item.name || '',
            code: item.code || '',
            description: item.name || '',
            context: item.context || '',
            decodedContent: decodedContent,
            // 使用第一个图片地址，如果没有则尝试从内容中提取
            image: firstImage || decodedContent.match(/src="([^"]+)"/)?.[1] || '',
            // 保存所有图片地址数组，以备后用
            images: imageUrls
          };
        });
        setProducts(formattedProducts);
        setTotal(response.total);
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
  const renderCategoryMenu = (categories, selectedCategory, onSelect) => {
    return categories.map((category) => (
      <CategorySubmenu
        key={category.id}
        category={category}
        selectedCategory={selectedCategory}
        onSelect={(category) => onSelect(category)}
      />
    ));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getFirstImage = (images) => {
    if (images && images.length > 0) {
      return images[0];
    }
    return null;
  };

  return (
    <>
      <Header />
      <Container>
        <Content>
          <TabsContainer>
            <MenuContainer>
              <MenuTitle>产品分类</MenuTitle>
              {renderCategoryMenu(categories, selectedCategory, setSelectedCategory)}
            </MenuContainer>

            <ProductListContainer>
              <ProductGrid>
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <ProductImage>
                      <img 
                        src={getFirstImage(product.images) || '/placeholder.png'} 
                        alt={product.name} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder.png';
                        }}
                      />
                    </ProductImage>
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>
                      <ProductDescription>
                        {product.description || '暂无描述'}
                      </ProductDescription>
                    </ProductInfo>
                  </ProductCard>
                ))}
              </ProductGrid>
              
              <PaginationWrapper>
                <Pagination
                  current={currentPage}
                  total={total}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper
                  showTotal={(total) => `共 ${total} 条`}
                />
              </PaginationWrapper>
            </ProductListContainer>
          </TabsContainer>
        </Content>
      </Container>
      <Footer />
    </>
  );
};

export default Products; 