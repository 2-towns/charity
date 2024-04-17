import crypto from 'crypto';
import createHttpError from 'http-errors';
import nodemailer from 'nodemailer';
import validator from 'validator';
import { NoSqlRepository } from '../repositories/nosql.repository.js';
import { AuthUser, User } from '../types.js';
import { RedisKey } from '../util/constants.js';
import { logger } from '../util/logger.js';

class UserServiceClass {
	private async validate(body: Map<string, string>) {
		const email = body.get('email') ?? '';
		const firstName = body.get('firstName') ?? '';
		const lastName = body.get('lastName') ?? '';
		const phone = body.get('phone') ?? '';

		if (validator.isEmpty(firstName)) {
			logger.log('validation_vailed', `The firstName is not fullfilled (${firstName}).`);

			throw createHttpError(400, `Le champ prénom est incorrect.`);
		}

		if (validator.isEmpty(lastName)) {
			logger.log('validation_vailed', `The lastName is not fullfilled (${lastName}).`);

			throw createHttpError(400, `Le champ nom est incorrect.`);
		}

		if (!validator.isMobilePhone(phone, "fr-FR")) {
			logger.log('validation_vailed', `The phone is not fullfilled (${phone}).`);

			throw createHttpError(400, `Le champ téléphone est incorrect.`);
		}

		if (!validator.isEmail(email)) {
			logger.log('validation_vailed', `The email is not fullfilled (${email}).`);

			throw createHttpError(400, `Le champ email est incorrect.`);
		}

		const key = `${RedisKey.User}-${email}`;
		const existing = await NoSqlRepository.get(key);

		if (existing) {
			logger.log('data_duplicate', `The user ${email} exists already.`);

			throw createHttpError(400, `L' utilisateur ${email} existe déjà.`);
		}

		const user: User = {
			firstName,
			lastName,
			login: email,
			type: 'user',
			password: crypto.randomUUID(),
			phone
		};

		return user;
	}

	async create(body: Map<string, string>) {
		const user = await this.validate(body);
		const key = `${RedisKey.User}-${user.login}`;

		await NoSqlRepository.set(key, user);

		this.sendEmail(user).catch(e => {
			console.info(e)
		})

		return NoSqlRepository.set(key, user);
	}

	async code(body: Map<string, string>) {
		const email = body.get('email') ?? '';

		if (!validator.isEmail(email)) {
			logger.log('validation_vailed', `The email is not fullfilled (${email}).`);

			throw createHttpError(400, `Le champ email est incorrect.`);
		}

		const key = `${RedisKey.User}-${email}`;

		const user = await NoSqlRepository.get(key);

		if (!user) {
			logger.log('validation_vailed', `The email does not exist (${email}).`);

			throw createHttpError(400, `L'utilisateur n'existe pas.`);
		}

		const password = crypto.randomUUID();

		await NoSqlRepository.set(key, { ...user, password });

		this.sendEmail({ login: email, password });
	}

	async sendEmail(user: Pick<User, 'login' | 'password'>) {
		const testAccount = await nodemailer.createTestAccount();

		const host = process.env['EMAIL_HOST'] ?? 'smtp.ethereal.email';
		const auth = {
			user: process.env['EMAIL_USER'] ?? testAccount.user,
			pass: process.env['EMAIL_PASS'] ?? testAccount.pass,
		};

		const transporter = nodemailer.createTransport({
			host,
			port: 587,
			secure: false,
			auth,
		});

		const info = await transporter.sendMail({
			from: `"Charity" <${process.env['EMAIL_USER']}>`,
			to: user.login,
			subject: 'Code de connexion',
			text: `Votre code est ${user.password} . Vous pouvez vous connecter depuis: ${process.env['USER_LOGIN_URL']}.`,
			html: `<b>Votre code est ${user.password} . Vous pouvez vous connecter depuis: ${process.env['USER_LOGIN_URL']}</b>`,
		});

		console.log('Message sent: %s', info.messageId);

		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	}

	list(page: number) {
		return NoSqlRepository.list<User>(RedisKey.User, page);
	}

	remove(email: string) {
		const key = `${RedisKey.User}-${email}`;

		return NoSqlRepository.remove(key);
	}

	clear(user: AuthUser) {
		const key = `${RedisKey.User}-${user.login}`;

		console.info({ ...user, password: '' });

		return NoSqlRepository.set(key, { ...user, password: '' });
	}
}

export const UserService = new UserServiceClass();
