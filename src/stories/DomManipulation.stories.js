import * as UI from "../../src/index";

export default {
  title: "DOM manipulation",
};

export const AddStyleSheet = {
  render: () => {
    UI.widgets.addStyleSheet(
      document,
      "https://linkeddata.github.io/tabulator-firefox/content/tabbedtab.css",
    );
  },

  name: "addStyleSheet",
  withSource: "open",

  decorators: [
    (Story) => {
      Story();
      const html = document.querySelector("link").outerHTML;
      const pre = document.createElement("pre");
      const text = document.createTextNode(html);
      pre.appendChild(text);
      return pre;
    },
  ],
};

export const ClearElement = {
  render: () => {
    let counter = 0;
    const div = document.createElement("p");

    setInterval(() => {
      if (counter++ % 2 === 0) {
        const text = document.createTextNode("Now you see me");
        div.appendChild(text);
      } else {
        UI.widgets.clearElement(div);
      }
    }, 1000);

    return div;
  },

  name: "clearElement",
};

export const RefreshTree = {
  render: () => {
    setInterval(() => {
      UI.widgets.refreshTree(document.body);
    }, 1000);

    const refreshable = document.createElement("p");

    refreshable.refresh = () => {
      refreshable.innerText = new Date().getTime();
    };

    return refreshable;
  },

  name: "refreshTree",
};
