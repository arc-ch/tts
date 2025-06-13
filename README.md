

# 🗣️ Build a Text-to-Speech (TTS) Component in React

Text-to-speech is a game-changer that allows users to *listen* to content instead of reading it. It's especially useful for:

* People with visual or cognitive impairments
* Multitaskers or people on the go
* Anyone who prefers listening over reading

In this tutorial, you'll learn how to build a customizable TTS component using React and the **Web Speech API**.

---

## 🛠️ What We're Building

We'll create a TTS component with the following features:

* Voice selection
* Adjustable pitch, speed, and volume
* Play, Pause, Resume, and Stop functionality

---

## 🚀 Initial Setup

Use any React boilerplate. This example uses **Create React App**.

```bash
npx create-react-app text-to-speech
cd text-to-speech
yarn start
```

---

## 🧩 Create the `TextToSpeech` Component

Create a new file: `TextToSpeech.js`.

### Basic Version

```js
import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
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

  return (
    <div>
      <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default TextToSpeech;
```

---

## 📄 Use the Component in Your Blog Post

```js
import TextToSpeech from './TextToSpeech';

const BlogPost = () => {
  const text = `Text-to-speech feature is now available on relatively any website or blog. 
  It's a game changer that you can listen to the content instead of reading it. 
  Especially effective for people with visual or cognitive impairments or on the go.`;

  return (
    <div>
      <h1>My Blog Post</h1>
      <TextToSpeech text={text} />
      <p>{text}</p>
    </div>
  );
};

export default BlogPost;
```

---

## 🧠 Adding Controls for Voice, Pitch, Speed & Volume

Let’s extend the component to support full customization:

### Final `TextToSpeech.js`

```js
import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
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

export default TextToSpeech;
```

---

## 🧪 Test & Customize

Once implemented:

* Select a voice (based on your OS/browser support)
* Adjust pitch, rate, and volume
* Enjoy listening to any text content

---

## ✅ Final Thoughts

This feature adds accessibility and convenience to your web content. Using the **Web Speech API**, you can easily enhance your applications with real-time speech synthesis.

Feel free to experiment with:

* Dynamic content reading
* Highlighting spoken text
* Multilingual support

**© 2025 by [Edvins Antonovs](https://edvins.io/react-text-to-speech). All rights reserved.**


