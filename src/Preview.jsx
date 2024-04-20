import previewAvatar from "./assets/preview_avatar.png";
import { useState } from "react";

const Preview = (props) => {
  const [imgSrc, setImgSrc] = useState(
    `https://cdn.discordapp.com/avatar-decoration-presets/${props.product.items[0].asset}.png?size=160&amp&passthrough=false`
  );
  return (
    <div
      className="wrapper-3Un6-K avatar-jvUUbt"
      role="img"
      aria-label="Avatar"
      aria-hidden="false"
      onMouseEnter={(event) => {
        setImgSrc(imgSrc.replace("passthrough=false", "passthrough=true"));
      }}
      onMouseLeave={(event) => {
        setImgSrc(imgSrc.replace("true", "false"));
      }}
      style={{ width: "120px", height: "120px" }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="mask-1y0tyc svg-1G_H_8"
        aria-hidden="true"
      >
        <foreignObject
          x="0"
          y="0"
          width="120"
          height="120"
          mask="url(#svg-mask-avatar-default)"
        >
          <div className="avatarStack-3Bjmsl">
            <img
              src={
                localStorage.preview_avatar
                  ? localStorage.preview_avatar
                  : previewAvatar
              }
              alt=" "
              className="avatar-31d8He"
              aria-hidden="true"
            />
          </div>
        </foreignObject>
      </svg>
      <svg
        width="144"
        height="144"
        viewBox="0 0 144 144"
        className="avatarDecoration-2Wb1Au"
        aria-hidden="true"
      >
        <foreignObject x="0" y="0" width="144" height="144" mask="url(#)">
          <div className="avatarStack-3Bjmsl">
            <img
              className="avatar-31d8He"
              src={imgSrc}
              alt="Avatar decoration."
              aria-hidden="true"
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};
export default Preview;
