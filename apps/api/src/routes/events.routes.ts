import { Router } from "express";
import * as eventsCtrl from "../controllers/events.controllers.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.use(authenticate);

router.get("/", eventsCtrl.getEvents);
router.post("/", eventsCtrl.createEvent);
router.get("/:eventId", eventsCtrl.getEvent);
router.put("/:eventId", eventsCtrl.updateEventById);
router.delete("/:eventId", eventsCtrl.deleteEventById);

// copy event
router.post("/copy/:eventId", eventsCtrl.copyEvent);

// archived events
router.get("/archived", eventsCtrl.getArchivedEvents);
router.get("/archived/:eventId", eventsCtrl.getArchivedEvent);
router.post("/archived/:eventId", eventsCtrl.toggleArchive);
router.delete("/archived/:eventId", eventsCtrl.deleteArchivedEvent);

export default router;
