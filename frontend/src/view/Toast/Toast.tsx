import React from "react";

const Toast: React.FC<{ message: string; isVisible: boolean; onClose: () => void; bgColor: "success" | "danger" | "info" }> = ({ message, isVisible, onClose, bgColor = "success" }) => {
    return (
        <div className="position-fixed bottom-0 start-0 p-3" style={{ zIndex: 11 }}>
            <div className={`toast align-items-center text-bg-${bgColor} border-0 ${isVisible ? "show" : "hide"}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">{message}</div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close" onClick={onClose}></button>
                </div>
            </div>
        </div>
    );
};

export default Toast;
