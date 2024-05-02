import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { Ticket } from '../models/Ticket.js'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getMyTickets() {
    const response = await api.get('/account/tickets')
    console.log('my tickets response', response.data)
    let tickets = response.data.map(ticket => new Ticket(ticket))
    AppState.tickets = tickets
    console.log('tickets in the AppState:', AppState.tickets)
  }

}

export const accountService = new AccountService()
