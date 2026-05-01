/**
 * Seed Data - Travel places and rewards for Travel Match
 * Covers Chiang Mai, Chiang Rai, and Nan provinces
 */

import type { TravelPlace } from "../types/TravelPlace";

export interface Reward {
  id: string;
  name: string;
  description: string;
  image: string;
  coinCost: number;
  category: "food" | "experience" | "souvenir";
  discountCode: string;
  validUntil: string;
  location: string;
  originalPrice?: string;
}

// ============================================
// CHIANG MAI PLACES - รวมสถานที่ลับ
// ============================================
export const chiangMaiPlaces: TravelPlace[] = [
  {
    id: "cm_1",
    name: "วัดอุโมงค์",
    lat: 18.783636,
    long: 98.953588,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80&auto=format&fit=crop",
    description:
      "วัดป่าที่สงบเงียบ มีชื่อเสียงเรื่องอุโมงค์โบราณที่เต็มไปด้วยพระพุทธรูป เดินผ่านทางเดินที่ปกคลุมด้วยมอส นั่งสมาธิในสวนอันสงบ และสัมผัสความศรัทธาทางพุทธศาสนาอย่างแท้จริง ห่างไกลจากฝูงชนนักท่องเที่ยว",
    city: "Chiang Mai",
    country: "Thailand",
    rating: 4.6,
    distance: "~3.2 กม.",
    tags: ["วัฒนธรรม", "ธรรมชาติ", "อากาศดี"],
  },
  {
    id: "cm_2",
    name: "อ่างแก้ว",
    lat: 18.802,
    long: 98.9446,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop",
    description:
      "อ่างเก็บน้ำสวยงามภายในมหาวิทยาลัยเชียงใหม่ มีทางเดินเลียบริมน้ำ วิวภูเขาสวยงาม และสนามหญ้ากว้างเหมาะสำหรับปิกนิกยามเย็น เป็นที่นิยมของคนท้องถิ่นสำหรับวิ่งจ็อกกิ้งและพักผ่อน",
    city: "Chiang Mai",
    country: "Thailand",
    rating: 4.7,
    distance: "~3.4 กม.",
    tags: ["ธรรมชาติ", "อากาศดี"],
  },
  {
    id: "cm_3",
    name: "หอคำหลวง",
    lat: 18.752879,
    long: 98.922341,
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80&auto=format&fit=crop",
    description:
      "หอพระราชพิธีสไตล์ล้านนาอันงดงาม ตั้งอยู่ท่ามกลางสวนภูมิทัศน์ 470 ไร่ ณ ศูนย์วิจัยเกษตรหลวง มีสถาปัตยกรรมไทยเหนือแบบดั้งเดิม และการจัดแสดงดอกไม้ตามฤดูกาล",
    city: "Chiang Mai",
    country: "Thailand",
    rating: 4.7,
    distance: "~10.7 กม.",
    tags: ["วัฒนธรรม", "ธรรมชาติ", "อากาศดี"],
  },
  {
    id: "cm_4",
    name: "วัดโลกโมฬี",
    lat: 18.7962,
    long: 98.9826,
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80&auto=format&fit=crop",
    description:
      "วัดซ่อนเร้นที่มีประวัติย้อนไปถึง พ.ศ. 1910 มีสถาปัตยกรรมล้านนาอันงดงาม พญานาคแกะสลักอย่างวิจิตร เจดีย์อิฐเก่าแก่ และลานวัดอันสงบ ห่างไกลจากนักท่องเที่ยว หนึ่งในความลับที่ดีที่สุดของเชียงใหม่",
    city: "Chiang Mai",
    country: "Thailand",
    rating: 4.8,
    distance: "~1.5 กม.",
    tags: ["วัฒนธรรม", "ธรรมชาติ"],
  },
  {
    id: "cm_6",
    name: "เวียงกุมกาม",
    lat: 18.7536,
    long: 98.9955,
    image:
      "https://images.unsplash.com/photo-1539519862-27b0a7a47c14?w=800&q=80&auto=format&fit=crop",
    description:
      "เมืองโบราณที่ถูกฝังอยู่ใต้ดิน สร้างโดยพญามังรายในศตวรรษที่ 13 ก่อนสร้างเชียงใหม่ สำรวจซากวัดโบราณกว่า 20 แห่งโดยรถม้าหรือจักรยาน การเดินทางผ่านประวัติศาสตร์ที่ถูกลืม",
    city: "Chiang Mai",
    country: "Thailand",
    rating: 4.5,
    distance: "~5 กม.",
    tags: ["วัฒนธรรม", "ธรรมชาติ"],
  },
  {
    id: "cm_7",
    name: "อุทยานแห่งชาติดอยอินทนนท์",
    lat: 18.5875,
    long: 98.4867,
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80&auto=format&fit=crop",
    description:
      "ยอดเขาที่สูงที่สุดในประเทศไทย 2,565 เมตร มีพระมหาธาตุนภเมทนีดลและนภพลภูมิสิริ น้ำตกสวยงาม และป่าเมฆ สัมผัสอากาศเย็นสบาย นกหายาก และวิวพระอาทิตย์ขึ้นเหนือทะเลหมอก",
    city: "Chiang Mai",
    country: "Thailand",
    rating: 4.9,
    distance: "~90 กม.",
    tags: ["ธรรมชาติ", "อากาศดี", "วัฒนธรรม"],
  },
  {
    id: "cm_8",
    name: "หมู่บ้านแม่กำปอง",
    lat: 18.8655,
    long: 99.351,
    image:
      "https://images.unsplash.com/photo-1598927411038-2a94acf50ba3?w=800&q=80&auto=format&fit=crop",
    description:
      "หมู่บ้านบนภูเขาที่สูง 1,300 เมตร มีประสบการณ์โฮมสเตย์แท้จริง มีชื่อเสียงเรื่องการหมักใบชา การปลูกกาแฟ และวัดสวยงามสร้างเหนือสระน้ำ เหมาะสำหรับท่องเที่ยวเชิงนิเวศ",
    city: "Chiang Mai",
    country: "Thailand",
    rating: 4.7,
    distance: "~50 กม.",
    tags: ["ธรรมชาติ", "วัฒนธรรม", "อากาศดี"],
  },
  {
    id: "cm_9",
    name: "น้ำตกบัวตอง (น้ำตกเหนียว)",
    lat: 19.1169,
    long: 99.1136,
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80&auto=format&fit=crop",
    description:
      "น้ำตกหินปูนพิเศษที่สามารถเดินขึ้นไปบนน้ำตกได้! แร่ธาตุที่สะสมทำให้พื้นผิวไม่ลื่น สถานที่ผจญภัยลับเหมาะสำหรับครอบครัวและผู้ชื่นชอบความตื่นเต้น",
    city: "Chiang Mai",
    country: "Thailand",
    rating: 4.6,
    distance: "~60 กม.",
    tags: ["ธรรมชาติ", "อากาศดี"],
  },
  {
    id: "cm_10",
    name: "บ้านข้างวัด",
    lat: 18.7892,
    long: 98.9538,
    image:
      "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800&q=80&auto=format&fit=crop",
    description:
      "หมู่บ้านศิลปินมีเสน่ห์ มีสตูดิโอทำมือ คาเฟ่ช่างฝีมือ และเวิร์กช็อปสร้างสรรค์ เลือกซื้อสินค้าทำมือ ดื่มกาแฟพิเศษ และพบปะศิลปินท้องถิ่นในชุมชนสร้างสรรค์ที่สงบ",
    city: "Chiang Mai",
    country: "Thailand",
    rating: 4.5,
    distance: "~4 กม.",
    tags: ["วัฒนธรรม", "ตลาด"],
  },
  {
    id: "cm_11",
    name: "ข้าวซอยแม่ไสย",
    lat: 18.7997,
    long: 98.9751,
    image:
      "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=800&q=80&auto=format&fit=crop",
    description:
      "ร้านข้าวซอยตำนานที่เสิร์ฟก๋วยเตี๋ยวแกงกะทิเหนือมาหลายสิบปี น้ำแกงกะทิเข้มข้น ไก่นุ่ม และบะหมี่ไข่กรอบ อาหารล้านนาแท้ที่ดีที่สุด",
    city: "Chiang Mai",
    country: "Thailand",
    rating: 4.7,
    distance: "~500 ม.",
    tags: ["ตลาด", "วัฒนธรรม"],
  },
  {
    id: "cm_12",
    name: "วัน นิมมาน",
    lat: 18.8002,
    long: 98.9676,
    image:
      "https://images.unsplash.com/photo-1555529771-122aac764e1a?w=800&q=80&auto=format&fit=crop",
    description:
      "คอมเพล็กซ์ไลฟ์สไตล์ในย่านนิมมานแสนเก๋ มีบูติกดีไซเนอร์ไทย คาเฟ่ช่างฝีมือ และร้านงานฝีมือท้องถิ่น เหมาะสำหรับของฝากเก๋ๆ และสัมผัสวัฒนธรรมเชียงใหม่ยุคใหม่",
    city: "Chiang Mai",
    country: "Thailand",
    rating: 4.5,
    distance: "~750 ม.",
    tags: ["ตลาด", "วัฒนธรรม"],
  },
  {
    id: "cm_hotel_1",
    name: "วิลล่า มหาภิรมย์",
    lat: 18.783,
    long: 98.953,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop",
    description:
      "รีสอร์ทสวยหรูที่มีสถาปัตยกรรมแบบล้านนาประยุกต์ ท่ามกลางบรรยากาศร่มรื่น",
    city: "Chiang Mai",
    country: "Thailand",
    rating: 4.8,
    distance: "~2 กม.",
    tags: ["ที่พัก", "โรงแรม", "ผ่อนคลาย"],
  },
  {
    id: "cm_hotel_2",
    name: "ที่พัก เดอะ ตะมาลินด์ วิลเลจ",
    lat: 18.787,
    long: 98.993,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80&auto=format&fit=crop",
    description:
      "โอเอซิสแห่งความสงบในใจกลางเมืองเชียงใหม่ รายล้อมด้วยต้นมะขามยักษ์และร่มเงาธรรมชาติ",
    city: "Chiang Mai",
    country: "Thailand",
    rating: 4.7,
    distance: "~500 ม.",
    tags: ["ที่พัก", "โรงแรม", "ธรรมชาติ"],
  },
];

