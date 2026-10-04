import CarHero from "./components/CarHero";
import "./App.css";

function App() {
  return (
    <div className="app">
      <CarHero />

      <section className="after-section">
        <h2>Keep Exploring</h2>
        <p>
          A simple scroll-driven experience built with React and GSAP.
        </p>
      </section>
    </div>
  );
}

export default App;