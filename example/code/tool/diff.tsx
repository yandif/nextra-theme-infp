import React, { useRef, useState } from 'react';

const Diff = () => {
  const [state, setState] = useState({
    oldFiles: null,
    newFiles: null,
    scanR: 8,
    scanStep: 4,
  });

  const oldFilesRef = useRef(null);
  const newFilesRef = useRef(null);

  const oldCanvasRefs = useRef([]);
  const newCanvasRefs = useRef([]);

  // Function to preview old files
  const previewOldFiles = () => {
    previewFiles('oldFiles', oldFilesRef.current, oldCanvasRefs.current);
  };

  // Function to preview new files
  const previewNewFiles = () => {
    previewFiles('newFiles', newFilesRef.current, newCanvasRefs.current);
  };

  // Function to preview files and draw them on the canvas
  const previewFiles = (
    files: string,
    filesRef: { files: string | any[] } | null,
    canvasRefs: { current: any }[] | React.RefObject<unknown>[],
  ) => {
    setState({
      ...state,
      [files]: filesRef.files,
    });

    for (let i = 0; i < filesRef.files.length; i++) {
      canvasRefs.push(React.createRef());
      const file = filesRef.files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const img = new Image();
        img.src = this.result as string;
        img.onload = function () {
          const cvs = canvasRefs[i].current;
          cvs.width = img.width;
          cvs.height = img.height;
          const ctx = cvs.getContext('2d');
          ctx.drawImage(img, 0, 0, img.width, img.height);
        };
      };
    }
  };

  // Function to get pixel information
  const getPixelInfo = (imageData: { width: number }, x: number, y: number) => {
    const R = y * imageData.width * 4 + 4 * x;
    const G = R + 1;
    const B = R + 2;
    const A = R + 3;

    const orderArr = [R, G, B, A];
    const pixelInfo = {
      R,
      G,
      B,
      A,
      orderArr,
    };

    return pixelInfo;
  };

  // Function to calculate the difference
  const calcArea = (
    scanR: number,
    scanStep: number,
    oldRefs: string | any[],
    newRefs: { current: any }[],
  ) => {
    for (let index = 0; index < oldRefs.length; index++) {
      const oldCvs = oldRefs[index].current;
      const cavsW = oldCvs.width;
      const cavsH = oldCvs.height;
      const oldCtx = oldCvs.getContext('2d');
      const oldImgData = oldCtx.getImageData(0, 0, cavsW, cavsH);

      const newCvs = newRefs[index].current;
      const newCtx = newCvs.getContext('2d');
      const newImgData = newCtx.getImageData(0, 0, cavsW, cavsH);

      for (let h = 0; h < cavsH - scanR / 2; h += scanStep) {
        for (let i = 0; i < cavsW - scanR / 2; i += scanStep) {
          let diffNum = 0;

          for (let j = 0; j < scanR; j++) {
            for (let k = 0; k < scanR; k++) {
              const y = h + j;
              const x = i + k;
              const pixelArr = getPixelInfo(oldImgData, x, y).orderArr;

              pixelArr.forEach((order) => {
                const disPixel =
                  oldImgData.data[order] - newImgData.data[order];
                if (disPixel ** 2 > 100) {
                  diffNum++;
                }
              });
            }
          }

          const x = Math.round(i + 0.5 * scanR);
          const y = Math.round(h + 0.5 * scanR);

          if (!isNaN(diffNum) && diffNum !== 0) {
            newCtx.fillStyle = 'green';
            newCtx.globalAlpha = 0.3;
            newCtx.fillRect(x - scanR / 2, y - scanR / 2, scanR / 2, scanR / 2);
            oldCtx.fillStyle = 'red';
            oldCtx.globalAlpha = 0.3;
            oldCtx.fillRect(x - scanR / 2, y - scanR / 2, scanR / 2, scanR / 2);
          }
        }
      }
    }
  };

  // Function to start finding differences
  const startFind = () => {
    console.log(state.scanR, state.scanStep);
    calcArea(
      state.scanR,
      state.scanStep,
      oldCanvasRefs.current,
      newCanvasRefs.current,
    );
  };

  // Function to reset the component state
  const reset = () => {
    setState({
      ...state,
      newFiles: null,
      oldFiles: null,
    });
    oldFilesRef.current.value = null;
    newFilesRef.current.value = null;
    oldCanvasRefs.current = [];
    newCanvasRefs.current = [];
  };

  return (
    <div className="diff">
      <div className="contral">
        <div>
          <label htmlFor="oldFiles">上传旧图片</label>
          <input
            style={{ display: 'none' }}
            id="oldFiles"
            type="file"
            ref={oldFilesRef}
            onChange={previewOldFiles}
            multiple
          />
        </div>
        <div>
          <label htmlFor="newFiles">上传新图片</label>
          <input
            style={{ display: 'none' }}
            id="newFiles"
            type="file"
            ref={newFilesRef}
            onChange={previewNewFiles}
            multiple
          />
        </div>
        <div>
          <label>扫描半径：</label>
          <input
            type="text"
            value={state.scanR}
            onChange={(e) => setState({ ...state, scanR: e.target.value })}
          />
        </div>
        <div>
          <label>扫描步长：</label>
          <input
            type="text"
            value={state.scanStep}
            onChange={(e) => setState({ ...state, scanStep: e.target.value })}
          />
        </div>
        <div>
          <label onClick={reset}>清空</label>
        </div>
        <div>
          <label onClick={startFind}>开始</label>
        </div>
      </div>
      <div className="main">
        <div className="old">
          {oldCanvasRefs.current.map((canvasRef, index) => (
            <canvas key={index} ref={canvasRef}></canvas>
          ))}
        </div>
        <div className="new">
          {newCanvasRefs.current.map((canvasRef, index) => (
            <canvas key={index} ref={canvasRef}></canvas>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Diff;
