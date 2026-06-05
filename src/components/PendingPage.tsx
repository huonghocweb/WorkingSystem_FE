export default function PendingPage() {
  return (
    <div className="loading-overlay">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="loading-text">Please wait...</div>
    </div>
  );
}