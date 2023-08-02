import React, {useState} from 'react';
import { Outlet } from "react-router-dom";
import Header from "./Header";

function DetailLayout(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div>
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <main
                onClick={() => {
                    setIsMenuOpen(false);
                    document.documentElement.style.overflow = 'auto';
                }}>
            >
                <Outlet />
            </main>
        </div>
    );
}

export default DetailLayout;