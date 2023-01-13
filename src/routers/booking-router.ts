import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, listBooking, changeBooking, listRoomAndBookings } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", listBooking)
  .get("/:hotelId", listRoomAndBookings)
  .post("/", bookingRoom)
  .put("/:bookingId", changeBooking);

export { bookingRouter };
