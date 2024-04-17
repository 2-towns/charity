import cookie from 'cookie';
import createHttpError from 'http-errors';
import crypto from 'node:crypto';
import validator from 'validator';
import { AdminService } from '../services/login.service.js';
import { SessionService } from '../services/session.service.js';
import { ModalHTML } from '../templates/modal.template.js';
import { MAX_AGE_IN_SEC, SESSION_NAME } from '../util/constants.js';
import { CharityRequest, CharityResponse } from '../util/http.js';
import { logger } from '../util/logger.js';
import { URLs } from '../util/urls.js';

export async function loginApiRoute(req: CharityRequest, res: CharityResponse) {
	const body = await req.body();
	const login = body.get('login')
	const password = body.get('password')

	if (validator.isEmpty(login)) {
		throw createHttpError(400, "Le login est requis !")

	}

	if (validator.isEmpty(password)) {
		throw createHttpError(400, "Le code ou mot de passe est requis !")
	}

	const user = await AdminService.get(login)

	if (!user) {
		logger.log("auth_invalid", `L'utilisateur n'existe pas`);

		throw createHttpError(400, "L'utilisateur n'existe pas !")
	}

	if (user.type === "user") {
		if (!user.password) {
			logger.log("auth_invalid", `Expired code.`);

			throw createHttpError(400, "Le code est expiré !")
		}

		if (password !== user.password) {
			logger.log("auth_invalid", `The password does not match.`);

			throw createHttpError(400, "Le code est incorrect !")
		}

		// await UserService.clear(user)
	} else {
		const md5 = crypto.createHash('sha256').update(password).digest('hex');

		if (!crypto.timingSafeEqual(Buffer.from(md5), Buffer.from(user.password))) {
			logger.log("auth_invalid", `The password does not match.`);

			res.html(ModalHTML({
				title: "Erreur",
				message: "Mauvais mot de passe !"
			}));

			return;
		}
	}

	const sessionID = crypto.randomBytes(24).toString('hex');

	await SessionService.set(sessionID, user)

	const c = cookie.serialize(SESSION_NAME, sessionID, {
		maxAge: MAX_AGE_IN_SEC,
		httpOnly: true,
		path: '/',
		secure: true,
		sameSite: 'strict',
		priority: 'high',
	});

	res.setHeader('Set-Cookie', c);
	res.setHeader("HX-Redirect", URLs.beneficiaries.list)
	res.end()
}