// ============================================
// CHIANG RAI PLACES
// ============================================
// แล้วเพิ่มเข้า allPlaces และ getAvailableCities()
// ============================================

export const chiangRaiPlaces: TravelPlace[] = [
  {
    id: "cr_1",
    name: "วัดร่องขุ่น (วัดขาว)",
    lat: 19.8283,
    long: 99.7618,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Wat_Rong_Khun1.jpg",
    description:
      'ผลงานชิ้นเอกของอาจารย์เฉลิมชัย โฆษิตพิพัฒน์ วัดร่องขุ่นหรือ "วัดขาว" เป็นหนึ่งในสถาปัตยกรรมที่งดงามที่สุดในประเทศไทย ตกแต่งด้วยกระจกสีขาวและเงินระยิบระยับ สะท้อนแสงแดดเป็นประกาย สะพานทางเข้าเปรียบเสมือนการข้ามวัฏสงสาร',
    city: "Chiang Rai",
    country: "Thailand",
    rating: 4.7,
    distance: "~13 กม. จากตัวเมือง",
    tags: ["วัฒนธรรม", "ถ่ายรูป", "อากาศดี"],
  },
  {
    id: "cr_2",
    name: "วัดร่องเสือเต้น (วัดฟ้า)",
    lat: 19.9093,
    long: 99.8316,
    image:
      "https://cdn1.citylife.group/tat2/wp-content/uploads/2022/05/%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%A3%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B9%80%E0%B8%95%E0%B9%89%E0%B8%99-Blue-Temple-Wat-Ring-Sue-Ten.jpg",
    description:
      "วัดสีฟ้าสดใสที่ตกแต่งอย่างวิจิตรด้วยลวดลายพญานาคและลายไทยประยุกต์ บริเวณพระอุโบสถปูด้วยกระจกสีฟ้าและสีเงิน สวยงามตระการตาโดยเฉพาะเวลากลางคืนเมื่อเปิดไฟ เป็น hidden gem ที่ไม่แพ้วัดร่องขุ่น",
    city: "Chiang Rai",
    country: "Thailand",
    rating: 4.6,
    distance: "~3 กม. จากตัวเมือง",
    tags: ["วัฒนธรรม", "ถ่ายรูป"],
  },
  {
    id: "cr_3",
    name: "ดอยตุง",
    lat: 20.3319,
    long: 99.8364,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/09/Doi_Tung_Royal_Villa_20250117.jpg",
    description:
      "พระตำหนักดอยตุงและสวนแม่ฟ้าหลวง ตั้งอยู่บนดอยสูงใกล้ชายแดนไทย-เมียนมา บรรยากาศเย็นสบายตลอดปี ชมสวนดอกไม้นานาพันธุ์ เรียนรู้โครงการพัฒนาดอยตุงที่ช่วยชาวบ้านบนดอยให้มีอาชีพที่ยั่งยืน",
    city: "Chiang Rai",
    country: "Thailand",
    rating: 4.6,
    distance: "~50 กม. จากตัวเมือง",
    tags: ["ธรรมชาติ", "วัฒนธรรม", "อากาศดี"],
  },
  {
    id: "cr_4",
    name: "สามเหลี่ยมทองคำ",
    lat: 20.3556,
    long: 100.0861,
    image:
      "https://www.wiangchiangsaen.go.th/athf/travel/large/201507011152482.jpg",
    description:
      "จุดบรรจบของสามประเทศ ไทย ลาว และเมียนมา ณ บริเวณที่แม่น้ำโขงและแม่น้ำรวกมาบรรจบกัน มีพิพิธภัณฑ์ฝิ่น ล่องเรือชมวิว และตลาดชายแดน",
    city: "Chiang Rai",
    country: "Thailand",
    rating: 4.3,
    distance: "~60 กม. จากตัวเมือง",
    tags: ["วัฒนธรรม"],
  },
  {
    id: "cr_5",
    name: "ไร่ชาฉุยฟง",
    lat: 20.0024,
    long: 99.902,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/2f/d1/20/choui-fong-tea-farm.jpg?w=1400&h=-1&s=1",
    description:
      "ไร่ชาขนาดใหญ่บนไหล่เขาที่มีวิวทะเลชาสีเขียวสุดตา บรรยากาศหมอกยามเช้าสวยงามมาก มีคาเฟ่ชาวิวดีให้นั่งชิล ชิมชาอูหลงหลากหลายสูตร และซื้อชาคุณภาพดีกลับบ้าน",
    city: "Chiang Rai",
    country: "Thailand",
    rating: 4.5,
    distance: "~20 กม. จากตัวเมือง",
    tags: ["ธรรมชาติ", "ถ่ายรูป", "อากาศดี"],
  },
  {
    id: "cr_6",
    name: "ถ้ำหลวง-ขุนน้ำนางนอน",
    lat: 20.3763,
    long: 99.8753,
    image:
      "https://cbtthailand.dasta.or.th/upload-file-api/Resources/RelateAttraction/Images/RAT570138/2.jpeg",
    description:
      "ถ้ำที่โด่งดังระดับโลกจากเหตุการณ์กู้ภัย 13 ชีวิตทีมหมูป่า ปัจจุบันปรับเป็นอุทยานและแหล่งเรียนรู้ มีนิทรรศการบอกเล่าเรื่องราวการกู้ภัย ⚠️ ปิดเข้าถ้ำช่วงฤดูฝน (พ.ค.–ต.ค.)",
    city: "Chiang Rai",
    country: "Thailand",
    rating: 4.4,
    distance: "~70 กม. จากตัวเมือง",
    tags: ["ธรรมชาติ"],
  },
  {
    id: "cr_7",
    name: "หมู่บ้านแม่สลอง",
    lat: 20.1789,
    long: 99.6381,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Mae_salong_view_01.jpg",
    description:
      "ชุมชนชาวจีนยูนนานบนดอยสูงที่ยังคงวิถีชีวิตและวัฒนธรรมดั้งเดิมไว้อย่างเหนียวแน่น มีถนนสายชาและร้านอาหารจีนยูนนานแท้ๆ บรรยากาศหมอกและไร่ชา เหมาะสำหรับคนชอบ local authentic experience",
    city: "Chiang Rai",
    country: "Thailand",
    rating: 4.5,
    distance: "~70 กม. จากตัวเมือง",
    tags: ["วัฒนธรรม", "ธรรมชาติ"],
  },
  {
    id: "cr_8",
    name: "ตลาดไนท์บาซาร์เชียงราย",
    lat: 19.9076,
    long: 99.8319,
    image:
      "https://image-tc.galaxy.tf/wijpeg-e07xn6xck9nx8q2bfs8259r16/chiang-rai-night-bazaar_standard.jpg?crop=0%2C0%2C555%2C416&width=1140",
    description:
      "ตลาดกลางคืนใจกลางเมืองเชียงรายที่คึกคักสุดๆ มีทั้งอาหารพื้นเมือง สตรีทฟู้ด ของที่ระลึก งานหัตถกรรมชาวเขา และเสื้อผ้า เปิดทุกวันตั้งแต่ 18:00 น.",
    city: "Chiang Rai",
    country: "Thailand",
    rating: 4.3,
    distance: "~1 กม. จากตัวเมือง",
    tags: ["ตลาด", "วัฒนธรรม"],
  },
  {
    id: "cr_9",
    name: "ข้าวซอยป้าแดง",
    lat: 19.9085,
    long: 99.8305,
    image:
      "https://img.wongnai.com/p/1920x0/2021/11/03/21ebfcf109574186a10f87f72e853c5a.jpg",
    description:
      "ร้านข้าวซอยต้นตำรับเชียงรายที่ชาวบ้านแนะนำกันปากต่อปาก น้ำซุปเข้มข้นหอมกลิ่นเครื่องแกง เส้นนุ่มพอดี ราคาย่อมเยา เปิดเช้าถึงหมด",
    city: "Chiang Rai",
    country: "Thailand",
    rating: 4.6,
    distance: "~500 ม. จากตัวเมือง",
    tags: ["ตลาด", "วัฒนธรรม"],
  },
  {
    id: "cr_10",
    name: "คาเฟ่ Cat'n A Cup",
    lat: 19.9108,
    long: 99.8296,
    image:
      "https://lh3.googleusercontent.com/gps-cs-s/AHVAweovFs274rpyqE7rn92mfF3gyHU_xenLa5skXOcqM_KOwVtDWeccIQsiP0KhGIG60dVKWs9GNDXmQhw8J6FxsQZexWTLWDtTx8b0jnb1XGy_R_B1ZxAfIRgaGJ-cClfl4ZxCL5Q=s1360-w1360-h1020-rw",
    description:
      "คาเฟ่แมวกลางเมืองเชียงราย นั่งทำงานหรือพักผ่อนกับเหล่าแมวน่ารัก กาแฟและเครื่องดื่มรสดี บรรยากาศอบอุ่น เหมาะสำหรับคนที่อยากพักจากการท่องเที่ยว",
    city: "Chiang Rai",
    country: "Thailand",
    rating: 4.4,
    distance: "~800 ม. จากตัวเมือง",
    tags: ["ตลาด"],
  },
];

