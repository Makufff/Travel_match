import { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import LaunchPage from "./components/LaunchPage";
import TinderPage from "./components/TinderPage";
import GalleryPage from "./components/GalleryPage";
import RoutingPage from "./components/RoutingPage";
import CoinRewardsPage from "./components/CoinRewardsPage";
import TravelCompanion from "./components/TravelCompanion";
import HistoryPage from "./components/HistoryPage";
import AboutPage from "./components/AboutPage";
import { mockApi } from "./services/mockApi";

const SPLASH_DURATION = 3000;

export const UserContext = createContext<{
  isLoggedIn: boolean;
  userId: string | null;
  displayName: string | null;
  pictureUrl: string | null;
  isReady: boolean;
}>({
  isLoggedIn: false,
  userId: null,
  displayName: null,
  pictureUrl: null,
  isReady: false,
});

// ── Splash Screen Component ──────────────────────────────────────
const SplashScreen: React.FC<{ fadeOut: boolean; progress: number }> = ({
  fadeOut,
  progress,
}) => (
  <div
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white via-rose-50 to-pink-100"
    style={{
      transition: "opacity 0.8s ease-out",
      opacity: fadeOut ? 0 : 1,
    }}
  >
    <div className="w-full h-full flex flex-col items-center justify-center pb-8 px-6">
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-2xl mb-6">
          <span className="text-5xl">✈️</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent tracking-wide">
          Travel Match
        </h1>
        <p className="text-pink-400 text-sm mt-2 font-medium">ค้นหาเพื่อนเที่ยวที่ใช่</p>
      </div>

      <div className="mt-8 w-full max-w-sm">
        <div className="flex items-center justify-between text-sm text-pink-800 mb-2 px-1">
          <span className="font-bold tracking-widest uppercase text-xs">Loading</span>
          <span className="tabular-nums font-bold">{progress}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-pink-200/50 shadow-inner overflow-hidden">
          <div
            className="h-full rounded-full bg-pink-500 transition-[width] duration-150 ease-linear shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  </div>
);

// ── App ──────────────────────────────────────────────────────────
function App() {
  const [isReady, setIsReady] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashFadeOut, setSplashFadeOut] = useState(false);
  const [splashProgress, setSplashProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);

  // Splash timer — fade out แล้วซ่อน
  useEffect(() => {
    const startedAt = Date.now();
    setSplashProgress(0);

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const next = Math.min(100, Math.round((elapsed / SPLASH_DURATION) * 100));
      setSplashProgress(next);
      if (next >= 100) clearInterval(progressTimer);
    }, 30);

    const fadeTimer = setTimeout(() => setSplashFadeOut(true), SPLASH_DURATION);
    const hideTimer = setTimeout(
      () => setSplashVisible(false),
      SPLASH_DURATION + 800,
    );
    return () => {
      clearInterval(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Web mode — guest user stored in localStorage
  useEffect(() => {
    let storedUserId = localStorage.getItem("user_id");
    if (!storedUserId) {
      storedUserId = "web_user_" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("user_id", storedUserId);
    }

    const storedName = localStorage.getItem("user_displayName") || "Guest";
    const storedPic =
      localStorage.getItem("user_pictureUrl") ||
      `https://ui-avatars.com/api/?name=Guest&background=ec4899&color=fff&size=150`;

    setIsReady(true);
    setIsLoggedIn(true);
    setUserId(storedUserId);
    setDisplayName(storedName);
    setPictureUrl(storedPic);
    localStorage.setItem("user_displayName", storedName);
    localStorage.setItem("user_pictureUrl", storedPic);

    mockApi.createOrGetUser(storedUserId).catch(console.error);
  }, []);

  const userContextValue = {
    isLoggedIn,
    userId,
    displayName,
    pictureUrl,
    isReady,
  };

  return (
    <>
      {/* Splash overlay — แสดงทับทุกหน้า */}
      {splashVisible && (
        <SplashScreen fadeOut={splashFadeOut} progress={splashProgress} />
      )}

      <UserContext.Provider value={userContextValue}>
        <Router>
          <Routes>
            <Route path="/" element={<LaunchPage />} />
            <Route path="/tinder" element={<TinderPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/routing" element={<RoutingPage />} />
            <Route path="/rewards" element={<CoinRewardsPage />} />
            <Route path="/travel-companion" element={<TravelCompanion />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;

