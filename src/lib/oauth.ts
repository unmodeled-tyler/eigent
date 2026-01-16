// OAuth disabled for local-only version
// This is a stub to maintain compatibility with existing code

const EnvOauthInfoMap = {
	notion: "NOTION_TOKEN",
};

export class OAuth {
	public client_name: string = 'Node';
	public client_uri: string = 'https://node.ai/';
	public redirect_uris: string[] = [];
	public url: string = '';
	public authServerUrl: string = '';
	public resourcePath: string = '/.well-known/oauth-protected-resource';
	public authorizationServerPath: string = '/.well-known/oauth-authorization-server';
	public resourceMetadata: any;
	public authorizationServerMetadata: any;
	public registerClientData: any;
	public codeVerifier: string = '';
	public provider: string = '';

	constructor(mcpName?: string) {
		console.warn('OAuth disabled in local-only version');
	}

	async startOauth(mcpName: string) {
		console.warn('OAuth disabled in local-only version');
		throw new Error('OAuth is disabled in local-only version');
	}

	async getResourceMetadata() {
		return {};
	}

	async getAuthorizationServerMetadata() {
		return {};
	}

	async clientRegistration() {
		return {};
	}

	async generateAuthUrl() {
		return '';
	}

	async exchangeCode(code: string) {
		return {};
	}

	async refreshAccessToken(refresh_token: string) {
		return {};
	}

	getAuthTokenByName(provider: string, email: string) {
		return null;
	}

	getAuthToken() {
		return null;
	}

	setAuthToken(token: any) {
		// No-op
	}

	removeAuthToken() {
		// No-op
	}

	getOauthInfo(mcpName: string) {
		return null;
	}
}

export default OAuth;
