import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { HeroContent as Home } from "./pages/HeroContent";
import Shop from "./pages/Shop";
import styles from "./styles/App.module.scss";

function App() {
    const location = useLocation();

    return (
        <div className={location.pathname === "/" ? styles.home : styles.shop}>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            title="Nvidia GeForce RTX 3090"
                            text="Now available for preorder, shipping December, 2020."
                            path="/catalog"
                            buttonText="Shop Now"
                        />
                    }
                />
                <Route path="/catalog" element={<Shop />}>
                    <Route path=":category" element={<Shop />} />
                </Route>
                <Route path="*" element={<div>404</div>} />
            </Routes>
        </div>
    );
}

export default App;
