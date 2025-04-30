import { useState, useEffect } from "react";
import "./Zizi.css";

export default function FriendshipPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState("messageTab");

  const [messages, setMessages] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [messageName, setMessageName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");
  const [photoFrom, setPhotoFrom] = useState("");
  const [wishName, setWishName] = useState("");
  const [wishText, setWishText] = useState("");

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/bleuzz.json")
      .then(res => res.json())
      .then(data => {
        setMessages(data.messages || []);
        setPhotos(data.photos || []);
        setWishes(data.wishes || []);
      })
      .catch(err => console.error("Failed to load bleuzz.json:", err));
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (messageName && messageText) {
      setMessages([{ author: messageName, text: messageText }, ...messages]);
      setMessageName("");
      setMessageText("");
      setTimeout(() => setActiveModal(null), 500);
    }
  };

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    if (photoCaption && photoFrom) {
      setPhotos([
        {
          src: "/api/placeholder/400/320",
          caption: photoCaption,
          from: photoFrom,
        },
        ...photos,
      ]);
      setPhotoCaption("");
      setPhotoFrom("");
      setTimeout(() => setActiveModal(null), 500);
    }
  };

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (wishName && wishText) {
      setWishes([{ name: wishName, wish: wishText }, ...wishes]);
      setWishName("");
      setWishText("");
      setTimeout(() => setActiveModal(null), 500);
    }
  };

  return (
    <div className="app-container">
      <div className="container-zizi">
        <header className="head">
          <h1 className="Text">For My Amazing Friend</h1>
          <p className="subtitle">A collection of love and memories just for you</p>
        </header>

        <div className="letter-container">
          <EnvelopeCard emoji="❤️" text="me and zizi" colorClass="color-purple" onClick={() => { setCurrentIndex(0); setActiveModal("messageModal"); }} />
          <EnvelopeCard emoji="📸" text="Photo memories" colorClass="color-blue" onClick={() => { setCurrentIndex(0); setActiveModal("photoModal"); }} />
          <EnvelopeCard emoji="✨" text="Wishes" colorClass="color-yellow" onClick={() => { setCurrentIndex(0); setActiveModal("wishesModal"); }} />
        </div>

        <div className="admin-controls">
          <button className="add-button" onClick={() => setActiveModal("adminModal")}>
            Add New Content
          </button>
        </div>
      </div>

      <MessageModal
        isOpen={activeModal === "messageModal"}
        onClose={() => setActiveModal(null)}
        messages={messages}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <PhotoModal
        isOpen={activeModal === "photoModal"}
        onClose={() => setActiveModal(null)}
        photos={photos}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <WishModal
        isOpen={activeModal === "wishesModal"}
        onClose={() => setActiveModal(null)}
        wishes={wishes}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <Modal isOpen={activeModal === "adminModal"} onClose={() => setActiveModal(null)} title="Add New Content">
        <div className="nav-tabs">
          <div className={`nav-tab ${activeTab === "messageTab" ? "active" : ""}`} onClick={() => setActiveTab("messageTab")}>Add Message</div>
          <div className={`nav-tab ${activeTab === "photoTab" ? "active" : ""}`} onClick={() => setActiveTab("photoTab")}>Add Photo</div>
          <div className={`nav-tab ${activeTab === "wishesTab" ? "active" : ""}`} onClick={() => setActiveTab("wishesTab")}>Add Wish</div>
        </div>

        {activeTab === "messageTab" && (
          <form className="add-form" onSubmit={handleMessageSubmit}>
            <div className="form-group">
              <label htmlFor="messageName">Name</label>
              <input type="text" id="messageName" value={messageName} onChange={(e) => setMessageName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="messageText">Your Message</label>
              <textarea id="messageText" value={messageText} onChange={(e) => setMessageText(e.target.value)} required />
            </div>
            <button type="submit" className="submit-btn">Add Message</button>
          </form>
        )}

        {activeTab === "photoTab" && (
          <form className="add-form" onSubmit={handlePhotoSubmit}>
            <div className="form-group">
              <label htmlFor="photoFrom">From</label>
              <input type="text" id="photoFrom" value={photoFrom} onChange={(e) => setPhotoFrom(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="photoCaption">Caption</label>
              <input type="text" id="photoCaption" value={photoCaption} onChange={(e) => setPhotoCaption(e.target.value)} required />
            </div>
            <button type="submit" className="submit-btn">Add Photo</button>
          </form>
        )}

        {activeTab === "wishesTab" && (
          <form className="add-form" onSubmit={handleWishSubmit}>
            <div className="form-group">
              <label htmlFor="wishName">Your Name</label>
              <input type="text" id="wishName" value={wishName} onChange={(e) => setWishName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="wishText">Your Wish</label>
              <textarea id="wishText" value={wishText} onChange={(e) => setWishText(e.target.value)} required />
            </div>
            <button type="submit" className="submit-btn">Add Wish</button>
          </form>
        )}
      </Modal>
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

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>×</button>
        <h2 className="modal-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function PhotoModal({ isOpen, onClose, photos, currentIndex, setCurrentIndex }) {
  if (!isOpen || photos.length === 0) return null;
  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="nav-button smaller left" onClick={() => setCurrentIndex((currentIndex - 1 + photos.length) % photos.length)}>&lt;</button>
      <div className="photo-slide">
        <div className="polaroid-frame">
          <img src={photos[currentIndex].src || "/placeholder.svg"} alt="Memory" />
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

function MessageModal({ isOpen, onClose, messages, currentIndex, setCurrentIndex }) {
  if (!isOpen || messages.length === 0) return null;
  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="nav-button smaller left" onClick={() => setCurrentIndex((currentIndex - 1 + messages.length) % messages.length)}>&lt;</button>
      <div className="message-slide">
        <div className="message-polaroid">
          <div className="message-author">{messages[currentIndex].author}</div>
          <div className="message-text">{messages[currentIndex].text}</div>
        </div>
      </div>
      <button className="nav-button smaller right" onClick={() => setCurrentIndex((currentIndex + 1) % messages.length)}>&gt;</button>
      <button className="close-modal" onClick={onClose}>×</button>
    </div>
  );
}

function WishModal({ isOpen, onClose, wishes, currentIndex, setCurrentIndex }) {
  if (!isOpen || wishes.length === 0) return null;
  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="nav-button smaller left" onClick={() => setCurrentIndex((currentIndex - 1 + wishes.length) % wishes.length)}>&lt;</button>
      <div className="message-slide">
        <div className="message-polaroid">
          <h3>I wish you, Zizi</h3>
          <p className="message-text">{wishes[currentIndex].wish}</p>
          <div className="wish-author">— {wishes[currentIndex].name}</div>
        </div>
      </div>
      <button className="nav-button smaller right" onClick={() => setCurrentIndex((currentIndex + 1) % wishes.length)}>&gt;</button>
      <button className="close-modal" onClick={onClose}>×</button>
    </div>
  );
}
