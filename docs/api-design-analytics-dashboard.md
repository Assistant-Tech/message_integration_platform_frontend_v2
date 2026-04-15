# Analytics Dashboard — Backend API Design Guide

> Derived from frontend components in `src/app/features/dashboard/admin/pages/dashboard/`
> All endpoints scoped to authenticated tenant. Base: `/api/v1/analytics`

---

## Response Envelope

All responses use a consistent envelope:

### Success

```jsonc
{
  "data": { /* resource or array */ },
  "meta": {                              // present only on collections
    "total": 150,
    "page": 1,
    "limit": 20,
    "hasMore": true
  }
}
```

### Error

```jsonc
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      { "field": "period", "message": "Must be one of: today, week, month", "code": "INVALID_ENUM" }
    ],
    "requestId": "req_7xK9mP2nQ1",
    "timestamp": "2026-04-12T14:30:00Z"
  }
}
```

### Common error codes

| HTTP | Code | When |
|------|------|------|
| 400 | `INVALID_PARAMS` | Bad query params |
| 401 | `UNAUTHORIZED` | Missing/expired token |
| 403 | `FORBIDDEN` | Valid token, no permission |
| 404 | `NOT_FOUND` | Resource not found |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |

---

## 1. Dashboard Summary Stats

**`GET /api/v1/analytics/summary`**

Returns the 5 stat cards displayed at the top. All values computed server-side.

```
Query params:
  period  = "today" | "week" | "month"   (default: "today")
```

```jsonc
{
  "data": {
    "totalConversations": {
      "value": 1248,
      "limit": 1500,           // plan limit (null if unlimited)
      "trend": 12.5            // % change vs previous period
    },
    "activeChats": {
      "value": 84,
      "trend": 8.2
    },
    "messagesSent": {
      "value": 5620,
      "period": "week",        // echoes requested period
      "trend": -3.1
    },
    "resolvedToday": {
      "value": 42,
      "target": 50,            // daily target (configurable)
      "trend": 15.0
    },
    "avgResponseTime": {
      "valueSeconds": 144,     // always in seconds — frontend formats
      "median": true,
      "trend": -18.0           // negative = improvement
    }
  }
}
```

### Frontend type mapping

| Frontend field | API field | Notes |
|---|---|---|
| `stat.value` | `*.value` | Frontend formats (e.g. `144s` -> `"2.4m"`) |
| `stat.subValue` | `*.limit` / `*.period` | Contextual sub-label |
| `stat.trend` | `*.trend` | Signed float, % vs previous period |

---

## 2. Messages Stats (Chart)

**`GET /api/v1/analytics/messages`**

Powers the line chart with period toggle (Week/Month/Year).

```
Query params:
  period    = "week" | "month" | "year"   (default: "month")
  channel   = "FACEBOOK" | "INSTAGRAM" | "WHATSAPP" | "TIKTOK" | "EMAIL"
  groupBy   = "day" | "week" | "month"    (default: inferred from period)
```

```jsonc
{
  "data": {
    "points": [
      { "label": "Jan", "value": 3200 },
      { "label": "Feb", "value": 4100 }
      // ...
    ],
    "total": 27300,
    "percentChange": 14.2,     // vs previous equivalent period
    "period": "month",
    "groupBy": "month"
  }
}
```

### Default groupBy inference

| Period | Default groupBy | Points | Label format |
|---|---|---|---|
| `week` | `day` | 7 | `"Mon"`, `"Tue"`, ... |
| `month` | `week` | 4-5 | `"Week 1"`, `"Week 2"`, ... |
| `year` | `month` | 12 | `"Jan"`, `"Feb"`, ... |

---

## 3. Conversations (Recent)

**`GET /api/v1/analytics/conversations`**

```
Query params:
  sort    = "-lastMessageAt"   (default; - prefix = descending)
  status  = "active" | "waiting" | "resolved"
  limit   = number             (default: 10, max: 25)
  cursor  = string             (opaque cursor for next page)
```

```jsonc
{
  "data": [
    {
      "id": "conv_abc123",
      "contactName": "Sarah Mitchell",
      "channel": "WHATSAPP",
      "lastMessageAt": "2026-04-12T14:30:00Z",
      "lastMessagePreview": "Hi, I need help with my recent order #4521",
      "status": "active",
      "contactAvatar": "https://cdn.chatblix.com/avatars/xyz.jpg",
      "assignedTo": "member_m1"
    }
  ],
  "meta": {
    "total": 84,
    "hasMore": true,
    "nextCursor": "eyJsYXN0TWVzc2FnZUF0IjoiMjAyNi0wNC0xMlQxNDoyMDowMFoifQ"
  }
}
```

---

## 4. Team Members

**`GET /api/v1/analytics/team/members`**

