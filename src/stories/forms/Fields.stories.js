import * as UI from "../../../src/index";

import { action } from "@storybook/addon-actions";

export default {
  title: "Forms/fields",
};

export const BasicFields = {
  // FIXME: https://github.com/solidos/solid-ui/issues/239
  render: () => {
    const container = document.createElement("div");
    const already = {};
    const subject = $rdf.namedNode("http://example.com/#this");
    const form = $rdf.namedNode("http://example.com/#form");
    const doc = $rdf.namedNode("http://example.com/");

    const callbackFunction = (ok, errorMessage) => {
      console.log(
        ok,
        errorMessage,
        document.getElementById("div-basicField").innerHTML,
      );
    };

    SolidLogic.store.add(
      form,
      UI.ns.ui("property"),
      $rdf.namedNode("http://example.com/#some-property"),
      doc,
    );

    document.outlineManager = {
      appendPropertyTRs: () => {},
    };

    [
      "PhoneField",
      "EmailField",
      "ColorField",
      "DateField",
      "DateTimeField",
      "TimeField",
      "NumericField",
      "IntegerField",
      "DecimalField",
      "FloatField",
      "TextField",
      "SingleLineTextField",
      "NamedNodeURIField",
    ].forEach((fieldName) => {
      UI.widgets.field[UI.ns.ui(fieldName).uri](
        document,
        container,
        already,
        subject,
        form,
        doc,
        callbackFunction,
      );
    });

    return container;
  },

  name: "basic fields",
};

export const FormGroupNoAlready = {
  // FIXME: https://github.com/solidos/solid-ui/issues/239
  render: () => {
    const container = document.createElement("div");
    const already = {};
    const subject = $rdf.namedNode("http://example.com/#this");
    const form = $rdf.namedNode("http://example.com/#form");
    const store = $rdf.namedNode("http://example.com/#store");

    SolidLogic.store.add(
      form,
      UI.ns.ui("parts"),
      new $rdf.Collection([
        $rdf.namedNode("http://example.com/#part1"),
        $rdf.namedNode("http://example.com/#part2"),
      ]),
      $rdf.namedNode("http://example.com/"),
    );

    SolidLogic.store.add(
      $rdf.namedNode("http://example.com/#part1"),
      UI.ns.rdf("type"),
      UI.ns.ui("Comment"),
    );

    SolidLogic.store.add(
      $rdf.namedNode("http://example.com/#part1"),
      UI.ns.ui("contents"),
      "[this is part 1 of the form]",
    );

    SolidLogic.store.add(
      $rdf.namedNode("http://example.com/#part2"),
      UI.ns.rdf("type"),
      UI.ns.ui("Comment"),
    );

    SolidLogic.store.add(
      $rdf.namedNode("http://example.com/#part2"),
      UI.ns.ui("contents"),
      "[this is part 2 of the form]",
    );

    document.outlineManager = {
      appendPropertyTRs: () => {},
    };

    UI.widgets.field[UI.ns.ui("Form").uri](
      document,
      container,
      already,
      subject,
      form,
      store,
      action("callback"),
    );
    return container;
  },

  name: "form / group, no already",
};

export const FormGroupWithAlready = {
  // FIXME: https://github.com/solidos/solid-ui/issues/239
  render: () => {
    const container = document.createElement("div");
    const subject = $rdf.namedNode("http://example.com/#this");
    const form = $rdf.namedNode("http://example.com/#form");
    const store = $rdf.namedNode("http://example.com/#store");
    const key = subject.toNT() + "|" + form.toNT();

    const already = {
      [key]: true,
    };

    document.outlineManager = {
      appendPropertyTRs: () => {},
    };

    UI.widgets.field[UI.ns.ui("Group").uri](
      document,
      container,
      already,
      subject,
      form,
      store,
      action("callback"),
    );
    return container;
  },

  name: "form / group, with already",
};
