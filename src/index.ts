import { readFile } from 'fs/promises';
import { createServer } from 'http';
import createHttpError from 'http-errors';
import path from 'path';
import { BeneficiaryCreateRoute } from './routes/beneficiary-create.route.js';
import { BeneficiaryDeleteRoute } from './routes/beneficiary-delete.route.js';
import { BeneficiaryEditRoute } from './routes/beneficiary-edit.route.js';
import { BeneficiaryListRoute } from './routes/beneficiary-list.route.js';
import { BeneficiarySearchRoute } from './routes/beneficiary-search.route.js';
import { indexRoute } from './routes/index.route.js';
import { loginApiRoute } from './routes/login-api.route.js';
import { loginRoute } from './routes/login.route.js';
import { LogoutRoute } from './routes/logout.route.js';
import { UserCodeRoute } from './routes/user-code.route.js';
import { UserCreateRoute } from './routes/user-create.route.js';
import { UserDestroyRoute } from './routes/user-destroy.route.js';
import { UserListRoute } from './routes/user-list.route.js';
import { NotFoundHTML } from './templates/404.route.js';
import { LayoutHTML } from './templates/layout.template.js';
import { Context } from './util/context.js';
import { CharityRequest, CharityResponse } from './util/http.js';
import { logger } from './util/logger.js';
import { URLs } from './util/urls.js';

const GETs = {
	[URLs.index]: indexRoute,
	[URLs.beneficiaries.list]: BeneficiaryListRoute.get,
	[URLs.beneficiaries.edit]: BeneficiaryEditRoute.get,
	[URLs.login.form]: loginRoute,
	[URLs.users.list]: UserListRoute.get,
	[URLs.users.create]: UserCreateRoute.get,
	[URLs.users.code]: UserCodeRoute.get,
};

const POSTs: { [k: string]: (req: CharityRequest, res: CharityResponse) => void } = {
	[URLs.login.api]: loginApiRoute,
	[URLs.beneficiaries.create]: BeneficiaryCreateRoute.post,
	[URLs.beneficiaries.edit]: BeneficiaryEditRoute.post,
	[URLs.logout]: LogoutRoute.post,
	[URLs.users.create]: UserCreateRoute.post,
	[URLs.users.destroy]: UserDestroyRoute.post,
	[URLs.beneficiaries.search]: BeneficiarySearchRoute.post,
	[URLs.users.code]: UserCodeRoute.post,
	[URLs.beneficiaries.delete]: BeneficiaryDeleteRoute.post,
};

async function serverAsset(req: CharityRequest, res: CharityResponse) {
	try {
		const buffer = await readFile(path.join('dist/public', req.pathname));
		if (req.pathname.endsWith('.css')) {
			res.writeHead(200, { 'Content-Type': 'text/css' });
			res.end(buffer);
		}
		else if (req.pathname.endsWith('.js')) {
			res.writeHead(200, { 'Content-Type': 'text/javascript' });
			res.end(buffer);
		}
	}
	catch (e) {
		console.error(e);
		res.writeHead(404);
		res.end('Not found');
	}
}

function defer(req: CharityRequest, res: CharityResponse, route: ((req: CharityRequest, res: CharityResponse) => void) | undefined) {
	setImmediate(async () => {
		if (!route) {
			res.writeHead(404);

			const color = req.headers["sec-ch-prefers-color-scheme"] as "dark" | "light" | undefined

			const body = LayoutHTML({ body: NotFoundHTML(), color })

			res.html(body)

			return;
		}

		try {
			logger.log("http_info", route.name)

			await route(req, res);
		} catch (e) {
			logger.log("sequence_fail", (e as Error).message)

			res.error(e as Error)
		}
	})
}

(async function () {
	const server = createServer(
		{
			IncomingMessage: CharityRequest,
			ServerResponse: CharityResponse
		},
		(req, res) => {
			const map = new Map()

			map.set("request-id", Date.now())

			if (req.method === "POST" && !req.isHx()) {
				logger.log("auth_invalid", "The user is trying to make a non HX request post.")

				res.error(createHttpError(401, "Vous n'êtes pas autorisé à faire cette action !"))

				return
			}

			Context.run(map, () => {
				logger.log("http_info", req.url ?? "")

				if (req.method === 'GET') {
					if (req.pathname.endsWith('.css') || req.pathname.endsWith('.js')) {
						serverAsset(req, res);

						return;
					}

					const route = GETs[req.pathname ?? ''];

					defer(req, res, route)
				}

				if (req.method === 'POST') {
					const route = POSTs[req.pathname ?? ''];

					defer(req, res, route)
				}
			})
		}
	);
	server.listen(8000);
	console.info('Server start on port 8000');
})().catch(err => {
	console.error('Erreur lors de l\'initialisation de l\'application:', err);
});

