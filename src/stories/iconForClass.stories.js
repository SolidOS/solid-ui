import * as UI from "../../src/index";

const iconDecorator = (Story) => {
  const items = Story();
  const lines = items.map(
    ({ className, icon }) =>
      `<tr><td>${className}</td><td>${icon}</td><td><img src="${UI.icons.iconBase}${icon}" style="width:20px; height:20px;" /></td></tr>`,
  );
  return `<table><th>className</th><th>icon</th><th>Preview</th>
            ${lines.join("")}
          </table>`;
};

export default {
  title: "iconForClass",
};

export const ForSolidAppProviderClass = {
  render: () =>
    Object.keys(UI.widgets.iconForClass).map((className) => {
      const icon = UI.widgets.iconForClass[className];

      return {
        className,
        icon,
      };
    }),

  name: "for solid:AppProviderClass",
  decorators: [iconDecorator],
};
