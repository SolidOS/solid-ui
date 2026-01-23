import * as UI from "../../src/index";

import { action } from "@storybook/addon-actions";

export default {
  title: "Interactive",
};

export const AskName = {
  render: () => {
    const div = document.createElement("div");
    UI.widgets
      .askName(document, SolidLogic.store, div)
      .then((name) => window.alert(`You picked "${name}"`));
    return div;
  },

  name: "Ask name",
};

export const AttachmentList = {
  render: () => {
    const div = document.createElement("div");

    SolidLogic.store.add(
      $rdf.namedNode(
        "https://example-user.inrupt.net/public/some-message.ttl#this",
      ),
      UI.ns.wf("attachment"),
      $rdf.namedNode("http://example.com/#some-attachment"),
    );

    UI.widgets.attachmentList(
      document,
      $rdf.namedNode(
        "https://example-user.inrupt.net/public/some-message.ttl" + "#this",
      ),
      div,
    );

    return div;
  },

  name: "Attachment list",
};

export const PersonTr = {
  render: () => {
    const michiel = $rdf.namedNode(
      "https://michielbdejong.inrupt.net/profile/card#me",
    );
    return UI.widgets.personTR(document, null, michiel);
  },

  name: "Person TR",
};

export const RenderAsDiv = {
  render: () => {
    const michiel = $rdf.namedNode(
      "https://michielbdejong.inrupt.net/profile/card#me",
    );

    const options = {
      wrapInATR: true,
    };

    return UI.widgets.renderAsDiv(document, michiel, options);
  },

  name: "Render As DIV",
};

export const SelectorPanel = {
  render: () => {
    const kb = $rdf.graph();
    const type = $rdf.namedNode("http://example.com/#type");
    const predicate = $rdf.namedNode("http://example.com/#pred");
    const inverse = false;

    const possible = [
      $rdf.namedNode("http://example.com/#blue"),
      $rdf.namedNode("http://example.com/#green"),
      $rdf.namedNode("http://example.com/#yellow"),
    ];

    const options = {};

    return UI.widgets.selectorPanel(
      document,
      kb,
      type,
      predicate,
      inverse,
      possible,
      options,
      action("selection"),
      action("link clicked"),
    );
  },

  name: "selectorPanel",
};

export const SelectorPanelRefresh = {
  render: () => {
    const list = document.createElement("div");
    const kb = $rdf.graph();
    const type = $rdf.namedNode("http://example.com/#type");
    const predicate = $rdf.namedNode("http://example.com/#pred");
    const inverse = false;

    const possible = [
      $rdf.namedNode("http://example.com/#blue"),
      $rdf.namedNode("http://example.com/#green"),
      $rdf.namedNode("http://example.com/#yellow"),
    ];

    const options = {};

    return UI.widgets.selectorPanelRefresh(
      list,
      document,
      kb,
      type,
      predicate,
      inverse,
      possible,
      options,
      action("selection"),
      action("link clicked"),
    );
  },

  name: "selectorPanelRefresh",
};
