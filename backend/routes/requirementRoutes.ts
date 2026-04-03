import express from "express";
const router = express.Router();

import {
  createRequirement,
  getAllRequirements,
  getRequirementById,
  updateRequirement,
  deleteRequirement,
} from "../controllers/requirementController";


router.route("/")
  .get(getAllRequirements)   
  .post(createRequirement); 


router.route("/:id")
  .get(getRequirementById)    
  .put(updateRequirement)     
  .delete(deleteRequirement); 

export default router;
