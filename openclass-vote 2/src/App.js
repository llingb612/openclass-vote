import { useState } from "react";

const days = ["一", "二", "三", "四", "五", "六", "日"];
const times = ["上午", "下午", "晚上"];

const initVotes = () => {
  const data = {};
  days.forEach((day) => {
    times.forEach((time) => {
      data[`${day}-${time}`] = 0;
    });
  });
  return data;
};

export default function VoteGrid() {
  const [votes, setVotes] = useState(initVotes);
  const [voted, setVoted] = useState({});

  const handleVote = (slot) => {
    if (voted[slot]) return;
    setVotes({ ...votes, [slot]: votes[slot] + 1 });
    setVoted({ ...voted, [slot]: true });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">每週時段投票（點選可投票）</h2>
      <div className="grid grid-cols-8 gap-2">
        <div></div>
        {days.map((day) => (
          <div key={day} className="text-center font-semibold">
            週{day}
          </div>
        ))}
        {times.map((time) => (
          <>
            <div className="font-medium text-right pr-2 py-4">{time}</div>
            {days.map((day) => {
              const key = `${day}-${time}`;
              return (
                <button
                  key={key}
                  onClick={() => handleVote(key)}
                  className={\`h-20 w-full rounded-xl border shadow-sm flex items-center justify-center transition \${voted[key] ? "bg-green-200" : "hover:bg-blue-100"}\`}
                >
                  {votes[key]} 人
                </button>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}
