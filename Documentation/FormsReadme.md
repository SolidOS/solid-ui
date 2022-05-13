# Welcome to solidUI Forms

`Forms` are what we call the code part of solid-ui which takes the User Interface ontology at <http://www.w3.org/ns/ui> and makes it usable for developers. As its name suggests, `Forms` are used for rendering WebApp Frontend elements. For example, <http://www.w3.org/ns/ui#Choice> will translate to something like the following:
```
<div id=dropDownDiv>
    <div id=labelOfDropDown> </div>
    <div id=selectDiv>
        <select id=dropDownSelect>
            <option> ....
        </select>
    </div>
</div>
```

## A few starting points  

There are different documentation entry points for the topic.

To get you started with Forms, we have the [forms-intro](./forms-intro.html).
If you're asking yourself how Forms fit into the Soild ecosystem, head over to [form-ecosystem](./form-ecosystem.html).

Sir Tim Berners-Lee gave a talk about Forms to the SolidOS team some time ago. His slides are online [here](./talks/FormsTalk.html), while a recording of the talk is on the [SolidOS pod](https://solidos.solidcommunity.net/public/SolidOS%20team%20meetings/SolidOS_team_videos.html).


## Creating your own Form using Turtle

In the [form-playground](https://solidos.github.io/form-playground/playground.html) (code [here](https://github.com/SolidOS/form-playground)) you can create your own form to render a frontende for a given Turtle. 

## Code examples

To make use of Forms you need to use solid-ui. Head over at the [solid-ui readme](https://github.com/SolidOS/solid-ui/blob/main/README.md#getting-started) for how-tos.

One you are set up with the code, take a look at some example over at [solid-ui/Documentation](<https://github.com/SolidOS/solid-ui/tree/main/Documentation>). The examples there are also deployed on Git Pages:

- [Basic Form Demo](https://solidos.github.io/solid-ui/Documentation/form-examples/demo.html)
- [WebID profile Demo](https://solidos.github.io/solid-ui/Documentation/form-examples/profile-demo.html)
- [ui:Form and ui:Group examples](https://solidos.github.io/solid-ui/Documentation/form-examples/structures.html)
- [ui:Classifier and ui:Options example](https://solidos.github.io/solid-ui/Documentation/form-examples/structures2.html)
- [ui:Choice example](https://solidos.github.io/solid-ui/Documentation/form-examples/structures3.html)
- and you want to wrap your head around the entire UI vocabulary being rendered [here it is](https://solidos.github.io/solid-ui/Documentation/form-examples/edit-form-form.html)

Most interesting is maybe how it is all wired together in the [test-form.js](https://github.com/SolidOS/solid-ui/blob/main/Documentation/form-examples/test-form.js) while the code for the form itself is mostly under [solid-ui/src/widgets/forms.js](https://github.com/SolidOS/solid-ui/blob/main/src/widgets/forms.js).

## Spin-offs & further examples

- [Jeff's solid-ui-components](https://github.com/jeff-zucker/solid-ui-components) is a differnet take on the UI vocabulary
- [Timea's Solid Hello Worlds](https://github.com/timea-solid/SolidHelloWorlds) is a demo implementating both Jeff's lib and solid-ui Forms
