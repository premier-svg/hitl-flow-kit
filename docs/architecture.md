# Architecture

HITL Flow Kit has three small parts in `v0.1.0`.

## System Control Flow

This diagram maps how a workflow definition moves through the validation phase, is processed by the local runner (handling automated tasks and human approvals), and outputs an audit log.

```mermaid
graph TD
    %% Styling
    classDef file fill:#f9f2f4,stroke:#c7254e,stroke-width:1px;
    classDef engine fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef human fill:#fff3e0,stroke:#f57c00,stroke-width:2px;
    
    subgraph Input Phase
        JSON[Workflow Definition JSON]:::file --> Val[Schema Validator]
    end

    subgraph Core Execution Runner
        Val --> |Valid| DAG[Dependency Graph & Cycle Detector]:::engine
        DAG --> Exec[Execution Engine]:::engine
        
        Exec --> StepType{Evaluate Step Type}
        StepType -->|Type: Task| Mock[Mock Adapter Execution]
        StepType -->|Type: Approval| Pause[Pause for Human Approval]:::human
    end

    subgraph Output & Visualization
        Mock --> Audit[Audit Log Builder]
        Pause --> |Approved/Rejected| Audit
        Audit --> OutLog[audit-log.json]:::file
        
        JSON -.-> |Parsed by| UI[Static HTML Canvas Preview]
    end
```

## 1. Workflow Schema

Workflows describe operations as ordered steps with explicit dependencies.

Step types:

- `task`: local reasoning or transformation
- `approval`: pause for human review
- `adapter_call`: call a replaceable service adapter
- `wait`: represent a timed or external wait
- `notify`: record or send a notification

## 2. Local Runner

The runner:

1. Loads a workflow JSON file
2. Validates required fields
3. Checks dependency references
4. Detects cycles
5. Produces an execution order
6. Simulates each step
7. Returns an audit log

The runner does not call external services in `v0.1.0`.

## 3. Canvas Preview

The static canvas preview shows how a workflow can be represented visually. It is intentionally local and dependency-free.

## Adapter Boundary

Adapters should be thin wrappers around external systems. A workflow should remain understandable without knowing the adapter implementation.

The mock adapter is the only adapter included in `v0.1.0`.