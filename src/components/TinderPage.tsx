import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TinderCard from "../components/TinderCard";
// import CityPreferenceModal from './CityPreferenceModal';
import PlaceDetailModal from "../components/PlaceDetailModal";
import Layout from "./Layout";
import { mockApi } from "../services/mockApi";
import { getUserId, getUserStorageKey } from "../hooks/useUser";
import type { TravelPlace } from "../types/TravelPlace";

type MockMessage = { id: number; sender: string; text: string; time: string; isMe: boolean };

const MOCK_TRIP_GROUPS = [
  {
    id: 1,
    name: "เที่ยวเชียงใหม่ฤดูหนาว 🏔️",
    destination: "เชียงใหม่",
    members: 4,
    maxMembers: 6,
    dates: "15–17 ธ.ค.",
    tags: ["ธรรมชาติ", "คาเฟ่"],
    color: "from-green-400 to-teal-500",
    emoji: "🏔️",
    match: 94,
    preview: "ใครอยากไปดอยอินทนนท์ช่วงเช้าบ้าง?",
    unread: 3,
    messages: [
      { id: 1, sender: "น้องมิ้น", text: "สวัสดีทุกคนนนน 🙌", time: "09:00", isMe: false },
      { id: 2, sender: "พี่เอก", text: "สวัสดีครับ ตื่นเต้นมากเลย!", time: "09:02", isMe: false },
      { id: 3, sender: "Me", text: "สวัสดีครับทุกคน รอไม่ไหวแล้ว 😄", time: "09:05", isMe: true },
      { id: 4, sender: "น้องมิ้น", text: "ใครอยากไปดอยอินทนนท์ช่วงเช้าบ้าง?", time: "09:10", isMe: false },
      { id: 5, sender: "พี่เอก", text: "ผมไป! ออกกี่โมงดีครับ?", time: "09:11", isMe: false },
      { id: 6, sender: "Me", text: "ออก 7 โมงเช้าได้เลยครับ", time: "09:13", isMe: true },
      { id: 7, sender: "น้องฝน", text: "โอเคเลย! แล้วเจอกันที่จุดนัดพบ 🗺️", time: "09:15", isMe: false },
    ] as MockMessage[],
  },
  {
    id: 2,
    name: "Night Market Chiangmai 🌮",
    destination: "เชียงใหม่",
    members: 3,
    maxMembers: 5,
    dates: "22–23 ธ.ค.",
    tags: ["ตลาด", "อาหาร"],
    color: "from-orange-400 to-rose-500",
    emoji: "🌮",
    match: 87,
    preview: "เจอกันที่ประตูท่าแพ 18:00 น.",
    unread: 0,
    messages: [
      { id: 1, sender: "นัท", text: "กลุ่มนี้ไปตลาดกลางคืนกัน!", time: "14:00", isMe: false },
      { id: 2, sender: "Me", text: "ดีมากเลย ชอบ Street Food มาก 😋", time: "14:02", isMe: true },
      { id: 3, sender: "นัท", text: "เจอกันที่ประตูท่าแพ 18:00 น.", time: "14:05", isMe: false },
    ] as MockMessage[],
  },
  {
    id: 3,
    name: "Solo Travelers Club 🛕",
    destination: "เชียงใหม่",
    members: 8,
    maxMembers: 15,
    dates: "ทุกสุดสัปดาห์",
    tags: ["วัด", "ชิลล์"],
    color: "from-purple-400 to-indigo-500",
    emoji: "🛕",
    match: 81,
    preview: "วันนี้ไปวัดพระธาตุดอยสุเทพกัน",
    unread: 5,
    messages: [
      { id: 1, sender: "แอดมิน", text: "ยินดีต้อนรับสมาชิกใหม่ทุกคน! 🎉", time: "08:00", isMe: false },
      { id: 2, sender: "โบ", text: "สวัสดีทุกคน มาใหม่ค่ะ", time: "08:30", isMe: false },
      { id: 3, sender: "Me", text: "สวัสดีครับ ยินดีที่ได้รู้จัก 😊", time: "08:32", isMe: true },
      { id: 4, sender: "แอดมิน", text: "วันนี้ไปวัดพระธาตุดอยสุเทพกัน", time: "09:00", isMe: false },
      { id: 5, sender: "โบ", text: "ไปด้วยค่ะ!!! 🙌", time: "09:01", isMe: false },
    ] as MockMessage[],
  },
];

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
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [chatInput, setChatInput] = useState("");

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
  const isFinished = !loading && places.length > 0 && currentIndex >= places.length;

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

  // No places available (all previously swiped)
  if (!loading && selectedCategory && places.length === 0 && !error) {
    return (
      <Layout hideNavbar backgroundVariant="none">
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl flex items-center justify-center mb-5">
              <span className="text-4xl">🗺️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">ปัดครบทุกที่แล้ว!</h2>
            <p className="text-gray-500 text-sm mb-8">
              คุณเคยสำรวจสถานที่ในหมวดนี้ครบแล้ว
              ลองรีเซ็ตเพื่อเริ่มใหม่ หรือเลือกหมวดอื่น
            </p>
            <div className="space-y-3 w-full">
              <button
                onClick={handleResetDestinations}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-md active:scale-95 transition-all"
              >
                รีเซ็ตและเริ่มปัดใหม่
              </button>
              <button
                onClick={() => setSelectedCategory(null)}
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-medium active:scale-95 transition-all"
              >
                เลือกหมวดหมู่อื่น
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-400 font-medium active:scale-95 transition-all text-sm"
              >
                กลับหน้าหลัก
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Finished state - Chat view
  if (isFinished && selectedGroup !== null) {
    const group = MOCK_TRIP_GROUPS.find((g) => g.id === selectedGroup)!;
    return (
      <Layout hideNavbar backgroundVariant="none">
        <div className="min-h-screen bg-[#f0f0f0] flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-100 px-4 pt-12 pb-3 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
            <button
              onClick={() => setSelectedGroup(null)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-all flex-shrink-0"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center shadow-sm flex-shrink-0`}>
              <span className="text-xl">{group.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-[15px] truncate">{group.name}</p>
              <p className="text-xs text-gray-400">{group.members} สมาชิก · {group.dates}</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
            {group.messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.isMe ? "justify-end" : "justify-start"}`}>
                {!msg.isMe && (
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${group.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                    {msg.sender[0]}
                  </div>
                )}
                <div className="max-w-[72%]">
                  {!msg.isMe && (
                    <p className="text-xs text-gray-400 mb-1 ml-1 font-medium">{msg.sender}</p>
                  )}
                  <div className={`px-4 py-2.5 rounded-2xl ${
                    msg.isMe
                      ? "bg-pink-500 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm shadow-sm"
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <p className={`text-[11px] text-gray-400 mt-1 ${msg.isMe ? "text-right" : "text-left ml-1"}`}>
                    {msg.time}{msg.isMe && " ✓"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="bg-white border-t border-gray-200 px-3 py-3 flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 active:scale-95">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="พิมพ์ข้อความ..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-800 outline-none placeholder-gray-400"
            />
            <button
              onClick={() => setChatInput("")}
              className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all flex-shrink-0"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Finished state - Group list view
  if (isFinished) {
    return (
      <Layout hideNavbar backgroundVariant="none">
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-10">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-all"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="font-bold text-gray-900 text-lg">เพื่อนร่วมทริป</h1>
            <button
              onClick={() => navigate("/gallery")}
              className="text-sm text-pink-600 font-semibold active:scale-95 transition-all"
            >
              บันทึก ({likedPlaces.length})
            </button>
          </div>

          {/* Match Banner */}
          <div className="mx-4 mt-4 mb-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-4 text-white shadow-lg shadow-pink-200/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🎉
              </div>
              <div>
                <p className="font-bold text-lg">ค้นพบ {MOCK_TRIP_GROUPS.length} กลุ่มที่เข้ากับคุณ!</p>
                <p className="text-white/80 text-sm">
                  จาก {likedPlaces.length} สถานที่ที่คุณบันทึกไว้
                </p>
              </div>
            </div>
          </div>

          {/* Group List */}
          <div className="flex-1 overflow-y-auto px-4">
            <p className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">
              กลุ่มที่ match กับคุณ
            </p>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {MOCK_TRIP_GROUPS.map((group, idx) => (
                <button
                  key={group.id}
                  onClick={() => setSelectedGroup(group.id)}
                  className={`w-full px-4 py-4 flex items-center gap-3 active:bg-gray-50 transition-colors text-left ${
                    idx < MOCK_TRIP_GROUPS.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <span className="text-2xl">{group.emoji}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="font-bold text-gray-900 text-[15px] truncate">{group.name}</p>
                      <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                        {group.match}%
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 mb-1">
                      <span className="text-xs text-gray-400">{group.members}/{group.maxMembers} คน</span>
                      <span className="text-gray-300 text-xs">·</span>
                      <span className="text-xs text-gray-400">{group.dates}</span>
                      {group.tags.map((tag) => (
                        <span key={tag} className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400 truncate">{group.preview}</p>
                      {group.unread > 0 && (
                        <span className="ml-2 min-w-[20px] h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center px-1 font-bold flex-shrink-0">
                          {group.unread}
                        </span>
                      )}
                    </div>
                  </div>

                  <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="bg-white border-t border-gray-100 p-4 space-y-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-md active:scale-95 transition-all"
            >
              ปัดหมวดหมู่อื่นต่อ
            </button>
            <button
              onClick={handleResetDestinations}
              className="w-full py-3 rounded-xl border border-gray-200 text-gray-400 font-medium active:scale-95 transition-all text-sm"
            >
              เริ่มต้นใหม่
            </button>
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

