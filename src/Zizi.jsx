import { useState, useEffect } from "react";
import FunnyQuiz from "./components/FunnyQuiz.jsx";
import "./FunnyQuiz.css";
import "./Zizi.css";

export default function FriendshipPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const [meAndZiziPhotos, setMeAndZiziPhotos] = useState([]);
  const [wishPhotos, setWishPhotos] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const ziziImgs = Array.from({ length: 22 }, (_, i) => process.env.PUBLIC_URL + `/images/${i + 1}.png`);
    const wishImgs = Array.from({ length: 25 }, (_, i) => process.env.PUBLIC_URL + `/images/${i + 1}d.png`);
    setMeAndZiziPhotos(ziziImgs);
    setWishPhotos(wishImgs);

    fetch(process.env.PUBLIC_URL + "/bleuzz.json")
      .then((res) => res.json())
      .then((data) => {
        const updatedPhotos = (data.photos || []).map(photo => ({
          ...photo,
          src: process.env.PUBLIC_URL + photo.src
        }));
        setPhotos(updatedPhotos);
      });
  }, []);

  return (
    <div className="app-container">
      <div className="container-zizi">
        <header className="head">
          <div className="heading-shift">
            <h1 className="Text">To The Beautiful Person</h1>
          </div>
          <p className="subtitle">A collection of love and memories just for you</p>
        </header>

        <div className="letter-container">
          <EnvelopeCard emoji="💜" text="لزيزي" colorClass="color-purple text-purple" onClick={() => { setCurrentIndex(0); setActiveModal("messageModal"); }} />
          <EnvelopeCard emoji="📷" text="مشاعري في صورة" colorClass="color-blue text-blue" onClick={() => { setCurrentIndex(0); setActiveModal("photoModal"); }} />
          <EnvelopeCard emoji="🤲" text="دعاء" colorClass="color-yellow text-yellow" onClick={() => { setCurrentIndex(0); setActiveModal("wishesModal"); }} />
        </div>

        <button className="add-button" onClick={() => setShowQuiz(!showQuiz)}>
          {showQuiz ? "إخفاء الكويز" : "💬 Quiz Time!"}
        </button>

        {showQuiz && (
  <div className="quiz-overlay">
    <div className="quiz-modal">
      <FunnyQuiz onClose={() => setShowQuiz(false)} />
    </div>
  </div>
)}
      </div>

      {/* 🟣 Zizi Messages Modal */}
      <ImageSliderModal
        isOpen={activeModal === "messageModal"}
        onClose={() => setActiveModal(null)}
        images={meAndZiziPhotos}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      {/* 📷 Photo Modal (with white background preserved) */}
      <PhotoModal
        isOpen={activeModal === "photoModal"}
        onClose={() => setActiveModal(null)}
        photos={photos}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      {/* 🙏 Duaa Modal */}
      <ImageSliderModal
        isOpen={activeModal === "wishesModal"}
        onClose={() => setActiveModal(null)}
        images={wishPhotos}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}

function EnvelopeCard({ emoji, text, colorClass, onClick }) {
  return (
    <div className="envelope" onClick={onClick}>
      <div className={`envelope-flap ${colorClass}`}></div>
      <div className="envelope-content">
        <span>{emoji}</span>
        <p className={colorClass}>{text}</p>
      </div>
    </div>
  );
}

function ImageSliderModal({ isOpen, onClose, images, currentIndex, setCurrentIndex }) {
  // Add keyboard event listener when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((currentIndex + 1) % images.length);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    
    // Clean up the event listener when modal closes
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, setCurrentIndex, onClose]);

  if (!isOpen || images.length === 0) return null;
  
  return (
    <div className="modal image-slider" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="nav-button smaller left" onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}>&lt;</button>
      <div className="photo-slide" style={{ maxWidth: '70%' }}> {/* Changed from 90% to 70% */}
        <div className="polaroid-frame">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            style={{ maxHeight: '400px', width: '100%', objectFit: 'contain' }} 
          />
        </div>
      </div>
      <button className="nav-button smaller right" onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}>&gt;</button>
      <button className="close-modal" onClick={onClose}>×</button>
    </div>
  );
}

function PhotoModal({ isOpen, onClose, photos, currentIndex, setCurrentIndex }) {
  // Add keyboard event listener when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((currentIndex - 1 + photos.length) % photos.length);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((currentIndex + 1) % photos.length);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    
    // Clean up the event listener when modal closes
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, photos.length, setCurrentIndex, onClose]);

  if (!isOpen || photos.length === 0) return null;

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="nav-button smaller left" onClick={() => setCurrentIndex((currentIndex - 1 + photos.length) % photos.length)}>&lt;</button>
      <div className="photo-slide" style={{ maxWidth: '70%' }}>  {/* Changed from 90% to 70% */}
        <div className="polaroid-frame">
          <img
            src={photos[currentIndex].src || "/placeholder.svg"}
            alt="Memory"
            style={{ maxHeight: '400px', width: '100%', objectFit: 'contain' }}  
          />
          <div className="photo-details">
            <div className="photo-from">{photos[currentIndex].from}</div>
            <div className="photo-caption">{photos[currentIndex].caption}</div>
          </div>
        </div>
      </div>
      <button className="nav-button smaller right" onClick={() => setCurrentIndex((currentIndex + 1) % photos.length)}>&gt;</button>
      <button className="close-modal" onClick={onClose}>×</button>
    </div>
  );
}