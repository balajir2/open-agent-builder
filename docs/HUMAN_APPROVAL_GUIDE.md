# Human Approval Flow Guide

This guide explains how to use the Human Approval feature in Open Agent Builder. It is designed for both **Workflow Builders** (who set up the approvals) and **Approvers** (who review and approve/reject requests).

## 1. What is Human Approval?

The Human Approval flow allows a workflow to pause its execution and wait for a human to review data, make a decision, and then explicitly allow the workflow to proceed or stop it.

**Common Use Cases:**
*   **Quality Control:** Reviewing AI-generated content before it is published or sent.
*   **Budget Oversight:** Approving expensive API calls or resource usage.
*   **Critical Decisions:** Making a "go/no-go" decision based on gathered intelligence.
*   **Safety:** Ensuring sensitive actions (like deleting data) have human confirmation.

---

## 2. For Workflow Builders: Setting Up an Approval Step

As a workflow builder, you decide *when* input is needed and *what* information the approver needs to see.

### Step 1: Add the Node
1.  Open your workflow in the **Workflow Builder**.
2.  Locate the **User Approval** node in the node palette (left sidebar).
3.  Drag and drop the node onto the canvas at the point where you want the pause to occur.

### Step 2: Configure the Node
Click on the **User Approval** node to configure it in the right panel:

*   **Label:** Give the node a descriptive name (e.g., "Review Draft Email").
*   **Message:** Write a clear instruction for the approver.
    *   *Example:* "Please review the generated bio. If it looks accurate, approve to send it to the database."
*   **Data to Review:** You can include dynamic variables in your message using `{{variable_name}}` syntax to show relevant data.
    *   *Example:* "Reviewing content for company: {{input.company_name}}"

### Step 3: Connect the Flow
*   Connect the **Input** of the Approval node from the previous step (e.g., an Agent or Web Scraper).
*   Connect the **Output** of the Approval node to the next step (e.g., an HTTP Request or End node).
    *   *Note:* The workflow will only proceed to the next node if the request is **Approved**. If **Rejected**, the workflow stops immediately at this node.

---

## 3. For Approvers: How to Review and Act

If you are responsible for approving workflows, here is how to manage requests.

### Identifying a Paused Workflow
When a workflow reaches an approval step:
1.  The workflow status changes to **Waiting for Auth** or **Paused**.
2.  In the **Execution Panel** (the right-side panel when running a workflow), you will see a "Workflow Paused" notification.

### Reviewing the Request
The notification in the Execution Panel will display:
*   **Status:** "Workflow Paused - Approval Required"
*   **Message:** The specific instructions provided by the workflow builder.
*   **Context:** Any data variables included in the message will be resolved (e.g., you'll see "Reviewing content for company: Google" instead of the variable code).

### Taking Action

You have two options:

#### ✅ Approve
*   **Action:** Click the **Approve** button.
*   **Result:** The workflow immediately resumes execution from the Approval node and proceeds to the next step defined in the workflow.

#### ❌ Reject
*   **Action:** Click the **Reject** button.
*   **Result:** The workflow stops execution immediately. No further steps are taken. The overall execution status will be marked as "Rejected".

---

## 4. Troubleshooting

**Q: I don't see the Approve/Reject buttons.**
**A:** Ensure you are looking at the *active* execution of the workflow. If the workflow has already finished or timed out, the buttons may no longer be active.

**Q: Can I customize the email notification?**
**A:** Currently, approvals are managed directly within the application dashboard. External email notifications are configured separately if available in your specific deployment.

**Q: What happens if I close the window while it's paused?**
**A:** The workflow remains paused. You can return to the execution history later, find the specific run, and provide your approval then. The workflow asks for approval *asynchronously*, so it waits indefinitely (or until a system timeout, typically 24 hours) for your response.
