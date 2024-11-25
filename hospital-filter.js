// hospital-filter
const { useState, useMemo } = React;

const HospitalFilter = () => {
  // 使用外部數據
  const hospitals = window.hospitalData;

  // 狀態
  const [selectedDistrict, setSelectedDistrict] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 取得所有不重複的地區
  const districts = useMemo(() => {
    const uniqueDistricts = [...new Set(hospitals.map((h) => h.district))];
    return ["全部", ...uniqueDistricts];
  }, []);

  // [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
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
  }, []);
  // [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]

  // 過濾醫院資料
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      const districtMatch = selectedDistrict === "全部" || hospital.district === selectedDistrict;
      const searchMatch = searchQuery === "" || hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
      const validName = hospital.name.trim() !== "";
      return districtMatch && searchMatch && validName;
    });
  }, [selectedDistrict, searchQuery]);

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

  return (
    <div className="container">
      <h1 className="title">醫院查詢系統</h1>
      <p className="note">
        （按住 <code className="key_button">shift</code> 鍵搭配滑鼠滾輪左右捲動）
      </p>

      {/* 地區過濾按鈕 */}
      <div className="button-group">
        {districts.map((district) => (
          <button key={district} onClick={() => setSelectedDistrict(district)} className={`button ${selectedDistrict === district ? "selected" : ""}`}>
            {/* {district} */}
            {district} <span>{districtsWithCount.counts[district]}</span>
          </button>
        ))}
      </div>
      {/* 搜尋框 */}
      <div className="search-container">
        <input type="text" placeholder="搜尋醫院名稱或地址..." value={searchQuery} onChange={(e) => handleSearchInput(e.target.value)} className="search-input" onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} />

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
          <div key={hospital.id} className="result-card">
            <div className="result-header">
              <div>
                <h3 className="result-title">{hospital.name}</h3>
                <p className="result-text">{hospital.address}</p>
                <p className="result-text">電話：{hospital.phone}</p>
                {hospital.note && <p className="result-text">備註：{hospital.note}</p>}
              </div>
              <span className="result-district">{hospital.district}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.HospitalFilter = HospitalFilter;
