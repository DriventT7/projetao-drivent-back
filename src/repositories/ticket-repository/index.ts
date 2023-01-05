import { prisma } from "@/config";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    }
  });
}
async function findTicketWithTypeById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    }
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true, //inner join
    }
  });
}

async function createTicket(ticket: CreateTicketParams) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    }
  });
}

async function createTicketType(ticketTypeData: CreateTicketTypeParams) {
  return prisma.ticketType.create({
    data: {
      ...ticketTypeData,
    }
  });
}

async function ticketProcessPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    }
  });
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">
export type CreateTicketTypeParams = Omit<TicketType, "id" | "createdAt" | "updatedAt">

const ticketRepository = {
  findTicketTypes,
  findTicketByEnrollmentId,
  createTicket,
  createTicketType,
  findTicketById,
  findTicketWithTypeById,
  ticketProcessPayment,
};

export default ticketRepository;
