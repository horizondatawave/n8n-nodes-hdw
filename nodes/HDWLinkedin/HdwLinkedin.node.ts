import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class HdwLinkedin implements INodeType {

	description: INodeTypeDescription = {
		displayName: 'HDW LinkedIn',
		name: 'hdwLinkedin',
		icon: 'file:hdw_logo.png',
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Integrate with Horizon Data Wave LinkedIn API',
		defaults: {
			name: 'HDW LinkedIn',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'hdwLinkedinApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.horizondatawave.ai',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'User', value: 'user' },
					{ name: 'Email', value: 'email' },
					{ name: 'Post', value: 'post' },
					{ name: 'Company', value: 'company' },
					{ name: 'Search', value: 'search' },
					{ name: 'Google', value: 'google' },
					{ name: 'Group', value: 'group' }
				],
				default: 'user',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['user'] } },
				options: [
					{
						name: 'Search',
						value: 'search',
						description: 'Search for LinkedIn users',
						action: 'Search for linked in users',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/search/users',
								body: {
									keywords: '={{$parameter["keywords"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
					{
						name: 'Get Profile',
						value: 'getProfile',
						description: 'Get LinkedIn user profile',
						action: 'Get linked in user profile',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/user',
								body: {
									user: '={{$parameter["user"]}}',
									with_experience: '={{$parameter["withExperience"]}}',
									with_education: '={{$parameter["withEducation"]}}',
									with_skills: '={{$parameter["withSkills"]}}',
								},
							},
						},
					},
					{
						name: 'Get Posts',
						value: 'getPosts',
						description: 'Get LinkedIn user posts',
						action: 'Get linked in user posts',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/user/posts',
								body: {
									urn: '={{$parameter["urn"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
					{
						name: 'Get Reactions',
						value: 'getReactions',
						description: 'Get LinkedIn user reactions',
						action: 'Get linked in user reactions',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/user/reactions',
								body: {
									urn: '={{$parameter["urn"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
				],
				default: 'search',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['email'] } },
				options: [
					{
						name: 'Get User by Email',
						value: 'getUserByEmail',
						description: 'Find LinkedIn user by email',
						action: 'Find linked in user by email',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/email/user',
								body: {
									email: '={{$parameter["email"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
				],
				default: 'getUserByEmail',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['post'] } },
				options: [
					{
						name: 'Get Post Comments',
						value: 'getPostComments',
						description: 'Get comments on a LinkedIn post',
						action: 'Get linked in post comments',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/post/comments',
								body: {
									urn: '={{$parameter["urn"]}}',
									sort: '={{$parameter["sort"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
					{
						name: 'Get Post Reposts',
						value: 'getPostReposts',
						description: 'Get reposts of a LinkedIn post',
						action: 'Get linked in post reposts',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/post/reposts',
								body: {
									urn: '={{$parameter["urn"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					}
				],
				default: 'getPostComments',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['company'] } },
				options: [
					{
						name: 'Get Company',
						value: 'getCompany',
						description: 'Get LinkedIn company information',
						action: 'Get linked in company information',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/company',
								body: {
									company: '={{$parameter["company"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
					{
						name: 'Get Company Employees',
						value: 'getCompanyEmployees',
						description: 'Get employees of a LinkedIn company',
						action: 'Get linked in company employees',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/company/employees',
								body: {
									companies: '={{$parameter["companies"]}}',
									keywords: '={{$parameter["keywords"]}}',
									first_name: '={{$parameter["firstName"]}}',
									last_name: '={{$parameter["lastName"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
					{
						name: 'Get Company Posts',
						value: 'getCompanyPosts',
						description: 'Get posts from a LinkedIn company',
						action: 'Get linked in company posts',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/company/posts',
								body: {
									urn: '={{$parameter["urn"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
				],
				default: 'getCompany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['search'] } },
				options: [
					{
						name: 'Sales Navigator Search',
						value: 'salesNavigatorSearch',
						description: 'Advanced LinkedIn search using Sales Navigator',
						action: 'Search linked in with sales navigator',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/sn_search/users',
								body: {
									keywords: '={{$parameter["keywords"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
					{
						name: 'Search Jobs',
						value: 'searchJobs',
						description: 'Search for LinkedIn jobs',
						action: 'Search for linked in jobs',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/search/jobs',
								body: {
									keywords: '={{$parameter["keywords"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
					{
						name: 'Search Companies',
						value: 'searchCompanies',
						description: 'Search for LinkedIn companies',
						action: 'Search for linked in companies',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/search/companies',
								body: {
									keywords: '={{$parameter["keywords"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
					{
						name: 'Search Industries',
						value: 'searchIndustries',
						description: 'Search for LinkedIn industries',
						action: 'Search for linked in industries',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/search/industries',
								body: {
									name: '={{$parameter["name"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
					{
						name: 'Search Locations',
						value: 'searchLocations',
						description: 'Search for LinkedIn locations',
						action: 'Search for linked in locations',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/search/locations',
								body: {
									name: '={{$parameter["name"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
				],
				default: 'salesNavigatorSearch',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['google'] } },
				options: [
					{
						name: 'Search Companies',
						value: 'searchCompanies',
						description: 'Search for LinkedIn companies using Google',
						action: 'Search for linked in companies via google',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/google/company',
								body: {
									keywords: '={{$parameter["keywords"]}}',
									with_urn: '={{$parameter["withUrn"]}}',
									count_per_keyword: '={{$parameter["countPerKeyword"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
					{
						name: 'Google Search',
						value: 'googleSearch',
						description: 'Perform a Google search',
						action: 'Perform a google search',
						routing: {
							request: {
								method: 'POST',
								url: '/api/google/search',
								body: {
									query: '={{$parameter["query"]}}',
									count: '={{$parameter["count"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
				],
				default: 'searchCompanies',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['group'] } },
				options: [
					{
						name: 'Get Group',
						value: 'getGroup',
						description: 'Get LinkedIn group information',
						action: 'Get linked in group information',
						routing: {
							request: {
								method: 'POST',
								url: '/api/linkedin/group',
								body: {
									group: '={{$parameter["group"]}}',
									timeout: '={{$parameter["timeout"]}}',
								},
							},
						},
					},
				],
				default: 'getGroup',
			},
			{
				displayName: 'Keywords',
				name: 'keywords',
				type: 'string',
				default: '',
				placeholder: 'software engineer',
				description: 'Any keyword for searching in the user page',
				displayOptions: { show: { resource: ['user'], operation: ['search'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 10,
				description: 'Maximum number of results (max 1000)',
				displayOptions: { show: { resource: ['user'], operation: ['search'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds (20-1500)',
				displayOptions: { show: { resource: ['user'], operation: ['search'] } },
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['user'], operation: ['search'] } },
				options: [
					{
						displayName: 'First Name',
						name: 'first_name',
						type: 'string',
						default: '',
						description: 'Exact first name',
						routing: { request: { body: { first_name: '={{$value}}' } } }
					},
					{
						displayName: 'Last Name',
						name: 'last_name',
						type: 'string',
						default: '',
						description: 'Exact last name',
						routing: { request: { body: { last_name: '={{$value}}' } } }
					},
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
						description: 'Exact word in the title',
						routing: { request: { body: { title: '={{$value}}' } } }
					},
					{
						displayName: 'Company Keywords',
						name: 'company_keywords',
						type: 'string',
						default: '',
						description: 'Exact word in the company name',
						routing: { request: { body: { company_keywords: '={{$value}}' } } }
					},
					{
						displayName: 'School Keywords',
						name: 'school_keywords',
						type: 'string',
						default: '',
						description: 'Exact word in the school name',
						routing: { request: { body: { school_keywords: '={{$value}}' } } }
					},
					{
						displayName: 'Current Company',
						name: 'current_company',
						type: 'string',
						default: '',
						description: 'Company URN or name',
						routing: { request: { body: { current_company: '={{$value}}' } } }
					},
					{
						displayName: 'Past Company',
						name: 'past_company',
						type: 'string',
						default: '',
						description: 'Past company URN or name',
						routing: { request: { body: { past_company: '={{$value}}' } } }
					},
					{
						displayName: 'Location',
						name: 'location',
						type: 'string',
						default: '',
						description: 'Location name or URN',
						routing: { request: { body: { location: '={{$value}}' } } }
					},
					{
						displayName: 'Industry',
						name: 'industry',
						type: 'string',
						default: '',
						description: 'Industry URN or name',
						routing: { request: { body: { industry: '={{$value}}' } } }
					},
					{
						displayName: 'Education',
						name: 'education',
						type: 'string',
						default: '',
						description: 'Education URN or name',
						routing: { request: { body: { education: '={{$value}}' } } }
					},
				],
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				required: true,
				default: '',
				description: 'User alias, URL, or URN',
				displayOptions: { show: { resource: ['user'], operation: ['getProfile'] } },
			},
			{
				displayName: 'Include Experience',
				name: 'withExperience',
				type: 'boolean',
				default: true,
				description: 'Whether to include experience information',
				displayOptions: { show: { resource: ['user'], operation: ['getProfile'] } },
			},
			{
				displayName: 'Include Education',
				name: 'withEducation',
				type: 'boolean',
				default: true,
				description: 'Whether to include education information',
				displayOptions: { show: { resource: ['user'], operation: ['getProfile'] } },
			},
			{
				displayName: 'Include Skills',
				name: 'withSkills',
				type: 'boolean',
				default: true,
				description: 'Whether to include skills information',
				displayOptions: { show: { resource: ['user'], operation: ['getProfile'] } },
			},
			{
				displayName: 'User URN',
				name: 'urn',
				type: 'string',
				required: true,
				default: '',
				description: 'User URN (must include prefix, e.g. fsd_profile:ACoAA...)',
				displayOptions: { show: { resource: ['user'], operation: ['getPosts', 'getReactions'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 10,
				description: 'Maximum number of results',
				displayOptions: { show: { resource: ['user'], operation: ['getPosts', 'getReactions'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['user'], operation: ['getPosts', 'getReactions'] } },
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				required: true,
				default: '',
				description: 'Email address to search for',
				displayOptions: { show: { resource: ['email'], operation: ['getUserByEmail'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 5,
				description: 'Maximum number of results',
				displayOptions: { show: { resource: ['email'], operation: ['getUserByEmail'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['email'], operation: ['getUserByEmail'] } },
			},
			{
				displayName: 'Post URN',
				name: 'urn',
				type: 'string',
				required: true,
				default: '',
				description: 'Post URN (must include prefix, e.g. activity:7234173400267538433)',
				displayOptions: { show: { resource: ['post'], operation: ['getPostComments', 'getPostReposts'] } },
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Relevance', value: 'relevance' },
					{ name: 'Recent', value: 'recent' },
				],
				default: 'relevance',
				description: 'Sort type for comments',
				displayOptions: { show: { resource: ['post'], operation: ['getPostComments'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 10,
				description: 'Maximum number of results',
				displayOptions: { show: { resource: ['post'], operation: ['getPostComments', 'getPostReposts'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['post'], operation: ['getPostComments', 'getPostReposts'] } },
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				required: true,
				default: '',
				description: 'Text content of the post',
				displayOptions: { show: { resource: ['post'], operation: ['createPost'] } },
			},
			{
				displayName: 'Visibility',
				name: 'visibility',
				type: 'options',
				options: [
					{ name: 'Anyone', value: 'ANYONE' },
					{ name: 'Connections Only', value: 'CONNECTIONS_ONLY' },
				],
				default: 'ANYONE',
				description: 'Post visibility',
				displayOptions: { show: { resource: ['post'], operation: ['createPost'] } },
			},
			{
				displayName: 'Comment Scope',
				name: 'commentScope',
				type: 'options',
				options: [
					{ name: 'All', value: 'ALL' },
					{ name: 'Connections Only', value: 'CONNECTIONS_ONLY' },
					{ name: 'None', value: 'NONE' },
				],
				default: 'ALL',
				description: 'Who can comment on the post',
				displayOptions: { show: { resource: ['post'], operation: ['createPost'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['post'], operation: ['createPost'] } },
			},
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				required: true,
				default: '',
				description: 'Company alias, URL or URN (e.g. "openai" or "company:1441")',
				displayOptions: { show: { resource: ['company'], operation: ['getCompany'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['company'], operation: ['getCompany'] } },
			},
			{
				displayName: 'Companies',
				name: 'companies',
				type: 'string',
				required: true,
				default: '',
				description: 'Company URNs (comma-separated list, e.g. "company:14064608,company:1441")',
				displayOptions: { show: { resource: ['company'], operation: ['getCompanyEmployees'] } },
				routing: {
					send: {
						type: 'body',
						property: 'companies',
						value: '={{ $value.split(",").map(item => item.trim()) }}',
					},
				},
			},
			{
				displayName: 'Keywords',
				name: 'keywords',
				type: 'string',
				default: '',
				description: 'Any keyword for searching employees',
				displayOptions: { show: { resource: ['company'], operation: ['getCompanyEmployees'] } },
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'Search for exact first name',
				displayOptions: { show: { resource: ['company'], operation: ['getCompanyEmployees'] } },
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Search for exact last name',
				displayOptions: { show: { resource: ['company'], operation: ['getCompanyEmployees'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 10,
				description: 'Maximum number of results',
				displayOptions: { show: { resource: ['company'], operation: ['getCompanyEmployees'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['company'], operation: ['getCompanyEmployees'] } },
			},
			{
				displayName: 'Company URN',
				name: 'urn',
				type: 'string',
				required: true,
				default: '',
				description: 'Company URN, only company urn type is allowed (e.g. "company:11130470")',
				displayOptions: { show: { resource: ['company'], operation: ['getCompanyPosts'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 10,
				description: 'Maximum number of results',
				displayOptions: { show: { resource: ['company'], operation: ['getCompanyPosts'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['company'], operation: ['getCompanyPosts'] } },
			},
			{
				displayName: 'Group',
				name: 'group',
				type: 'string',
				required: true,
				default: '',
				description: 'Group URN or URL',
				displayOptions: { show: { resource: ['group'], operation: ['getGroup'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['group'], operation: ['getGroup'] } },
			},
			{
				displayName: 'Keywords',
				name: 'keywords',
				type: 'string',
				default: '',
				description: 'Any keyword for searching in the user profile',
				displayOptions: { show: { resource: ['search'], operation: ['salesNavigatorSearch'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 10,
				description: 'Maximum number of results (max 2500)',
				displayOptions: { show: { resource: ['search'], operation: ['salesNavigatorSearch'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds (20-1500)',
				displayOptions: { show: { resource: ['search'], operation: ['salesNavigatorSearch'] } },
			},
			{
				displayName: 'Additional Filters',
				name: 'additionalFilters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: { show: { resource: ['search'], operation: ['salesNavigatorSearch'] } },
				options: [
					{
						displayName: 'First Names',
						name: 'first_names',
						type: 'string',
						default: '',
						description: 'Comma-separated list of exact first names',
						routing: {
							send: {
								type: 'body',
								property: 'first_names',
								value: '={{ $value.split(",").map(item => item.trim()) }}',
							},
						}
					},
					{
						displayName: 'Last Names',
						name: 'last_names',
						type: 'string',
						default: '',
						description: 'Comma-separated list of exact last names',
						routing: {
							send: {
								type: 'body',
								property: 'last_names',
								value: '={{ $value.split(",").map(item => item.trim()) }}',
							},
						}
					},
					{
						displayName: 'Current Titles',
						name: 'current_titles',
						type: 'string',
						default: '',
						description: 'Comma-separated list of exact words in current titles',
						routing: {
							send: {
								type: 'body',
								property: 'current_titles',
								value: '={{ $value.split(",").map(item => item.trim()) }}',
							},
						}
					},
					{
						displayName: 'Location',
						name: 'location',
						type: 'string',
						default: '',
						description: 'Location name or URN',
						routing: { request: { body: { location: '={{$value}}' } } }
					},
					{
						displayName: 'Industry',
						name: 'industry',
						type: 'string',
						default: '',
						description: 'Industry URN or name',
						routing: { request: { body: { industry: '={{$value}}' } } }
					},
					{
						displayName: 'Current Companies',
						name: 'current_companies',
						type: 'string',
						default: '',
						description: 'Current company URN or name',
						routing: { request: { body: { current_companies: '={{$value}}' } } }
					},
					{
						displayName: 'Past Companies',
						name: 'past_companies',
						type: 'string',
						default: '',
						description: 'Past company URN or name',
						routing: { request: { body: { past_companies: '={{$value}}' } } }
					},
					{
						displayName: 'Company Sizes',
						name: 'company_sizes',
						type: 'multiOptions',
						options: [
							{ name: 'Self-Employed', value: 'Self-employed' },
							{ name: '1-10', value: '1-10' },
							{ name: '11-50', value: '11-50' },
							{ name: '51-200', value: '51-200' },
							{ name: '201-500', value: '201-500' },
							{ name: '501-1,000', value: '501-1,000' },
							{ name: '1,001-5,000', value: '1,001-5,000' },
							{ name: '5,001-10,000', value: '5,001-10,000' },
							{ name: '10,001+', value: '10,001+' },
						],
						default: [],
						description: 'Company size ranges',
					},
					{
						displayName: 'Languages',
						name: 'languages',
						type: 'multiOptions',
						options: [
							{ name: 'Arabic', value: 'Arabic' },
							{ name: 'English', value: 'English' },
							{ name: 'Spanish', value: 'Spanish' },
							{ name: 'Portuguese', value: 'Portuguese' },
							{ name: 'Chinese', value: 'Chinese' },
							{ name: 'French', value: 'French' },
							{ name: 'Italian', value: 'Italian' },
							{ name: 'Russian', value: 'Russian' },
							{ name: 'German', value: 'German' },
							{ name: 'Dutch', value: 'Dutch' },
							{ name: 'Turkish', value: 'Turkish' },
							{ name: 'Tagalog', value: 'Tagalog' },
							{ name: 'Polish', value: 'Polish' },
							{ name: 'Korean', value: 'Korean' },
							{ name: 'Japanese', value: 'Japanese' },
							{ name: 'Malay', value: 'Malay' },
							{ name: 'Norwegian', value: 'Norwegian' },
							{ name: 'Danish', value: 'Danish' },
							{ name: 'Romanian', value: 'Romanian' },
							{ name: 'Swedish', value: 'Swedish' },
							{ name: 'Bahasa Indonesia', value: 'Bahasa Indonesia' },
							{ name: 'Czech', value: 'Czech' },
						],
						default: [],
						description: 'Profile languages',
					},
				],
			},
			// Parameters for Search Jobs
			{
				displayName: 'Keywords',
				name: 'keywords',
				type: 'string',
				default: '',
				description: 'Any keyword for searching jobs. For exact search put desired keywords into brackets.',
				displayOptions: { show: { resource: ['search'], operation: ['searchJobs'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 10,
				description: 'Maximum number of results',
				displayOptions: { show: { resource: ['search'], operation: ['searchJobs'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['search'], operation: ['searchJobs'] } },
			},
			{
				displayName: 'Additional Filters',
				name: 'additionalFilters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: { show: { resource: ['search'], operation: ['searchJobs'] } },
				options: [
					{
						displayName: 'Sort',
						name: 'sort',
						type: 'options',
						options: [
							{ name: 'Recent', value: 'recent' },
							{ name: 'Relevant', value: 'relevant' },
						],
						default: 'relevant',
						description: 'Job sorting type',
						routing: { request: { body: { sort: '={{$value}}' } } }
					},
					{
						displayName: 'Experience Level',
						name: 'experience_level',
						type: 'multiOptions',
						options: [
							{ name: 'Internship', value: 'internship' },
							{ name: 'Entry Level', value: 'entry_level' },
							{ name: 'Associate', value: 'associate' },
							{ name: 'Mid-Senior', value: 'mid_senior' },
							{ name: 'Director', value: 'director' },
							{ name: 'Executive', value: 'executive' },
						],
						default: [],
						description: 'Job experience level',
						routing: { request: { body: { experience_level: '={{$value}}' } } }
					},
					{
						displayName: 'Job Types',
						name: 'job_types',
						type: 'multiOptions',
						options: [
							{ name: 'Full Time', value: 'full_time' },
							{ name: 'Part Time', value: 'part_time' },
							{ name: 'Contract', value: 'contract' },
							{ name: 'Temporary', value: 'temporary' },
							{ name: 'Internship', value: 'internship' },
							{ name: 'Other', value: 'other' },
						],
						default: [],
						description: 'Job types',
						routing: { request: { body: { job_types: '={{$value}}' } } }
					},
					{
						displayName: 'Work Types',
						name: 'work_types',
						type: 'multiOptions',
						options: [
							{ name: 'On-site', value: 'on-site' },
							{ name: 'Hybrid', value: 'hybrid' },
							{ name: 'Remote', value: 'remote' },
						],
						default: [],
						description: 'Work types',
						routing: { request: { body: { work_types: '={{$value}}' } } }
					},
					{
						displayName: 'Industry',
						name: 'industry',
						type: 'string',
						default: '',
						description: 'Industry URN (industry:*) or name',
						routing: { request: { body: { industry: '={{$value}}' } } }
					},
					{
						displayName: 'Company',
						name: 'company',
						type: 'string',
						default: '',
						description: 'Company URN (company:*) or comma-separated list of URNs',
						routing: {
							send: {
								type: 'body',
								property: 'company',
								value: '={{ $value.includes(",") ? $value.split(",").map(item => item.trim()) : $value }}',
							},
						}
					},
					{
						displayName: 'Location',
						name: 'location',
						type: 'string',
						default: 'worldwide',
						description: 'Job location',
						routing: { request: { body: { location: '={{$value}}' } } }
					},
					{
						displayName: 'From Date (timestamp)',
						name: 'from_date',
						type: 'number',
						default: '',
						description: 'Starting date for jobs search (as timestamp)',
						routing: { request: { body: { from_date: '={{$value}}' } } }
					},
					{
						displayName: 'To Date (timestamp)',
						name: 'to_date',
						type: 'number',
						default: '',
						description: 'Ending date for jobs search (as timestamp)',
						routing: { request: { body: { to_date: '={{$value}}' } } }
					},
				],
			},
			// Parameters for Search Companies
			{
				displayName: 'Keywords',
				name: 'keywords',
				type: 'string',
				default: '',
				description: 'Any keyword for searching companies. For exact search put desired keywords into brackets.',
				displayOptions: { show: { resource: ['search'], operation: ['searchCompanies'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 10,
				description: 'Maximum number of results',
				displayOptions: { show: { resource: ['search'], operation: ['searchCompanies'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['search'], operation: ['searchCompanies'] } },
			},
			{
				displayName: 'Additional Filters',
				name: 'additionalFilters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: { show: { resource: ['search'], operation: ['searchCompanies'] } },
				options: [
					{
						displayName: 'Location',
						name: 'location',
						type: 'string',
						default: '',
						description: 'Location URN (geo:*) or name',
						routing: { request: { body: { location: '={{$value}}' } } }
					},
					{
						displayName: 'Industry',
						name: 'industry',
						type: 'string',
						default: '',
						description: 'Industry URN (industry:*) or name',
						routing: { request: { body: { industry: '={{$value}}' } } }
					},
					{
						displayName: 'Employee Count',
						name: 'employee_count',
						type: 'multiOptions',
						options: [
							{ name: '1-10', value: '1-10' },
							{ name: '11-50', value: '11-50' },
							{ name: '51-200', value: '51-200' },
							{ name: '201-500', value: '201-500' },
							{ name: '501-1,000', value: '501-1000' },
							{ name: '1,001-5,000', value: '1001-5000' },
							{ name: '5,001-10,000', value: '5001-10000' },
							{ name: '10,001+', value: '10001+' },
						],
						default: [],
						description: 'Company sizes to filter by',
						routing: { request: { body: { employee_count: '={{$value}}' } } }
					},
				],
			},
			// Parameters for Search Industries
			{
				displayName: 'Industry Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				description: 'Industry name to search for',
				displayOptions: { show: { resource: ['search'], operation: ['searchIndustries'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 10,
				description: 'Maximum number of results',
				displayOptions: { show: { resource: ['search'], operation: ['searchIndustries'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['search'], operation: ['searchIndustries'] } },
			},
			// Parameters for Search Locations
			{
				displayName: 'Location Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				description: 'Location name to search for',
				displayOptions: { show: { resource: ['search'], operation: ['searchLocations'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 10,
				description: 'Maximum number of results',
				displayOptions: { show: { resource: ['search'], operation: ['searchLocations'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['search'], operation: ['searchLocations'] } },
			},
			{
				displayName: 'Keywords',
				name: 'keywords',
				type: 'string',
				required: true,
				default: '',
				description: 'Company keywords for search (comma-separated)',
				displayOptions: { show: { resource: ['google'], operation: ['searchCompanies'] } },
				routing: {
					send: {
						type: 'body',
						property: 'keywords',
						value: '={{ $value.split(",").map(item => item.trim()) }}',
					},
				},
			},
			{
				displayName: 'Include URNs',
				name: 'withUrn',
				type: 'boolean',
				default: false,
				description: 'Whether to include URNs in response (increases execution time)',
				displayOptions: { show: { resource: ['google'], operation: ['searchCompanies'] } },
			},
			{
				displayName: 'Results Per Keyword',
				name: 'countPerKeyword',
				type: 'number',
				default: 1,
				description: 'Maximum results per keyword (1-10)',
				displayOptions: { show: { resource: ['google'], operation: ['searchCompanies'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['google'], operation: ['searchCompanies'] } },
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				required: true,
				default: '',
				description: 'Search query (e.g., "python fastapi")',
				displayOptions: { show: { resource: ['google'], operation: ['googleSearch'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 10,
				description: 'Maximum number of results (1-20)',
				displayOptions: { show: { resource: ['google'], operation: ['googleSearch'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
				displayOptions: { show: { resource: ['google'], operation: ['googleSearch'] } },
			},
		]
	}
}
