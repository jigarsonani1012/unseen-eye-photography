import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0b09",
          position: "relative",
        }}
      >
        {/* Camera Body Shell */}
        <div
          style={{
            width: "28px",
            height: "19px",
            borderRadius: "3px",
            border: "1.5px solid #eae6dd",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "3px",
          }}
        >
          {/* Top Shutter Button */}
          <div
            style={{
              position: "absolute",
              top: "-4px",
              right: "3px",
              width: "4px",
              height: "2.5px",
              borderRadius: "0.5px",
              background: "#eae6dd",
            }}
          />

          {/* Central Eye Lens */}
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "1.2px solid #eae6dd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Pupil */}
            <div
              style={{
                width: "4.5px",
                height: "4.5px",
                borderRadius: "50%",
                background: "#eae6dd",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}








