import * as UI from "../../src/index";

import { action } from "@storybook/addon-actions";

export default {
  title: "Drag & Drop",
};

export const Draggable = {
  render: () => {
    const dragElement = document.createElement("div");
    dragElement.appendChild(document.createTextNode("Drag me to the target!"));
    const uri = new $rdf.NamedNode("https://exampleuser.inrupt.net");
    UI.widgets.makeDraggable(dragElement, uri);
    return dragElement;
  },

  name: "Draggable",
};

export const DropTarget = {
  render: () => {
    const target = document.createElement("div");
    target.style =
      "padding: 1em; text-align:center; border: 1px solid black; width: 100px; height: 100px";
    target.appendChild(
      document.createTextNode("Drop things (URIs, files, ...) here"),
    );
    UI.widgets.makeDropTarget(
      target,
      action("dropped uri"),
      action("dropped file"),
    );
    return target;
  },

  name: "Drop Target",
};

export const UploadFiles = {
  render: ({ fileBase, pictureBase }) => {
    const target = document.createElement("div");
    target.style =
      "padding: 1em; text-align:center; border: 1px solid black; width: 100px; height: 100px";
    target.appendChild(
      document.createTextNode("Drop a file (document, picture, ...) here"),
    );

    UI.widgets.makeDropTarget(target, action("dropped uri"), (files) => {
      UI.widgets.uploadFiles(
        SolidLogic.store.fetcher,
        files,
        fileBase,
        pictureBase,
        action("file uploaded successfully"),
      );
    });

    return target;
  },

  name: "Upload Files",

  args: {
    fileBase: "https://pod.example/Files",
    pictureBase: "https://pod.example/Pictures",
  },
};
