import jwt from 'jsonwebtoken';


export class JWTAdapter {

	static async generateToken(payload: any, duration: number | `${number}${'s' | 'm' | 'h' | 'd'}` = '2h') {
		return new Promise((resolve) => {
			jwt.sign(payload, 'SEED', { expiresIn: duration }, (err, token) => {
				if (err) return resolve(null);
				
				resolve(token);
			});
		});
	}

	static validateToken(token: string) {
		// return jwt.verify(token, process.env.JWT_SECRET);
	}
}