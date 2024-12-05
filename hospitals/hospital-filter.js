// hospital-filter
const { useState, useEffect, useMemo } = React;

const HospitalFilter = () => {
  const sheetId = "1R7f8svVrq0GlGr6k4RxQ4lHLzaxyJCsy8-mh6cBMtRs";
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
  //
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // 狀態
  const [selectedDistrict, setSelectedDistrict] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 使用 useEffect 處理非同步數據載入
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(sheetUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvText = await response.text();

        const rows = csvText.split("\n").map(
          (row) =>
            row
              .trim()
              .split(",")
              .map((cell) => cell.replace(/\r/g, ""))
          // 找到 ”回車符“的正則表達式，表示要查找的內容。
        );

        const filteredRows = rows.filter((row) => row.length > 1);
        const headers = filteredRows[0];

        const dataObjects = filteredRows.slice(1).map((row) => {
          return headers.reduce((obj, header, index) => {
            obj[header] = row[index] ? row[index].trim() : "";
            return obj;
          }, {});
        });

        setHospitals(dataObjects);
        setIsLoading(false);
      } catch (error) {
        console.error(`資料獲取錯誤: ${error.message}`);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  // 空依賴數組，確保只在組件掛載時執行一次

  // 取得所有不重複的地區
  const districts = useMemo(() => {
    const uniqueDistricts = [...new Set(hospitals.map((h) => h.district))];
    return ["全部", ...uniqueDistricts];
  }, [hospitals]);

  // 取得所有不重複的地區並計算每個地區的有效資料筆數
  const districtsWithCount = useMemo(() => {
    // 先取得唯一地區
    const uniqueDistricts = [...new Set(hospitals.map((h) => h.district))];

    // 計算每個地區的有效資料筆數（name 不為空字串）
    const counts = uniqueDistricts.reduce((acc, district) => {
      const count = hospitals.filter((h) => h.district === district && h.name.trim() !== "").length;
      acc[district] = count;
      return acc;
    }, {});

    // 計算總筆數（所有地區的有效資料加總）
    const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);

    return {
      districts: ["全部", ...uniqueDistricts],
      counts: {
        全部: totalCount,
        ...counts
      }
    };
  }, [hospitals]);

  // 過濾醫院資料
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      const districtMatch = selectedDistrict === "全部" || hospital.district === selectedDistrict;
      const searchMatch = searchQuery === "" || hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
      const validName = hospital.name.trim() !== "";
      return districtMatch && searchMatch && validName;
    });
  }, [selectedDistrict, searchQuery, hospitals]);

  // 處理搜尋建議
  const handleSearchInput = (value) => {
    setSearchQuery(value);
    if (value.length > 0) {
      const matches = hospitals.filter((hospital) => hospital.name.toLowerCase().includes(value.toLowerCase()) || hospital.address.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(matches.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const mapSearch = (query) => {
    if (query !== "達爾文動物醫院") {
      const encodedQuery = encodeURIComponent(query); // 將搜尋字串編碼
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedQuery}`, "_blank");
    } else {
      window.open(`https://www.facebook.com/groups/366377782941836/user/100063980892930/`, "_blank");
    }
  };

  // 渲染部分
  if (isLoading) return React.createElement("div", null, "載入中...");
  if (error) return React.createElement("div", null, "載入錯誤");

  return (
    <div className="container">
      <h1 className="title" id="top">
        <span>陸龜小學堂</span>醫院查尋系統
      </h1>
      <p className="note">
        這裡搜集有在看陸龜的醫院，還需大家共同幫忙更新。
        <br />
        (桌機：按住 <code className="key_button">shift</code> 鍵搭配滑鼠滾輪可以左右 ↔️ 捲動地區按鈕)
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
          <button className="clear-btn" onClick={() => setSearchQuery("")} aria-label="清除搜尋內容">
            X
          </button>
        )}

        {/* 自動完成建議 */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((hospital) => (
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
            ))}
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
                <button className="note" onClick={() => mapSearch(hospital.name)}>
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
};

window.HospitalFilter = HospitalFilter;