```
Query params:
  status  = "online" | "away" | "busy" | "offline"
  search  = string             (matches name, email, role)
  sort    = "name" | "-activeConversations" | "-resolvedToday" | "avgResponseTimeSeconds"
  page    = number             (default: 1)
  limit   = number             (default: 20, max: 50)
```

```jsonc
{
  "data": [
    {
      "id": "member_m1",
      "name": "Priya Sharma",
      "email": "priya@chatblix.com",
      "role": "Senior Agent",
      "avatar": null,
      "status": "online",
      "activeMinutesToday": 342,
      "activeConversations": 7,
      "resolvedToday": 18,
      "avgResponseTimeSeconds": 72,
      "lastActiveAt": "2026-04-12T14:28:00Z"
    }
  ],
  "meta": {
    "total": 6,
    "page": 1,
    "limit": 20,
    "hasMore": false
  }
}
```

### `lastActiveAt` formatting

Backend returns ISO 8601. Frontend converts to relative: `"Just now"`, `"2 min ago"`, `"3 hours ago"`.

---

## 5. Team Summary

**`GET /api/v1/analytics/team/summary`**

```jsonc
{
  "data": {
    "totalMembers": 6,
    "online": 3,
    "away": 1,
    "busy": 1,
    "offline": 1,
    "avgResponseTimeSeconds": 162,
    "totalResolvedToday": 53
  }
}
```

**Optional combined fetch:**

```
GET /api/v1/analytics/team/members?include=summary
```

Appends `summary` as a sibling to `data`:

```jsonc
{
  "data": [ /* members */ ],
  "summary": { /* team summary object */ },
  "meta": { /* pagination */ }
}
```

---

## 6. Team Activities (Live Feed)

**`GET /api/v1/analytics/team/activities`**

```
Query params:
  limit     = number    (default: 20, max: 50)
  cursor    = string    (opaque cursor for pagination)
  memberId  = string    (filter by member)
```

```jsonc
{
  "data": [
    {
      "id": "evt_e1",
      "memberId": "member_m1",
      "memberName": "Priya Sharma",
      "action": "resolved",
      "target": "Order tracking issue #4521",
      "channel": "WHATSAPP",
      "timestamp": "2026-04-12T14:26:00Z"
    }
  ],
  "meta": {
    "hasMore": true,
    "nextCursor": "eyJ0aW1lc3RhbXAiOiIyMDI2LTA0LTEyVDE0OjA0OjAwWiJ9"
  }
}
```

### WebSocket (real-time)

Event name: `team:activity`

```jsonc
{
  "id": "evt_e7",
  "memberId": "member_m1",
  "memberName": "Priya Sharma",
  "action": "replied",
  "target": "Refund request #891",
  "channel": "WHATSAPP",
  "timestamp": "2026-04-12T14:31:00Z"
}
```

---

## 7. Additional KPIs (New Endpoints)

These KPIs are **not yet in the frontend** — backend should implement so the dashboard can expand.

### 7a. CSAT Ratings

**`GET /api/v1/analytics/csat-ratings`**

```
Query params:
  period = "week" | "month" | "quarter"
```

```jsonc
{
  "data": {
    "score": 4.3,
    "totalRatings": 312,
    "distribution": {
      "5": 142,
      "4": 98,
      "3": 45,
      "2": 18,
      "1": 9
    },
    "trend": 2.1,
    "npsScore": 47
  }
}
```

### 7b. Response Times

**`GET /api/v1/analytics/response-times`**

```
Query params:
  period  = "today" | "week" | "month"
  channel = "WHATSAPP" | "INSTAGRAM" | "FACEBOOK" | "TIKTOK" | "EMAIL"
```

```jsonc
{
  "data": {
    "firstResponseTime": {
      "medianSeconds": 87,
      "p90Seconds": 240,
      "trend": -12.3
    },
    "resolutionTime": {
      "medianSeconds": 1800,
      "p90Seconds": 7200,
      "trend": -5.6
    },
    "byChannel": [
      { "channel": "WHATSAPP", "frtMedianSeconds": 62, "resolutionMedianSeconds": 1200 },
      { "channel": "INSTAGRAM", "frtMedianSeconds": 95, "resolutionMedianSeconds": 2100 },
      { "channel": "FACEBOOK", "frtMedianSeconds": 78, "resolutionMedianSeconds": 1500 },
      { "channel": "TIKTOK", "frtMedianSeconds": 120, "resolutionMedianSeconds": 2400 },
      { "channel": "EMAIL", "frtMedianSeconds": 450, "resolutionMedianSeconds": 5400 }
    ]
  }
}
```

### 7c. Channel Stats

**`GET /api/v1/analytics/channels`**

```
Query params:
  period = "today" | "week" | "month"
```

