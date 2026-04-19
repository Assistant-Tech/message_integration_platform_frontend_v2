import { useEffect, useMemo, useState } from "react";
import { Joyride, EVENTS, ORIGIN, STATUS, type EventData, type Step } from "react-joyride";
import { useAuthStore } from "@/app/store/auth.store";
import api from "@/app/services/api/axios";

// ──────────────────────────────────────────────────────────────────────────────
// APP WALKTHROUGH
//
// First-time product tour. Trigger flag is `tenant.isWalkthroughRequired`,
// set server-side when onboarding completes for the first time. The flag is
// read from:
//   1. Onboarding success response (data.tenant.isWalkthroughRequired)
//   2. GET /tenant/details on fresh session rehydrate
//   3. Login response data.isWalkthroughRequired (mirrored during rollout)
//
// Mounted inside AdminLayout so it only fires *after* ProtectedRoute has
// already ensured onboarding is complete — guaranteeing the
// onboarding → walkthrough UX order.
//
// 7 steps covering the admin's primary surfaces:
//   1. Welcome / dashboard overview
//   2. Sidebar navigation
//   3. Dashboard home
//   4. Inbox (all conversations)
//   5. Contacts
//   6. Channel connections
//   7. Settings + profile menu
//
// On finish/skip we flip the store flag and attempt to persist server-side so
// subsequent logins don't re-show the tour. If the server endpoint isn't live
// yet, the local flag still prevents re-triggers for the current session.
// ──────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "chatblix:walkthrough-completed";

const steps: Step[] = [
  {
    target: "body",
    placement: "center",
    title: "Welcome to Chatblix 👋",
    content:
      "Let's take a quick 60-second tour of your new workspace. You can skip any time — we'll cover the essentials.",
  },
  {
    target: '[data-tour="sidebar"]',
    placement: "right",
    title: "Navigation hub",
    content:
      "Everything lives in this sidebar — Dashboard, Inbox, Contacts, Channels, and Settings. Hover any icon to see its label.",
  },
  {
    target: '[data-tour="nav-dashboard"]',
    placement: "right",
    title: "Dashboard",
    content:
      "Your command center. Conversation volume, response times, and team activity — all at a glance.",
  },
  {
    target: '[data-tour="nav-inbox"]',
    placement: "right",
    title: "Unified Inbox",
    content:
      "Messages from Facebook, Instagram, WhatsApp — all in one thread list. Filter by All, Customer, or Team.",
  },
  {
    target: '[data-tour="nav-contact"]',
    placement: "right",
    title: "Contacts",
    content:
      "A deduplicated customer list built from every conversation. Tag, filter, and export.",
  },
  {
    target: '[data-tour="nav-channels"]',
    placement: "right",
    title: "Connect your channels",
    content:
      "Start here — plug in Facebook Messenger, Instagram, and WhatsApp so messages start flowing into the Inbox.",
  },
  {
    target: '[data-tour="profile"]',
    placement: "right",
    title: "Profile & settings",
    content:
      "Account preferences, security, integrations, and logout. You're all set — welcome aboard!",
  },
];

/**
 * Per backend spec: PATCH /tenant/walkthrough/complete
 *   Auth: Bearer (TENANT_ADMIN | CUSTOM)
 *   Body: none
 *   Response: { data: { tenantId, isWalkthroughRequired: false } }
 *
 * Idempotent on the backend — safe to call more than once.
 */
async function persistWalkthroughCompleted() {
  try {
    await api.patch("/tenant/walkthrough/complete");
  } catch {
    // Silent — local flag still prevents re-trigger this session.
  }
}

const AppWalkthrough = () => {
  const isWalkthroughRequired = useAuthStore((s) => s.isWalkthroughRequired);
  const setIsWalkthroughRequired = useAuthStore(
    (s) => s.setIsWalkthroughRequired,
  );
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const requiresOnboarding = useAuthStore((s) => s.requiresOnboarding);

  // Defer start slightly so sidebar items mount and data-tour targets exist.
  const [run, setRun] = useState(false);

  const shouldRun = useMemo(() => {
    if (!isAuthenticated) return false;
    if (requiresOnboarding) return false;
    if (!isWalkthroughRequired) return false;
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) {
      return false;
    }
    return true;
  }, [isAuthenticated, requiresOnboarding, isWalkthroughRequired]);

  useEffect(() => {
    if (!shouldRun) {
      setRun(false);
      return;
    }
    const id = window.setTimeout(() => setRun(true), 600);
    return () => window.clearTimeout(id);
  }, [shouldRun]);

  const finishTour = () => {
    setRun(false);
    setIsWalkthroughRequired(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage disabled — tolerate
    }
    void persistWalkthroughCompleted();
  };

  const handleEvent = (data: EventData) => {
    // Tour completed normally (last "Finish" click).
    if (
      data.type === EVENTS.STEP_AFTER &&
      data.status === STATUS.FINISHED
    ) {
      finishTour();
      return;
    }

    // User hit Skip → origin is BUTTON_SKIP and status transitions to SKIPPED.
    if (
      data.type === EVENTS.TOUR_STATUS &&
      (data.status === STATUS.SKIPPED || data.status === STATUS.FINISHED)
    ) {
      finishTour();
      return;
    }

    // Closed via ESC or X button → also treat as done (don't nag on next login).
    if (
      data.type === EVENTS.STEP_AFTER &&
      (data.origin === ORIGIN.BUTTON_CLOSE ||
        data.origin === ORIGIN.KEYBOARD)
    ) {
      finishTour();
    }
  };

  if (!shouldRun) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      onEvent={handleEvent}
      locale={{
        back: "Back",
        close: "Close",
        last: "Finish",
        next: "Next",
        skip: "Skip tour",
      }}
      options={{
        showProgress: true,
        skipBeacon: true,
        overlayClickAction: false,
        buttons: ["back", "skip", "primary"],
        primaryColor: "#2f5de5",
        textColor: "#1f2937",
        backgroundColor: "#ffffff",
        arrowColor: "#ffffff",
        overlayColor: "rgba(17, 24, 39, 0.55)",
        zIndex: 10_000,
        spotlightPadding: 6,
      }}
      styles={{
        tooltip: {
          borderRadius: 14,
          padding: 20,
          fontSize: 14,
        },
        tooltipTitle: {
          fontSize: 16,
          fontWeight: 700,
          marginBottom: 6,
        },
        buttonPrimary: {
          borderRadius: 10,
          padding: "8px 16px",
          fontWeight: 600,
        },
        buttonBack: {
          color: "#6b7280",
          marginRight: 8,
        },
        buttonSkip: {
          color: "#6b7280",
        },
      }}
    />
  );
};

export default AppWalkthrough;
