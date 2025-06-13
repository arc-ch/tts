import React, { useState, useEffect } from "react";

const TextToSpeechFinalWithMoreControl = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    if (voices.length > 0) {
      setVoice(voices[0]);
    }

    setUtterance(u);

    // Fix for voices not loading immediately
    if (voices.length === 0) {
      synth.onvoiceschanged = () => {
        const updatedVoices = synth.getVoices();
        setVoice(updatedVoices[0]);
      };
    }

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPaused(false);
  };

  const handleVoiceChange = (e) => {
    const voices = window.speechSynthesis.getVoices();
    setVoice(voices.find(v => v.name === e.target.value));
  };

  return (
    <div>
      <label>
        Voice:
        <select value={voice?.name || ""} onChange={handleVoiceChange}>
          {window.speechSynthesis.getVoices().map((v) => (
            <option key={v.name} value={v.name}>{v.name}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Pitch:
        <input type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(+e.target.value)} />
      </label>
      <br />
      <label>
        Speed:
        <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} />
      </label>
      <br />
      <label>
        Volume:
        <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(+e.target.value)} />
      </label>
      <br />
      <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default TextToSpeechFinalWithMoreControl;
