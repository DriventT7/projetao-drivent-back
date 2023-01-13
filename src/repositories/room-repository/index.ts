import { prisma } from "@/config";

async function findAllByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId,
    }
  });
}

async function findById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    }
  });
}

async function findRoomsWithBookings(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId
    },
    include: {
      Booking: true,
    }
  });
}

const roomRepository = {
  findRoomsWithBookings,
  findAllByHotelId,
  findById
};

export default roomRepository;
