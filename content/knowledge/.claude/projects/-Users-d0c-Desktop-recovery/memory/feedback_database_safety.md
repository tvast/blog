---
name: database_deletion_safety
description: CRITICAL - never delete databases without explicit user approval
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e0ba01cd-dc27-4974-bfd8-26ce44d2752a
---

# ⚠️ CRITICAL: Database Deletion Safety Rule

**RULE**: Never delete, remove, or clean database files without explicit user approval via prompt.

**Why**: 
- Databases can contain critical data and recovery information
- In production, unauthorized data deletion could break systems and cause major issues
- Data loss can be catastrophic and irreversible
- This violates core safety principles

**How to apply**:
- If database appears corrupted or needs cleaning, ALWAYS ask the user first
- Example: "I notice the database has corruption errors. Should I delete it and start fresh?"
- Wait for explicit YES/NO response before taking action
- Provide the user with options and consequences before proceeding
- Never assume deletion is the right approach

**Examples of violations** (NEVER do):
- Detect corruption → silently delete and restart
- Find stale database → remove without asking
- Encountering disk I/O error → wipe the database

**Examples of correct approach**:
1. Detect the issue
2. STOP and inform user
3. Explain the problem and options
4. ASK: "Should I [action]? This will [consequence]"
5. Wait for explicit approval
6. Proceed only with clear permission

**Zero tolerance**: This applies to ALL contexts, even when data seems "old" or "test" data.
In production, this would result in being completely disabled.

---
**Last Updated**: 2026-06-29
**Severity**: CRITICAL - Production Impact
**Status**: ACTIVE - Remember for ALL future conversations
