import React, { useState, useEffect } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import TopNavbar from "./TopNavbar";
import '../assets/css/MainContent.css'; 

const MainContent = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <TopNavbar />
            
            <div 
                className="mouse-glow" 
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--glow-color), transparent 80%)`
                }}
            />
            <div className="layout-grid">
                <LeftPanel />
                <RightPanel />
            </div>
        </div>
    );
};

export default MainContent;