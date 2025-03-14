import React, { useState, useEffect } from "react";
import { SectionWrapper } from "../components";
import config from "../config/config";

function Closing() {
  const imageFiles = import.meta.glob("../assets/gifs/*.gif");
  const { message, gifName, style } = config.closingPage;
  const [gifSrc, setGifSrc] = useState(null);

  useEffect(() => {
    const loadGif = async () => {
      const gifPath = `../assets/gifs/${gifName}`;
      if (imageFiles[gifPath]) {
        const gifModule = await imageFiles[gifPath]();
        setGifSrc(gifModule.default);
      }
    };
    loadGif();
  }, [gifName]);

  return (
    <div className="bg-black/20">
      <SectionWrapper>
        <div className="flex flex-col min-h-[100dvh] cursor-pointer w-full items-center justify-center overflow-clip">
          <div className="w-[90%] max-w-[400px] px-8">
            <div>
              {gifSrc && (
                <img
                  src={gifSrc}
                  alt="Celebration"
                  className={`${style} mx-auto mb-3`}
                />
              )}
              <p className="text-xl font-normal text-white drop-shadow-lg text-center">
                {message}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

export default Closing;
