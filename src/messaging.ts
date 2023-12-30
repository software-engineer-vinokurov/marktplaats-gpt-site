
export const extensionId = {
  safari: "com.xvygyjau.Negotiate-Ninja.Extension (DYBARU2854)",
  chrome: "djjiokkmnhkmccblpacjpegaaiebcmhm",
};

export const sendMessageExt = (message: any) => {
  if (typeof browser !== 'undefined') {
    return browser.runtime.sendMessage(extensionId.safari, message, {});
  } else if (typeof chrome !== 'undefined') {
    return chrome.runtime.sendMessage(extensionId.chrome, message);
  } else {
    console.log("We are not in safari or chrome, commonApi is not supported for protocol", window.location.protocol);
    return new Promise((resolve, reject) => {
      reject("not supported");
    })
  }
}

export const connect = () => {
  if (typeof browser !== 'undefined') {
    console.log("connecting to extension", extensionId.safari);
    return browser.runtime.connect(extensionId.safari);
  } else if (typeof chrome !== 'undefined') {
    console.log("connecting to extension", extensionId.chrome);
    return chrome.runtime.connect(extensionId.chrome);
  } else {
    console.log("We are not in safari or chrome, commonApi is not supported for protocol", window.location.protocol);
    return undefined;
  }
}