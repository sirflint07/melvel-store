'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiShoppingBag, FiMenu, FiUser, FiHeart } from 'react-icons/fi'
import Image from 'next/image'
import { homeProducts } from '@/constants' 


// Color mapping for display
const colorMap = {  'black': '#000000',
  'white': '#ffffff',
  'red': '#ef4444',
  'blue': '#3b82f6',
  'green': '#22c55e',
  'yellow': '#eab308',
  'purple': '#a855f7',
  'gray': '#71717a',
  'orange': '#f97316',
  'pink': '#ec4899',
  'brown': '#92400e'
}


const Header = ({ onSearchChange, searchQuery, onToggleFilters }) => {
  const [scrolled, setScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-neutral-50'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mr-4 text-xl md:text-2xl font-bold text-neutral-900 flex gap-4 items-center"
            >
            <Image src='/assets/images/nike-logo.png' alt='logo' width={50} height={50}/>
              <span className='inline-block'>MELVEL</span>
            </motion.div>
          </div>

          <nav className="hidden md:flex space-x-8">
            {['Men', 'Women', 'Kids', 'Collections', 'Sale'].map(item => (
              <a 
                key={item} 
                href="#" 
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className={`hidden md:flex relative items-center transition-all duration-300 ${
            searchFocused ? 'w-64' : 'w-48'
          }`}>
            <FiSearch className="absolute left-3 text-neutral-400" />
            <input
              type="text"
              placeholder="Search sneakers..."
              className="w-full py-2 pl-10 pr-4 bg-neutral-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <button className="md:hidden text-neutral-700 hover:text-primary-600 transition-colors">
              <FiSearch size={20} />
            </button>
            <button className="hidden md:block text-neutral-700 hover:text-primary-600 transition-colors">
              <FiUser size={20} />
            </button>
            <button className="hidden md:block text-neutral-700 hover:text-primary-600 transition-colors">
              <FiHeart size={20} />
            </button>
            <button className="text-neutral-700 hover:text-primary-600 transition-colors relative">
              <FiShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>
            <button 
              className="md:hidden text-neutral-700 hover:text-primary-600 transition-colors"
              onClick={onToggleFilters}
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search sneakers..."
              className="w-full py-2 pl-10 pr-4 bg-neutral-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  )
}



const PriceRangeSlider = ({ minValue, maxValue, onChange }) => {
  const [min, setMin] = useState(minValue)
  const [max, setMax] = useState(maxValue)

  useEffect(() => {
    setMin(minValue)
    setMax(maxValue)
  }, [minValue, maxValue])

  const handleMinChange = (e) => {
    const newMin = Math.min(parseInt(e.target.value), max - 10)
    setMin(newMin)
    onChange(newMin, max)
  }

  const handleMaxChange = (e) => {
    const newMax = Math.max(parseInt(e.target.value), min + 10)
    setMax(newMax)
    onChange(min, newMax)
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-neutral-700">${min}</span>
        <span className="text-sm text-neutral-700">${max}</span>
      </div>
      
      <div className="relative mb-6 mt-5">
        <input
          type="range"
          min="0"
          max="500"
          value={min}
          onChange={handleMinChange}
          className="price-slider absolute w-full"
          style={{ zIndex: 2 }}
        />
        
        <input
          type="range"
          min="0"
          max="500"
          value={max}
          onChange={handleMaxChange}
          className="price-slider absolute w-full"
          style={{ zIndex: 2 }}
        />
      </div>

      <br /><br />
      
      <div className="flex items-center justify-between">
        <div className="w-24">
          <label className="block text-xs text-neutral-500 mb-1">Min Price</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-neutral-500 pointer-events-none">
              $
            </span>
            <input
              type="number"
              value={min}
              onChange={handleMinChange}
              className="w-full pl-8 pr-2 py-1 border border-neutral-300 rounded focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>
        </div>
        
        <span className="text-neutral-400">-</span>
        
        <div className="w-24">
          <label className="block text-xs text-neutral-500 mb-1">Max Price</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-neutral-500 pointer-events-none">
              $
            </span>
            <input
              type="number"
              value={max}
              onChange={handleMaxChange}
              className="w-full pl-8 pr-2 py-1 border border-neutral-300 rounded focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}


const FilterPanel = ({ filters, onFilterChange, isMobile = false }) => {
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    colors: true,
    sizes: true,
    price: true
  })

  const brands = [...new Set(homeProducts.map(product => product.brand))]
  const colors = [...new Set(homeProducts.flatMap(product => product.colors))]
  const sizes = [...new Set(homeProducts.flatMap(product => product.sizes))].sort((a, b) => a - b)

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleBrandChange = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand]
    
    onFilterChange({ brands: newBrands })
  }

  const handleColorChange = (color) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color]
    
    onFilterChange({ colors: newColors })
  }

  const handleSizeChange = (size) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size]
    
    onFilterChange({ sizes: newSizes })
  }

  const handlePriceChange = (min, max) => {
    onFilterChange({ priceRange: { min, max } })
  }

  const resetFilters = () => {
    onFilterChange({
      brands: [],
      colors: [],
      sizes: [],
      priceRange: { min: 0, max: 500 }
    })
  }

  const filterSection = (title, expanded, toggleFn, children) => (
    <div className="mb-6">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleFn(title.toLowerCase())}
      >
        <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
        <span className="text-neutral-500">
          {expanded ? '−' : '+'}
        </span>
      </div>
      
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3"
        >
          {children}
        </motion.div>
      )}
    </div>
  )

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${isMobile ? '' : 'sticky top-24'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Filters</h2>
        {(filters.brands.length > 0 || 
          filters.colors.length > 0 || 
          filters.sizes.length > 0 || 
          filters.priceRange.min > 0 || 
          filters.priceRange.max < 500) && (
          <button 
            className="text-sm text-primary-600 hover:text-primary-700"
            onClick={resetFilters}
          >
            Reset all
          </button>
        )}
      </div>

      {filterSection('Brand', expandedSections.brands, toggleSection, (
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="custom-checkbox block">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <span className="checkmark mr-2"></span>
              <span className="text-neutral-700">{brand}</span>
            </label>
          ))}
        </div>
      ))}

      {filterSection('Color', expandedSections.colors, toggleSection, (
        <div className="flex flex-wrap gap-3">
          {colors.map(color => (
            <div 
              key={color}
              className={`color-option ${filters.colors.includes(color) ? 'selected' : ''}`}
              style={{ backgroundColor: colorMap[color] || color }}
              onClick={() => handleColorChange(color)}
              title={color.charAt(0).toUpperCase() + color.slice(1)}
            />
          ))}
        </div>
      ))}

      {filterSection('Size', expandedSections.sizes, toggleSection, (
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <div 
              key={size}
              className={`size-option ${filters.sizes.includes(size) ? 'selected' : ''}`}
              onClick={() => handleSizeChange(size)}
            >
              {size}
            </div>
          ))}
        </div>
      ))}

      {filterSection('Price', expandedSections.price, toggleSection, (
        <PriceRangeSlider
          minValue={filters.priceRange.min}
          maxValue={filters.priceRange.max}
          onChange={handlePriceChange}
        />
      ))}
    </div>
  )
}


