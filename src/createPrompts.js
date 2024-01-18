export default () => {
  function baseCheck(opts) {
    if (typeof opts !== "object") throw new Error("Options must be an object");
    if (typeof opts.body !== "string")
      throw new Error("Options must contain a body property");
    if (typeof opts.heading !== "string")
      throw new Error("Options must contain a heading property");
  }
  return {
    yesNo: (opts) => {
      baseCheck(opts);
      return new Promise((resolve) => {
        const event = new CustomEvent("add-prompt", {
          detail: {
            id: Math.random().toString(36).substr(2, 9),
            type: "yesNo",
            yesText: opts.yesText || "Yes",
            noText: opts.noText || "No",
            cb: resolve
          }
        });
        document.dispatchEvent(event);
      });
    },
    alert: (opts) => {
      baseCheck(opts);
      return new Promise((resolve) => {
        const event = new CustomEvent("add-prompt", {
          detail: {
            id: Math.random().toString(36).substr(2, 9),
            type: "alert",
            btnText: opts.btnText || "Okay",
            cb: resolve
          }
        });
        document.dispatchEvent(event);
      });
    },
    actions: (opts) => {
      if (typeof opts !== "object")
        throw new Error("Options must be an Object");
      if (!Array.isArray(opts.actions))
        throw new Error("Actions must be an array");
      if (opts.actions.length === 0)
        throw new Error("Options must contain at least one item");
      return new Promise((resolve) => {
        const event = new CustomEvent("add-prompt", {
          detail: {
            id: Math.random().toString(36).substr(2, 9),
            type: "actions",
            heading: opts.heading || "Select an option",
            actions: opts.actions,
            cb: resolve
          }
        });
        document.dispatchEvent(event);
      });
    }
  };
};
