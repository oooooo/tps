import styles from "./SearchBar.module.scss";
import React, { useState, useEffect } from "react";
import { Hospital } from "@/types/types";

interface SearchBarProps {
  placeholder?: string; //
  inputValue: string; // 父组件传递的搜索框值
  suggestions: Hospital[]; // 顯示資料來自父層計算給予
  onSearch: (query: string) => void; // 輸入框輸入時 傳入參數 (給在父層中 組件 ui 上指定的函式)
  onSuggestionClick: (name: string) => void; // 點擊建議列表時 傳入被點擊資料 (給父層指定的函式)
}

export default function SearchBar({ placeholder = "搜尋...", suggestions, onSearch, inputValue, onSuggestionClick }: SearchBarProps) {
  // 建立兩個組件變數 hook，用來記憶 輸入框的字串 和 是否顯示建議:
  const [searchQuery, setSearchQuery] = useState<string>(inputValue);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 監聽父組件來的 inputValue
  useEffect(() => {
    setSearchQuery(inputValue);
  }, [inputValue]);

  // 監聽 input on change 時的 function
  const handleInputOnChange = (value: string) => {
    setSearchQuery(value); // 更新 搜尋字串
    onSearch(value); // 通知父组件
    setShowSuggestions(value.length > 0); // 更新列表顯示
  };

  // 監聽 suggestion item clicked 的 function
  const handleSuggestionClick = (item: { id: string; name: string; address: string }) => {
    setSearchQuery(item.name); // 将选中项的名称填充到输入框
    setShowSuggestions(false); // 隐藏建议
    onSuggestionClick(item.name); // 通知父组件选中的项目
  };

  return (
    <div className={`${styles.searchBar} ${styles.searchBar_block}`}>
      <input type="text" placeholder={placeholder} value={inputValue} onChange={(e) => handleInputOnChange(e.target.value)} onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} />

      {/* 有字串的時候 顯示清除按鈕 */}
      {searchQuery && (
        <button className={styles.clearButton} onClick={() => handleInputOnChange("")}>
          清除
        </button>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((item) => (
            <li className={styles.item} key={item.id} onClick={() => handleSuggestionClick(item)} onMouseDown={(e) => e.preventDefault()}>
              <div>{item.name}</div>
              {item.address && <div className={styles.address}>{item.address}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
