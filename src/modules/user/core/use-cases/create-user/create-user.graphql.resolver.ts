import { MutationResult } from '@interface/adapters/graphql.dto'
import { Logger } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { CreateUserCommand } from './create-user.command'
import { CreateUserInput } from './create-user.graphql.dto'

@Resolver()
class CreateUserGraphQLResolver {
  private readonly logger = new Logger(CreateUserGraphQLResolver.name)

  @Mutation(() => MutationResult, { name: 'createUser' })
  protected async createUser(
    @Args('user', { type: () => CreateUserInput })
    user: CreateUserInput,
  ) {
    this.logger.log({
      user,
      message: 'Creating a new user',
    })

    const command = new CreateUserCommand({ payload: user })
    console.log(command)

    return {}
  }
}

export default CreateUserGraphQLResolver