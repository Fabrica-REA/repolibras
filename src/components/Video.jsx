import { useState } from "react";
import '../assets/css/utilidades.css';

// Verifica se o link é do YouTube
const isYouTubeLink = (url) => {
    if (!url) return false;
    return url.includes("youtube.com") || url.includes("youtu.be");
};

// Gera a URL de embed do YouTube
const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    // Converte youtu.be/VIDEO_ID para youtube.com/embed/VIDEO_ID
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]+)/);
    if (ytMatch && ytMatch[1]) {
        return `https://www.youtube.com/embed/${ytMatch[1]}?vq=hd760&showinfo=0`;
    }
    return url;
};

// Componente de vídeo, exibe vídeo local ou YouTube
const Video = ({ src, index, classNameVideo }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    if (isYouTubeLink(src)) {
        return (
            <iframe
                src={getYouTubeEmbedUrl(src)}
                className={classNameVideo}
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
            onPointerEnter={() => setHoveredIndex(index)}
            onPointerLeave={() => setHoveredIndex(null)}
            playsInline
        ></video>
    );
};

export default Video;