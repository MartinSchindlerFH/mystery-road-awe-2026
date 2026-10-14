type LoadingOverlayProps = {
  visible: boolean;
};

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  return (
    <div className={visible ? "loading-overlay" : "loading-overlay hidden"}>
      <div className="loading-box">
        <div className="spinner"></div>
        <p>Loading case file...</p>
      </div>
    </div>
  );
}
