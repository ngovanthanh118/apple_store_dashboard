import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { setCookie } from "../../utils";
import { toast } from "react-toastify";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = (ev) => {
        ev.preventDefault();
        setLoading(true);
        axios.post("/users/login", {
            email: email,
            password: password
        })
            .then(data => {
                if (data.data.error) {
                    setError(data.data.msg);
                    setLoading(false);
                    return;
                }
                if (data.data.admin) {
                    setCookie("token", data.data.token, 1);
                    setLoading(false);
                    navigate("/dashboard");
                }
                else {
                    setError('Truy cập không hợp lệ')
                }
            })
            .catch(err => setError('Account or password is incorrect'))
    }
    return (
        <div className="h-full flex justify-center items-center">
            {
                loading ?
                    <ClipLoader
                        color={"#fff"}
                        loading={loading}
                        size={50}
                    /> :
                    <div className="mobile-form-login flex flex-col w-1/3">
                        <h1 className="my-3 text-white text-4xl text-center font-bold">Dashboard</h1>
                        <form className="bg-white rounded-2xl px-8 py-6 flex flex-col gap-4" onSubmit={handleLogin}>
                            <div >
                                <input
                                    className="bg-slate-200 p-3 w-full rounded-3xl"
                                    type="text"
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    className="bg-slate-200 p-3 w-full rounded-3xl"
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={ev => setPassword(ev.target.value)}
                                />
                            </div>
                            <div>
                                <button className="bg-sky-800 w-full rounded-2xl py-3 text-white text-xl font-bold">Login</button>
                            </div>
                        </form>
                        <p className="my-4 text-white">{error}</p>
                    </div>
            }
        </div>
    )
}