// EDIT PROJECTS HERE. No Django or API is required.
// Add images/videos to public/media/projects/<project-folder>/ and refer to them as /media/projects/...
// For YouTube, use: { id: "demo", media_type: "video", url: "https://youtu.be/VIDEO_ID", caption: "Demo" }
// For local videos, use: { id: "walkthrough", media_type: "video", file: "/media/projects/visionbridge/demo.mp4" }
// For photos, use: { id: "photo-1", media_type: "image", file: "/media/projects/visionbridge/photo.jpg", caption: "Prototype" }
export const PROJECTS = [
  {
    id: "visionbridge",
    title: "VisionBridge — Assistive Smart Glasses",
    technologies: "React Native · Django · Python · Computer Vision · Raspberry Pi",
    description: "An assistive smart glasses prototype combining computer vision, object and obstacle detection, text reading, and voice interaction to support people with visual impairments. Our team placed second at Hult Prize Rwanda nationals.",
    github_url: "", // Add the exact repository URL when ready
    live_url: "",
    featured: true,
    media: [ { id: "walkthrough", media_type: "image", file: "/media/projects/visionbridge/hult.JPG" }], // Add images/videos using the examples above
    links: [{ id: "demo", media_type: "video", url: "https://youtu.be/Pb3vPxOt0W8?si=D-PH3gTwseLE4jJU", caption: "Demo" },
      { id: "demo", media_type: "video", url: "https://youtu.be/_O7dpuWTKOI?si=diXhTgqMc3LqbuKq", caption: "Prototype" }
    ],
  },
  {
    id: "opportune",
    title: "Opportune — AI Opportunity Tracker",
    technologies: "React · Django REST Framework · PostgreSQL · AI · Brevo",
    description: "An AI-assisted platform that extracts application details from opportunity links, tracks deadlines, organizes requirements, and supports email reminders.",
    github_url: "https://github.com/maramyaser/Opportune",
    live_url: "https://opportune.site",
    featured: false,
    media: [],
    links: [ { id: "demo", media_type: "video", url: "https://drive.google.com/file/d/16rNw0Lm911g-ivaZUDvsAfr5GxRAlzV3/view?usp=drive_link", caption: "Demo" }],
  },
  {
    id: "stock-prediction",
    title: "Stock Prediction Portal",
    technologies: "React · Django REST Framework · Python · TensorFlow · LSTM · yfinance",
    description: "A stock prediction application combining a React interface with Django APIs and machine learning models for time-series analysis.",
    github_url: "https://github.com/maramyaser/stock-prediciation-portal",
    live_url: "",
    featured: false,
    media: [],
    links: [],
  },
];
