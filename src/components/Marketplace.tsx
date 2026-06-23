import React, { useState, useEffect } from 'react';
import { SupportedLanguage } from '../utils/translator';
import { CropListing } from '../types';
import { MapPin, Phone, User, PlusCircle, Tag, Grid, ShoppingBag, Search, Filter, RotateCcw } from 'lucide-react';
import { CROP_PRESETS, getCropImageAndCategory, getSeededCropListings } from '../utils/cropImages';

interface MarketplaceProps {
  language: SupportedLanguage;
}

const cropNames = Object.values(CROP_PRESETS).map((p) => p.name).sort();
const availableCategories = ['All', 'Cereals', 'Pulses', 'Vegetables', 'Fruits', 'Spices', 'Beverages', 'Dry Fruits', 'Oilseeds', 'Fibers'];

export default function Marketplace({ language }: MarketplaceProps) {
  const [listings, setListings] = useState<CropListing[]>([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Form states to list a crop
  const [cropTitle, setCropTitle] = useState('');
  const [category, setCategory] = useState('Rice (Paddy)');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [locVillage, setLocVillage] = useState('');

  // Retrieve listings from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('agri_marketplace_crops');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure there are at least 45 listings so the marketplace is robust as requested
        if (parsed.length < 40) {
          const seeded = getSeededCropListings();
          setListings(seeded);
          localStorage.setItem('agri_marketplace_crops', JSON.stringify(seeded));
        } else {
          setListings(parsed);
        }
      } catch (e) {
        const seeded = getSeededCropListings();
        setListings(seeded);
        localStorage.setItem('agri_marketplace_crops', JSON.stringify(seeded));
      }
    } else {
      const seeded = getSeededCropListings();
      setListings(seeded);
      localStorage.setItem('agri_marketplace_crops', JSON.stringify(seeded));
    }

    // Try autofilling seller profile details if logged in
    const activeUser = localStorage.getItem('agri_farmer_profile');
    if (activeUser) {
      try {
        const u = JSON.parse(activeUser);
        setSellerName(u.name);
        setSellerPhone(u.phone);
        setLocVillage(u.location + ', ' + u.state);
      } catch (e) {}
    }
  }, []);

  // Soft database reset to seeded 55 crops to helper testing
  const resetToSeededList = () => {
    const seeded = getSeededCropListings();
    setListings(seeded);
    localStorage.setItem('agri_marketplace_crops', JSON.stringify(seeded));
    setFilterCategory('All');
    setSearchQuery('');
  };

  const handleListCropSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropTitle || !price || !quantity || !sellerName || !sellerPhone) {
      alert(language === 'en' ? 'Fill all fields' : 'దయచేసి అన్ని హంగులు నింపండి');
      return;
    }

    // Automatically resolve the crop category and its verified high-quality Unsplash image
    const cropImgAndCat = getCropImageAndCategory(category);

    const newListing: CropListing = {
      id: 'crop_' + Date.now().toString(),
      title: cropTitle,
      category: category, // Exact crop name selected by the user
      price: Number(price),
      quantity,
      sellerName,
      sellerPhone,
      location: locVillage,
      imageUrl: cropImgAndCat.imageUrl,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedListings = [newListing, ...listings];
    setListings(updatedListings);
    localStorage.setItem('agri_marketplace_crops', JSON.stringify(updatedListings));

    // Reset Form
    setCropTitle('');
    setPrice('');
    setQuantity('');
    setIsAdding(false);
  };

  // Filter listings by text search and dynamic parent categorizations
  const filteredListings = listings.filter((item) => {
    const itemDetail = getCropImageAndCategory(item.category);
    const matchesCategory =
      filterCategory === 'All' ||
      item.category === filterCategory ||
      itemDetail.category === filterCategory;

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itemDetail.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto font-sans" id="marketplace-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-150">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-emerald-600" />
            <span>{language === 'en' ? 'Farmer Marketplace' : language === 'te' ? 'రైతు పంటల క్రయ విక్రయ కేంద్రం' : 'किसान फसल मंडी'}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {language === 'en' ? 'Direct trade portal. Contact fellow farmers or dealers directly' : 'మధ్యవర్తులు లేని పంటల మార్కెట్. రైతులను నేరుగా ఫోన్ లో సంప్రదించండి.'}
          </p>
        </div>

        <button
          id="toggle-add-crop-btn"
          onClick={() => setIsAdding(!isAdding)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 self-start md:self-auto shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isAdding ? (language === 'en' ? 'Cancel Listing' : 'రద్దు చేయి') : (language === 'en' ? 'List Crop for Sale' : 'పంటను అమ్మకానికి పెట్టు')}</span>
        </button>
      </div>

      {isAdding && (
        // ADD NEW HARVEST FORM
        <div id="add-harvest-panel" className="bg-emerald-50/50 p-6 rounded-3xl border-2 border-emerald-100 max-w-2xl mx-auto mb-8 shadow-xs">
          <h3 className="font-extrabold text-gray-800 text-base mb-4 flex items-center gap-1.5">
            <PlusCircle className="w-5 h-5 text-emerald-600 animate-pulse" />
            <span>{language === 'en' ? 'Add Farm Produce Listing For Sale' : 'అమ్మకానికి మీ పంట వివరాలు నమోదు చేయండి'}</span>
          </h3>

          <form onSubmit={handleListCropSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'en' ? 'Produce / Crop Title' : 'పంట కామన్ టైటిల్ (e.g. సన్న బియ్యం)'} *
              </label>
              <input
                id="crop-input-title"
                type="text"
                required
                value={cropTitle}
                onChange={(e) => setCropTitle(e.target.value)}
                placeholder="e.g. Sona Masuri Paddy Grade A"
                className="w-full text-xs bg-white border border-gray-200 py-2.5 px-3 rounded-xl outline-none focus:border-emerald-500 font-semibold text-gray-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'en' ? 'Select Verified Crop' : 'పంట రకము'} *
              </label>
              <select
                id="crop-selection-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs bg-white border border-gray-200 py-2.5 px-3 rounded-xl outline-none focus:border-emerald-500 text-gray-700 font-bold"
              >
                {cropNames.map((cName, i) => (
                  <option key={i} value={cName}>{cName}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'en' ? 'Price (₹ per Quintal / Bag)' : 'ధర (ఎన్ని ₹ క్వింటాల్ కు)'} *
              </label>
              <input
                id="crop-input-price"
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 2400"
                className="w-full text-xs bg-white border border-gray-200 py-2.5 px-3 rounded-xl outline-none focus:border-emerald-500 font-semibold font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'en' ? 'Total Quantity Available' : 'మొత్తం నిల్వ పరిమాణం (e.g. 45 బస్తాలు)'} *
              </label>
              <input
                id="crop-input-qty"
                type="text"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 40 Quintals / 50 Bags"
                className="w-full text-xs bg-white border border-gray-200 py-2.5 px-3 rounded-xl outline-none focus:border-emerald-500 font-semibold text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'en' ? 'Farmer / Seller Name' : 'రైతు / విక్రేత పేరు'} *
              </label>
              <input
                id="crop-input-seller"
                type="text"
                required
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className="w-full text-xs bg-white border border-gray-200 py-2.5 px-3 rounded-xl outline-none focus:border-emerald-500 font-semibold text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'en' ? 'Seller Mobile Number' : 'విక్రేత ఫోన్ సంఖ్య'} *
              </label>
              <input
                id="crop-input-phone"
                type="tel"
                required
                maxLength={10}
                value={sellerPhone}
                onChange={(e) => setSellerPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full text-xs bg-white border border-gray-200 py-2.5 px-3 rounded-xl outline-none focus:border-emerald-500 font-bold font-mono tracking-wider"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'en' ? 'Farming Village, District, State' : 'పొలం ఉన్న చిరునామా (గ్రామం, జిల్లా, రాష్ట్రం)'} *
              </label>
              <input
                id="crop-input-village"
                type="text"
                required
                value={locVillage}
                onChange={(e) => setLocVillage(e.target.value)}
                className="w-full text-xs bg-white border border-gray-200 py-2.5 px-3 rounded-xl outline-none focus:border-emerald-500 text-gray-800 font-semibold"
              />
            </div>

            {/* Live Crop Image Previewer */}
            <div className="md:col-span-2 bg-emerald-100/40 p-3 rounded-2xl flex items-center gap-4 border border-emerald-200/50">
              <img 
                referrerPolicy="no-referrer"
                src={getCropImageAndCategory(category).imageUrl} 
                alt={category} 
                className="w-16 h-16 rounded-xl object-cover border border-emerald-300 shadow-xs" 
              />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] text-emerald-800 font-extrabold uppercase bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {getCropImageAndCategory(category).category} Department
                </span>
                <p className="text-xs text-gray-700 font-bold mt-1.5 truncate">
                  Matched Image: <span className="text-emerald-955 font-black">{category}</span>
                </p>
                <p className="text-[10px] text-gray-500 leading-normal">
                  Authentic, high-resolution crop imagery is loaded automatically for buyer confidence.
                </p>
              </div>
            </div>

            <button
              id="list-crop-submit-btn"
              type="submit"
              className="md:col-span-2 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors cursor-pointer text-xs uppercase tracking-wider"
            >
              🚀 {language === 'en' ? 'Publish Verified Listing' : 'ఇప్పుడు ప్రచురించు'}
            </button>
          </form>
        </div>
      )}

      {/* FILTER CONTROLS */}
      <div className="bg-white p-4 rounded-2xl border border-gray-150 mb-6 flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          <input
            id="market-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'en' ? 'Search crop or location...' : 'ప్రాంతం లేదా పంట వెతకండి...'}
            className="w-full text-xs bg-gray-50 border border-gray-200 py-2.5 pl-9 pr-4 rounded-xl outline-none focus:border-emerald-500 focus:bg-white font-medium text-gray-700"
          />
        </div>

        {/* Categories Horizontal flow */}
        <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pr-1 py-1 shrink-0 scrollbar-none scroll-smooth">
          {availableCategories.map((cat, i) => {
            const isSelected = filterCategory === cat;
            return (
              <button
                key={i}
                id={`filter-cat-${cat}`}
                onClick={() => setFilterCategory(cat)}
                className={`py-1.5 px-3 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'All' ? (language === 'en' ? 'All Crops' : 'అన్నీ') : cat}
              </button>
            );
          })}
        </div>

        {/* Reset / Setup database button for quick check */}
        <button
          onClick={resetToSeededList}
          title="Restore 55+ Verified crops database"
          className="bg-stone-50 hover:bg-stone-100 text-stone-600 p-2.5 rounded-xl border border-stone-200/80 transition-all cursor-pointer flex items-center justify-center shrink-0 self-end md:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* PRODUCE LISTINGS FEED */}
      {filteredListings.length === 0 ? (
        <div id="market-empty" className="bg-gray-50 rounded-2xl border border-gray-200 p-12 text-center text-gray-400 font-medium text-xs">
          {language === 'en' ? 'No produce listed matching your active criteria. Change filters or publish a new post!' : 'ఈ విభాగంలో పంట వివరాలు ఏవీ లేవు, మీ పంటను ఇక్కడ చేర్చండి.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item, id) => {
            const cropDetail = getCropImageAndCategory(item.category);
            const itemImage = cropDetail.imageUrl || item.imageUrl;
            const parentCat = cropDetail.category;
            
            return (
              <div key={item.id || id} id={`market-item-${item.id}`} className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
                
                <div className="relative h-44 shrink-0 bg-stone-50 border-b border-gray-100 overflow-hidden">
                  <img 
                    referrerPolicy="no-referrer" 
                    src={itemImage} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                  />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow">
                    {item.category}
                  </span>
                  <span className="absolute top-3 right-3 bg-stone-900/80 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide">
                    {parentCat}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-gray-800 text-sm md:text-base leading-tight hover:text-emerald-800 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate font-semibold">{item.location}</span>
                    </div>
                  </div>

                  {/* Price and quantity block */}
                  <div className="border-t border-b border-gray-100 py-3.5 my-3 grid grid-cols-2 gap-2 text-xs font-medium">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase">{language === 'en' ? 'Direct Price' : 'ధర'}</span>
                      <span className="text-emerald-600 text-base font-extrabold tracking-tight">₹{item.price.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-gray-500"> / Qtl</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase">{language === 'en' ? 'Offer Stock' : 'నిల్వ'}</span>
                      <span className="text-gray-800 font-black truncate block text-sm">{item.quantity}</span>
                    </div>
                  </div>

                  {/* Seller direct contact widget */}
                  <div className="space-y-2">
                    <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/50 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[9px] text-emerald-800 uppercase font-extrabold block">
                          🤵 {language === 'en' ? 'Farmer Contact' : 'రైతు ప్రొఫైల్'}
                        </span>
                        <p className="text-xs font-bold text-gray-800 truncate leading-tight mt-0.5">{item.sellerName}</p>
                      </div>
                      
                      <a
                        id={`contact-seller-link-${item.id}`}
                        href={`tel:${item.sellerPhone}`}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl p-2 cursor-pointer shadow-xs transition-colors shrink-0"
                        title="Call Seller Now"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                    <span className="text-[9px] text-gray-400 text-right block uppercase font-mono font-bold">Published: {item.createdAt}</span>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
