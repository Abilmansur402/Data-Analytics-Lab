export const researchTopics = [
  {
    id: "clinical-prediction",
    title: "Clinical prediction models",
    description: "Predicting health outcomes from structured clinical data.",
    icon: "clinical",
  },
  {
    id: "computer-vision",
    title: "Computer vision",
    description: "Using visual signals to study behaviour and learning.",
    icon: "vision",
  },
  {
    id: "nlp-text-analysis",
    title: "NLP & text analysis",
    description: "Extracting evidence from social and unstructured text.",
    icon: "language",
  },
  {
    id: "people-hr-analytics",
    title: "People & HR analytics",
    description: "Understanding attrition, recruiting and workforce decisions.",
    icon: "people",
  },
  {
    id: "learning-analytics",
    title: "Learning analytics",
    description: "Connecting student behaviour, wellbeing and outcomes.",
    icon: "learning",
  },
  {
    id: "environmental-modelling",
    title: "Environmental modelling",
    description: "Modelling weather-related risks and natural events.",
    icon: "environment",
  },
  {
    id: "algorithms-data-structures",
    title: "Algorithms & data structures",
    description: "Comparing search methods and computational structures.",
    icon: "algorithms",
  },
] as const;

export const researchTopicIds = researchTopics.map((topic) => topic.id) as [
  (typeof researchTopics)[number]["id"],
  ...(typeof researchTopics)[number]["id"][],
];

