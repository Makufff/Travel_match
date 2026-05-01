import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TinderCard from "../components/TinderCard";
// import CityPreferenceModal from './CityPreferenceModal';
import PlaceDetailModal from "../components/PlaceDetailModal";
import Layout from "./Layout";
import { mockApi } from "../services/mockApi";
import { getUserId, getUserStorageKey } from "../hooks/useUser";
import type { TravelPlace } from "../types/TravelPlace";

const TinderPage: React.FC = () => {
  const [places, setPlaces] = useState<TravelPlace[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPlaces, setLikedPlaces] = useState<TravelPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [swipeAnimation, setSwipeAnimation] = useState<"left" | "right" | null>(
    null,
  );
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [pendingSwipe, setPendingSwipe] = useState<"left" | "right" | null>(null);

  const userId = getUserId();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize from router state if available
  useEffect(() => {
    if (location.state?.category && !selectedCategory) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state, selectedCategory]);

  // Fetch places using mock API
  const fetchPlaces = useCallback(
    async (cities: string[], categoryToFetch?: string) => {
      try {
        setLoading(true);
        setError(null);

        // Initialize user
        await mockApi.createOrGetUser(userId || "anonymous");

        // Fetch tinder places (excludes already swiped)
        const response = await mockApi.getTinderPlaces(
          userId || "anonymous",
          cities.length > 0 ? cities : undefined,
          categoryToFetch,
        );
        setPlaces(response.places);
        setCurrentIndex(0);

        // Fetch liked places
        const likedResponse = await mockApi.getLikedPlaces(
          userId || "anonymous",
        );
        setLikedPlaces(likedResponse.places);
      } catch (err) {
        console.error("Failed to fetch places:", err);
        setError("Could not load places. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  // Initial load - check if user has city preferences
  useEffect(() => {
    const checkPreferencesAndLoad = async () => {
      try {
        let citiesToSearch: string[] = [];

        // 1. Try to get city from routing state first (when coming from LaunchPage)
        if (location.state?.city) {
          citiesToSearch = [location.state.city];
          setSelectedCities(citiesToSearch);

          // Also save it to preferences so it remembers
          await mockApi.updatePreferences(userId || "anonymous", {
            selected_cities: citiesToSearch,
            preferred_tags: [],
          });
        }
        // 2. Otherwise get from saved preferences
        else {
          const prefs = await mockApi.getPreferences(userId || "anonymous");
          if (prefs.selected_cities && prefs.selected_cities.length > 0) {
            citiesToSearch = prefs.selected_cities;
            setSelectedCities(citiesToSearch);
          }
        }

        if (citiesToSearch.length > 0) {
          // If we have a category from routing state, auto-fetch!
          if (location.state?.category) {
            await fetchPlaces(citiesToSearch, location.state.category);
          } else {
            setLoading(false);
          }
        } else {
          setShowCityModal(true);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch preferences:", err);
        setShowCityModal(true);
        setLoading(false);
      }
    };

    checkPreferencesAndLoad();
  }, [userId, location.state, fetchPlaces]);

  // Handle city selection
  const handleCitySelection = async (cities: string[]) => {
    setSelectedCities(cities);
    setShowCityModal(false);

    try {
      await mockApi.updatePreferences(userId || "anonymous", {
        selected_cities: cities,
      });
    } catch (err) {
      console.error("Failed to save preferences:", err);
    }

    if (selectedCategory) {
      fetchPlaces(cities, selectedCategory);
    }
  };

  // Handle swipe action
  const handleSwipe = useCallback(
    async (direction: "left" | "right") => {
      setPendingSwipe(null);
      const currentPlace = places[currentIndex];
      if (!currentPlace) return;

      // Record swipe using mock API
      try {
        await mockApi.createSwipe(
          userId || "anonymous",
          currentPlace.id,
          direction,
        );
      } catch (err) {
        console.error("Failed to record swipe:", err);
      }

      if (direction === "right") {
        setLikedPlaces((prev) => {
          const updated = [...prev, currentPlace];
          return updated;
        });
      }

      setCurrentIndex((prev) => prev + 1);
    },
    [places, currentIndex, userId],
  );

  const handleButtonAction = (direction: "left" | "right") => {
    if (pendingSwipe) return; // prevent double-fire
    setSwipeAnimation(direction);
    setTimeout(() => setSwipeAnimation(null), 300);
    setPendingSwipe(direction);
  };

  const remainingPlaces = places.slice(currentIndex, currentIndex + 2);
  const isFinished = !loading && currentIndex >= places.length;

  if (!selectedCategory && !showCityModal) {
    return (
      <Layout hideNavbar backgroundVariant="none">
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-12 pb-4">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center active:scale-95 transition-all"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl flex items-center justify-center shadow-lg mb-6">
              <span className="text-4xl">🗺️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">เลือกหมวดหมู่</h2>
            <p className="text-gray-500 text-sm mb-10 text-center">อยากค้นหาอะไรวันนี้?</p>

            <div className="flex flex-col w-full max-w-sm gap-4">
              {[
                {
                  category: "Attraction",
                  emoji: "📍",
                  label: "ที่เที่ยว",
                  desc: "สถานที่ท่องเที่ยว วัด ธรรมชาติ",
                  from: "from-pink-500",
                  to: "to-rose-500",
                  shadow: "shadow-pink-200",
                },
                {
                  category: "Restaurant",
                  emoji: "🍽️",
                  label: "ร้านอาหาร & คาเฟ่",
                  desc: "ร้านอร่อย คาเฟ่สวย สตรีทฟู้ด",
                  from: "from-orange-400",
                  to: "to-amber-500",
                  shadow: "shadow-orange-200",
                },
                {
                  category: "Hotel",
                  emoji: "🏨",
                  label: "ที่พัก",
                  desc: "โรงแรม รีสอร์ท โฮสเทล",
                  from: "from-blue-500",
                  to: "to-indigo-500",
                  shadow: "shadow-blue-200",
                },
              ].map((item) => (
                <button
                  key={item.category}
                  onClick={() => {
                    setSelectedCategory(item.category);
                    fetchPlaces(selectedCities, item.category);
                  }}
                  className={`bg-white rounded-2xl shadow-md ${item.shadow} border border-gray-100 p-4 flex items-center gap-4 active:scale-95 transition-all hover:shadow-lg`}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.from} ${item.to} rounded-2xl flex items-center justify-center shadow-md flex-shrink-0`}>
                    <span className="text-2xl">{item.emoji}</span>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-gray-900 text-lg leading-tight">{item.label}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Layout hideNavbar backgroundVariant="tinder">
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <div className="text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-pink-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-pink-600 rounded-full animate-spin"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🗺️</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800">กำลังโหลด...</h2>
            <p className="text-gray-500">
              กำลังค้นหาสถานที่ท่องเที่ยวสุดพิเศษสำหรับคุณ
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state with retry
  if (error && places.length === 0) {
    return (
      <Layout
        showHeader
        showBackButton
        headerTitle="สำรวจ"
        backgroundVariant="tinder"
      >
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-xl font-bold text-gray-800">
              มีบางอย่างผิดพลาด
            </h2>
            <p className="text-gray-500">{error}</p>
            <div className="space-y-3 pt-4">
              <button
                onClick={() =>
                  fetchPlaces(selectedCities, selectedCategory || undefined)
                }
                className="block w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-6 rounded-xl font-semibold shadow-md active:scale-95 transition-all"
              >
                ลองใหม่
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle reset destinations
  const handleResetDestinations = async () => {
    try {
      setLoading(true);
      await mockApi.resetAllProgress(userId || "anonymous");
      // Refetch places to start fresh
      if (selectedCategory) {
        await fetchPlaces(selectedCities, selectedCategory);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to reset destinations:", err);
      setError("Could not reset destinations. Please try again.");
      setLoading(false);
    }
  };

  // Finished state
  if (isFinished) {
    return (
      <Layout
        showHeader
        headerTitle="เสร็จสิ้น!"
        showCoinCounter
        backgroundVariant="tinder"
      >
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl flex items-center justify-center shadow-lg animate-bounce-slow">
              <span className="text-white font-bold text-xl">Success!</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              คุณดูครบหมดแล้ว!
            </h2>

            <p className="text-gray-600">
              {selectedCities.length > 0
                ? `สำรวจสถานที่ใน${selectedCities.join(" & ")}ครบแล้ว!`
                : "สำรวจสถานที่ทั้งหมดครบแล้ว!"}
            </p>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-3xl font-bold text-pink-600">
                  {likedPlaces.length}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">สถานที่ที่บันทึก</div>
            </div>

            <div className="space-y-3 w-full">
              <button
                onClick={() => navigate("/routing")}
                className="flex items-center justify-center w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg shadow-pink-500/30 active:scale-95 transition-all outline outline-offset-2 outline-2 outline-pink-500 animate-pulse-slow"
              >
                สรุปแผนการท่องเที่ยว
              </button>

              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center justify-center w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-md active:scale-95 transition-all mt-4"
              >
                เลือกปัดหมวดหมู่อื่นต่อ
              </button>

              <button
                onClick={() => setShowCityModal(true)}
                className="flex items-center justify-center w-full bg-white text-pink-600 border border-pink-100 py-3.5 px-6 rounded-xl font-semibold shadow-sm active:scale-95 transition-all"
              >
                สำรวจเมืองอื่น
              </button>

              <button
                onClick={() => navigate("/gallery")}
                className="flex items-center justify-center w-full bg-white text-pink-600 border border-pink-100 py-3.5 px-6 rounded-xl font-semibold shadow-sm active:scale-95 transition-all"
              >
                ดูที่บันทึกของฉัน
              </button>

              <button
                onClick={handleResetDestinations}
                className="flex items-center justify-center w-full bg-gray-50 text-gray-500 border border-gray-100 py-3.5 px-6 rounded-xl font-medium shadow-sm active:scale-95 transition-all"
              >
                รีเซ็ต & ปัดหมวด{" "}
                {selectedCategory === "Attraction"
                  ? "ที่เที่ยว"
                  : selectedCategory === "Restaurant"
                    ? "ร้านอาหาร"
                    : "ที่พัก"}{" "}
                ใหม่
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideNavbar backgroundVariant="tinder">
      <div className="min-h-screen flex flex-col pb-24">
        {/* Compact Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/70 backdrop-blur-xl border-b border-pink-100/50 sticky top-0 z-30">
          <Link
            to="/"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-sm active:scale-95 transition-all"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>

          {/* City Filter Chip */}
          <button
            onClick={() => setShowCityModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 px-4 py-2 rounded-full transition-all active:scale-95 shadow-sm"
          >
            <span className="text-sm">📍</span>
            <span className="font-semibold text-pink-700 text-sm">
              {selectedCities.length === 0
                ? "ทุกเมือง"
                : selectedCities.length === 1
                  ? selectedCities[0]
                  : `${selectedCities.length} เมือง`}
            </span>
            <svg
              className="w-4 h-4 text-pink-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Gallery Link with Badge */}
          <Link
            to="/gallery"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-sm active:scale-95 transition-all"
          >
            <svg
              className="w-5 h-5 text-pink-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {likedPlaces.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-full text-xs flex items-center justify-center font-bold shadow-md">
                {likedPlaces.length > 9 ? "9+" : likedPlaces.length}
              </span>
            )}
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="px-4 py-3 bg-white/40 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="flex-1 h-1.5 bg-pink-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-rose-400 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(((currentIndex + 1) / places.length) * 100, 100)}%`,
                }}
              />
            </div>
            <span className="text-xs font-semibold text-pink-600 whitespace-nowrap bg-pink-50 px-2 py-0.5 rounded-full">
              {currentIndex + 1}/{places.length}
            </span>
          </div>
        </div>

        {/* Cards Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 min-h-0">
          <div className="relative w-full max-w-xs sm:max-w-sm h-[60vh] max-h-[450px]">
            {remainingPlaces.map((place, index) => (
              <TinderCard
                key={place.id}
                place={place}
                onSwipe={handleSwipe}
                isTop={index === 0}
                pendingSwipe={index === 0 ? pendingSwipe : null}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons - Fixed at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-pink-100/50 safe-area-bottom">
          <div className="flex items-center justify-center space-x-4 py-4 px-6 max-w-lg mx-auto">
            {/* Skip Button */}
            <button
              onClick={() => handleButtonAction("left")}
              className={`relative w-14 h-14 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center active:scale-90 transition-all duration-200 ${
                swipeAnimation === "left"
                  ? "scale-110 border-pink-400 bg-pink-50"
                  : ""
              }`}
            >
              <svg
                className="w-7 h-7 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* More Info Button */}
            <button
              onClick={() => setShowDetailModal(true)}
              className="relative w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-all duration-200"
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
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            {/* Like Button */}
            <button
              onClick={() => handleButtonAction("right")}
              className={`relative w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-all duration-200 ${
                swipeAnimation === "right"
                  ? "scale-110 shadow-xl shadow-rose-200"
                  : ""
              }`}
            >
              <svg
                className="w-7 h-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>

          {/* Helper text */}
          <div className="text-center pb-3 -mt-2">
            <p className="text-xs text-gray-400">
              ปัดซ้าย เพื่อข้าม | กดตรงกลาง เพื่อดูข้อมูล | ปัดขวา เพื่อบันทึก
            </p>
          </div>
        </div>

        {/* City Selection Modal */}
        {showCityModal && (
          <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 animate-slide-up">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />
              <h3 className="text-xl font-bold text-gray-900 mb-1">เลือกจังหวัด</h3>
              <p className="text-gray-500 text-sm mb-5">เลือกได้มากกว่า 1 จังหวัด</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { name: "เชียงใหม่", emoji: "🏯", enabled: true },
                  { name: "เชียงราย", emoji: "⛩️", enabled: true },
                  { name: "น่าน", emoji: "🌿", enabled: true },
                ].map((city) => {
                  const isSelected = selectedCities.includes(city.name);
                  return (
                    <button
                      key={city.name}
                      onClick={() => {
                        setSelectedCities(prev =>
                          isSelected ? prev.filter(c => c !== city.name) : [...prev, city.name]
                        );
                      }}
                      className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                        isSelected
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <span className="text-3xl mb-2">{city.emoji}</span>
                      <span className={`font-bold text-sm ${isSelected ? "text-pink-600" : "text-gray-700"}`}>
                        {city.name}
                      </span>
                      {isSelected && (
                        <span className="mt-1 text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCityModal(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 font-semibold text-gray-600 active:scale-95 transition-all"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => handleCitySelection(selectedCities.length > 0 ? selectedCities : ["เชียงใหม่"])}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-md active:scale-95 transition-all"
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Place Detail Modal */}
        <PlaceDetailModal
          place={remainingPlaces[0] || null}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
        />
      </div>
    </Layout>
  );
};

export default TinderPage;

