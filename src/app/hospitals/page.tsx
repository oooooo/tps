"use client"; // 标记这个文件为客户端组件
import { useState, useEffect, useMemo } from "react";
import "@/styles/reboot.scss";
import "@/styles/utility.scss";
import "@/styles/search.scss";
import "./css.scss";

export default function HospitalFilter() {
  const sheetId = "1R7f8svVrq0GlGr6k4RxQ4lHLzaxyJCsy8-mh6cBMtRs";
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
  //
  const [hospitals, setHospitals] = useState<Record<string, string>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  // 狀態
  const [selectedDistrict, setSelectedDistrict] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Record<string, string>[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 使用 useEffect 處理非同步數據載入
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
          return headers.reduce((obj: Record<string, string>, header, index) => {
            obj[header] = row[index] ? row[index].trim() : "";
            return obj;
          }, {} as Record<string, string>);
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
  }, []);
  // 空依賴數組，確保只在組件掛載時執行一次

  // 不重複的地區
  const districts = useMemo(() => {
    // useMemo(計算式, 陣列) 可以記住一個計算結果，只有當陣列改變時才重新計算，否則直接返回之前的計算結果。
    const uniqueDistricts = [...new Set(hospitals.map((h) => h.district))];
    // Set 是一個 JavaScript 資料結構，它只存儲唯一值。
    // 取 hospital 的 district 存成一陣列，並清除重複的元素
    return ["全部", ...uniqueDistricts];
  }, [hospitals]);

  // 不重複的地區及筆數
  const districtsWithCount = useMemo(() => {
    // 先取得唯一地區
    const uniqueDistricts = [...new Set(hospitals.map((h) => h.district))];

    // 迭代每個地區 陣列.reduce(函式（累積容器, 當前值）, 初始容器)
    const counts = uniqueDistricts.reduce((acc: Record<string, number>, district) => {
      // 數量：醫院地區等於該地區且 醫院 name 不為空字串
      const count = hospitals.filter((h) => h.district === district && h.name.trim() !== "").length;
      // 更新累積容器
      acc[district] = count;
      return acc;
    }, {});

    // 總筆數（所有地區的有效資料加總）
    const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);

    return {
      districts: ["全部", ...uniqueDistricts],
      counts: {
        全部: totalCount,
        ...counts,
      },
    };
  }, [hospitals]);

  // 過濾醫院資料
  const filteredHospitals = useMemo(() => {
    // 分析 hospital（醫院列表）用 selectedDistrict 地區按鈕、searchQuery（搜尋框字串）、
    return hospitals.filter((hospital) => {
      const districtMatch = selectedDistrict === "全部" || hospital.district === selectedDistrict; // 不是全部的話，醫院地區是否為按鈕地區
      const searchMatch = searchQuery === "" || hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || hospital.address.toLowerCase().includes(searchQuery.toLowerCase()); // 搜尋框文字不為空的話，醫院名稱或地址是否包含搜尋框文字
      const validName = hospital.name.trim() !== ""; // 確認醫院名稱不為空字串
      return districtMatch && searchMatch && validName; // 都符合的醫院保留在 hospitals
    });
  }, [selectedDistrict, searchQuery, hospitals]);

  // 處理搜尋建議
  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    if (value.length > 0) {
      // const matches = hospitals.filter((hospital) => hospital.name.toLowerCase().includes(value.toLowerCase()) || hospital.address.toLowerCase().includes(value.toLowerCase()));
      const matches = filteredHospitals.filter((hospital) => hospital.name.toLowerCase().includes(value.toLowerCase()) || hospital.address.toLowerCase().includes(value.toLowerCase()));

      setSuggestions(matches.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const findMapExc = (query: string | number) => {
    if (query === "達爾文動物醫院") {
      window.open(`https://www.facebook.com/groups/366377782941836/user/100063980892930/`, "_blank");
    } else {
      const encodedQuery = encodeURIComponent(query); // 將搜尋字串編碼
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedQuery}`, "_blank");
    }
  };

  // 渲染部分
  if (isLoading) return <div>載入中...</div>;
  if (error) return <div>載入錯誤</div>;

  return (
    <div className="container">
      <h1 className="title" id="top">
        <span>陸龜小學堂</span>醫院查尋系統
      </h1>
      <p className="note">
        這個資料還需大家共同幫忙更新，留言中 <code>@Hel Lo</code> 可以讓我更快收到通知。
        <br />
        (桌機：按住 <code className="key_button">shift</code> 鍵搭配滑鼠滾輪 ↔️ 左右捲動)
      </p>

      {/* 地區過濾按鈕 */}
      <div className="district-group">
        {districts.map((district) => (
          <button key={district} onClick={() => setSelectedDistrict(district)} className={`button ${selectedDistrict === district ? "selected" : ""}`} disabled={districtsWithCount.counts[district] === 0}>
            {/* {district} */}
            {district} <span>{districtsWithCount.counts[district]}</span>
          </button>
        ))}
      </div>

      {/* 搜尋框 */}
      <div className="search-container search-container-block">
        <input type="text" placeholder="搜尋醫院名稱或地址..." value={searchQuery} onChange={(e) => handleSearchInput(e.target.value)} className="search-input" onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} />
        {searchQuery && (
          <button className="search-clear" onClick={() => setSearchQuery("")} aria-label="清除搜尋內容">
            X
          </button>
        )}

        {/* 自動完成建議 */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((hospital) => {
              console.log();
              return (
                <div
                  key={hospital.id}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchQuery(hospital.name);
                    setShowSuggestions(false);
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="suggestion-name">{hospital.name}</div>
                  <div className="suggestion-address">{hospital.address}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 結果列表 */}
      <div>
        {filteredHospitals.map((hospital) => (
          <div key={hospital.id} className="hospital-card">
            <div className="hospital-header">
              <div>
                <h3 className="hospital-title">{hospital.name}</h3>
                <p className="hospital-text">{hospital.address}</p>
                <p className="hospital-text">電話：{hospital.phone}</p>
                {hospital.note && <p className="hospital-text">備註：{hospital.note}</p>}
                <button className="note" onClick={() => findMapExc(hospital.name)}>
                  {hospital.name !== "達爾文動物醫院" ? "找地圖" : "fb 粉專"}
                </button>
              </div>
              <span className="hospital-district">{hospital.district}</span>
            </div>
          </div>
        ))}
      </div>

      {/* go top */}
      <a className="gotop" href="#top">
        回頭
      </a>
    </div>
  );
}
