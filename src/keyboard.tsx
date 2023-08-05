import styles from "./Keyboard.module.css"
import React from "react"
const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]

type KeyboardProps={
    active: string[],
    inactive:string[],
    addGuessedLetter:(letter: string)=> void
    disabled?:boolean
}

export function Keyboard({active,inactive,addGuessedLetter,disabled=false}:KeyboardProps){
    return (
<div style={{display: "grid", 
gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", 
gap: ".5rem",}}>
    {KEYS.map(key=>{
        const isActive=active.includes(key)
        const isInactive=inactive.includes(key)
        return (<button onClick={()=>addGuessedLetter(key)} className={`${styles.btn} ${isActive ? styles.active : ""} ${
            isInactive ? styles.inactive : ""
          }`} disabled={isActive||isInactive||disabled} key={key}>{key}</button>)
    })}

</div>

    )

}