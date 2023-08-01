import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div>
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <main
                onClick={() => {
                    setIsMenuOpen(false);
                    document.documentElement.style.overflow = 'auto';
                }}>
                <Outlet />
            </main>
            <Footer />
        </div >
    );
}

export default Layout;
