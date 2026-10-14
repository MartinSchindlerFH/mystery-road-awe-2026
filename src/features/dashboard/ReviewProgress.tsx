import { Panel } from "./Panel.jsx";

type ReviewProgressProps = {
  reviewed: number;
  total: number;
};

export function ReviewProgress({ reviewed, total }: ReviewProgressProps) {
  const percent = total === 0 ? 0 : Math.round((reviewed / total) * 100);

  return (
    <Panel title="Review progress">
      <div className="progress-bar-outer">
        <div
          className="progress-bar-inner"
          style={{ width: percent + "%" }}
        ></div>
      </div>
      <p>{percent}% of evidence reviewed</p>
    </Panel>
  );
}
