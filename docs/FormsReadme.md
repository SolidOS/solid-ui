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
If you're asking yourself how Forms fit into the Solid ecosystem, head over to [form-ecosystem](./form-ecosystem.html).

Sir Tim Berners-Lee gave a talk about Forms to the SolidOS team end of 2021. His slides are online [here](./talks/FormsTalk.html), while a recording of the talk is on the [SolidOS pod](https://solidos.solidcommunity.net/public/SolidOS%20team%20meetings/SolidOS_team_videos.html).


## Creating your own Form using Turtle

In the [form-playground](https://solidos.github.io/form-playground/playground.html) (code [here](https://github.com/SolidOS/form-playground)), you can create your own Form to render a frontend for some given Turtle. 

## Code examples

To make use of Forms, you need to use solid-ui. Head over to the [solid-ui readme](https://github.com/SolidOS/solid-ui/blob/main/README.md#getting-started) for some how-to guides on how to use it in `npm` or as a `html <script>`.

Once you are set up with the code, take a look at some examples over at [solid-ui/docs](<https://github.com/SolidOS/solid-ui/tree/main/docs>). The examples there are also deployed on Git Pages:

- [Basic Form Demo](https://solidos.github.io/solid-ui/docs/form-examples/demo.html)
- [WebID profile Demo](https://solidos.github.io/solid-ui/docs/form-examples/profile-demo.html)
- [ui:Form and ui:Group examples](https://solidos.github.io/solid-ui/docs/form-examples/structures.html)
- [ui:Classifier and ui:Options example](https://solidos.github.io/solid-ui/docs/form-examples/structures2.html)
- [ui:Choice example](https://solidos.github.io/solid-ui/docs/form-examples/structures3.html)
- if you want, you can try to wrap your head around [a rendering of the entire UI vocabulary](https://solidos.github.io/solid-ui/docs/form-examples/edit-form-form.html) _(Scroll to the far right if all you see is a column or two of plain text...)_

Most interesting may be how it is all wired together in the [test-form.js](https://github.com/SolidOS/solid-ui/blob/main/docs/form-examples/test-form.js), while the code for the form itself is mostly under [solid-ui/src/widgets/forms.js](https://github.com/SolidOS/solid-ui/blob/main/src/widgets/forms.js).

## Running or testing it locally

Locally you can setup your own test of forms. All you need is the `/docs/form-examples` folders and the `test-form.js`.

1. First build solid-ui locally and copy it to `/docs/form-examples`
Run this instruction which will do all that for you.
```
npm run build-form-examples
```
2. Use the newly build solid-ui (called solid-ui.js) in your html.
You need to use the new build solid-ui.js:
* uncommenting the usage of the solid-ui.js script; Example [here](https://github.com/SolidOS/solid-ui/blob/4f620aea3e91daf5ce9591dd83d3c95c161a44ad/docs/form-examples/structures3.html#L21)
* commenting out the mashlib.js usage. Example [here](https://github.com/SolidOS/solid-ui/blob/4f620aea3e91daf5ce9591dd83d3c95c161a44ad/docs/form-examples/structures3.html#L15)

3. Use your own rad data and form
Switch out the `input` and `target` (form and raw data) links. Example [here](https://github.com/SolidOS/solid-ui/blob/4f620aea3e91daf5ce9591dd83d3c95c161a44ad/docs/form-examples/structures3.html#L56)

4. Run a local server
For example run `npx vite`in the `docs` folder and the navigate to something like: http://localhost:3000/form-examples/profile-demo.html

## Spin-offs & further examples

- [Jeff's solid-ui-components](https://github.com/jeff-zucker/solid-ui-components) is a different take on the UI vocabulary
- [Timea's Solid Hello Worlds](https://github.com/timea-solid/SolidHelloWorlds) is a demo implementing both Jeff's lib and solid-ui Forms in one demo
