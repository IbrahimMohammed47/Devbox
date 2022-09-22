import { Injectable, Logger } from '@nestjs/common';
import { Cron ,CronExpression} from '@nestjs/schedule';
import { InjectGraphQLClient } from '@golevelup/nestjs-graphql-request';
import { GraphQLClient, gql } from 'graphql-request';

@Injectable()
export class ProductHuntImporter {
    constructor(@InjectGraphQLClient() private readonly client: GraphQLClient) {}
    private readonly logger = new Logger(ProductHuntImporter.name);

    // @Cron('10 * * * * *')
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        this.logger.debug('Called when the current second is 45');
        const query = gql` 
                        {
                            posts {
                                edges {
                                    node {
                                        topics{
                                            edges{
                                                node{
                                                    name
                                                }
                                            }
                                        }
                                        id
                                        name
                                        description
                                        tagline
                                        website
                                        thumbnail{
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    `
        let x = await this.client.request(query)
        console.log(x['posts']['edges'][0]);
    }
}