const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [showQuickAdd, setShowQuickAdd] = useState(false)

  return (
    <div 
      className="product-card bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover h-full"
      onMouseEnter={() => setShowQuickAdd(true)}
      onMouseLeave={() => setShowQuickAdd(false)}
    >
      {homehomeProducts.map((product) => (
        <>
        <div className="relative overflow-hidden pb-[100%]">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300" 
        />
        
        <div className="absolute top-3 right-3 z-10">
          <button className="bg-white rounded-full p-2 shadow-md hover:bg-neutral-100 transition-colors">
            <FiHeart className="text-neutral-700" size={18} />
          </button>
        </div>
        
        {showQuickAdd && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bottom-0 bg-white bg-opacity-95 p-3"
          >
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md flex items-center justify-center gap-2 transition-colors">
              <FiShoppingBag size={16} />
              <span>Add to Cart</span>
            </button>
          </motion.div>
        )}
        
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-neutral-800 line-clamp-1">{product.name}</h3>
        </div>
        
        <div className="text-sm text-neutral-500 mb-2">{product.brand}</div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-neutral-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-neutral-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {product.colors.map(color => (
            <div 
              key={color}
              className={`w-5 h-5 rounded-full cursor-pointer border border-neutral-200 transition-transform ${selectedColor === color ? 'ring-2 ring-primary-500 ring-offset-1 scale-110' : ''}`}
              style={{ backgroundColor: colorMap[color] || color }}
              onClick={() => setSelectedColor(color)}
              title={color.charAt(0).toUpperCase() + color.slice(1)}
            />
          ))}
        </div>
      </div>
      </>
      ))}
    </div>
  )
}

// Product Grid Component
const ProductGrid = ({ homeProducts }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null)

  if (homeProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-medium text-neutral-800 mb-2">No homeProducts found</h3>
        <p className="text-neutral-500">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {homeProducts.map(product => (
        <motion.div
          key={product.id}
          variants={item}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
          onHoverStart={() => setHoveredProduct(product.id)}
          onHoverEnd={() => setHoveredProduct(null)}
        >
          <ProductCard 
            product={product} 
            isHovered={hoveredProduct === product.id}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

// Main App Component
function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    brands: [],
    colors: [],
    sizes: [],
    priceRange: { min: 0, max: 500 },
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen)
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }))
  }

  const filterhomeProducts = (homeProducts) => {
    return homeProducts.filter(product => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false
      }

      if (filters.colors.length > 0 && !product.colors.some(color => filters.colors.includes(color))) {
        return false
      }

      if (filters.sizes.length > 0 && !product.sizes.some(size => filters.sizes.includes(size))) {
        return false
      }

      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false
      }

      return true
    })
  }

  const filteredhomeProducts = filterhomeProducts(homeProducts)

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header 
        onSearchChange={handleSearchChange} 
        searchQuery={searchQuery}
        onToggleFilters={toggleMobileFilters}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
            <FilterPanel 
              filters={filters} 
              onFilterChange={handleFilterChange}
            />
          </div>

          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMobileFilters}></div>
              <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white p-6 overflow-y-auto animate-slide-up">
                <button 
                  className="absolute top-4 right-4 text-neutral-500"
                  onClick={toggleMobileFilters}
                >
                  ✕
                </button>
                <div className="pt-8">
                  <FilterPanel 
                    filters={filters} 
                    onFilterChange={handleFilterChange}
                    isMobile={true}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-neutral-900">
                Sneakers
                <span className="ml-2 text-sm font-normal text-neutral-500">
                  {filteredhomeProducts.length} homeProducts
                </span>
              </h1>
            </div>

            <ProductGrid homeProducts={filteredhomeProducts} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App