```jsonc
{
  "data": [
    { "channel": "WHATSAPP", "conversations": 520, "percentage": 41.7 },
    { "channel": "INSTAGRAM", "conversations": 310, "percentage": 24.8 },
    { "channel": "FACEBOOK", "conversations": 245, "percentage": 19.6 },
    { "channel": "EMAIL", "conversations": 118, "percentage": 9.5 },
    { "channel": "TIKTOK", "conversations": 55, "percentage": 4.4 }
  ],
  "meta": {
    "total": 1248
  }
}
```

### 7d. SLA Stats

**`GET /api/v1/analytics/sla-stats`**

```
Query params:
  period = "today" | "week" | "month"
```

```jsonc
{
  "data": {
    "overallCompliance": 91.2,
    "trend": 3.4,
    "breaches": {
      "total": 22,
      "byPriority": {
        "high": 3,
        "medium": 11,
        "low": 8
      }
    },
    "byChannel": [
      { "channel": "WHATSAPP", "compliance": 95.1 },
      { "channel": "INSTAGRAM", "compliance": 88.4 },
      { "channel": "FACEBOOK", "compliance": 92.0 },
      { "channel": "EMAIL", "compliance": 78.5 },
      { "channel": "TIKTOK", "compliance": 89.2 }
    ]
  }
}
```

### 7e. Traffic Patterns

**`GET /api/v1/analytics/traffic`**

```
Query params:
  period  = "week" | "month"
  groupBy = "hour,day"          (returns heatmap grid)
```

```jsonc
{
  "data": {
    "timezone": "Asia/Kathmandu",
    "grid": [
      { "day": 0, "hour": 9, "count": 12 },
      { "day": 0, "hour": 10, "count": 28 },
      { "day": 1, "hour": 9, "count": 45 }
      // ... all 168 slots (7 days x 24 hours)
    ],
    "peakHour": { "day": 1, "hour": 10, "count": 67 },
    "quietHour": { "day": 6, "hour": 3, "count": 0 }
  }
}
```

### 7f. Queue Stats

**`GET /api/v1/analytics/queues`**

Real-time snapshot (no period param).

```jsonc
{
  "data": {
    "unassigned": 12,
    "waitingForReply": 28,
    "avgWaitTimeSeconds": 180,
    "longestWaitSeconds": 1200,
    "byChannel": [
      { "channel": "WHATSAPP", "unassigned": 4, "waiting": 10 },
      { "channel": "INSTAGRAM", "unassigned": 3, "waiting": 8 },
      { "channel": "FACEBOOK", "unassigned": 2, "waiting": 5 },
      { "channel": "EMAIL", "unassigned": 2, "waiting": 4 },
      { "channel": "TIKTOK", "unassigned": 1, "waiting": 1 }
    ]
  }
}
```

### 7g. Team Leaderboard

**`GET /api/v1/analytics/team/leaderboard`**

```
Query params:
  period = "today" | "week" | "month"
  sort   = "-resolved" | "-csatAvg" | "avgResponseTimeSeconds"
  limit  = number (default: 10)
```

```jsonc
{
  "data": [
    {
      "memberId": "member_m1",
      "memberName": "Priya Sharma",
      "avatar": null,
      "resolved": 18,
      "csatAvg": 4.7,
      "avgResponseTimeSeconds": 72,
      "conversationsHandled": 34,
      "utilizationPercent": 87.5
    }
  ],
  "meta": {
    "total": 6,
    "limit": 10
  }
}
```

### 7h. Tag Stats

**`GET /api/v1/analytics/tags`**

```
Query params:
  period = "week" | "month"
  sort   = "-count"             (default)
  limit  = number               (default: 10)
```

```jsonc
{
  "data": [
    { "tag": "billing", "count": 142, "percentage": 22.1 },
    { "tag": "shipping", "count": 98, "percentage": 15.3 },
    { "tag": "refund", "count": 87, "percentage": 13.5 },
    { "tag": "product-inquiry", "count": 76, "percentage": 11.8 },
    { "tag": "technical-support", "count": 64, "percentage": 10.0 }
  ],
  "meta": {
    "total": 642
  }
}
```

### 7i. Resolution Stats

**`GET /api/v1/analytics/resolutions`**

```
Query params:
  period = "today" | "week" | "month"
```

```jsonc
{
  "data": {
    "rate": 84.2,
    "total": 1248,
    "resolved": 1051,
    "pending": 197,
    "trend": 5.3,
    "firstContactResolution": 62.1,
    "avgResolutionTimeSeconds": 1800,
    "byChannel": [
      { "channel": "WHATSAPP", "rate": 89.1 },
      { "channel": "INSTAGRAM", "rate": 82.4 },
      { "channel": "FACEBOOK", "rate": 85.0 },
      { "channel": "EMAIL", "rate": 71.2 },
      { "channel": "TIKTOK", "rate": 78.9 }
    ]
  }
}
```

