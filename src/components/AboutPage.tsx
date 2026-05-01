import React from 'react';
import Layout from './Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout showHeader>
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="max-w-md mx-auto">
          {/* Header Section */}
          <div className="bg-white px-6 pt-12 pb-8 rounded-b-3xl shadow-sm text-center">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <span className="text-5xl">✈️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Travel Match
            </h1>
            <p className="text-gray-500 text-sm">
              แอปพลิเคชันเพื่อการท่องเที่ยวและหาเพื่อนใหม่<br/>ที่ตรงใจคุณที่สุด
            </p>
          </div>

          {/* Vision Section */}
          <div className="px-4 mt-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-[#ec4899]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-3">เป้าหมายของเรา</h3>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                เราตั้งใจสร้างพื้นที่ที่ทุกคนสามารถหาเพื่อนเที่ยวที่มีสไตล์การท่องเที่ยวคล้ายกัน 
                เพื่อสร้างประสบการณ์การเดินทางที่น่าจดจำและสนุกสนานไปด้วยกัน
              </p>
            </div>
          </div>

          {/* App Info Grid */}
          <div className="px-4 mt-4 grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-[#ec4899] mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">แมตช์เพื่อนใหม่</h4>
              <p className="text-xs text-gray-500">หาเพื่อนที่มีไลฟ์สไตล์ตรงกัน</p>
            </div>
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-[#ec4899] mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">สถานที่แนะนำ</h4>
              <p className="text-xs text-gray-500">รวบรวมพิกัดน่าเที่ยว</p>
            </div>
          </div>

          <div className="mt-12 text-center pb-8 border-b border-transparent">
            {/* Using a transparent border element as padding anchor */}
            <p className="text-xs text-gray-400">© 2026 Travel Match.<br />All rights reserved.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;

