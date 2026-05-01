import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useUser } from "../hooks/useUser";
import { CoinSystem, type ActiveJourney } from "../utils/coinSystem";

const featuredPlaces = [
  {
    // วัดอุโมงค์ — อุโมงค์อิฐโบราณในป่า
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Wat_Umong_Suan_Phutthatham.jpg/800px-Wat_Umong_Suan_Phutthatham.jpg",
    name: "วัดอุโมงค์",
    city: "เชียงใหม่",
    category: "วัด",
  },
  {
    // อ่างแก้ว — อ่างเก็บน้ำ มช.
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/%E0%B8%AD%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7_%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88_-_panoramio.jpg/800px-%E0%B8%AD%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7_%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88_-_panoramio.jpg",
    name: "อ่างแก้ว",
    city: "เชียงใหม่",
    category: "ธรรมชาติ",
  },
  {
    // วัดร่องขุ่น — วัดขาวเชียงราย
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Wat_Rong_Khun1.jpg",
    name: "วัดร่องขุ่น",
    city: "เชียงราย",
    category: "วัด",
  },
  {
    // วัดภูมินทร์ — ภาพจิตรกรรมฝาผนังน่าน
    url: "https://upload.wikimedia.org/wikipedia/commons/9/98/2013_Wat_Phumin_Nan.jpg",
    name: "วัดภูมินทร์",
    city: "น่าน",
    category: "วัด",
  },
  {
    // ดอยอินทนนท์ — ยอดสูงสุดในไทย
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Doi_Inthanon_National_Park.jpg/800px-Doi_Inthanon_National_Park.jpg",
    name: "ดอยอินทนนท์",
    city: "เชียงใหม่",
    category: "อุทยาน",
  },
  {
    // ดอยภูคา — ป่าสนน่าน
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e7/2006_1004_nan_doi_phuka_03.jpg",
    name: "ดอยภูคา",
    city: "น่าน",
    category: "ธรรมชาติ",
  },
  {
    // ไร่ชาฉุยฟง — ไร่ชาเขียวเชียงราย
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Doi_Tung_Royal_Villa_20250117.jpg/800px-Doi_Tung_Royal_Villa_20250117.jpg",
    name: "ดอยตุง",
    city: "เชียงราย",
    category: "ธรรมชาติ",
  },
];

// Modern SVG Icons with filled style for better mobile visibility
const ExploreIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

const SavedIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const RewardsIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
  </svg>
);

const HistoryIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
  </svg>
);

const MapIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
  </svg>
);

const quickActions = [
  {
    icon: ExploreIcon,
    label: "เที่ยว/กิน/พัก",
    path: "/tinder",
    gradient: "from-pink-500 via-rose-500 to-pink-400",
    shadow: "shadow-pink-200",
  },
  {
    icon: MapIcon,
    label: "แผนการเที่ยว",
    path: "/routing",
    gradient: "from-pink-500 via-pink-500 to-pink-400",
    shadow: "shadow-pink-200",
  },
  {
    icon: RewardsIcon,
    label: "รางวัล",
    path: "/rewards",
    gradient: "from-rose-500 via-rose-500 to-rose-400",
    shadow: "shadow-rose-200",
  },
  {
    icon: HistoryIcon,
    label: "ประวัติ",
    path: "/history",
    gradient: "from-pink-500 via-pink-500 to-pink-400",
    shadow: "shadow-pink-200",
  },
];

