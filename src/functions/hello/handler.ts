import {
  ComprehendClient,
  ComprehendClientConfig,
  DetectSentimentCommand,
  DetectSentimentCommandInput,
  LanguageCode,
} from '@aws-sdk/client-comprehend'
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

import schema from './schema'

const configuration: ComprehendClientConfig = {
  region: 'ap-northeast-1',
}

const client = new ComprehendClient(configuration)

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const input: DetectSentimentCommandInput = {
    Text: event.body.phrase,
    LanguageCode: LanguageCode.EN,
  }

  const command = new DetectSentimentCommand(input)
  const data = await client.send(command)

  return formatJSONResponse({
    data: data,
  })
}

export const main = middyfy(hello)
