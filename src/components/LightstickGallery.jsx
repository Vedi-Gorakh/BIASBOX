import React from 'react';
import './LightstickGallery.css';

const lightsticks = [
  { name: 'EXO', image: `${import.meta.env.BASE_URL}images/EXO.jpg` },
  { name: 'GIRLSGENERATION', image: `${import.meta.env.BASE_URL}images/GIRLSGENERATION.jpg` },
  { name: 'SEVENTEEN', image: `${import.meta.env.BASE_URL}images/SEVENTEEN.jpg` },
  { name: 'BTS', image: `${import.meta.env.BASE_URL}images/BTS.jpg` },
  { name: 'TWICE', image: `${import.meta.env.BASE_URL}images/TWICE.jpg` },
  { name: 'STRAY KIDS', image: `${import.meta.env.BASE_URL}images/STRAYKIDS.jpeg` },
  { name: 'ATEEZ', image: `${import.meta.env.BASE_URL}images/BLACKPINK.jpg` }
];


const LightstickGallery = () => {
  return (
    <div className="gallery-section">
      {lightsticks.map((artist, index) => (
        <div
          key={index}
          className="gallery-block"
          style={{ backgroundImage: `url(${artist.image})` }}
        >
          {/* <span className="gallery-name">{artist.name}</span> */}
        </div>
      ))}
    </div>
  );
};

export default LightstickGallery;
  