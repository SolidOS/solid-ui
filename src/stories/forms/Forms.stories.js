import * as UI from "../../../src/index";

export default {
  title: "Forms/appendForm",
};

export const TrivialCommentField = {
  render: () => {
    const container = document.createElement("div");
    const already = {};
    const subject = $rdf.namedNode("http://example.com/#subject");
    const form = $rdf.namedNode("http://example.com/#form");
    const doc = subject.doc();

    SolidLogic.store.add(
      $rdf.namedNode("http://example.com/#form"),
      UI.ns.rdf("type"),
      UI.ns.ui("Comment"),
    );

    SolidLogic.store.add(
      $rdf.namedNode("http://example.com/#form"),
      UI.ns.ui("contents"),
      "[a trivial form with just a comment]",
    );

    UI.widgets.appendForm(document, container, already, subject, form, doc);
    return container;
  },

  name: "trivial / Comment field",
};

export const Live = {
  render: () => {
    const container = document.createElement("div");
    const already = {};
    const subject = $rdf.namedNode(
      "https://michielbdejong.inrupt.net/profile/card#me",
    );
    const form = $rdf.namedNode(
      "https://timbl.com/timbl/Public/Test/Forms/individualForm.ttl#form1",
    );
    const doc = subject.doc();
    const loadProfile = SolidLogic.store.fetcher.load(doc);
    const loadForm = SolidLogic.store.fetcher.load(form.doc());

    Promise.all([loadProfile, loadForm]).then(() => {
      UI.widgets.appendForm(document, container, already, subject, form, doc);
    });

    return container;
  },

  name: "live",
};
