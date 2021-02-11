import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../util";

const Player = ({
    audioRef,
    currentSong,
    isPlaying,
    setIsPlaying,
    setSongInfo,
    songInfo,
    songs,
    setCurrentSong,
    setSongs,
}) => {
    //handlers
    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
    }, [currentSong]);
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying((playing) => !playing);
        } else {
            audioRef.current.play();
            setIsPlaying((playing) => !playing);
        }
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };
    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );
        if (direction === "skip-forward") {
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        } else if (direction === "skip-back") {
            if ((currentIndex - 1) % songs.length === -1) {
                setCurrentSong(songs[songs.length - 1]);
                playAudio(isPlaying, audioRef);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        playAudio(isPlaying, audioRef);
    };
    //state
    const getTime = (time) => {
        return (
            Math.floor(time / 60) +
            ":" +
            ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime || 0}
                    type="range"
                    onChange={dragHandler}
                />
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler("skip-back")}
                    className="skip-back"
                    icon={faAngleLeft}
                    size="2x"
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    icon={isPlaying ? faPause : faPlay}
                    size="2x"
                />
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler("skip-forward")}
                    className="skip-forward"
                    icon={faAngleRight}
                    size="2x"
                />
            </div>
        </div>
    );
};

export default Player;
