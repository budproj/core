import { IsUUID } from 'class-validator'

type ReadUserAccountRequestProperties = {
  aggregateID: string
}

export class ReadUserAccountRequest {
  @IsUUID('4')
  public readonly aggregateID: string

  constructor({ aggregateID }: ReadUserAccountRequestProperties) {
    this.aggregateID = aggregateID
  }
}
