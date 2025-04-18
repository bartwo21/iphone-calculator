import React from "react";
import "../styles/base.css";

const HistoryModal = ({ isOpen, onClose, history = [], onClearHistory }) => {
  if (!isOpen) return null;

  const lastThreeOperations = history.slice(0, 3);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="history-modal" onClick={handleOverlayClick}>
      <div className="history-content" onClick={(e) => e.stopPropagation()}>
        <div className="history-close">
          <h2>History</h2>
          <div className="history-actions">
            <button className="clear-history-button" onClick={onClearHistory}>
              Temizle
            </button>
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>
        </div>
        <div className="history-items">
          {lastThreeOperations.length === 0 ? (
            <p>Henüz işlem geçmişi yok.</p>
          ) : (
            lastThreeOperations.map((item, index) => (
              <div key={index} className="history-item">
                <div>
                  {item.expression} = {item.result}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
