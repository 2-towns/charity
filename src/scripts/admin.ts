import crypto from 'node:crypto';
import { redisClient } from '../db/redis.js';
import { Admin } from '../types.js';
import { AdminService } from '../services/login.service.js';

async function main() {
	const passwordHash = crypto.createHash('sha256').update('lemoisbeni').digest('hex');
	const admin: Admin = {
		firstName: "Admin",
		lastName: "Arnaud",
		login: 'heros',
		password: passwordHash,
		type: "admin"
	};

	await redisClient.flushAll()

	const setResult = await AdminService.login(admin.login, admin)

	console.log('Admin enregistré:', setResult);

	process.exit(0)
}

main()
