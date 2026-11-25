export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Test Automation',
    items: ['Playwright', 'Appium', 'Selenium', 'Automation framework design', 'API testing', 'Regression & end-to-end suites'],
  },
  {
    title: 'Programming & Data',
    items: ['Python (test scripting)', 'SQL', 'C#'],
  },
  {
    title: 'CI/CD & Version Control',
    items: ['GitLab CI', 'Jenkins', 'TeamCity', 'Git', 'Perforce Helix Core', 'Quality gates & continuous testing'],
  },
  {
    title: 'Cloud & Containers',
    items: ['AWS', 'Amazon EC2', 'Docker', 'Kubernetes'],
  },
  {
    title: 'Performance & Device Testing',
    items: ['Performance & load testing', 'AWS Device Farm', 'Xcode', 'Android Studio'],
  },
  {
    title: 'Observability & Analytics',
    items: ['Grafana', 'Dynatrace', 'Firebase', 'Elasticsearch', 'Google Analytics'],
  },
  {
    title: 'AI & GenAI',
    items: [
      'Prompt engineering',
      'AI-assisted test generation',
      'LLM output evaluation',
      'AI build validation',
      'Agentic playtest automation (prototype nearing production)',
    ],
  },
  {
    title: 'Testing Practices',
    items: [
      'Exploratory & context-driven testing',
      'Shift-Left & Shift-Right',
      'Risk assessment',
      'Test-data management',
      'Root-cause analysis',
    ],
  },
  {
    title: 'Test Management & Delivery',
    items: ['Jira', 'Xray', 'TestRail', 'Confluence', 'Allure Report', 'Agile/Scrum', 'App Store Connect', 'Google Play Console', 'Steam dashboard'],
  },
];
