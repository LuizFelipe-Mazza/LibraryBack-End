import { Router } from "express";
import addressController from './controller/addressController'

const router = Router();
router.get('/address/:id_address', addressController.address);
router.put('/update/:id_address', addressController.UpdateAddress);
router.delete('/remove/:id_address', addressController.deleteAddress);

export default router;