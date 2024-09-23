const Spinner = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="text-center">
                <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
                <p className="mt-3" style={{ fontStyle: "italic", color: "#007bff" }}>
                    Vui lòng đợi, đang tải...
                </p>
            </div>
        </div>
    );
};

export default Spinner;
