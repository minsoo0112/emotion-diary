import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오랜된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") return parseInt(b.date) - parseInt(a.date);
      if (sortType === "oldest") return parseInt(a.date) - parseInt(b.date);
    };

    const filterCallBack = (item) => {
      if (filter === "good") return parseInt(item.emotion) <= 3;
      if (filter === "bad") return parseInt(item.emotion) > 3;
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList = filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    return filteredList.sort(compare);
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        </div>
        <div className="right_col">
          <MyButton type="positive" text="새 일기 쓰기" onClick={() => navigate("/new")} />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          {it.content} {it.emotion}
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
