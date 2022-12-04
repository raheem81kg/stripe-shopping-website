import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { HeroContent as Home } from "./pages/HeroContent";
import Shop from "./pages/Shop";
import Cart from "./components/Cart";
import styles from "./styles/App.module.scss";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
    const location = useLocation();

    return (
        <Provider store={store}>
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
                        <Route path=":categoryid" element={<Shop />} />
                    </Route>
                </Routes>
                <Cart />
            </div>
        </Provider>
    );
}

export default App;