### 7j. Automation Stats

**`GET /api/v1/analytics/automations`**

```
Query params:
  period = "week" | "month"
```

```jsonc
{
  "data": {
    "botHandledPercent": 34.5,
    "botDeflectionRate": 28.3,
    "handoffRate": 6.2,
    "avgBotResponseTimeMs": 450,
    "topBotIntents": [
      { "intent": "order_status", "count": 210, "resolutionRate": 91.2 },
      { "intent": "store_hours", "count": 145, "resolutionRate": 98.6 },
      { "intent": "return_policy", "count": 89, "resolutionRate": 85.3 }
    ]
  }
}
```

---

## Shared Conventions

### Authentication

All endpoints require `Authorization: Bearer <accessToken>`. Tenant scoping derived from token.

### Rate limiting headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1712318400
```

### Time values

- Durations: **seconds** (integers) — frontend formats to `"2.4m"`, `"1h 30m"`
- Timestamps: **ISO 8601** — frontend converts to relative strings
- `trend`: **signed float**, `% change vs previous equivalent period`
  - Positive = increase, Negative = decrease
  - For response times, negative trend = improvement (highlight green)

### Sorting convention

Prefix with `-` for descending (like JSON:API):
```
?sort=-resolvedToday       # highest first
?sort=avgResponseTimeSeconds  # lowest first (ascending)
?sort=-lastMessageAt,name    # multi-field: recent first, then alpha
```

### Enum values

```
Channel:      "WHATSAPP" | "INSTAGRAM" | "FACEBOOK" | "TIKTOK" | "EMAIL"
Status:       "active" | "waiting" | "resolved"
MemberStatus: "online" | "away" | "busy" | "offline"
Action:       "replied" | "resolved" | "assigned" | "tagged" | "transferred" | "noted"
Period:       "today" | "week" | "month" | "quarter" | "year"
```

### Caching

| Endpoint | Cache TTL | Notes |
|---|---|---|
| `/summary` | 30s | Near real-time stat cards |
| `/messages` | 5min | Chart data changes slowly |
| `/conversations` | 15s | Active conversations shift fast |
| `/team/members` | 10s | Status changes frequently |
| `/team/summary` | 10s | Derived from members |
| `/team/activities` | No cache | Real-time, use WebSocket |
| `/csat-ratings` | 15min | Ratings accumulate slowly |
| `/response-times` | 5min | Aggregated metric |
| `/channels` | 5min | Aggregated metric |
| `/sla-stats` | 5min | Aggregated metric |
| `/traffic` | 30min | Historical data |
| `/queues` | 5s | Real-time queue state |
| `/team/leaderboard` | 5min | Aggregated metric |
| `/tags` | 15min | Slow-moving data |
| `/resolutions` | 5min | Aggregated metric |
| `/automations` | 15min | Bot stats aggregate slowly |

---

NOTE: DNY means donot implement yet and should response with not implemented yet
## Endpoint Summary

| # | Method | Endpoint | Purpose |
|---|---|---|---|
| 1 | GET | `/analytics/summary` | Stat cards |
| 2 | GET | `/analytics/messages` | Line chart (groupBy for granularity) |
| 3 | GET | `/analytics/conversations` | Recent conversations (sort=-lastMessageAt) |
| 4 | GET | `/analytics/team/members` | Member table with pagination |
| 5 | GET | `/analytics/team/summary` | Team status bar |
| 6 | GET | `/analytics/team/activities` | Live feed (cursor pagination) |
| 7a | GET | `/analytics/csat-ratings` | CSAT + NPS |  DNY
| 7b | GET | `/analytics/response-times` | FRT + resolution time by channel |
| 7c | GET | `/analytics/channels` | Channel distribution |
| 7d | GET | `/analytics/sla-stats` | SLA compliance + breaches |
| 7e | GET | `/analytics/traffic` | Peak hours (groupBy=hour,day) |
| 7f | GET | `/analytics/queues` | Queue depth + wait times |
| 7g | GET | `/analytics/team/leaderboard` | Agent ranking + utilization |
| 7h | GET | `/analytics/tags` | Tag frequency |
| 7i | GET | `/analytics/resolutions` | Resolution rate + FCR |
| 7j | GET | `/analytics/automations` | Bot performance | DNY 

**Implementation priority:**
1. Endpoints 1-6 (power existing frontend)
2. 7f Queues (operational urgency)
3. 7b Response times (core SLA metric)
4. 7i Resolutions (management KPI)
5. 7c Channels (channel strategy)
6. 7a CSAT ratings (customer satisfaction) 
7. 7g Leaderboard (agent management)
8. 7d SLA stats
9. 7e Traffic
10. 7h Tags
11. 7j Automations 

