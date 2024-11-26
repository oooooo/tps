const { useState } = React;

function App() {
  const [search, setSearch] = useState("");
  const [filterToxic, setFilterToxic] = useState("");
  const [sortKey, setSortKey] = useState("");

  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());
  const handleFilter = (e) => setFilterToxic(e.target.value);
  const handleSort = (e) => setSortKey(e.target.value);

  const resetFilters = () => {
    setSearch("");
    setFilterToxic("");
    setSortKey("");
  };

  const filteredData = flowerData
    .filter((flower) => flower.name.toLowerCase().includes(search) && (filterToxic === "" || (filterToxic === "true" && flower.toxic) || (filterToxic === "false" && !flower.toxic)))
    .sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "frequency") return b.frequency.localeCompare(a.frequency);
      return 0;
    });

  const imgSearch = (query) => {
    const encodedQuery = encodeURIComponent(query); // 將搜尋字串編碼
    window.open(`https://www.google.com/search?tbm=isch&q=${encodedQuery}`, "_blank");
  };

  return (
    <div className="container">
      <h1 id="top" className="title">
        陸龜小學堂 龜龜野食圖鑑
      </h1>

      <p>
        來自
        <a className="brand" href="https://www.facebook.com/media/set/?set=oa.373087988987453&type=3">
          <img className="icon" src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-256.png"></img>facebook 陸龜小學堂-Tortoise Primary School Ⅲ 的相簿
        </a>
      </p>
      <p>
        資料僅供參考, 請<em>自行求證確認</em>後餵食，只要無毒~ 都可以嘗試。
        <br />
        看看網友推薦<a href="#apps">認識植物的 APP 👇</a> <br />
        注意！智能分析皆可能出錯，資料庫來源相同可能出現相同結果，請小心求證。
      </p>

      <div className="controls">
        <div className="search-container search-container-inline">
          <input className="search-input" type="text" placeholder="搜尋花名..." value={search} onChange={handleSearch} />
          {search && (
            <button className="clear-btn" onClick={() => setSearch("")} aria-label="清除搜尋內容">
              ✕
            </button>
          )}
        </div>

        <select value={filterToxic} onChange={handleFilter}>
          <option value="">全部顯示</option>
          <option value="true">僅有毒</option>
          <option value="false">僅無毒</option>
        </select>

        <select value={sortKey} onChange={handleSort}>
          <option value="">不排序</option>
          <option value="name">按名稱排序</option>
          <option value="frequency">按食用頻率排序</option>
        </select>
        <button onClick={resetFilters}>恢復預設</button>
      </div>
      <div className="flower_gallery">
        {filteredData.map((flower, index) => (
          <div key={index} className="card">
            <img src={flower.image} alt={flower.name} />
            <div className="name">{flower.name}</div>
            <div className={flower.toxic ? "toxic" : "nontoxic"}>{flower.toxic ? "有毒" : "無毒"}</div>
            <div className="frequency">{flower.frequency}</div>
            <div className="notes">{flower.notes}</div>
            <button className="note" onClick={() => imgSearch(flower.name)}>
              搜尋圖片
            </button>
          </div>
        ))}
      </div>

      <h4 id="apps">認識植物的 APP</h4>
      <ul className="applist">
        <li>
          <p>
            <a href="https://www.picturethisai.com/zh-tw/">Picture this APP</a>
          </p>
          <img className="qrcode" src="https://www.picturethisai.com/image-handle/website_cmsname/static/name/55a7d8b302c84b3609bbdcbd400734aa/img/home/img/group-642391718.png?x-oss-process=image/format,webp/resize,s_254&v=1.0"></img>
        </li>
        <li>
          <p>
            <a href="https://plantnet.org" target="_blank">
              PlantNet APP
            </a>
          </p>
          <a href="http://apple.co/2cMtWgu" target="_blank">
            <img decoding="async" className="store_badge" src="https://plantnet.org/wp-content/uploads/2017/06/AppStore_FR-1.png"></img>
          </a>
          <a href="http://bit.ly/1K4D1eU" target="_blank">
            <img decoding="async" className="store_badge" src="https://plantnet.org/wp-content/uploads/2017/06/Fichier-1.png"></img>
          </a>
        </li>
        <li>
          <p>
            <a href="https://taiwan.inaturalist.org/" target="_blank">
              愛自然 APP
            </a>
          </p>
          <a href="https://itunes.apple.com/us/app/inaturalist/id421397028?mt=8" target="_blank">
            <img className="store_badge" src="https://static.inaturalist.org/wiki_page_attachments/414-original.png"></img>
          </a>
          <a href="https://play.google.com/store/apps/details?id=org.inaturalist.android" target="_blank">
            <img className="store_badge " src="https://static.inaturalist.org/wiki_page_attachments/412-original.png"></img>
          </a>
        </li>
        <li>
          <p>Google 相簿 APP</p>
          <img className="googlephoto" src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/08/c2/d0/08c2d0c1-6742-3319-22d9-288cf8496aca/logo_photos_color-0-1x_U007emarketing-0-0-0-6-0-0-0-85-220-0.png/460x0w.webp"></img>
        </li>
      </ul>
      <p>
        <a href="#top">回最頂</a>
      </p>
    </div>
  );
}
