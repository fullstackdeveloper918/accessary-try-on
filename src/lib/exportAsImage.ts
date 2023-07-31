import html2canvas from "html2canvas";
export const exportAsImage = async (element: HTMLElement) => {
  const html = document.getElementsByTagName("html")[0];
  const body = document.getElementsByTagName("body")[0];
  let htmlWidth = html.clientWidth;
  let bodyWidth = body.clientWidth;
  const newWidth = element.scrollWidth - element.clientWidth;
  if (newWidth > element.clientWidth) {
    htmlWidth += newWidth;
    bodyWidth += newWidth;
  }
  html.style.width = htmlWidth + "px";
  body.style.width = bodyWidth + "px";
  const canvas = await html2canvas(element, {
    allowTaint: true,
    // foreignObjectRendering: true,
    useCORS: true
  });
  const image = canvas.toDataURL("image/png");

  console.log("image", image);
  return image;
  // downloadImage(image, imageFileName);
  // html.style.width = null;
  // body.style.width = null;
};
