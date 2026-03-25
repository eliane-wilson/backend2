import ticketModel from "../models/ticketModel.js";

export default class TicketDAO {

  create = (ticket) => {
    return ticketModel.create(ticket);
  };
}