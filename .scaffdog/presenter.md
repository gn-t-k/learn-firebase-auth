---
name: 'presenter'
root: 'src/component/presenter'
output: '*'
ignore: ['src/component/presenter']
questions:
  component: 'Please enter component name.'
---

# `{{ inputs.component | kebab }}/index.tsx`

```tsx
import styles from "./index.module.css";

type Props = {
}

export const {{ inputs.component | pascal }} = ({}: Props): JSX.Element => {
  return <p className={styles['sample-text']}>example</p>
}

```

# `{{ inputs.component | kebab }}/index.module.css`

```css
.sample-text {
  color: black;
}

```

# `{{ inputs.component | kebab }}/index.stories.tsx`

```tsx
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { {{ inputs.component | pascal }} } from ".";

export default {
  title: "{{output.dir | replace "src\/component\/presenter\/" ""}}",
  component: {{ inputs.component | pascal }},
} as ComponentMeta<typeof {{ inputs.component | pascal }}>;

const TemplateStory: ComponentStory<typeof {{ inputs.component | pascal }}> = (props) => <{{ inputs.component | pascal }} {...props} />;

export const Default = TemplateStory.bind({});
Default.args = {
};
```
