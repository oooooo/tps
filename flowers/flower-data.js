const flowerData = [
  { image: "", name: "扶桑花/葉", toxic: false, frequency: "6", notes: "" },
  { image: "", name: "血桐/野桐", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "赤道櫻草", toxic: false, frequency: "4", notes: "" },

  { image: "", name: "刺苋", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "車前草", toxic: false, frequency: "5", notes: "" },
  { image: "", name: "油菜", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "沼生金鈕扣", toxic: false, frequency: "1", notes: "" },

  { image: "", name: "空心蓮子草", toxic: false, frequency: "1", notes: "" },
  { image: "", name: "狗肝菜（華九頭獅子草）", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "玫瑰花", toxic: false, frequency: "3", notes: "" },
  { image: "", name: "花生葉", toxic: false, frequency: "4", notes: "" },

  { image: "", name: "長梗紫苧麻", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "金錢草", toxic: false, frequency: "3", notes: "" },
  { image: "", name: "長柄菊（肺炎草）", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "青苧麻", toxic: true, frequency: "0", notes: "" },

  { image: "", name: "咸豐草", toxic: false, frequency: "6", notes: "" },
  { image: "", name: "南美朱槿（懸鈴花）", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "南美蟛蜞菊", toxic: false, frequency: "6", notes: "" },
  { image: "", name: "昭和草", toxic: false, frequency: "6", notes: "" },

  { image: "", name: "紅苞鴨跖草", toxic: true, frequency: "0", notes: "" },
  { image: "", name: "枸杞", toxic: false, frequency: "3", notes: "" },
  { image: "", name: "洛神花", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "紅樓花", toxic: false, frequency: "1", notes: "" },

  { image: "", name: "萵苣纈草（羊萵苣、野苣）", toxic: false, frequency: "3", notes: "" },
  { image: "", name: "圓葉雞屎樹", toxic: false, frequency: "1", notes: "" },
  { image: "", name: "煙火樹", toxic: false, frequency: "5", notes: "" },
  { image: "", name: "蜀葵花", toxic: false, frequency: "3", notes: "" },

  { image: "", name: "構樹", toxic: false, frequency: "3", notes: "" },
  { image: "", name: "雷公根（崩大碗）", toxic: false, frequency: "2", notes: "" },
  { image: "", name: "鼠麴草", toxic: false, frequency: "5", notes: "" },
  { image: "", name: "翠蘆莉", toxic: false, frequency: "4", notes: "" },

  { image: "", name: "鴨兒芹（山芹菜）", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "蒲公英", toxic: false, frequency: "7", notes: "" },
  { image: "", name: "蝶豆花", toxic: false, frequency: "3", notes: "" },
  { image: "", name: "鴨拓草", toxic: false, frequency: "3", notes: "" },

  { image: "", name: "龍葵", toxic: false, frequency: "5", notes: "" },
  { image: "", name: "龍爪草", toxic: false, frequency: "7", notes: "" },
  { image: "", name: "龍牙草", toxic: false, frequency: "2", notes: "" },
  { image: "", name: "雞兒腸（馬蘭）", toxic: false, frequency: "4", notes: "" },

  { image: "", name: "蘆薈", toxic: false, frequency: "1", notes: "" },
  { image: "", name: "雞眼草", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "鯽魚草", toxic: false, frequency: "3", notes: "" },
  { image: "", name: "飛燕草", toxic: true, frequency: "0", notes: "酷似蜀葵" },

  { image: "", name: "桑葉", toxic: false, frequency: "7", notes: "" },
  { image: "", name: "風鈴花/燈籠花", toxic: false, frequency: "6", notes: "" },
  { image: "", name: "哨兵花", toxic: false, frequency: "2", notes: "" },
  { image: "", name: "狼尾草", toxic: false, frequency: "7", notes: "" },

  { image: "", name: "掃帚菊（掃馬闒.鑽形紫苑）", toxic: false, frequency: "2", notes: "" },
  { image: "", name: "假吐金菊", toxic: false, frequency: "7", notes: "" },
  { image: "", name: "彩葉草", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "牽牛花*", toxic: true, frequency: "0", notes: "" },

  { image: "", name: "野茴蒿", toxic: false, frequency: "2", notes: "" },
  { image: "", name: "蛇莓", toxic: false, frequency: "1", notes: "" },
  { image: "", name: "蛇葡萄", toxic: true, frequency: "2", notes: "果實有毒" },
  { image: "", name: "野莧菜", toxic: false, frequency: "4", notes: "" },

  { image: "", name: "紫花藿香薊", toxic: false, frequency: "2", notes: "" },
  { image: "", name: "魚腥草", toxic: false, frequency: "1", notes: "（天然抗生素）" },
  { image: "", name: "紫花酢醬草", toxic: false, frequency: "3", notes: "" },
  { image: "", name: "紫背草", toxic: false, frequency: "4", notes: "" },

  { image: "", name: "菁芳草（荷蓮豆草）", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "紫莖牛膝", toxic: false, frequency: "1", notes: "" },
  { image: "", name: "紫蘇", toxic: false, frequency: "3", notes: "" },
  { image: "", name: "菊苣", toxic: false, frequency: "4", notes: "" },

  { image: "", name: "黃槿", toxic: false, frequency: "2", notes: "" },
  { image: "", name: "菩提樹", toxic: false, frequency: "1", notes: "" },
  { image: "", name: "裂葉月見草", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "黃鵪菜", toxic: false, frequency: "7", notes: "" },

  {
    image:
      "https://scontent.ftpe14-1.fna.fbcdn.net/v/t39.30808-6/428697448_892734412862783_8972991707124594696_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=24ef35&_nc_ohc=-SD51poIeCsQ7kNvgGt0ncX&_nc_zt=23&_nc_ht=scontent.ftpe14-1.fna&_nc_gid=AheBRym50F-DkRR72wvMyPD&oh=00_AYDztxR0r-5r7huqxDEfpJY3dSRzhOs1vADtPN59oO1gyw&oe=674B6CEE",
    name: "三色堇",
    toxic: false,
    frequency: "3",
    notes: ""
  },
  { image: "", name: "小花曼蘭", toxic: false, frequency: "5", notes: "" },
  { image: "", name: "川七", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "火𡷫母草", toxic: true, frequency: "1", notes: "微毒", notes: "" },

  { image: "", name: "左手香", toxic: false, frequency: "1", notes: "（天然抗生素）" },
  { image: "", name: "百慕達草（狗牙根）", toxic: false, frequency: "7", notes: "" },

  { image: "", name: "大薊（雞角刺）", toxic: false, frequency: "2", notes: "" },
  { image: "", name: "山萵苣", toxic: false, frequency: "5", notes: "" },
  { image: "", name: "水燈盞", toxic: false, frequency: "3", notes: "" },
  { image: "", name: "加拿大蓬", toxic: false, frequency: "3", notes: "" },
  { image: "", name: "地瓜葉", toxic: false, frequency: "4", notes: "" },

  { image: "", name: "大飛揚草", toxic: false, frequency: "1", notes: "" },
  { image: "", name: "小葉冷水麻", toxic: false, frequency: "2", notes: "" },
  { image: "", name: "毛馬齒莧", toxic: false, frequency: "4", notes: "" },
  { image: "", name: "仙人掌", toxic: false, frequency: "1", notes: "米塔邦（無刺）、胭脂扇（無刺）、大綠扇仙人掌（無刺）" },
  { image: "", name: "白蘿蔔葉", toxic: false, frequency: "3", notes: "" },

  { image: "", name: "大羊蹄", toxic: false, frequency: "1", notes: "" },
  { image: "", name: "小金英（兔兒菜）", toxic: false, frequency: "7", notes: "" },
  { image: "", name: "天胡荽", toxic: false, frequency: "5", notes: "" },
  { image: "", name: "火龍果枝條", toxic: false, frequency: "2", notes: "" },
  { image: "", name: "石蓮花", toxic: false, frequency: "1", notes: "" }
];
