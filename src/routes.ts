import controllerAuth from "./controller/authController";
import { Router } from "express";
import addressController from './controller/addressController';
import providerController from './controller/providerController'
import userController from './controller/userController'

const router = Router();
router.get('/address/:id', addressController.address);
router.put('/update/:id', addressController.UpdateAddress);
router.post('/createaddress', addressController.createAddress);
router.delete('/remove/:id', addressController.deleteAddress);

// Provider Area
router.post('/createprovider', providerController.createProvider);
router.put('/updateprovider', providerController.UpdateProvider)
router.delete('/removeprovider/:id', providerController.deleteProvider)
router.get('/showprovider/:id', providerController.provider);
router.get('/provider/paginate', providerController.paginate);

// User Area
router.get('/user/:id', userController.user);
router.put('/updateuser/:id', userController.UpdateUser);
router.post('/createuser', userController.createuser);
router.delete('/deleteuser/:id', userController.deleteUser);
// Validate Area
router.post('/login', controllerAuth.user)
export default router;