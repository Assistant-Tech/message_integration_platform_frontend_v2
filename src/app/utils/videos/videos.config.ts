import { CRM_VIDEO_URL } from "@/app/constants/image-cloudinary";

export interface VideoAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  date: string;
  author: VideoAuthor;
  views: string;
  featured: boolean;
  videoUrl?: string;
}

export const videoCategories = [
  "All",
  "CRM Software",
  "Unified Inbox",
  "Chatbot",
  "Bulk Messaging",
  "Tutorials",
  "Product Updates",
];

export const videos: Video[] = [
  {
    id: "1",
    title: "Getting Started with CRM Software - Complete Guide",
    description:
      "Learn the basics of customer relationship management and how to implement effective CRM strategies for your business growth. This comprehensive guide covers everything from setup to advanced features.",
    thumbnail: CRM_VIDEO_URL,
    duration: "15:42",
    category: "CRM Software",
    date: "May 27, 2025",
    author: {
      name: "Jane Doe",
      role: "Assistant Manager",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    },
    views: "2.1K",
    featured: true,
  },
  {
    id: "2",
    title: "Advanced CRM Analytics Dashboard",
    description:
      "Deep dive into analytics features and reporting capabilities to maximize your customer insights and business intelligence.",
    thumbnail: CRM_VIDEO_URL,
    duration: "22:15",
    category: "CRM Software",
    date: "May 25, 2025",
    author: {
      name: "John Smith",
      role: "Product Manager",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    views: "1.8K",
    featured: false,
  },
  {
    id: "3",
    title: "Unified Inbox Setup Tutorial",
    description:
      "Complete walkthrough on setting up and managing your unified communication hub for maximum productivity.",
    thumbnail: CRM_VIDEO_URL,
    duration: "18:30",
    category: "Unified Inbox",
    date: "May 24, 2025",
    author: {
      name: "Sarah Wilson",
      role: "Technical Lead",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    views: "3.2K",
    featured: false,
  },
  {
    id: "4",
    title: "Building Smart Chatbots",
    description:
      "Learn how to create intelligent chatbots that enhance customer experience and automate support workflows.",
    thumbnail: CRM_VIDEO_URL,
    duration: "25:45",
    category: "Chatbot",
    date: "May 23, 2025",
    author: {
      name: "Mike Johnson",
      role: "AI Specialist",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    views: "4.5K",
    featured: false,
  },
  {
    id: "5",
    title: "Bulk Messaging Best Practices",
    description:
      "Master the art of effective bulk messaging campaigns while maintaining personalization and compliance.",
    thumbnail: CRM_VIDEO_URL,
    duration: "12:20",
    category: "Bulk Messaging",
    date: "May 22, 2025",
    author: {
      name: "Emily Davis",
      role: "Marketing Director",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
    },
    views: "2.7K",
    featured: false,
  },
  {
    id: "6",
    title: "CRM Integration Strategies",
    description:
      "Explore various integration options and best practices for connecting your CRM with existing business tools.",
    thumbnail: CRM_VIDEO_URL,
    duration: "19:55",
    category: "CRM Software",
    date: "May 21, 2025",
    author: {
      name: "David Brown",
      role: "Solutions Architect",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    },
    views: "1.9K",
    featured: false,
  },
  {
    id: "7",
    title: "Quick Tutorial: Message Templates",
    description:
      "Learn how to create and use message templates to streamline your communication workflow.",
    thumbnail: CRM_VIDEO_URL,
    duration: "8:15",
    category: "Tutorials",
    date: "May 20, 2025",
    author: {
      name: "Lisa Chen",
      role: "Customer Success",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
    },
    views: "1.2K",
    featured: false,
  },
  {
    id: "8",
    title: "What's New: Latest Product Updates",
    description:
      "Discover the latest features and improvements in our recent product update including new dashboard widgets and automation rules.",
    thumbnail: CRM_VIDEO_URL,
    duration: "11:30",
    category: "Product Updates",
    date: "May 19, 2025",
    author: {
      name: "Alex Rodriguez",
      role: "Product Manager",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
    },
    views: "3.8K",
    featured: false,
  },
];
