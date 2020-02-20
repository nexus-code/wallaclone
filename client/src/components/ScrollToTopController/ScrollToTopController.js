import React, { useEffect } from "react";

// Scrollo to top whem select an user on home infinite scroll
// Thanks to: https://medium.com/@romanonthego/scroll-to-top-with-react-router-and-react-hooks-87ae21785d2f

export default function ScrollToTopController () {
    useEffect(() => {
        try {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth', // ;) @tgb
            });
        } catch (error) {
            window.scrollTo(0, 0);
        }
    }, []);

    return null;
};