// ============================================
// NAN PLACES (แก้ image URLs + coordinates)
// ============================================
export const nanPlaces: TravelPlace[] = [
  {
    id: "nan_1",
    name: "วัดภูมินทร์",
    lat: 18.7742,
    long: 100.7745,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/98/2013_Wat_Phumin_Nan.jpg",
    description:
      'วัดเก่าแก่อายุกว่า 400 ปี เอกลักษณ์คือสถาปัตยกรรมแบบจัตุรมุข มีภาพจิตรกรรมฝาผนังอันลือชื่อ "ปู่ม่าน ย่าม่าน" ภาพชายหญิงกระซิบรักกันริมหู ถือเป็น masterpiece ของศิลปะน่านที่ไม่ควรพลาด',
    city: "Nan",
    country: "Thailand",
    rating: 4.8,
    distance: "~500 ม. จากตัวเมือง",
    tags: ["วัฒนธรรม"],
  },
  {
    id: "nan_2",
    name: "วัดพระธาตุช้างค้ำวรวิหาร",
    lat: 18.7764,
    long: 100.7736,
    image: "https://www.nancity.go.th/tmp/52906d7665b34b48cc2fb5652fab205b.png",
    description:
      'วัดสำคัญคู่บ้านคู่เมืองน่าน มีเจดีย์ทรงล้านนาที่มีช้างรายล้อมฐาน พระพุทธรูปทองคำ "พระพุทธนันทบุรีศรีศากยมุนี" ประดิษฐาน เดินเท้าได้จากวัดภูมินทร์',
    city: "Nan",
    country: "Thailand",
    rating: 4.6,
    distance: "~400 ม. จากตัวเมือง",
    tags: ["วัฒนธรรม"],
  },
  {
    id: "nan_3",
    name: "ดอยภูคา",
    lat: 19.1823,
    long: 101.0694,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e7/2006_1004_nan_doi_phuka_03.jpg",
    description:
      "อุทยานแห่งชาติดอยภูคา แหล่งพบต้นชมพูภูคา (Bretschneidera sinensis) ที่หายากที่สุดในโลก บานเพียงปีละครั้งช่วงเดือน ก.พ.–มี.ค. มีเส้นทางเดินป่า น้ำตก และวิวภูเขาที่งดงาม",
    city: "Nan",
    country: "Thailand",
    rating: 4.7,
    distance: "~80 กม. จากตัวเมือง",
    tags: ["ธรรมชาติ", "อากาศดี"],
  },
  {
    id: "nan_4",
    name: "บ้านไทลื้อ บ้านหนองบัว",
    lat: 19.5523,
    long: 100.8986,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/e8/d8/c8/caption.jpg?w=1000&h=-1&s=1",
    description:
      "หมู่บ้านไทลื้อที่ยังคงรักษาวิถีชีวิตดั้งเดิมไว้อย่างงดงาม ขึ้นชื่อเรื่องผ้าทอลายน้ำไหลอันวิจิตร แต่ละบ้านมีกี่ทอผ้า สามารถดูการทอและซื้อผ้าได้โดยตรงจากชาวบ้าน",
    city: "Nan",
    country: "Thailand",
    rating: 4.7,
    distance: "~70 กม. จากตัวเมือง",
    tags: ["วัฒนธรรม", "ตลาด"],
  },
  {
    id: "nan_5",
    name: "ล่องแก่งน้ำว้า",
    lat: 18.6892,
    long: 100.9514,
    image: "https://mpics.mgronline.com/pics/Images/556000013262101.JPEG",
    description:
      "กิจกรรมล่องแก่งในแม่น้ำว้าที่ไหลผ่านป่าเขาอันบริสุทธิ์ เหมาะกับสายผจญภัย ระดับความยากปานกลาง ชมธรรมชาติ วิถีชีวิตริมน้ำ มีผู้นำเที่ยวท้องถิ่นให้บริการ",
    city: "Nan",
    country: "Thailand",
    rating: 4.5,
    distance: "~40 กม. จากตัวเมือง",
    tags: ["ธรรมชาติ"],
  },
  {
    id: "nan_6",
    name: "พิพิธภัณฑสถานแห่งชาติน่าน",
    lat: 18.7758,
    long: 100.7739,
    image: "https://db.sac.or.th/museum/images/Museum/715/sac-408.jpg",
    description:
      'พิพิธภัณฑ์ตั้งอยู่ในพระราชวังเจ้าผู้ครองนครน่านอายุกว่า 100 ปี รวบรวมโบราณวัตถุและงานศิลปกรรมของน่านไว้อย่างครบถ้วน จุดเด่นคือ "งาช้างดำ" สิ่งศักดิ์สิทธิ์คู่เมืองน่าน',
    city: "Nan",
    country: "Thailand",
    rating: 4.5,
    distance: "~600 ม. จากตัวเมือง",
    tags: ["วัฒนธรรม"],
  },
  {
    id: "nan_7",
    name: "สกายวอล์คน่าน (ผาชู้)",
    lat: 18.8426,
    long: 100.7158,
    image:
      "https://cms.dmpcdn.com/travel/2021/10/26/28c87da0-3659-11ec-8db1-cdb4815402d5_webp_original.jpg",
    description:
      "จุดชมวิวกระจกใสบนผาสูงที่สามารถมองเห็นวิวเมืองน่านและทะเลหมอกได้อย่างกว้างไกล ดีที่สุดช่วงเช้าตรู่เพื่อชมทะเลหมอก เป็น unseen น่านที่ได้รับความนิยม",
    city: "Nan",
    country: "Thailand",
    rating: 4.4,
    distance: "~30 กม. จากตัวเมือง",
    tags: ["ธรรมชาติ", "ถ่ายรูป"],
  },
  {
    id: "nan_8",
    name: "ข้าวซอยสายน้ำผึ้ง",
    lat: 18.7748,
    long: 100.7769,
    image:
      "https://files.thailandtourismdirectory.go.th/assets/upload/2022/11/24//49ae6a32-6baf-45d9-aeb6-188bf759d3e5.jpg",
    description:
      "ร้านข้าวซอยเจ้าดังในน่านที่ชาวบ้านรู้จักกันดี น้ำซุปสูตรน่านรสชาติเข้มข้นแตกต่างจากเชียงใหม่ เครื่องเคียงครบครัน ราคาย่อมเยา เปิดเฉพาะเช้าถึงบ่าย",
    city: "Nan",
    country: "Thailand",
    rating: 4.5,
    distance: "~500 ม. จากตัวเมือง",
    tags: ["ตลาด", "วัฒนธรรม"],
  },
  {
    id: "nan_9",
    name: "ตลาดเช้าริมน้ำน่าน",
    lat: 18.7731,
    long: 100.7785,
    image:
      "https://i0.wp.com/www.iurban.in.th/wp-content/uploads/2013/01/morning-market.jpg?fit=770%2C513&ssl=1",
    description:
      "ตลาดเช้าริมน้ำน่านที่คึกคักที่สุดของเมือง มีผักพื้นบ้าน สมุนไพร อาหารพื้นเมืองน่าน เปิดตี 5 – 9 โมงเช้า เป็น local market แท้ๆ ที่นักท่องเที่ยวส่วนใหญ่ยังไม่รู้จัก",
    city: "Nan",
    country: "Thailand",
    rating: 4.4,
    distance: "~1 กม. จากตัวเมือง",
    tags: ["ตลาด", "วัฒนธรรม"],
  },
  {
    id: "nan_10",
    name: "Cafe' Soodgongdee",
    lat: 18.7733681,
    long: 100.77849,
    image:
      "https://chillpainai.com/src/wewakeup/scoop/img_scoop/ben_study_2016/2017/Feb/cafe_nan/sud/Sudkongdee3.jpg",
    description:
      "คาเฟ่วิวแม่น้ำน่านที่นักท่องเที่ยวชอบมานั่งชิล กาแฟท้องถิ่นรสดี บรรยากาศเงียบสงบ เหมาะกับสาย introvert ที่อยากนั่งดูแม่น้ำไหล อ่านหนังสือ หรือทำงาน",
    city: "Nan",
    country: "Thailand",
    rating: 4.3,
    distance: "~1.2 กม. จากตัวเมือง",
    tags: ["ตลาด"],
  },
];

