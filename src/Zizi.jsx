import { useState, useEffect } from "react";
import "./Zizi.css";

export default function FriendshipPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState("messageTab");

  const [messages, setMessages] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [wishes, setWishes] = useState([]);

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
          <EnvelopeCard
            emoji="❤️"
            text="me and zizi"
            colorClass="color-purple"
            onClick={() => setActiveModal("messageModal")}
          />
          <EnvelopeCard
            emoji="📸"
            text="Photo memories"
            colorClass="color-blue"
            onClick={() => setActiveModal("photoModal")}
          />
          <EnvelopeCard
            emoji="✨"
            text="Wishes"
            colorClass="color-yellow"
            onClick={() => setActiveModal("wishesModal")}
          />
        </div>

        <div className="admin-controls">
          <button className="add-button" onClick={() => setActiveModal("adminModal")}>
            Add New Content
          </button>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={activeModal === "messageModal"} onClose={() => setActiveModal(null)} title="Messages">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <div className="message-author">{message.author}</div>
              <div className="message-text">{message.text}</div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal isOpen={activeModal === "photoModal"} onClose={() => setActiveModal(null)} title="Photo Memories">
        <div className="photos-container">
          {photos.map((photo, index) => (
            <div key={index} className="photo-item">
              <div className="photo-from">{photo.from}</div>
              <img src={photo.src || "/placeholder.svg"} alt="Memory" />
              <div className="photo-caption">{photo.caption}</div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal isOpen={activeModal === "wishesModal"} onClose={() => setActiveModal(null)} title="Wishes">
        <div className="wishes-container">
          {wishes.map((item, index) => (
            <div key={index} className="surprise-content">
              <h3>I wish you, Zizi</h3>
              <p>{item.wish}</p>
              <div className="wish-author">
                <span>— {item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Admin Modal */}
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

// EnvelopeCard component
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

// Modal component
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
