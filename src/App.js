import CanvasBase from "./components/Canvas";
import "./styles.css";

export default function App() {
  return (
    <div className="App px-2 justify-content-center">
      <h1 className="title text-center my-4">Product Customiser</h1>
      <CanvasBase />
    </div>
  );
}
