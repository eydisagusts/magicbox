"use client";
import React, { useRef, forwardRef, useImperativeHandle, useState } from "react";

// Pre-defined colors to be used for randomizer
const tailwindColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
];

type MagicBoxHandle = {
  changeColor: () => void;
  resize: () => void;
  wiggle: () => void;
};

const MagicBox = forwardRef<MagicBoxHandle>((_, ref) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState("bg-red-500");
  const [size, setSize] = useState(100);

  function randomColor() {
    const randomIndex = Math.floor(Math.random() * tailwindColors.length);
    return tailwindColors[randomIndex];
  }

  const changeColor = () => {
    setColor(randomColor());
  };

  const resize = () => {
    setSize(prevSize => {
      if (prevSize === 100) return 150;
      if (prevSize === 150) return 200;
      return 100;
    });
  };

  const wiggle = () => {
    if (boxRef.current) {
      boxRef.current.classList.add("animate-wiggle");
      setTimeout(() => boxRef.current?.classList.remove("animate-wiggle"), 500);
    }
  };

  useImperativeHandle(ref, () => ({
    changeColor,
    resize,
    wiggle,
  }));

  return (
    <div
      ref={boxRef}
      className={`${color} mx-auto`} // Center the box horizontally
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
});

MagicBox.displayName = "MagicBox";

function MagicBoxParent() {
  const magicBoxRef = useRef<MagicBoxHandle>(null);

  return (
    <div className="App  items-center justify-center min-h-screen mt-2">
      <h1 className="flex flex-col items-center text-3xl mb-6">Magic Box!</h1>
      <button
        type="button"
        onClick={() => magicBoxRef.current?.changeColor()}
        className="m-4 bg-black border border-blue-500 p-2 hover:bg-blue-500 hover:text-white"
      >
        Change Color
      </button>
      <button
        type="button"
        className="m-4 border bg-black border-blue-500 p-2 hover:bg-blue-500 hover:text-white"
        onClick={() => magicBoxRef.current?.resize()}
      >
        Resize
      </button>
      <button
        type="button"
        className="m-4 border bg-black border-blue-500 p-2 hover:bg-blue-500 hover:text-white"
        onClick={() => magicBoxRef.current?.wiggle()}
      >
        Wiggle
      </button>
      <MagicBox ref={magicBoxRef} />
    </div>
  );
}

export default MagicBoxParent;