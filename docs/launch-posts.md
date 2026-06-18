# Launch Post Drafts

Use these after the GitHub repository is public.

## X English

```text
I am open-sourcing HITL Flow Kit:

an open-source workflow canvas + runner for human-in-the-loop AI agent operations.

AI agents do not just need more autonomy.
They need approvals, audit logs, retries, handoffs, and clear ownership.

Repo: [GitHub URL]
```

## X Japanese

```text
AIエージェントを業務で安全に動かすためのOSSを作っています。

HITL Flow Kit は、
承認、監査ログ、リトライ、担当者引き継ぎを前提にした
human-in-the-loop 型のワークフロー基盤です。

GitHub: [GitHub URL]
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
```

## Show HN Draft

```text
Show HN: HITL Flow Kit - human-in-the-loop workflows for AI agents

I built an open-source workflow canvas and runner for AI agent operations.

The goal is to make approval gates, audit logs, retries, handoffs, and replaceable adapters part of the workflow definition instead of scattered across scripts and docs.

The first examples are issue triage, content review, and appointment coordination. The v0.1.0 release is intentionally local-only: no credentials, no production URLs, no background jobs, and no default network calls.

Repo: [GitHub URL]
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
```
