import { useState } from "react";

const isYouTubeLink = (url) => {
    if (!url) return false;
    return url.includes("youtube.com") || url.includes("youtu.be");
};

const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    // Convert youtu.be/VIDEO_ID to youtube.com/embed/VIDEO_ID
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]+)/);
    if (ytMatch && ytMatch[1]) {
        // Add vq=hd1080 for better quality
        return `https://www.youtube.com/embed/${ytMatch[1]}?vq=hd760`;
    }
    return url;
};

const Video = ({ src, index, classNameVideo }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // if (!src) return <div className={classNameVideo}>No video source provided</div>;

    if (isYouTubeLink(src)) {
        return (
            <iframe
                src={getYouTubeEmbedUrl(src)}
                className={classNameVideo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`youtube-video-${index}`}
            ></iframe>
        );
    }

    return (
        <video
            src={src}
            controls={hoveredIndex === index}
            className={classNameVideo}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            playsInline
        ></video>
    );
};

export default Video;