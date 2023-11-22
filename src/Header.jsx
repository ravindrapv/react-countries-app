import React from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <div>
      <header className=" flex justify-between shadow p-4">
        <h1 className=" text-2xl capitalize pt-4 font-bold">
          Where in the world
        </h1>
        <DarkModeToggle />
      </header>
    </div>
  );
}
