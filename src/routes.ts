import { Router } from "express";
import addressController from './controller/addressController';
import providerController from './controller/providerController'

const router = Router();
router.get('/address/:id', addressController.address);
router.post('/createaddress', addressController.createAddress);
router.put('/update/:id', addressController.UpdateAddress);
router.delete('/remove/:id', addressController.deleteAddress);

// Provider Area
router.post('/createprovider', providerController.createProvider);
router.get('/showprovider/:id', providerController.provider);
export default router;