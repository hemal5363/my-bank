"use client";

export const showLoader = (): void => {
  const loaderDiv = document?.getElementById("loaderForAPICall");
  if (loaderDiv) {
    loaderDiv.classList.add("visible");
    loaderDiv.classList.remove("invisible");
  }
  const mainDiv = document?.getElementById("mainDiv");
  if (mainDiv) {
    mainDiv.classList.add("overflow-hidden");
    mainDiv.classList.remove("overflow-auto");
  }
};

export const hideLoader = (): void => {
  const loaderDiv = document?.getElementById("loaderForAPICall");
  if (loaderDiv) {
    loaderDiv.classList.remove("visible");
    loaderDiv.classList.add("invisible");
  }
  const mainDiv = document?.getElementById("mainDiv");
  if (mainDiv) {
    mainDiv.classList.remove("overflow-hidden");
    mainDiv.classList.add("overflow-auto");
  }
};
