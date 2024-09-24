import React from "react";

const Toast: React.FC<{ message: string; isVisible: boolean; onClose: () => void; bgColor: "success" | "danger" | "info" }> = ({ message, isVisible, onClose, bgColor = "success" }) => {
    const renderIcon = (bgColor: "success" | "info" | "danger") => {
        switch (bgColor) {
            case "success":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
                        <path d="M8 16a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.854-10.354a.5.5 0 0 1 0 .708L7.5 10.207l-1.854-1.854a.5.5 0 1 1 .708-.708L7.5 9.293l4.354-4.354a.5.5 0 0 1 .708 0z" />
                    </svg>
                );
            case "danger":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-circle-fill me-2" viewBox="0 0 16 16">
                        <path d="M8 16a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm.93-11.588a.5.5 0 0 1-.93 0l-1 5a.5.5 0 0 1 .93 0l1-5zm-.45 7.978a1 1 0 1 1 .5 0 .5.5 0 0 1-.5 0z" />
                    </svg>
                );
            case "info":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle-fill me-2" viewBox="0 0 16 16">
                        <path d="M8 16a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-14a6 6 0 1 1 0 12 6 6 0 0 1 0-12zM7.002 6h1.996v1h-1.996V6zm0 2h1.996v4h-1.996v-4z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
            <div className={`card text-bg-${bgColor} ${isVisible ? "show" : "hide"}`} style={{ width: "300px", transition: "opacity 0.5s", opacity: isVisible ? 1 : 0 }}>
                <div className="d-flex align-items-center p-2">
                    {renderIcon(bgColor)}
                    <div className="flex-grow-1">{message}</div>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onClose}></button>
                </div>
            </div>
        </div>
    );
};

export default Toast;
