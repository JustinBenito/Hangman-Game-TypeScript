import React, { useState, useEffect, useCallback } from "react";
import words from './wordlist.json';
import { Hangman } from "./hangman";
import { Word } from "./word";
import { Keyboard } from "./keyboard";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState<string>(getWord);
  const [guessed, setGuessed] = useState<string[]>([]);
  const inCorrect = guessed.filter(letter => !wordToGuess.includes(letter));
  console.log(wordToGuess);

  function addGuessed(letter: string) {
    if (guessed.includes(letter)) return;

    setGuessed(current => [...current, letter]);
  }

  const isLoser = inCorrect.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessed.includes(letter));

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessed.includes(letter) || isLoser || isWinner) return;

    setGuessed(current => [...current, letter]);
  }, [guessed, isLoser, isWinner]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessed(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessed]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      setGuessed([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <>
      <div style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center"
      }}>
        <div style={{
          fontFamily: "Inter, sans-serif", // Apply "Inter" font or any other font you desire
          fontSize: "2rem",
          fontWeight: "600", // Use "600" for semibold
          textAlign: "center"
        }}>
          {!isWinner && !isLoser && "Welcome to Hangman"}
          {isWinner && "Winner! - Refresh to try again"}
          {isLoser && "Nice Try - Refresh to try again"}
        </div>
        <Hangman num={inCorrect.length} />
        <Word guessed={guessed} reveal={isLoser} wordToGuess={wordToGuess} />
        <div style={{ alignSelf: "stretch" }}>
          <Keyboard active={guessed.filter(letter => wordToGuess.includes(letter))} inactive={inCorrect} addGuessedLetter={addGuessedLetter} />
        </div>
      </div>
    </>
  );
}

export default App;
