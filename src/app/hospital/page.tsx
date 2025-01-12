"use client"; // 标记这个文件为客户端组件
import { useState, useEffect, useMemo } from "react";
import { Hospital } from "@/types/types";
import SearchBar from "@/component/SearchBar";

export default function HospitalFilter() {
  const sheetId = "1R7f8svVrq0GlGr6k4RxQ4lHLzaxyJCsy8-mh6cBMtRs";
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
  //
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);
  //
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState("全部");
  //
  const [searchQuery, setSearchQuery] = useState(""); // 子組件搜尋字串

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTopBtn(true);
      } else {
        setShowScrollTopBtn(false);
      }
    };

    // 註冊 window event 監聽器
    window.addEventListener("scroll", handleScroll);

    // 清除事件監聽器
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // sheet data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(sheetUrl); // 獲取數據

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvText = await response.text();
        const rows = csvText.split("\n").map(
          // 以 \n 換行符拆為元素 row ，map 處理 row：
          (row) =>
            row
              .trim() // 去除 row 前後空格，
              .split(",") // row 中按 `,` 切為陣列 [r1,r2,r3]
              .map((cell) => cell.replace(/\r/g, "")) // map 處理 r1,r2,r3，有 \r 回車符轉空字串。
        ); // 遇折行建立元素存入一個陣列

        const filteredRows = rows.filter((row) => row.length > 1); // 擷取超過一個元素的陣列
        const headers = filteredRows[0]; // 擷取標題列

        const dataObjects = filteredRows.slice(1).map((row) => {
          return headers.reduce((obj: Hospital, header, index) => {
            obj[header] = row[index] ? row[index].trim() : "";
            return obj;
          }, {} as Hospital);
        });

        setHospitals(dataObjects); // 設定 hospitals
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`資料獲取錯誤: ${error.message}`);
          setError(error); // 确保类型安全
        } else {
          console.error(`未知錯誤: ${String(error)}`);
          setError(new Error("未知錯誤"));
        }
        setIsLoading(false);
      }
    };
    fetchData();
  }, [sheetUrl]);

  // {地區名稱:筆數}
  const districtsWithCount = useMemo<Record<string, number>>(() => {
    // 不重複地區 array
    const uniqueDistricts = [...new Set(hospitals.map((h) => h.district))];

    // 迭代每個地區 陣列.reduce(函式（累積容器, 當前值）, 初始容器)
    const counts = uniqueDistricts.reduce((acc: Record<string, number>, district) => {
      // 數量：醫院地區等於指定地區且 醫院 name 不為空字串
      const count = hospitals.filter((h) => h.district === district && h.name.trim() !== "").length;
      // 更新累積容器
      acc[district] = count;
      return acc;
    }, {});

    const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);

    return {
      全部: totalCount,
      ...counts,
    };
  }, [hospitals]);

  // 根據按鈕、搜尋框字串 監聽、過濾醫院資料
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      const districtMatch = selectedDistrict === "全部" || hospital.district === selectedDistrict;
      const searchMatch = searchQuery === "" || hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
      const validName = hospital.name.trim() !== "";
      return districtMatch && searchMatch && validName;
    });
  }, [selectedDistrict, searchQuery, hospitals]);

  const clickDistrictBtn = (district: string) => {
    setSearchQuery("");
    setSelectedDistrict(district);
  };

  const mapBtnExc = (query: string | number) => {
    let url,
      text = "";
    switch (query) {
      case "達爾文動物醫院":
        url = "https://www.facebook.com/darwinvmhp/";
        text = "facebook Page";
        break;
      default:
        const encodedQuery = encodeURIComponent(query); // 將搜尋字串編碼
        url = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
        text = "Google Maps";
        break;
    }
    return { url, text };
  };

  // 渲染部分
  if (isLoading) return <div className="container">載入中...</div>;
  if (error) return <div className="container">載入錯誤</div>;

  return (
    <div className="container">
      <h1 className="title" id="top">
        <span>陸龜小學堂</span>醫院查詢系統
      </h1>
      <p className="note">
        這裡集結有在看陸龜的醫院，請大家協力更新資訊 (
        <a href="https://www.facebook.com/groups/366377782941836/permalink/550451401201139/" target="_blank">
          @ 留言回報
        </a>
        ) 。
        <br />
        下方區塊可水平捲動露出其他區域按鈕 (桌機按住鍵盤 <code className="keyboard_key">shift</code> 鍵 + 滑鼠滾輪可水平捲動)
      </p>

      {/* 地區過濾按鈕 */}
      <div className="wrap-district">
        <div className="district-group">
          {Object.keys(districtsWithCount).map((district) => (
            <button key={district} onClick={() => clickDistrictBtn(district)} className={`button ${selectedDistrict === district ? "selected" : ""}`} disabled={districtsWithCount[district] === 0}>
              {/* {district} */}
              {district} <span>{districtsWithCount[district]}</span>
            </button>
          ))}
        </div>
      </div>
      <SearchBar placeholder="搜尋醫院名稱或地址..." suggestions={filteredHospitals} onSearch={(query) => setSearchQuery(query)} inputValue={searchQuery} onSuggestionClick={setSearchQuery} />

      {/* 結果列表 */}
      <div>
        {filteredHospitals.map((hospital) => (
          <div key={hospital.id} className="hospital-card">
            <span className="hospital-district">{hospital.district}</span>
            <div>
              <h3 className="hospital-title">{hospital.name}</h3>
              <p className="hospital-text">{hospital.address}</p>
              <p className="hospital-text">電話：{hospital.phone}</p>
              {hospital.note && <p className="hospital-text">備註：{hospital.note}</p>}
              <button onClick={() => window.open(mapBtnExc(hospital.name).url, "_blank")}>{mapBtnExc(hospital.name).text}</button>
            </div>
          </div>
        ))}
      </div>

      {showScrollTopBtn && (
        <a className="scroll_top" href="#top">
          回頂端
        </a>
      )}
    </div>
  );
}
