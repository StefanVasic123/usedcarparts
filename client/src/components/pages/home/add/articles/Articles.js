import React from 'react';

import './articles.css';

const Articles = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", justifyContent: "space-around" }}>
            <div className="how-to-row article-row">
                HOW TO
            </div>
            <div className="about-us-row article-row">
                ABOUT
            </div>
            <div className="blog-row article-row">
                BLOG
            </div>
        </div>
    );
};

export default Articles;