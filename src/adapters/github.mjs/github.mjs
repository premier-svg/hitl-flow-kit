/**
 * GitHub Issues Mock Adapter Prototype
 * * Architecture: Uses an action dictionary (Command Pattern) for scalable routing.
 * This allows O(1) action lookups and keeps the execute function clean.
 */

// 1. Define individual action handlers in a dictionary
const actionHandlers = {
  
  add_labels: (params) => {
    if (!params?.issue_number || !params?.labels) {
      throw new Error("Missing required params: 'issue_number' and 'labels'");
    }
    return {
      success: true,
      message: `Simulated adding labels [${params.labels.join(", ")}] to Issue #${params.issue_number}`,
      data: {
        issue_number: params.issue_number,
        labels_applied: params.labels,
        simulated: true
      }
    };
  },

  create_comment: (params) => {
    if (!params?.issue_number || !params?.body) {
      throw new Error("Missing required params: 'issue_number' and 'body'");
    }
    return {
      success: true,
      message: `Simulated commenting on Issue #${params.issue_number}`,
      data: {
        comment_id: `mock-comment-${Math.floor(Math.random() * 10000)}`,
        simulated: true
      }
    };
  }
};

// 2. The core execution router
export async function execute(action, params) {
  console.log(`\n[Adapter: GitHub] Executing action: '${action}'`);

  const handler = actionHandlers[action];
  
  if (!handler) {
    throw new Error(`[Adapter: GitHub] Unsupported action: '${action}'`);
  }

  // Execute the mapped function
  return handler(params);
}