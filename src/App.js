import React, { useState, useRef } from "react";
//styles
import "./styles/App.scss";
//components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import data from "./util";

function App() {
    //state
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({ ...songInfo, currentTime: current, duration });
    };
    //ref
    const audioRef = useRef(null);
    return (
        <div className="App">
            <Song currentSong={currentSong} />
            <Player
                audioRef={audioRef}
                currentSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                setSongInfo={setSongInfo}
                songInfo={songInfo}
            />
            <Library
                songs={songs}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs}
            />
            <audio
                onTimeUpdate={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onLoadedMetadata={timeUpdateHandler}
            ></audio>
        </div>
    );
}

export default App;
