import * as UI from "../../src/index";

import { action } from "@storybook/addon-actions";

export default {
  title: "Events",
};

export const OpenHrefInOutlineMode = {
  render: () => {
    document.outlineManager = {
      GotoSubject: action("go to subject"),
    };

    const anchor = document.createElement("a");
    anchor.setAttribute("href", "http://example.com");

    anchor.onclick = (e) => {
      UI.widgets.openHrefInOutlineMode(e);
      return false;
    };

    anchor.appendChild(document.createTextNode("click me"));
    return anchor;
  },

  name: "openHrefInOutlineMode",
};