const LaunchPage: React.FC = () => {
  const { isLoggedIn, displayName, pictureUrl, userId } = useUser();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [greeting, setGreeting] = useState("");
  const [activeJourney, setActiveJourney] = useState<ActiveJourney | null>(null);
  const [journeyProgress, setJourneyProgress] = useState({ visited: 0, total: 0, percentage: 0 });
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [nameInput, setNameInput] = useState(displayName || "Guest");
  const [currentName, setCurrentName] = useState(displayName || localStorage.getItem("user_displayName") || "Guest");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("สวัสดีตอนเช้า");
    else if (hour < 18) setGreeting("สวัสดีตอนบ่าย");
    else setGreeting("สวัสดีตอนเย็น");
  }, []);

  const saveName = () => {
    const trimmed = nameInput.trim() || "Guest";
    localStorage.setItem("user_displayName", trimmed);
    setCurrentName(trimmed);
    setShowNameEdit(false);
  };

  // Check for active journey
  useEffect(() => {
    const journey = CoinSystem.getActiveJourney();
    setActiveJourney(journey);
    if (journey) {
      setJourneyProgress(CoinSystem.getJourneyProgress());
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % featuredPlaces.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout showHeader showCoinCounter backgroundVariant="thailand">
      <div className="px-4 py-4 max-w-lg mx-auto">
        {/* Welcome Section - Modern & Clean */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center space-x-4 mb-4">
            <button onClick={() => { setNameInput(currentName); setShowNameEdit(true); }} className="relative flex-shrink-0">
              {pictureUrl ? (
                <img
                  src={pictureUrl}
                  alt={currentName}
                  className="w-14 h-14 rounded-2xl border-2 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center shadow">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z" />
                </svg>
              </span>
            </button>
            <div>
              <p className="text-gray-500 text-sm font-medium">{greeting}</p>
              <h2 className="text-xl font-bold text-gray-900">{currentName}</h2>
            </div>
          </div>
          <p className="text-gray-600">
            ค้นพบประสบการณ์การท่องเที่ยวที่ไม่เหมือนใคร
          </p>
        </div>

        {/* Province Selection */}
        {!selectedProvince && (
          <div className="mb-6 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              จังหวัดที่คุณอยากไป
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  name: "เชียงใหม่",
                  enabled: true,
                  img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80&auto=format&fit=crop",
                },
                {
                  name: "เชียงราย",
                  enabled: false,
                  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Wat_Rong_Khun1.jpg/480px-Wat_Rong_Khun1.jpg",
                },
                {
                  name: "น่าน",
                  enabled: false,
                  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/2006_1004_nan_doi_phuka_03.jpg/480px-2006_1004_nan_doi_phuka_03.jpg",
                },
              ].map((prov) => (
                <button
                  key={prov.name}
                  onClick={() => prov.enabled && setSelectedProvince(prov.name)}
                  disabled={!prov.enabled}
                  className={`relative rounded-2xl overflow-hidden shadow-sm transition-all h-24 flex items-end justify-center pb-2 group ${
                    prov.enabled
                      ? "cursor-pointer hover:shadow-md hover:-translate-y-1"
                      : "cursor-not-allowed opacity-80"
                  }`}
                >
                  {/* Background Image */}
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ${prov.enabled ? "group-hover:scale-110" : ""} ${!prov.enabled ? "grayscale-[40%]" : ""}`}
                    style={{ backgroundImage: `url(${prov.img})` }}
                  />
                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="font-bold text-white text-[15px] drop-shadow-lg">
                      {prov.name}
                    </span>
                    {!prov.enabled && (
                      <span className="text-[9px] font-medium text-white/95 bg-white/20 px-2 py-0.5 rounded-full mt-1 backdrop-blur-md shadow-sm">
                        Coming soon
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Duration Selection */}
        {selectedProvince && !selectedDuration && (
          <div className="mb-6 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-gray-900">
                ไปเที่ยวกี่วัน? ({selectedProvince})
              </h3>
              <button
                className="text-xs text-gray-400 underline"
                onClick={() => setSelectedProvince(null)}
              >
                เปลี่ยนจังหวัด
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((days) => (
                <button
                  key={days}
                  onClick={() => setSelectedDuration(days)}
                  className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 hover:border-pink-500 hover:bg-pink-50 transition-all font-bold text-gray-700"
                >
                  {days} วัน
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Categories Section - เที่ยว พัก กิน */}
        {selectedProvince && selectedDuration && (
          <div className="mb-6 animate-slide-up">
            <div className="flex flex-col mb-2">
              <div className="flex justify-between items-center text-sm font-medium text-gray-600 mb-2 px-2">
                <span>
                  แผน: {selectedProvince} ({selectedDuration} วัน)
                </span>
                <button
                  className="text-xs underline"
                  onClick={() => {
                    setSelectedProvince(null);
                    setSelectedDuration(null);
                  }}
                >
                  เริ่มใหม่
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center bg-white rounded-full p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 max-w-sm mx-auto">
              <button
                onClick={() =>
                  navigate("/tinder", {
                    state: {
                      city: selectedProvince,
                      duration: selectedDuration,
                      category: "Attraction",
                    },
                  })
                }
                className="flex-1 py-3 px-2 rounded-full font-bold text-sm bg-[#ec4899] text-white shadow-sm flex items-center justify-center gap-1 transition-all duration-300 transform active:scale-95"
              >
                <span className="text-lg">📍</span> เที่ยว
              </button>
              <button
                onClick={() =>
                  navigate("/tinder", {
                    state: {
                      city: selectedProvince,
                      duration: selectedDuration,
                      category: "Hotel",
                    },
                  })
                }
                className="flex-1 py-3 px-2 rounded-full font-bold text-sm text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1 transition-all duration-300 transform active:scale-95"
              >
                <span className="text-lg">🏨</span> พัก
              </button>
              <button
                onClick={() =>
                  navigate("/tinder", {
                    state: {
                      city: selectedProvince,
                      duration: selectedDuration,
                      category: "Restaurant",
                    },
                  })
                }
                className="flex-1 py-3 px-2 rounded-full font-bold text-sm text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1 transition-all duration-300 transform active:scale-95"
              >
                <span className="text-lg">🍽️</span> กิน
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions Grid{/* Quick Actions Grid - Modern Mobile-First Design */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6 animate-slide-up">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={index}
                to={action.path}
                className="group flex flex-col items-center p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-sm border border-white/50 hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${action.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg ${action.shadow} mb-2 sm:mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  <IconComponent />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-gray-700 group-hover:text-gray-900 text-center leading-tight">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Continue Your Travel Banner - Shows when there's an active journey */}
        {activeJourney && (
          <div className="mb-6 animate-fade-in">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-5 shadow-lg relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-pink-100 text-xs font-medium">
                        กำลังเดินทาง
                      </p>
                      <h3 className="text-white font-bold text-lg">
                        {activeJourney.city === "all"
                          ? "หลายเมือง"
                          : activeJourney.city}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-xs">ความคืบหน้า</p>
                    <p className="text-white font-bold text-xl">
                      {journeyProgress.percentage}%
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                  <div
                    className="bg-white rounded-full h-2 transition-all duration-500"
                    style={{ width: `${journeyProgress.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white/90 text-sm mb-4">
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    {journeyProgress.visited}/{journeyProgress.total}{" "}
                    สถานที่เยี่ยมชมแล้ว
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {activeJourney.duration}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/travel-companion")}
                  className="w-full bg-white text-pink-600 py-3 px-6 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 active:scale-98 flex items-center justify-center space-x-2"
                >
                  <span>เดินทางต่อ</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Featured Carousel */}
        <div className="mb-6 animate-fade-in-delayed">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">สถานที่แนะนำ</h3>
            <Link
              to="/tinder"
              className="text-sm text-pink-600 font-semibold flex items-center hover:text-pink-700 transition-colors"
            >
              ดูทั้งหมด
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="relative h-52 rounded-2xl overflow-hidden shadow-lg">
            {featuredPlaces.map((place, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentImageIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <img
                  src={place.url}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs text-white font-medium mb-2">
                    {place.category}
                  </span>
                  <h4 className="text-white font-bold text-lg">{place.name}</h4>
                  <p className="text-white/80 text-sm">{place.city}</p>
                </div>
              </div>
            ))}

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 right-4 flex space-x-1.5">
              {featuredPlaces.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Start Exploring CTA - Clean Design */}
        <div
          className="bg-gradient-to-br from-pink-500 via-rose-500 to-rose-400 rounded-3xl p-6 mb-6 shadow-xl animate-slide-up relative overflow-hidden"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex-1 mr-4">
              <h3 className="text-white font-bold text-xl mb-2">
                พร้อมเที่ยวหรือยัง?
              </h3>
              <p className="text-white/85 text-sm mb-4">
                ค้นพบสถานที่ท่องเที่ยวที่เหมาะกับคุณ
              </p>
              <Link
                to="/tinder"
                className="inline-flex items-center px-5 py-2.5 bg-white text-pink-600 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                เริ่มสำรวจ
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-inner">
              <span className="text-3xl">🌴</span>
            </div>
          </div>
        </div>

        {/* How it Works - Professional Steps */}
        <div
          className="mb-6 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">วิธีใช้งาน</h3>
          <div className="space-y-3">
            {[
              {
                step: 1,
                title: "สำรวจสถานที่",
                desc: "ปัดขวาเพื่อบันทึกสถานที่ที่คุณชอบ",
                iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                color: "from-pink-500 to-rose-600",
                bgLight: "bg-pink-50",
              },
              {
                step: 2,
                title: "สร้างคอลเลคชัน",
                desc: "รวบรวมสถานที่โปรดของคุณ",
                iconPath:
                  "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                color: "from-pink-500 to-rose-600",
                bgLight: "bg-pink-50",
              },
              {
                step: 3,
                title: "สะสมเหรียญ",
                desc: "รับเหรียญเมื่อเยี่ยมชมสถานที่",
                iconPath:
                  "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                color: "from-rose-500 to-rose-500",
                bgLight: "bg-rose-50",
              },
              {
                step: 4,
                title: "แลกรางวัล",
                desc: "ใช้เหรียญแลกส่วนลดพิเศษ",
                iconPath:
                  "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
                color: "from-pink-500 to-pink-600",
                bgLight: "bg-pink-50",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mr-4 shadow-md`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={item.iconPath}
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-500">
                  {item.step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section - Clean Cards */}
        <div
          className="grid grid-cols-3 gap-3 mb-6 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            {
              value: "20+",
              label: "สถานที่",
              iconPath:
                "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
              color: "text-pink-600",
              bgColor: "bg-pink-100",
            },
            {
              value: "8+",
              label: "รางวัล",
              iconPath:
                "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
              color: "text-rose-600",
              bgColor: "bg-rose-100",
            },
            {
              value: "2",
              label: "เมือง",
              iconPath:
                "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
              color: "text-pink-600",
              bgColor: "bg-pink-100",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow duration-200"
            >
              <div
                className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-2`}
              >
                <svg
                  className={`w-5 h-5 ${stat.color}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={stat.iconPath}
                  />
                </svg>
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* About Section Link */}
        <div
          className="mb-6 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <Link
            to="/about"
            className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">เกี่ยวกับเรา</h3>
                <p className="text-sm text-gray-500">
                  ทำความรู้จักกับทีมและโปรเจค
                </p>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Bottom spacing for navbar */}
        <div className="h-4" />
      </div>

      {/* Edit Name Modal */}
      {showNameEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 animate-slide-up">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />
            <h3 className="text-lg font-bold text-gray-900 mb-4">แก้ไขชื่อ</h3>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
              maxLength={30}
              autoFocus
              placeholder="ใส่ชื่อของคุณ"
              className="w-full border-2 border-pink-200 focus:border-pink-500 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none transition-colors mb-5"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowNameEdit(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 font-semibold text-gray-600 active:scale-95 transition-all"
              >
                ยกเลิก
              </button>
              <button
                onClick={saveName}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-md active:scale-95 transition-all"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default LaunchPage;

