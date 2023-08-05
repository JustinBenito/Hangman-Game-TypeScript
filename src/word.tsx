import React from "react"
type HangmanWordProps = {
    guessed: string[],
    wordToGuess: string,
    reveal?:boolean
}


export function Word({guessed, wordToGuess,reveal=false}:HangmanWordProps){

    return (<div style={{display: "flex", gap: ".25em", fontSize: "6rem", fontWeight: "bold", textTransform: "uppercase", fontFamily: "monospace",}}>
{wordToGuess.split("").map((letter, index)=>(
    <span style={{borderBottom: ".1em solid black"}} key={index}>
        <span style={{visibility: guessed.includes(letter) || reveal
            ? "visible" : "hidden", color:!guessed.includes(letter) && reveal ? "red" : "black"}}>{letter}</span>
    </span>
))}
    </div>)

}