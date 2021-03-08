import { ID } from '@core/common/domain/value-objects/id.value-object'
import {
  ActionMetadata,
  ActionMetadataInterface,
  ActionMetadataProperties,
} from '@infrastructure/bus/action/metadata'

interface EventMetadataInterface extends ActionMetadataInterface {
  aggregateID: ID
  version: number
}

interface EventMetadataProperties extends ActionMetadataProperties {
  aggregateID: ID
  version: number
}

export class EventMetadata extends ActionMetadata implements EventMetadataInterface {
  public readonly aggregateID: ID
  public readonly version: number

  constructor({ aggregateID, version, ...rest }: EventMetadataProperties) {
    super(rest)

    this.aggregateID = aggregateID
    this.version = version
  }
}
