import * as UI from "../../../src/index";

import { action } from "@storybook/addon-actions";

export default {
  title: "Forms/Options",
};

export const UsingRdfTypes = {
  /* UI to display in case subject is a house: */
  render:
    /* UI to display in case subject is a cow: */
    // Subject is a cow, so it should display [UI for cows]
    // FIXME: https://github.com/solidos/solid-ui/issues/239
    () => {
      const container = document.createElement("div");
      const already = {};
      const subject = $rdf.namedNode("http://first.example/#this");
      const exampleOptionsField = $rdf.namedNode(
        "http://first.example/#exampleOptionsField",
      );
      const store = $rdf.namedNode("http://first.example/#store");

      SolidLogic.store.add(
        exampleOptionsField,
        UI.ns.ui("case"),
        $rdf.namedNode("http://first.example/#if-subject-is-house"),
        $rdf.namedNode("http://first.example/"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://first.example/#if-subject-is-house"),
        UI.ns.ui("for"),
        $rdf.namedNode("http://first.example/#house"),
        $rdf.namedNode("http://first.example/"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://first.example/#if-subject-is-house"),
        UI.ns.ui("use"),
        $rdf.namedNode("http://first.example/#number-of-bedrooms"),
        $rdf.namedNode("http://first.example/"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://first.example/#number-of-bedrooms"),
        UI.ns.rdf("type"),
        UI.ns.ui("Comment"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://first.example/#number-of-bedrooms"),
        UI.ns.ui("contents"),
        "[UI for houses]",
      );

      SolidLogic.store.add(
        exampleOptionsField,
        UI.ns.ui("case"),
        $rdf.namedNode("http://first.example/#if-subject-is-cow"),
        $rdf.namedNode("http://first.example/"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://first.example/#if-subject-is-cow"),
        UI.ns.ui("for"),
        $rdf.namedNode("http://first.example/#cow"),
        $rdf.namedNode("http://first.example/"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://first.example/#if-subject-is-cow"),
        UI.ns.ui("use"),
        $rdf.namedNode("http://first.example/#number-of-legs"),
        $rdf.namedNode("http://first.example/"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://first.example/#number-of-legs"),
        UI.ns.rdf("type"),
        UI.ns.ui("Comment"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://first.example/#number-of-legs"),
        UI.ns.ui("contents"),
        "[UI for cows]",
      );

      SolidLogic.store.add(
        subject,
        UI.ns.rdf("type"),
        $rdf.namedNode("http://first.example/#cow"),
        $rdf.namedNode("http://first.example/"),
      );

      document.outlineManager = {
        appendPropertyTRs: () => {},
      };

      UI.widgets.field[UI.ns.ui("Options").uri](
        document,
        container,
        already,
        subject,
        exampleOptionsField,
        store,
        action("callback"),
      );

      return container;
    },

  name: "using RDF types",
};

export const DependingOn = {
  /* This form depends on persona: */
  render:
    /* UI to display in case subject is developer: */
    /* UI to display in case subject is power user: */
    /* Subject is both a developer and a power user, so it should display both [UI for developers] and [UI for
         power users] */
    // FIXME: https://github.com/solidos/solid-ui/issues/239
    () => {
      const container = document.createElement("div");
      const already = {};
      const subject = $rdf.namedNode("http://second.example/#this");
      const exampleOptionsField = $rdf.namedNode(
        "http://second.example/#exampleOptionsField",
      );
      const store = $rdf.namedNode("http://second.example/#store");

      SolidLogic.store.add(
        exampleOptionsField,
        UI.ns.ui("dependingOn"),
        $rdf.namedNode("http://second.example/#persona"),
        $rdf.namedNode("http://second.example/"),
      );

      SolidLogic.store.add(
        exampleOptionsField,
        UI.ns.ui("case"),
        $rdf.namedNode("http://second.example/#if-subject-is-developer"),
        $rdf.namedNode("http://second.example/"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://second.example/#if-subject-is-developer"),
        UI.ns.ui("for"),
        $rdf.namedNode("http://second.example/#developer"),
        $rdf.namedNode("http://second.example/"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://second.example/#if-subject-is-developer"),
        UI.ns.ui("use"),
        $rdf.namedNode("http://second.example/#ui-for-developers"),
        $rdf.namedNode("http://second.example/"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://second.example/#ui-for-developers"),
        UI.ns.rdf("type"),
        UI.ns.ui("Comment"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://second.example/#ui-for-developers"),
        UI.ns.ui("contents"),
        "[UI for developers]",
      );

      SolidLogic.store.add(
        exampleOptionsField,
        UI.ns.ui("case"),
        $rdf.namedNode("http://second.example/#if-subject-is-power-user"),
        $rdf.namedNode("http://second.example/"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://second.example/#if-subject-is-power-user"),
        UI.ns.ui("for"),
        $rdf.namedNode("http://second.example/#power-user"),
        $rdf.namedNode("http://second.example/"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://second.example/#if-subject-is-power-user"),
        UI.ns.ui("use"),
        $rdf.namedNode("http://second.example/#ui-for-power-users"),
        $rdf.namedNode("http://second.example/"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://second.example/#ui-for-power-users"),
        UI.ns.rdf("type"),
        UI.ns.ui("Comment"),
      );

      SolidLogic.store.add(
        $rdf.namedNode("http://second.example/#ui-for-power-users"),
        UI.ns.ui("contents"),
        "[UI for power users]",
      );

      SolidLogic.store.add(
        subject,
        $rdf.namedNode("http://second.example/#persona"),
        $rdf.namedNode("http://second.example/#developer"),
        $rdf.namedNode("http://second.example/"),
      );

      SolidLogic.store.add(
        subject,
        $rdf.namedNode("http://second.example/#persona"),
        $rdf.namedNode("http://second.example/#power-user"),
        $rdf.namedNode("http://second.example/"),
      );

      document.outlineManager = {
        appendPropertyTRs: () => {},
      };

      UI.widgets.field[UI.ns.ui("Options").uri](
        document,
        container,
        already,
        subject,
        exampleOptionsField,
        store,
        action("callback"),
      );

      return container;
    },

  name: "depending on",
};
