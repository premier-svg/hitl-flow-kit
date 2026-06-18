# Launch Post Drafts

Use these after the GitHub repository is public.

Repository:

```text
https://github.com/premier-svg/hitl-flow-kit
```

Release:

```text
https://github.com/premier-svg/hitl-flow-kit/releases/tag/v0.1.0
```

## X English

```text
I just published HITL Flow Kit:

an open-source workflow canvas + runner for human-in-the-loop AI agent operations.

AI agents do not just need more autonomy.
They need approvals, audit logs, retries, handoffs, and clear ownership.

Repo: https://github.com/premier-svg/hitl-flow-kit
```

## X Japanese

```text
AIエージェントを業務で安全に動かすためのOSSを公開しました。

HITL Flow Kit は、
承認、監査ログ、リトライ、担当者引き継ぎを前提にした
human-in-the-loop 型のワークフロー基盤です。

GitHub: https://github.com/premier-svg/hitl-flow-kit
```

## Why I Built This

```text
AI agents often fail in production for boring reasons:

- no approval gates
- no audit logs
- unclear ownership
- unsafe retries
- no handoff path when automation gets stuck

HITL Flow Kit is my attempt to make these operational patterns reusable.

https://github.com/premier-svg/hitl-flow-kit
```

## Show HN Draft

```text
Show HN: HITL Flow Kit - human-in-the-loop workflows for AI agents

I built an open-source workflow canvas and runner for AI agent operations.

The goal is to make approval gates, audit logs, retries, handoffs, and replaceable adapters part of the workflow definition instead of scattered across scripts and docs.

The first examples are issue triage, content review, and appointment coordination. The v0.1.0 release is intentionally local-only: no credentials, no production URLs, no background jobs, and no default network calls.

Repo: https://github.com/premier-svg/hitl-flow-kit
```

## X Follow-up: Issue Triage

```text
One example in HITL Flow Kit is issue triage:

1. classify the issue
2. check reproduction details
3. pause for maintainer approval
4. simulate label application
5. write an audit log

The point is not "let the agent do everything."
The point is keeping maintainer actions reviewable.

https://github.com/premier-svg/hitl-flow-kit
```

## X Follow-up: Local-first Safety

```text
v0.1.0 of HITL Flow Kit is intentionally local-only:

- no credentials
- no production URLs
- no background jobs
- no default network calls
- mock adapters only

I want the workflow primitives to be safe and reviewable before adding real integrations.

https://github.com/premier-svg/hitl-flow-kit
```

## X Follow-up: Contribution Ask

```text
HITL Flow Kit has a few starter issues open:

- release checklist workflow
- sample audit log fixture
- validation error improvements
- mock adapter contract
- generated canvas preview

Good fit if you care about AI agent workflows, approvals, and auditability.

https://github.com/premier-svg/hitl-flow-kit/issues
```

## Zenn / Note Outline

```md
# AIエージェント運用に必要なのは「もっと自律」だけではなかった

## 背景

AIエージェントを業務に入れると、モデル性能よりも運用の穴で止まることが多い。

## よくある穴

- 誰が承認したか分からない
- 何がリトライされたか分からない
- 失敗時に誰へ渡すか決まっていない
- runbook と実装がズレる

## 作ったもの

HITL Flow Kit:

- workflow schema
- local runner
- approval step
- mock adapter
- audit log
- public-safe examples

## 今後

- GitHub Issues adapter
- canvas preview generation
- validation fixtures
- release checklist workflow

## URL

https://github.com/premier-svg/hitl-flow-kit
```
