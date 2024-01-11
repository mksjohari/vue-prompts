export default () => {
  return {
    yesNo: (opts) => {
      if (typeof opts !== "object")
        throw new Error("Options must be an object");
      if (typeof opts.message !== "string")
        throw new Error("Options must contain a message property");
      if (typeof opts.heading !== "string")
        throw new Error("Options must contain a heading property");
      return new Promise((resolve) => {
        const event = new CustomEvent("add-prompt", {
          detail: {
            id: Math.random().toString(36).substr(2, 9),
            type: "yesNo",
            yesText: opts.yesText || "Yes",
            noText: opts.noText || "No",
            cb: resolve,
            ...opts
          }
        });
        document.dispatchEvent(event);
      });
    }
  };
};
