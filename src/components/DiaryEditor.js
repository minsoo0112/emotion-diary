import { useNavigate } from "react-router-dom";
import { useState } from "react";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));

  return (
    <div className="DiaryEditor">
      <MyHeader headText={"새 일기 쓰기"} leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />} />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input className="input_date" value={date} onChange={(e) => setDate(e.target.value)} type="date" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;