---
name: 'api'
root: 'src/api'
output: '*'
ignore: []
questions:
  api: 'Please enter api name.'
---

# `{{ inputs.api | kebab }}/request.ts`

```ts
export type {{ inputs.api | pascal }}Request = {};
```

# `{{ inputs.api | kebab }}/response.ts`

```ts
export type {{ inputs.api | pascal }}Response = {};

// After define response type, generate type-guard by next command.
// `yarn type-guard -f src/api/{{ inputs.api | kebab }}/response.ts -o src/api/{{ inputs.api | kebab }}/is-{{ inputs.api | kebab }}-response.ts`
```

# `{{ inputs.api | kebab }}/index.interface.ts`

```ts
import { {{ inputs.api | pascal }}Request } from "./request";
import { {{ inputs.api | pascal }}Response } from "./response"

export type I{{ inputs.api | pascal }} = (request: {{ inputs.api | pascal }}Request) => Promise<{{ inputs.api | pascal }}Response>
```
