import * as UI from "../../src/index";

const buttonDecorator = (Story, { args }) => {
  const button = document.createElement("button");
  button.innerText = args.buttonLabel;
  button.addEventListener("click", () => Story());
  return button;
};

export default {
  title: "Log",
};

export const SimpleMessage = {
  render: () => UI.log.msg("A simple message"),
  name: "simple message",
  decorators: [buttonDecorator],

  args: {
    buttonLabel: "Add a message",
  },
};

export const WarningMessage = {
  render: () => UI.log.warn("A warning message"),
  name: "warning message",
  decorators: [buttonDecorator],

  args: {
    buttonLabel: "Add a warning",
  },
};

export const DebugMessage = {
  render: () => UI.log.debug("A debugging message"),
  name: "debug message",
  decorators: [buttonDecorator],

  args: {
    buttonLabel: "Add a debugging message",
  },
};

export const InfoMessage = {
  render: () => UI.log.info("An info message"),
  name: "info message",
  decorators: [buttonDecorator],

  args: {
    buttonLabel: "Add an info message",
  },
};

export const ErrorMessage = {
  render: () => UI.log.error("An error message"),
  name: "error message",
  decorators: [buttonDecorator],

  args: {
    buttonLabel: "Add an error message",
  },
};

export const SuccessMessage = {
  render: () => UI.log.success("A success message"),
  name: "success message",
  decorators: [buttonDecorator],

  args: {
    buttonLabel: "Add a success message",
  },
};

export const AlertMessage = {
  render: () => UI.log.alert("An alert message"),
  name: "alert message",
  decorators: [buttonDecorator],

  args: {
    buttonLabel: "Trigger an alert message",
  },
};

export const ClearMessages = {
  render: () => UI.log.clear(),
  name: "clear messages",
  decorators: [buttonDecorator],

  args: {
    buttonLabel: "Clear status area",
  },
};

export const SetLevel = {
  render: () => {
    const div = document.createElement("div");
    const input = document.createElement("input");
    input.type = "text";
    input.inputmode = "numeric";
    input.pattern = "[0-9]*";
    input.value = 7;
    div.appendChild(input);
    const button = document.createElement("button");
    button.innerText = "Set level";
    button.addEventListener("click", () =>
      UI.log.setLevel(parseInt(input.value, 10)),
    );
    div.appendChild(button);
    return div;
  },

  name: "set level",
};

export const DumpHtml = {
  render: () => UI.log.dumpHTML(),
  name: "dump html",
  decorators: [buttonDecorator],

  args: {
    buttonLabel: "Dump HTML",
  },
};

export const LogAscending = {
  render: () => UI.log.logAscending(),
  name: "log ascending",
  decorators: [buttonDecorator],

  args: {
    buttonLabel: "Log ascending",
  },
};

export const LogDescending = {
  render: () => UI.log.logDescending(),
  name: "log descending",
  decorators: [buttonDecorator],

  args: {
    buttonLabel: "Log descending",
  },
};
