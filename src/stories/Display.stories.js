import * as UI from "../../src/index";

export default {
  title: "Display",
};

export const Complain = {
  render: () => {
    const div = document.createElement("div");

    UI.widgets.complain(
      {
        div,
        dom: document,
      },
      "not good!",
    );

    return div;
  },

  name: "complain",
};

export const ErrorMessageBlock = {
  render: () => {
    return UI.widgets.errorMessageBlock(document, "my error message", "#f0f");
  },

  name: "errorMessageBlock",
};

export const SetName = {
  render: () => {
    const div = document.createElement("div");
    const jane = $rdf.namedNode("https://jane.example/person/card#me");
    SolidLogic.store.add(jane, UI.ns.foaf("name"), "Jane Doe");
    UI.widgets.setName(div, jane);
    return div;
  },

  name: "setName",
};
