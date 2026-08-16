import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        login({ username, password });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={(event) => setUsername(event.target.value)} />
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button type="submit">Log in</button>
        </form>
    )
}

export default LoginForm;