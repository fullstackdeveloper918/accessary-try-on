import html2canvas from "html2canvas";
export const exportAsImage = async (
  element: HTMLElement,
  imageElement: HTMLImageElement
) => {
  const html = document.getElementsByTagName("html")[0];
  const body = document.getElementsByTagName("body")[0];
  // let htmlWidth = html.clientWidth;
  // let bodyWidth = body.clientWidth;
  // const newWidth = element.scrollWidth - element.clientWidth;
  // if (newWidth > element.clientWidth) {
  //   htmlWidth += newWidth;
  //   bodyWidth += newWidth;
  // }
  html.style.width = imageElement.width + "px";
  html.style.height = imageElement.height + "px";
  body.style.width = imageElement.width + "px";
  body.style.height = imageElement.height + "px";
  const canvas = await html2canvas(element, {
    allowTaint: true,
    // foreignObjectRendering: true,
    useCORS: true,
  });
  const image = canvas.toDataURL("image/png");

  console.log("image", image);
  return image;
  // downloadImage(image, imageFileName);
  // html.style.width = null;
  // body.style.width = null;
};
