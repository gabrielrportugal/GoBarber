import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmenteService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmenteService);

    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id,
    });

    return response.status(200).json(appointment);
  }
}
