import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class HdwLinkedinManagement implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HDW LinkedIn Management',
		name: 'hdwLinkedinManagement',
		icon: 'file:hdw_logo.png',
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Manage LinkedIn accounts through Horizon Data Wave API',
		defaults: {
			name: 'HDW LinkedIn Management',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'hdwLinkedinApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'User', value: 'user' },
					{ name: 'Chat', value: 'chat' },
					{ name: 'Post', value: 'post' },
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
						name: 'Send Connection',
						value: 'sendConnection',
						description: 'Send a connection invitation to a LinkedIn user',
						action: 'Send a connection invitation to a linked in user',
					},
					{
						name: 'Get Connections',
						value: 'getConnections',
						description: 'Get user connections',
						action: 'Get user connections',
					},
					{
						name: 'Get Profile (Me)',
						value: 'getMe',
						description: 'Get current LinkedIn user profile',
						action: 'Get current linked in user profile',
					},
				],
				default: 'sendConnection',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['chat'] } },
				options: [
					{
						name: 'Send Message',
						value: 'sendMessage',
						description: 'Send a chat message to a LinkedIn user',
						action: 'Send a chat message to a linked in user',
					},
					{
						name: 'Get Messages',
						value: 'getMessages',
						description: 'Get chat messages with a LinkedIn user',
						action: 'Get chat messages with a linked in user',
					},
					{
						name: 'Get Conversations',
						value: 'getConversations',
						description: 'Get all LinkedIn conversations',
						action: 'Get all linked in conversations',
					},
				],
				default: 'sendMessage',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['post'] } },
				options: [
					{
						name: 'Create Post',
						value: 'createPost',
						description: 'Create a LinkedIn post',
						action: 'Create a linked in post',
					},
					{
						name: 'Create Comment',
						value: 'createComment',
						description: 'Create a comment on a LinkedIn post',
						action: 'Create a comment on a linked in post',
					},
				],
				default: 'createPost',
			},
			{
				displayName: 'User URN',
				name: 'user',
				type: 'string',
				required: true,
				default: '',
				description: 'LinkedIn User URN (must include prefix, e.g. fsd_profile:ACoAA...)',
				displayOptions: { show: { resource: ['user'], operation: ['sendConnection'] } },
			},
			{
				displayName: 'Connected After',
				name: 'connectedAfter',
				type: 'number',
				default: '',
				required: false,
				description: 'Filter users that were connected after this timestamp',
				displayOptions: { show: { resource: ['user'], operation: ['getConnections'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 20,
				description: 'Maximum number of connections to return',
				displayOptions: { show: { resource: ['user'], operation: ['getConnections'] } },
			},
			{
				displayName: 'User URN',
				name: 'user',
				type: 'string',
				required: true,
				default: '',
				description: 'LinkedIn User URN (must include prefix, e.g. fsd_profile:ACoAA...)',
				displayOptions: { show: { resource: ['chat'], operation: ['sendMessage', 'getMessages'] } },
			},
			{
				displayName: 'Company URN',
				name: 'company',
				type: 'string',
				required: false,
				default: '',
				description: 'Company URN where the account is admin (must include prefix, e.g. company:1441)',
				displayOptions: { show: { resource: ['chat'], operation: ['sendMessage', 'getMessages', 'getConversations'] } },
			},
			{
				displayName: 'Message Text',
				name: 'text',
				type: 'string',
				required: true,
				default: '',
				description: 'The message text to send',
				displayOptions: { show: { resource: ['chat'], operation: ['sendMessage'] } },
			},
			{
				displayName: 'Connected After',
				name: 'connectedAfter',
				type: 'number',
				default: '',
				required: false,
				description: 'Filter conversations created after this timestamp',
				displayOptions: { show: { resource: ['chat'], operation: ['getConversations'] } },
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				default: 20,
				description: 'Maximum number of conversations to return',
				displayOptions: { show: { resource: ['chat'], operation: ['getConversations'] } },
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				required: true,
				default: '',
				description: 'Post text content',
				displayOptions: { show: { resource: ['post'], operation: ['createPost', 'createComment'] } },
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
				displayName: 'Post/Comment URN',
				name: 'urn',
				type: 'string',
				required: true,
				default: '',
				description: 'URN of the activity or comment to comment on (e.g., "activity:123" or "comment:(activity:123,456)")',
				displayOptions: { show: { resource: ['post'], operation: ['createComment'] } },
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 300,
				description: 'Timeout in seconds',
			},
		]
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('hdwLinkedinApi');
		if (!credentials) {
			// eslint-disable-next-line n8n-nodes-base/node-execute-block-wrong-error-thrown
			throw new Error('No credentials provided!');
		}

		const accountId = credentials.accountId as string;
		if (!accountId) {
			// eslint-disable-next-line n8n-nodes-base/node-execute-block-wrong-error-thrown
			throw new Error('Account ID is missing in credentials!');
		}

		const baseURL = 'https://api.horizondatawave.ai';

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				const timeout = this.getNodeParameter('timeout', i) as number;

				let endpoint = '';
				const body: Record<string, any> = {
					timeout,
					account_id: accountId,
				};

				if (resource === 'user') {
					if (operation === 'sendConnection') {
						endpoint = '/api/linkedin/management/user/connection';
						body.user = this.getNodeParameter('user', i) as string;
					} else if (operation === 'getConnections') {
						endpoint = '/api/linkedin/management/user/connections';
						const connectedAfter = this.getNodeParameter('connectedAfter', i, '') as string;
						if (connectedAfter) {
							body.connected_after = connectedAfter;
						}
						body.count = this.getNodeParameter('count', i) as number;
					} else if (operation === 'getMe') {
						endpoint = '/api/linkedin/management/me';
					}
				} else if (resource === 'chat') {
					const company = this.getNodeParameter('company', i, '') as string;
					if (company) {
						body.company = company;
					}

					if (operation === 'sendMessage') {
						endpoint = '/api/linkedin/management/chat/message';
						body.user = this.getNodeParameter('user', i) as string;
						body.text = this.getNodeParameter('text', i) as string;
					} else if (operation === 'getMessages') {
						endpoint = '/api/linkedin/management/chat/messages';
						body.user = this.getNodeParameter('user', i) as string;
					} else if (operation === 'getConversations') {
						endpoint = '/api/linkedin/management/conversations';
						const connectedAfter = this.getNodeParameter('connectedAfter', i, '') as string;
						if (connectedAfter) {
							body.connected_after = connectedAfter;
						}
						body.count = this.getNodeParameter('count', i) as number;

						// Если указан target_user, то добавляем его в запрос
						const targetUser = this.getNodeParameter('targetUser', i, '') as string;
						if (targetUser) {
							body.target_user = targetUser;
						}
					}
				} else if (resource === 'post') {
					if (operation === 'createPost') {
						endpoint = '/api/linkedin/management/post';
						body.text = this.getNodeParameter('text', i) as string;
						body.visibility = this.getNodeParameter('visibility', i) as string;
						body.comment_scope = this.getNodeParameter('commentScope', i) as string;
					} else if (operation === 'createComment') {
						endpoint = '/api/linkedin/management/post/comment';
						body.text = this.getNodeParameter('text', i) as string;
						body.urn = this.getNodeParameter('urn', i) as string;
					}
				}

				const options = {
					method: 'POST' as const,
					url: `${baseURL}${endpoint}`,
					body,
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					json: true,
				};

				const responseData = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'hdwLinkedinApi',
					options
				);

				returnData.push({ json: responseData });
			} catch (error) {
				if (this.continueOnFail()) {
					// @ts-ignore
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
