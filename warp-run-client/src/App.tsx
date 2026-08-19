import { useAuth } from "./features/auth/AuthContext.tsx";
import LoginForm from "./features/auth/LoginForm.tsx";
import PlayerInfo from "./features/player/PlayerInfo.tsx";
import Ships from "./features/ships/Ships.tsx";
import Agents from "./features/agents/Agents.tsx";
import "./App.css";

function App() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <p>Logging...</p>
  } else if (!token) {
    return <LoginForm />
  } else {
    return (
      <>
        <PlayerInfo/>
        <Ships/>
        <Agents/>
      </>
    );
  }
}

export default App;