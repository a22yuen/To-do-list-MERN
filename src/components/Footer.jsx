import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      Copyright ⓒ {year}, Made by Anson Yuen
    </footer>
  );
}

export default Footer;
