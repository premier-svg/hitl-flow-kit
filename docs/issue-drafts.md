# Issue Drafts

Create these after the repository is public.

## Good First Issues

### 1. Add a release checklist workflow example

Labels: `good first issue`, `example`, `docs`

```md
Add a new public-safe workflow example for release checklists.

Suggested path:

- `examples/release-checklist-workflow/workflow.json`

The workflow should include:

- a manual release trigger
- a task step for checking tests
- an approval step for maintainer review
- a mock adapter call for creating a release note
- a notify step for writing the audit log

Keep all data fictional and make sure `npm run validate` passes.
```

### 2. Add a sample audit log fixture

Labels: `good first issue`, `example`, `runner`

~~~md
Add a committed sample output from the local runner.

Suggested path:

- `sample-data/audit-log.issue-triage.json`

Run:

```bash
npm run run:issue
```

Then trim the output into a stable fixture that can be referenced from the README.
~~~

### 3. Improve validation error messages

Labels: `good first issue`, `runner`, `schema`

```md
Improve validation messages so they are easier to act on.

Focus on:

- missing dependency errors
- duplicate step id errors
- approval steps missing role or prompt
- adapter steps missing name or action

Add or update tests in `tests/runner.test.mjs`.
```

### 4. Document the mock adapter contract

Labels: `good first issue`, `adapter`, `docs`

```md
Expand `adapters/mock/README.md` with a small adapter contract.

Include:

- required adapter fields
- how adapter inputs are represented
- why examples should use mock adapters by default
- what real adapters must document before being added
```

### 5. Add a Mermaid architecture diagram

Labels: `good first issue`, `docs`

```md
Add a Mermaid diagram to `docs/architecture.md`.

The diagram should show:

- workflow JSON
- validator
- runner
- approval step
- mock adapter
- audit log
```

## Help Wanted Issues

### 1. Build a GitHub Issues adapter prototype

Labels: `help wanted`, `adapter`

```md
Prototype a GitHub Issues adapter behind explicit configuration.

Important constraints:

- no credentials committed
- mock adapter remains the default
- adapter must be disabled unless explicitly configured
- tests should not call the GitHub API

Start by proposing the adapter interface before implementation.
```

### 2. Generate a canvas preview from workflow JSON

Labels: `help wanted`, `canvas`

```md
Replace or supplement the static canvas preview with a generated preview from workflow JSON.

The first version can be dependency-free and local-only.

Success criteria:

- reads one example workflow
- displays steps in dependency order
- shows approval and adapter steps clearly
- does not call external services
```

### 3. Add workflow validation fixtures

Labels: `help wanted`, `schema`, `runner`

```md
Add fixture-based tests for valid and invalid workflows.

Suggested paths:

- `tests/fixtures/valid/`
- `tests/fixtures/invalid/`

Cover:

- duplicate ids
- missing dependencies
- cycles
- invalid step types
- approval steps missing required fields
- adapter calls missing required fields
```
