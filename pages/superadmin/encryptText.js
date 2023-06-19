import React, { useEffect } from "react";
import * as CryptoJS from "crypto-js";

export default function encryptText() {
  const encryptText = (text, pass) => {
    console.log("To encrypt", text, pass);
    const cipherText = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      pass
    ).toString();

    return cipherText;
  };

  useEffect(() => {
    console.log(
      encryptText("asgutierrez2023", process.env.NEXT_PUBLIC_CRYPTO_SECRET_PASS)
    );
  });
  return <div>encryptText</div>;
}
