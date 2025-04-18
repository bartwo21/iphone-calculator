import { ThemeProvider } from "./context/ThemeContext";
import Calculator from "./components/Calculator";

function App() {
  return (
    <ThemeProvider>
      <div className="calculator-container">
        <Calculator />
      </div>
    </ThemeProvider>
  );
}

export default App;
