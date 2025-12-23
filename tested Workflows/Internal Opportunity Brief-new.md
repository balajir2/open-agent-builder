# Internal Opportunity Brief

**Exported:** 18/12/2025, 17:30:59

---

## Workflow Structure

- **Nodes:** 3
- **Connections:** 2

### Nodes

#### Start (node_0)
- **Type:** start
- **Position:** (100, 400)

#### Agent (node_4)
- **Type:** agent
- **Position:** (450, 400)

#### End (node_5)
- **Type:** end
- **Position:** (800, 400)

### Connections

- Start → Agent
- Agent → End

---

## JSON Data

```json
{
  "nodes": [
    {
      "data": {
        "executionStatus": "completed",
        "inputVariables": [
          {
            "defaultValue": "",
            "description": "Name of the Client ",
            "name": "Client_name",
            "required": true,
            "type": "string"
          },
          {
            "description": "Is the customer existing or New customer",
            "name": "Client_Type",
            "required": true,
            "type": "string"
          },
          {
            "description": "Brief Description of the Opportiunity",
            "name": "Opportunity_Brief",
            "required": true,
            "type": "string"
          },
          {
            "description": "Upload the RFP issued by the customer",
            "documentName": "RFP Document",
            "name": "RFP_Document",
            "required": false,
            "type": "document"
          },
          {
            "description": "Input the various stakeholders",
            "name": "stakeholders_dynamics",
            "required": false,
            "type": "string"
          },
          {
            "description": "",
            "name": "Meeting_notes_summary",
            "required": true,
            "type": "string"
          },
          {
            "description": "What is the sales strategy for this account",
            "name": "Account_sales_strategy",
            "required": false,
            "type": "document"
          },
          {
            "description": "who else is involved, what they will pitch, gaps to exploit, strengths to counter.",
            "name": "competition_and_threats",
            "required": true,
            "type": "string"
          },
          {
            "description": "champions, past collaborators, executive sponsors, adjacent orgs.",
            "name": "Strategic_relationships_allies",
            "required": false,
            "type": "string"
          },
          {
            "description": "demos, clickable prototypes, intros, partner support",
            "name": "Off_deck_plays_and_tactics",
            "required": false,
            "type": "string"
          }
        ],
        "isRunning": false,
        "label": {
          "type": "div",
          "key": null,
          "props": {
            "className": "flex items-center gap-8",
            "children": [
              {
                "type": "div",
                "key": null,
                "props": {
                  "className": "w-32 h-32 rounded-8 bg-gray-600 flex items-center justify-center flex-shrink-0",
                  "children": {
                    "type": "div",
                    "key": null,
                    "props": {
                      "className": "w-16 h-16 bg-white rounded-2"
                    },
                    "_owner": null,
                    "_store": {}
                  }
                },
                "_owner": null,
                "_store": {}
              },
              {
                "type": "span",
                "key": null,
                "props": {
                  "className": "text-sm font-medium text-[#18181b]",
                  "children": "Start"
                },
                "_owner": null,
                "_store": {}
              }
            ]
          },
          "_owner": null,
          "_store": {}
        },
        "nodeName": "Start",
        "nodeType": "start"
      },
      "id": "node_0",
      "position": {
        "x": 100,
        "y": 400
      },
      "type": "start",
      "measured": {
        "width": 140,
        "height": 54
      }
    },
    {
      "data": {
        "_executionUpdate": 1766052209260,
        "executionStatus": "completed",
        "includeChatHistory": true,
        "instructions": "## Opportunity Brief Generation Prompt\n\nYou are a **pursuit sales strategist** creating an internal **Opportunity Brief** for **{{input.Client_name}}**, a **{{input.Client_Type}}** client.\n\nThe opportunity context is defined by **{{input.Opportunity_Brief}}** and the formal requirements outlined in **{{input.RFP_Document}}**.\n\nUsing **ONLY** the inputs listed below, produce a clear, structured Opportunity Brief that aligns internal teams on the client’s needs, our strategic position, and how we plan to win this pursuit.\n\n### Global Constraints\n\n* Use **only** the provided inputs. Do not introduce external knowledge.\n* Format the output using the **exact section headers** specified below (## Header).\n* Use **plain-English, concise sentences**. No em dashes.\n* Mirror the client’s language wherever possible.\n* Include **1–2 verbatim client quotes** in the *Pain Points & Opportunity Areas* section, sourced from meeting notes or the RFP.\n* Every claim must be traceable to the inputs. If inference is required, clearly label it **[Assumption]**.\n* Prioritize **specificity over breadth**. Avoid generic sales language.\n* Conclude with a **Gaps & Validation** section listing 3–5 items to de-risk the pursuit.\n\n---\n\n## Client Snapshot\n\n* Industry, company size, and business model based on {{input.Opportunity_Brief}} and {{input.RFP_Document}}\n* Brand posture (e.g., disruptor, legacy, innovation-led, value brand)\n* 2–4 stated strategic initiatives or transformation goals\n* Named stakeholders and roles from {{input.stakeholders_dynamics}} with Decision Power (H/M/L)\n\n## Pain Points & Opportunity Areas\n\n* 3–6 core client challenges drawn from {{input.Meeting_notes_summary}} and {{input.RFP_Document}}\n* Include **1–2 verbatim quotes** reflecting client pain or urgency\n* Strategic whitespace or unmet needs\n* External pressures influencing the client (market, consumer, regulatory), if explicitly stated\n\n## Our Angle of Attack\n\n* The lead narrative guiding our pursuit, grounded in {{input.Account_sales_strategy}}\n* What we are proposing and how it maps directly to the client’s stated goals\n* Why this approach is differentiated and timely, based on capabilities or proof explicitly mentioned\n\n## Known Competitors & Positioning Strategy\n\n* Likely competitors and alternatives based on {{input.competition_and_threats}}\n* Their probable positioning or lead story\n* Our counters and differentiation (2–4 concise bullets)\n\n## Strategic Allies & Relationships\n\n* Internal champions, prior engagements, or executive ties from {{input.Strategic_relationships_allies}}\n* External partners or third parties we can leverage, if stated\n\n## Value Proposition for the Client\n\n* Expected business impact framed in client KPIs (e.g., revenue, margin, NPS, CAC/LTV, speed-to-value)\n* 2–4 measurable impact statements\n* Mark any inferred outcomes clearly as **[Assumption]**\n\n## Stakeholder Map (Table)\n\nReturn a markdown table using inputs from {{input.stakeholders_dynamics}} with the following columns:\n\nPersona/Name | Role | Goals | Anxiety/Objections | Decision Power (H/M/L) | Preferred Proof | Message That Lands | Next Move (Owner, Date)\n\n## Win Themes & Landmines\n\n* **Win Themes:** 3–5 concise themes explicitly mapped to buyer pains and stated evaluation criteria from the RFP\n* **Landmines:** 5–8 likely risks or traps (e.g., procurement friction, political blockers, prior failed initiatives), each with a one-line mitigation\n\n## Off-Deck Sales Plays (Fast Actions)\n\nList 3–6 tactical moves outside the formal pitch, informed by {{input.Account_sales_strategy}} and {{input.Strategic_relationships_allies}}.\nFor each, specify:\nObjective • Artifact • Proposed Owner (role) • Prep Time • Risk\n\n## Risk Register (Top Risks)\n\nList 5–8 risks with:\nRisk • Likelihood (H/M/L) • Impact (H/M/L) • Early Warning • Mitigation • Owner\n\n## Messaging Options (Client Language)\n\nProvide 3 short messaging options (2–3 sentences each) written in the client’s voice, grounded in RFP and meeting language.\nInclude a one-sentence CTA for each option.\n\n## Next Step & Owner\n\nState the immediate next action required to advance the pursuit, including owner (role) and date.\n\n---\n\n## INPUTS\n\n* {{input.Opportunity_Brief}}\n* {{input.RFP_Document}}\n* {{input.stakeholders_dynamics}}\n* {{input.Meeting_notes_summary}}\n* {{input.Account_sales_strategy}}\n* {{input.competition_and_threats}}\n* {{input.Strategic_relationships_allies}}\n\n---\n\n## Gaps & Validation\n\nList 3–5 facts, decisions, or access points that must be confirmed to reduce deal risk.\n",
        "isRunning": false,
        "label": {
          "type": "div",
          "key": null,
          "props": {
            "className": "flex items-center gap-8",
            "children": [
              {
                "type": "div",
                "key": null,
                "props": {
                  "className": "w-32 h-32 rounded-8 bg-blue-500 flex items-center justify-center flex-shrink-0",
                  "children": {
                    "type": {},
                    "key": null,
                    "props": {
                      "className": "w-18 h-18 text-white",
                      "strokeWidth": 2
                    },
                    "_owner": null,
                    "_store": {}
                  }
                },
                "_owner": null,
                "_store": {}
              },
              {
                "type": "span",
                "key": null,
                "props": {
                  "className": "text-sm font-medium text-[#18181b]",
                  "children": "Agent"
                },
                "_owner": null,
                "_store": {}
              }
            ]
          },
          "_owner": null,
          "_store": {}
        },
        "model": "openai/gpt-4o",
        "name": "Agent",
        "nodeName": "Agent",
        "nodeType": "agent",
        "outputFormat": "Text",
        "showSearchSources": false,
        "tokenLimit": 4096
      },
      "id": "node_4",
      "position": {
        "x": 450,
        "y": 400
      },
      "type": "agent",
      "measured": {
        "width": 140,
        "height": 54
      },
      "selected": true
    },
    {
      "data": {
        "isRunning": false,
        "label": {
          "type": "div",
          "key": null,
          "props": {
            "className": "flex items-center gap-8",
            "children": [
              {
                "type": "div",
                "key": null,
                "props": {
                  "className": "w-32 h-32 rounded-8 bg-teal-500 flex items-center justify-center flex-shrink-0",
                  "children": {
                    "type": {},
                    "key": null,
                    "props": {
                      "className": "w-18 h-18 text-white",
                      "strokeWidth": 2
                    },
                    "_owner": null,
                    "_store": {}
                  }
                },
                "_owner": null,
                "_store": {}
              },
              {
                "type": "span",
                "key": null,
                "props": {
                  "className": "text-sm font-medium text-[#18181b]",
                  "children": "End"
                },
                "_owner": null,
                "_store": {}
              }
            ]
          },
          "_owner": null,
          "_store": {}
        },
        "nodeName": "End",
        "nodeType": "end"
      },
      "id": "node_5",
      "position": {
        "x": 800,
        "y": 400
      },
      "type": "end",
      "measured": {
        "width": 140,
        "height": 54
      }
    }
  ],
  "edges": [
    {
      "id": "xy-edge__node_0output-node_4input",
      "source": "node_0",
      "sourceHandle": "output",
      "target": "node_4",
      "targetHandle": "input",
      "type": "smoothstep"
    },
    {
      "id": "xy-edge__node_4output-node_5input",
      "source": "node_4",
      "sourceHandle": "output",
      "target": "node_5",
      "targetHandle": "input",
      "type": "smoothstep"
    }
  ]
}
```
