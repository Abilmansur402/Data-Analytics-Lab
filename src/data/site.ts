import { z } from "astro/zod";

// Add verified lab profiles here; leave the list empty until confirmed.
export const socialLinks = z.array(z.object({
  label: z.string().min(1),
  url: z.url().refine((value) => new URL(value).protocol === "https:", "Use HTTPS"),
})).parse([]);

export const lab = {
  name: "MADRID Lab",
  email: "datalab@sdu.edu.kz",
  description:
    "Machine learning, Analytics, Data Research & Intelligent Decisions. A university research lab working on methods that turn data into well-grounded decisions.",
  address: [
    "SDU University",
    "Abylai Khan Street 1/1",
    "Kaskelen, 040900",
    "Almaty Region, Kazakhstan",
  ],
} as const;

export const navigation = [
  { id: "home", label: "Home" },
  { id: "members", label: "Members" },
  { id: "research", label: "Research" },
  { id: "publications", label: "Publications" },
  { id: "openings", label: "Openings" },
  { id: "blog", label: "Blog" },
  { id: "news", label: "News" },
] as const;

export const researchAreas = [
  {
    letters: "M",
    title: "Machine learning",
    short: "Models that learn from data, and careful testing of how well they really work.",
    long: "We design and train machine learning models and put equal effort into evaluating them: how they behave on new data, where they fail, and how confident we can be in their output.",
    tags: ["Supervised learning", "Deep learning", "Model evaluation", "Interpretability"],
  },
  {
    letters: "A",
    title: "Analytics",
    short: "Finding the structure in data and explaining it clearly.",
    long: "Before any model comes understanding. We explore datasets, measure what matters and communicate results in a way that non-specialists can act on.",
    tags: ["Exploratory analysis", "Statistics", "Visualisation", "Forecasting"],
  },
  {
    letters: "DR",
    title: "Data research",
    short: "Collecting, cleaning and structuring data that research can stand on.",
    long: "Good results start with good data. We work on how datasets are gathered, labelled, cleaned and documented, so that experiments can be repeated and trusted.",
    tags: ["Data collection", "Data quality", "Datasets", "Reproducibility"],
  },
  {
    letters: "ID",
    title: "Intelligent decisions",
    short: "Turning predictions into choices people and systems can rely on.",
    long: "A prediction is only useful when it leads to a better decision. We study decision-support methods that combine models, uncertainty and human judgement.",
    tags: ["Decision support", "Optimisation", "Uncertainty", "Human-in-the-loop"],
  },
] as const;
