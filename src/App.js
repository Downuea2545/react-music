import React, { useState, useRef, useEffect } from "react";

function App() {
  const playlist = [
    {
      id: 1,
      title: "กลัวว่าฉันจะไม่เสียใจ (Fear) - Purpeech",
      src: "/music/PURPEECH - กลัวว่าฉันจะไม่เสียใจ (Fear).mp3",
      image: "/images/album1.png",
      bgColorStart: "#85c1e9",
      bgColorEnd: "#DCDCDC",
    },
    {
      id: 2,
      title: "อุบัติเหตุ - Loserpop",
      src: "/music/loserpop -  Love Accident Official MV.mp3",
      image: "/images/album2.png",
      bgColorStart: "#563831",
      bgColorEnd: "#8B5E4B",
    },
    {
      id: 3,
      title: "รูปภาพ(PHOTOGRAPH) - QLER",
      src: "/music/QLER -  PHOTOGRAPH.mp3",
      image: "/images/album3.png",
      bgColorStart: "#212f3c",
      bgColorEnd: "#17202a",
    },
    {
      id: 4,
      title: "Faded - 2Ectasy Feat. Z9",
      src: "/music/2Ectasy Feat Z9 - Faded Special Version.mp3",
      image: "/images/album4.png",
      bgColorStart: "#663300",
      bgColorEnd: "#C19A6B",
    },
    {
      id: 5,
      title: "Missed Call - 2Ectasy",
      src: "/music/2Ectasy - Missed Call Visualizer.mp3",
      image: "/images/album5.png",
      bgColorStart: "#17202a",
      bgColorEnd: "#000000",
    },
    {
      id: 6,
      title: "ซ่อนเธอไว้ในเพลง - Only Monday",
      src: "/music/- Only Monday _Official MV_.mp3",
      image: "/images/album6.png",
      bgColorStart: "#FAFAD2",
      bgColorEnd: "#B0C4DE",
    },
    {
      id: 7,
      title: "Chilling Sunday - ดีพอไหม",
      src: "/music/Chilling Sunday -  Official Music Video.mp3",
      image: "/images/album7.jpg",
      bgColorStart: "#7E6947",
      bgColorEnd: "#BA9483",
    },
  ];

  const [currentTrack, setCurrentTrack] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const audioRef = useRef(new Audio(currentTrack.src));

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = currentTrack.src;
    if (isPlaying) {
      audio.play();
      setIsRotating(true);
    } else {
      audio.pause();
      setIsRotating(false);
    }

    audio.onended = () => {
      const currentIndex = playlist.findIndex((track) => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      changeTrack(playlist[nextIndex]);
    };
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handlePrev = () => {
    const currentIndex = playlist.findIndex((track) => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    changeTrack(playlist[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = playlist.findIndex((track) => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    changeTrack(playlist[nextIndex]);
  };

  const changeTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressChange = (e) => {
    const newPercent = e.target.value;
    const newTime = (newPercent / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeDown = () => setVolume(Math.max(0, volume - 0.1));
  const handleVolumeUp = () => setVolume(Math.min(1, volume + 0.1));

  
const btnStyle = {
  backgroundColor: "#555",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "8px 16px",
  fontSize: "16px",
  cursor: "pointer",
};

const volumeBtnStyle = {
  backgroundColor: "#777",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  padding: "4px 8px",
  fontSize: "14px",
  cursor: "pointer",
  marginLeft: "10px",
};

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "900px",
          height: "500px",
          background: `linear-gradient(to right, ${currentTrack.bgColorStart}, ${currentTrack.bgColorEnd})`,
          borderRadius: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          display: "flex",
          padding: "20px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "510px",
            height: "510px",
            borderRadius: "50%",
            overflow: "hidden",
            marginRight: "30px",
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-5px",
          }}
        >
          <img
            src={currentTrack.image}
            alt={currentTrack.title}
            style={{
              width: "510px",
              height: "510px",
              objectFit: "cover",
              borderRadius: "50%",
              animation: isRotating ? "spin 4s linear infinite" : "none",
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(21, 13, 53, 0.27)",
            borderRadius: "20px",
            padding: "20px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ overflowY: "auto", flex: 1, marginBottom: "10px" }} className="playlist-scroll">
            <h4>รายการเพลง</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {playlist.map((track) => (
                <li
                  key={track.id}
                  onClick={() => changeTrack(track)}
                  style={{
                    padding: "8px",
                    marginBottom: "4px",
                    borderRadius: "8px",
                    backgroundColor: track.id === currentTrack.id ? "#ccc" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  {track.title}
                </li>
              ))}
            </ul>
          </div>

          <style>{`.playlist-scroll::-webkit-scrollbar { display: none; }`}</style>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>{currentTrack.title}</div>
            <div style={{ fontSize: "14px" }}>
              {formatTime(currentTime)} / {duration ? formatTime(duration) : "0:00"}
            </div>
          </div>

          <div
            style={{ margin: "10px 0", width: "100%" }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percent = clickX / rect.width;
              const newTime = percent * duration;
              audioRef.current.currentTime = newTime;
              setCurrentTime(newTime);
            }}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleProgressChange}
              style={{
                width: "100%",
                height: "8px",
                appearance: "none",
                background: "rgba(29, 29, 29, 0.64)",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
            <style>{`
              input[type=range]::-webkit-slider-thumb { display: none; }
              input[type=range]::-moz-range-thumb { display: none; }
            `}</style>
          </div>

          {/* คอนโทรลเพลง */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
            <button onClick={handlePrev} style={btnStyle}>⏮</button>
            <button onClick={togglePlayPause} style={btnStyle}>{isPlaying ? "⏸" : "▶"}</button>
            <button onClick={handleNext} style={btnStyle}>⏭</button>
          </div>

          {/* ควบคุมเสียง */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
            <span style={{ marginRight: "10px" }}>เสียง</span>
            <button onClick={handleVolumeDown} style={volumeBtnStyle}>-</button>
            <button onClick={handleVolumeUp} style={volumeBtnStyle}>+</button>
            <span style={{ marginLeft: "10px" }}>{(volume * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}


export default App;