// ============================================
// สิ่งที่ต้องแก้ใน seedData.ts (3 จุด)
// ============================================
//
// 1. Import chiangRaiPlaces และ nanPlaces เข้า allPlaces:
//
//    export const allPlaces: TravelPlace[] = [
//      ...chiangMaiPlaces,
//      ...chiangRaiPlaces,   // เพิ่มบรรทัดนี้
//      ...nanPlaces,         // เพิ่มบรรทัดนี้
//    ];
//
// 2. แก้ getAvailableCities():
//
//    export const getAvailableCities = (): string[] => {
//      return ['Bangkok', 'Chiang Mai', 'Phuket', 'Chiang Rai', 'Nan'];
//    };
//
// ============================================

// ============================================
// ALL PLACES COMBINED
// ============================================
export const allPlaces: TravelPlace[] = [
  ...chiangMaiPlaces,
  ...chiangRaiPlaces,
  ...nanPlaces,
];

// ============================================
// REWARDS (keeping in Thai context)
// ============================================
export const rewards: Reward[] = [
  // Chiang Mai Rewards
  {
    id: "rw_1",
    name: "ลด 20% ที่ข้าวซอยแม่ไสย",
    description: "ลิ้มรสอาหารเหนือแท้ๆ พร้อมส่วนลด 20% ทั้งบิล",
    image:
      "https://www.mytravelbuzzg.com/wp-content/uploads/Khao-Soi-Mae-Sai-Restaurant-e1693473350860.jpg",
    coinCost: 50,
    category: "food",
    discountCode: "YEEP20KHAO",
    validUntil: "2026-12-31",
    location: "ถนนนิมมานเหมินท์, เชียงใหม่",
    originalPrice: "150 บาท",
  },
  {
    id: "rw_2",
    name: "กาแฟฟรีที่วัน นิมมาน",
    description: "แลกรับกาแฟพิเศษฟรีที่คาเฟ่ที่ร่วมรายการใน One Nimman",
    image:
      "https://res.cloudinary.com/pillarshotels/image/upload/f_auto/web/cms/resources/attractions/on-03-1500x1000-w1800h1360.jpeg",
    coinCost: 30,
    category: "food",
    discountCode: "YEEPFREE",
    validUntil: "2026-12-31",
    location: "วัน นิมมาน, เชียงใหม่",
  },
  {
    id: "rw_3",
    name: "ทัวร์ฟาร์มจินเจอร์",
    description: "ลด 50% ทัวร์ฟาร์มออร์แกนิก รวมอาหารกลางวันและกิจกรรม",
    image:
      "https://images.squarespace-cdn.com/content/v1/5dcac1b37b75f56509c0a367/c96597eb-4afc-4346-b33c-1669a5281cd4/DSC00016.jpg",
    coinCost: 100,
    category: "experience",
    discountCode: "YEEPFARM50",
    validUntil: "2026-12-31",
    location: "Ginger Farm, แม่วาง",
    originalPrice: "800 บาท",
  },
  {
    id: "rw_4",
    name: "คลาสนั่งสมาธิวัดอุโมงค์",
    description: "คลาสนั่งสมาธิพร้อมผู้นำฟรีที่อุโมงค์วัดโบราณ",
    image:
      "https://cms.dmpcdn.com/travel/2020/11/03/9d45da30-1dbc-11eb-9275-d9e61fe8653e_original.jpg",
    coinCost: 80,
    category: "experience",
    discountCode: "YEEPZEN",
    validUntil: "2026-12-31",
    location: "วัดอุโมงค์, สุเทพ",
  },
  {
    id: "rw_5",
    name: "คูปองตลาดกลางคืน Think Park",
    description: "บัตรกำนัลช้อปปิ้ง 100 บาท สำหรับงานฝีมือและสินค้าท้องถิ่น",
    image:
      "https://changpuakmagazine.com/images/article/182925ArticleThumpnai_September2018-07-07_resize.jpg",
    coinCost: 40,
    category: "souvenir",
    discountCode: "YEEPCRAFT",
    validUntil: "2026-12-31",
    location: "Think Park, นิมมาน",
  },
  {
    id: "rw_6",
    name: "เช่าจักรยานราชพฤกษ์",
    description: "เช่าจักรยานฟรี 2 ชั่วโมงที่อุทยานหลวงราชพฤกษ์",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0f/Ho_Kum_Luang_%28I%29.jpg",
    coinCost: 25,
    category: "experience",
    discountCode: "YEEPBIKE",
    validUntil: "2026-12-31",
    location: "ศูนย์วิจัยเกษตรหลวง",
  },
  {
    id: "rw_7",
    name: "สุกี้ช้างเผือกพิเศษ",
    description: "ท็อปปิ้งเนื้อฟรีเมื่อสั่งสุกี้",
    image:
      "https://d13q9rhbndrrl0.cloudfront.net/posts/none/2021/8/1640512803955-655157687290318600.jpeg",
    coinCost: 20,
    category: "food",
    discountCode: "YEEPSUKI",
    validUntil: "2026-12-31",
    location: "ตลาดช้างเผือก",
  },
  {
    id: "rw_8",
    name: "เซ็ตปิกนิกอ่างแก้วยามเย็น",
    description: "เช่าตะกร้าปิกนิกพร้อมขนมท้องถิ่นสำหรับชมพระอาทิตย์ตก",
    image:
      "https://media.readthecloud.co/wp-content/uploads/2021/12/29133520/angkaew-11-750x500.jpg",
    coinCost: 60,
    category: "experience",
    discountCode: "YEEPPICNIC",
    validUntil: "2026-12-31",
    location: "อ่างแก้ว, มช.",
  },
  {
    id: "rw_16",
    name: "ทัวร์พายเรืออ่าวพังงา",
    description: "ลด 25% ทัวร์พายเรือคายัคเต็มวันผ่านถ้ำหินปูน",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ko_Tapu_Phang_Nga_Bay.jpg/1280px-Ko_Tapu_Phang_Nga_Bay.jpg",
    coinCost: 150,
    category: "experience",
    discountCode: "YEEPKAYAK",
    validUntil: "2026-12-31",
    location: "อ่าวพังงา",
    originalPrice: "2,500 บาท",
  },
];

// Helper functions
export const getPlacesByCity = (city: string): TravelPlace[] => {
  if (city === "all") return allPlaces;
  return allPlaces.filter((p) => p.city === city);
};

export const getPlaceById = (id: string): TravelPlace | undefined => {
  return allPlaces.find((p) => p.id === id);
};

export const getRewardsByCategory = (category: string): Reward[] => {
  if (category === "all") return rewards;
  return rewards.filter((r) => r.category === category);
};

export const getRewardById = (id: string): Reward | undefined => {
  return rewards.find((r) => r.id === id);
};

export const getAvailableCities = (): string[] => {
  return ["Chiang Mai", "Chiang Rai", "Nan"];
};

