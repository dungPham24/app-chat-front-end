import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function Stickers() {
  const [stickers, setStickers] = useState([]);
  useEffect(() => {
    //   fetch Sticker (cre: napthedev)
    fetch(
      "https://cdn.jsdelivr.net/gh/naptestdev/zalo-stickers/data/favourite.json"
    )
      .then((r) => r.json())
      .then((result) => {
        setStickers(result);
      });
  }, []);

  if (stickers.length === 0) return <p>Loading...</p>;

  return stickers.map(({ icon, id, name, stickers: values }) => (
    <fieldset key={id} style={{ width: "100%", marginBottom: 40 }}>
      <legend>{name}</legend>
      <img src={icon} alt={name} draggable={false} />
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: 40,
          display: "grid",
          placeItems: "center",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        }}
      >
        {values.map(({ id, spriteURL }) => (
          <div
            key={id}
            style={{
              width: 130,
              height: 130,
              overflow: "hidden",
            }}
          >
            <StickerLoader src={spriteURL} name={name} draggable={false} />
          </div>
        ))}
      </div>
    </fieldset>
  ));
}

const StickerLoader = (props) => {
  const { name, src } = props;
  const [pos, setPos] = useState(0);
  const [maxW, setMaxW] = useState(0);
  const imageRef = useRef();

  useEffect(() => {
    /*
      - Làm cho ảnh .png động đậy như .gif bằng cách sử dụng interval
      - 300 là tốc độ load từng frame
      - pos là frame đang load
      - Mỗi một frame sẽ là 1 ảnh 130x130
        + Nếu độ dài max của ảnh chia cho 130 * pos bằng 1 (chạm đến điểm cuối của ảnh) thì set pos = 0
        + Nếu không, set pos sau mỗi lần chạy sẽ +1
    */
    const interval = setInterval(() => {
      if (maxW / (130 * pos) === 1) setPos(0);
      else setPos(pos + 1);
    }, 300);

    return () => clearInterval(interval);
  }, [maxW, pos]);

  return (
    <Sticker
      ref={imageRef}
      //   lấy độ dài ảnh
      onLoad={() => setMaxW(imageRef.current.naturalWidth)}
      pos={pos}
      src={src}
      alt={`${name}'s sticker`}
      draggable={false}
    />
  );
};

const Sticker = styled.img`
  /* Lấy pos * 130 để load frame ảnh */
  transform: translateX(${({ pos }) => -pos * 130 || 0}px);
`;

export default Stickers;
