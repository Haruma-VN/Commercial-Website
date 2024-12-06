import { Link } from "react-router-dom";

const Explore = () => {
    return (
        <div className="p-5 mb-4 header" style={{ background: "linear-gradient(135deg, #3b3b98, #2c3e50)" }}>
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h1 className="display-4 fw-bold" style={{ textShadow: "1px 2px 8px rgba(0, 0, 0, 0.3)" }}>
                        Hãy bắt đầu cuộc phiêu lưu của bạn
                    </h1>
                    <p className="fs-5" style={{ fontWeight: "300", opacity: 0.9 }}>
                        Bạn muốn đi đâu tiếp?
                    </p>
                    <Link
                        to="/search"
                        type="button"
                        className="btn btn-lg text-white"
                        style={{
                            backgroundColor: "#ff6b81",
                            borderRadius: "30px",
                            padding: "10px 25px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.3)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
                        }}
                    >
                        Khám phá những cuốn sách hay nhất
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Explore;
