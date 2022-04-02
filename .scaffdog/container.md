---
name: 'container'
root: 'src/component/container'
output: '.'
ignore: []
questions:
  component: 'Please enter component name.'
---

# `{{ inputs.component | kebab }}/index.tsx`

```tsx
type Props = {
}

export const {{ inputs.component | pascal }} = ({}: Props): JSX.Element => (
  <p>template</p>
)
```

# `{{ inputs.component | kebab }}/hooks/.gitkeep`

```git config
```
