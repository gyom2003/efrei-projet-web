import Messenger from "./components/Messenger.tsx";
import VerticalTaskBar from "./components/vertical-task-bar/VerticalTaskBar.tsx";
import "./App.css";

export default function App() {
  return (
    <main style={{ height: "100vh" }}>
      <VerticalTaskBar />
      <Messenger />
    </main>
  );
}
