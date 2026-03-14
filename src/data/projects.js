export const projectFilters = [
	{ id: 'all', label: 'All' },
	{ id: 'ml', label: 'ML / AI' },
	{ id: 'web', label: 'React' },
]

export const projects = [
	{
		id: 'credit-risk-classifier',
		category: 'ml',
		type: 'Kaggle Competition',
		title: 'Credit Risk Classifier',
		description:
			'Ensemble model predicting loan defaults. Top 8% leaderboard using XGBoost and advanced feature engineering.',
		tags: ['Python', 'XGBoost', 'Pandas', 'SHAP'],
		links: [
			{ label: 'GitHub', href: '#' },
			{ label: 'Kaggle', href: '#' },
		],
	},
	{
		id: 'devboard-task-manager',
		category: 'web',
		type: 'React Web App',
		title: 'DevBoard - Task Manager',
		description:
			'Kanban-style task manager with drag and drop, real-time sync, and team collaboration workflows.',
		tags: ['React', 'Tailwind', 'Firebase', 'DnD'],
		links: [
			{ label: 'Live Demo', href: '#' },
			{ label: 'GitHub', href: '#' },
		],
	},
	{
		id: 'sentimentai-dashboard',
		category: 'ml',
		type: 'Hackathon - 2nd Place',
		title: 'SentimentAI Dashboard',
		description:
			'Real-time social sentiment analysis processing high-volume streams with a fine-tuned transformer pipeline.',
		tags: ['BERT', 'React', 'FastAPI', 'HuggingFace'],
		links: [
			{ label: 'Live Demo', href: '#' },
			{ label: 'GitHub', href: '#' },
		],
	},
]