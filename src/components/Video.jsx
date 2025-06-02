import { useState } from "react";

const Video = ({ src, index, classNameVideo}) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <video
            src={src}
            controls={hoveredIndex === index}
            className={classNameVideo}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            playsInline
        ></video>
    )
}

export default Video;