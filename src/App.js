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
      title: "ซ่อนเธอไว้ในเพลง - Olny Monday",
      src: "/music/- Only Monday _Official MV_.mp3",
      image: "/images/album6.png",
      bgColorStart: "#FAFAD2",
      bgColorEnd: "	#B0C4DE",
    },
  ];

  const [currentTrack, setCurrentTrack] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio(currentTrack.src));
  const [isRotating, setIsRotating] = useState(false);

  // อัปเดตเวลาและความยาวเพลง
  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };
    const updateDuration = () => {
      setDuration(audio.duration);
    };
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentTrack]);

  // เมื่อเปลี่ยนเพลงหรือเล่น/หยุด
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = currentTrack.src;
    if (isPlaying) {
      audio.play();
      setIsRotating(true);
    } else {
      setIsRotating(false);
    }
    // เมื่อเพลงจบ เล่นเพลงต่อไปอัตโนมัติ
    audio.onended = () => {
      const currentIndex = playlist.findIndex(
        (track) => track.id === currentTrack.id
      );
      const nextIndex = (currentIndex + 1) % playlist.length;
      changeTrack(playlist[nextIndex]);
    };
  }, [currentTrack, isPlaying]);

  const changeTrack = (track) => {
    setCurrentTrack(track);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    changeTrack(playlist[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    const nextIndex = (currentIndex + 1) % playlist.length;
    changeTrack(playlist[nextIndex]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressChange = (e) => {
    const newPercent = e.target.value; // 0-100
    const newTime = (newPercent / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
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
      {/* กล่องหลัก */}
      <div
        style={{
          width: "900px",
          height: "500px",
          background: `linear-gradient(to right, ${currentTrack.bgColorStart}, ${currentTrack.bgColorEnd})`,
          borderRadius: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          display: "flex",
          padding: "20px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* รูปภาพซ่อนเพื่อดึงสี */}
        <img
          src={currentTrack.image}
          alt={currentTrack.title}
          style={{ display: "none" }}
        />

        {/* วงกลมด้านซ้าย */}
        <div
          style={{
            width: "460px",
            height: "460px",
            borderRadius: "50%",
            overflow: "hidden",
            marginRight: "30px",
            flexShrink: 0,
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={currentTrack.image}
            alt={currentTrack.title}
            style={{
              width: "460px",
              height: "460px",
              objectFit: "cover",
              borderRadius: "50%",
              animation: isRotating ? "spin 4s linear infinite" : "none",
            }}
          />
        </div>

        {/* รายการเพลงด้านขวา */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(21, 13, 53, 0.27)",
            borderRadius: "20px",
            padding: "20px",
            margin: "10px",
            display: "flex",
            color: "white",
            flexDirection: "column",
            justifyContent: "space-between",
            maxHeight: "460px",
          }}
        >
          {/* รายชื่อเพลง */}
          <div
            style={{
              overflowY: "auto",
              flex: 1,
              marginBottom: "10px",
              // ซ่อน scrollbar
              scrollbarWidth: "none", // Firefox
            }}
            className="playlist-scroll"
          >
            <h4 style={{ margin: "0 0 10px 0" }}>รายการเพลง</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {playlist.map((track) => (
                <li
                  key={track.id}
                  onClick={() => changeTrack(track)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    marginBottom: "4px",
                    borderRadius: "8px",
                    backgroundColor:
                      track.id === currentTrack.id ? "#ccc" : "transparent",
                    transition: "background-color 0.3s",
                  }}
                >
                  {track.title}
                </li>
              ))}
            </ul>
          </div>
          {/* คำสั่งซ่อน scrollbar สำหรับ Webkit (Chrome, Safari, Edge) */}
          <style>
            {`
            .playlist-scroll::-webkit-scrollbar {
              display: none;
            }
            `}
          </style>

          {/* ชื่อเพลงและเวลา */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            >
              {currentTrack.title}
            </div>
            <div style={{ fontSize: "14px" }}>
              {formatTime(currentTime)} / {duration ? formatTime(duration) : "0:00"}
            </div>
          </div>

          {/* Progress Bar กับการคลิกเพื่อ seek */}
          <div
            style={{ margin: "10px 0", width: "100%", cursor: "pointer" }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const width = rect.width;
              const percent = clickX / width;
              const newTime = percent * duration;
              if (audioRef.current) {
                audioRef.current.currentTime = newTime;
              }
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
            <style>
              {`
              /* ซ่อนลูกบากะสำหรับ Chrome, Safari */
              input[type=range]::-webkit-slider-thumb {
                display: none;
              }
              /* ซ่อนลูกบากะสำหรับ Firefox */
              input[type=range]::-moz-range-thumb {
                display: none;
              }
              `}
            </style>
          </div>

          {/* คอนโทรล */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <button
              onClick={handlePrev}
              style={{
                backgroundColor: "#555",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                marginRight: "10px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ⏮
            </button>
            <button
              onClick={togglePlayPause}
              style={{
                backgroundColor: "#555",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "8px 20px",
                marginRight: "10px",
                cursor: "pointer",
                fontSize: "16px",
                minWidth: "70px",
              }}
            >
              {isPlaying ? "▶︎‖" : "▶"}
            </button>
            <button
              onClick={handleNext}
              style={{
                backgroundColor: "#555",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ⏭
            </button>
          </div>
        </div>
      </div>

      {/* คำสั่ง keyframes สำหรับ spin */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default App;