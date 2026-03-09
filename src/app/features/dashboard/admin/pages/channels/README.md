# Channel Page - Discord-Style Communication Interface

## Overview

A fully-featured, Discord-style channel page with collapsible sidebar, real-time messaging, and dynamic channel management.

## Features

### 🎯 Main Features

- **Collapsible Sidebar**: Toggle between expanded and compact views
- **Multi-Channel Support**: Internal, WhatsApp, Facebook, and Instagram channels
- **Real-time Messaging**: Dynamic message display with timestamps
- **Channel Details Panel**: View members, files, and links
- **Create Channel Modal**: Easy channel creation with type selection
- **Responsive Design**: Works on all screen sizes
- **Dark Mode Support**: Full dark mode compatibility

### 📂 Component Structure

```
channels/
├── ChannelPage.tsx              # Main orchestrator component
└── components/
    ├── ChannelSidebar.tsx       # Left sidebar with channel list
    ├── ChannelContent.tsx       # Main chat/message area
    ├── ChannelDetails.tsx       # Right panel with channel info
    └── CreateChannelModal.tsx   # Modal for creating new channels
```

## Component Breakdown

### ChannelPage (Main Component)

The orchestrator that manages state and coordinates all sub-components.

**Key Features:**

- Fetches channels from API
- Manages selected channel state
- Handles message sending
- Controls panel visibility
- Integrates with internal-channels service

**State Management:**

- `channels`: List of all channels
- `selectedChannelId`: Currently active channel
- `isDetailsPanelOpen`: Right panel visibility
- `isSidebarCollapsed`: Sidebar collapse state
- `messages`: Current channel messages

### ChannelSidebar

Discord-style collapsible sidebar with grouped channels.

**Features:**

- Collapsible/expandable sidebar
- Search functionality
- Channel grouping (text, social, private)
- Unread count badges
- Quick actions (notifications, settings)
- Smooth animations

**Channel Types:**

- 📝 Internal/Text channels
- 📱 WhatsApp channels
- 📘 Facebook channels
- 📷 Instagram channels
- 🔒 Private channels

### ChannelContent

Main messaging interface similar to Discord/Slack.

**Features:**

- Message grouping by date
- User avatars and roles
- Message timestamps
- File attachments support
- Emoji picker
- Real-time message updates
- Message editing indicators
- Smooth scrolling

**Header Actions:**

- 📞 Voice call
- 📹 Video call
- 📌 Pinned messages
- 👥 Members list
- 🔍 Search messages
- ℹ️ Channel details

### ChannelDetails

Right panel showing channel information and members.

**Sections:**

- Channel info and description
- Quick actions (mute, settings)
- Members list with online status
- Role indicators (admin, moderator, member)
- Pinned messages
- Shared files
- Shared links

**Member Status:**

- 🟢 Online
- 🟡 Away
- ⚫ Offline

### CreateChannelModal

Beautiful modal for creating new channels.

**Options:**

- Channel type selection
- Public/Private toggle
- Priority level (normal, high, urgent)
- Member invitation (for private channels)
- Form validation

## Usage

### Basic Implementation

```tsx
import ChannelPage from "@/app/features/dashboard/admin/pages/channels/ChannelPage";

function App() {
  return <ChannelPage />;
}
```

### With Custom Configuration

```tsx
// The component handles API integration automatically
// Fetches from: /internal-channels
// Uses services: internal-channels.services.ts
```

## API Integration

### Endpoints Used

- `GET /internal-channels` - Fetch all channels
- `POST /internal-channels` - Create new channel
- `GET /internal-channels/:id/participants` - Get channel members

### Service Functions

```typescript
// From internal-channels.services.ts
getAllInternalChannels();
createInternalChannel(payload);
getAllInternalChannelsById(channelId);
```

## Styling & Theming

### Tailwind CSS Classes

The components use a comprehensive Tailwind CSS design system:

- Gradient backgrounds
- Smooth transitions
- Hover effects
- Custom scrollbars
- Responsive utilities

### Color Palette

- **Primary**: Blue (#2563EB, #3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow/Amber
- **Danger**: Red (#DC2626)
- **Dark Mode**: Gray scale (800-900)

### Custom Scrollbars

Custom WebKit scrollbar styling for better UX:

```css
.custom-scrollbar::-webkit-scrollbar {
  width: 6-8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3-4px;
}
```

## Animations

Uses **Framer Motion** for smooth animations:

- Sidebar collapse/expand
- Panel sliding
- Modal entrance/exit
- Message appearance
- Hover effects

### Animation Examples

```tsx
// Sidebar collapse
animate={{ width: isCollapsed ? "70px" : "240px" }}
transition={{ duration: 0.3, ease: "easeInOut" }}

// Message appearance
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
```

## State Management

Currently uses React hooks for local state. Can be integrated with:

- Zustand store
- Redux
- Context API
- React Query for server state

## Mock Data

The component includes comprehensive mock data for:

- Sample messages
- User profiles
- Channel members
- Available users for invitation

## Future Enhancements

### Planned Features

- [ ] WebSocket integration for real-time updates
- [ ] Voice/Video call integration
- [ ] File upload with progress
- [ ] Message reactions
- [ ] Thread replies
- [ ] Message search
- [ ] Channel notifications settings
- [ ] User presence tracking
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Message formatting (markdown)
- [ ] Code syntax highlighting
- [ ] Emoji reactions
- [ ] GIF integration
- [ ] Channel permissions
- [ ] Role management
- [ ] Channel archives

## Performance Optimization

### Current Optimizations

- Lazy loading of channels
- Memoized components
- Efficient re-renders
- Optimized animations
- Scroll virtualization ready

### Recommendations

- Implement virtual scrolling for large message lists
- Add message pagination
- Cache channel data
- Debounce search inputs
- Lazy load images

## Accessibility

### Implemented

- Keyboard navigation support
- Focus management
- ARIA labels
- Semantic HTML
- Color contrast compliance

### To Improve

- Screen reader announcements
- Keyboard shortcuts
- Focus trap in modals
- Skip links

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 (not fully supported)

## Dependencies

### Core

- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion

### UI Components

- lucide-react (icons)
- sonner (toast notifications)
- Custom UI components

## Troubleshooting

### Common Issues

**1. Channels not loading**

```typescript
// Check API endpoint configuration
// Verify authentication tokens
// Check network console for errors
```

**2. Sidebar not collapsing**

```typescript
// Ensure Framer Motion is installed
// Check for CSS conflicts
// Verify state management
```

**3. Messages not sending**

```typescript
// Verify onSendMessage callback
// Check message state updates
// Review toast notifications
```

## Contributing

### Code Style

- Use TypeScript
- Follow ESLint rules
- Use Tailwind CSS utilities
- Add JSDoc comments
- Write meaningful commit messages

### Component Guidelines

- Keep components focused (single responsibility)
- Use TypeScript interfaces
- Implement error boundaries
- Add loading states
- Handle edge cases

## License

This component is part of the internal dashboard system.

## Support

For issues or questions:

- Check this documentation
- Review the component code
- Contact the development team

---

**Last Updated**: March 2026
**Version**: 1.0.0
**Author**: Development Team
