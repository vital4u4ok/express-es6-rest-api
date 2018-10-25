import { version } from '../../package.json';
import { Router } from 'express';
import ApplesController from '../controller/apples';

export default ({ config }) => {
	let api = Router();

	api.use('/apples', ApplesController);

	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
