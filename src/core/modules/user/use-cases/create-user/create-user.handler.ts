import { Logger } from '@nestjs/common'
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import { UserAggregateRoot } from '@core/modules/user/domain/user.aggregate-root'
import { UserAggregate } from '@core/modules/user/user.aggregate'
import { CreateUserCommand, CREATE_USER_COMMAND } from '@core/ports/primary/create-user.command'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserCommandHandler.name)

  constructor(private readonly eventPublisher: EventPublisher) {}

  public async execute(command: CreateUserCommand) {
    this.logger.log({
      command,
      message: `New ${CREATE_USER_COMMAND} command received`,
    })

    const marshalledCommandPayload = command.payload.marshal()
    const user = UserAggregateRoot.createUser(marshalledCommandPayload)

    const userAggregateInstance = new UserAggregate(command)
    const userAggregate = this.eventPublisher.mergeObjectContext(userAggregateInstance)

    userAggregate.create(user)
    userAggregate.commit()
  }
}
