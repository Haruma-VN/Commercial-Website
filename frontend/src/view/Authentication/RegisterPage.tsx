import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import User from "../../model/User";
import { UserContext } from "../../context/UserContext";

const RegisterPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext)!;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();
        const registerUrl: string = `http://localhost:3308/api/v1/user/register`;
        const register = async () => {
            const response = await fetch(registerUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    userDetail: {
                        name,
                        role: "user",
                    },
                } as User),
            });
            if (!response.ok) {
                throw new Error("Có lỗi xảy ra trong quá trình xử lý gửi request đến server");
            }
            setUser((await response.json()) as User);
            navigate("/");
        };

        register()
            .catch((e) => setError(e.message))
            .finally(() => setIsLoading(false));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Đăng ký tài khoản</h2>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Họ và tên
                                    </label>
                                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Địa chỉ email
                                    </label>
                                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Mật khẩu
                                    </label>
                                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Đăng ký
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
