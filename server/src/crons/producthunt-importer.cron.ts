import { Injectable, Logger } from '@nestjs/common';
import { Cron ,CronExpression} from '@nestjs/schedule';
import { InjectGraphQLClient } from '@golevelup/nestjs-graphql-request';
import { GraphQLClient, gql } from 'graphql-request';
// import { Tool } from 'src/tool/models/tool.entity';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
import { ToolService } from 'src/tool/service/tool.service';
import { Tool } from 'src/tool/models/tool.entity';

@Injectable()
export class ProductHuntImporter {
    constructor(
        @InjectGraphQLClient() private readonly client: GraphQLClient,
        private toolService: ToolService,
    ) {}
    private readonly logger = new Logger(ProductHuntImporter.name);
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    // @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() {
        this.logger.log('CRON: imported data from producthunt');
        
        // console.log(res);
        const res = await this.queryProductHunt();
        const posts : Object[] = res['posts']['edges']
        const tools: Tool[] = this.mapPostsToTools(posts);
        await this.toolService.bulkUpsert(tools);
    }

    mapPostsToTools(rawPosts: Object[]): Tool[]{
        const tools : Tool[]= rawPosts
        .map(postObj=>postObj['node'])
        .map(post=>{
            let t: Tool = new Tool ();   
            t.name= post['name']
            t.description= post['description']
            t.url= post['website']
            t.img= post['thumbnail']['url']
            t.tags= post['topics']['edges'].map(e=>e['node']['name'])
            return t;
        })
        return tools;
    }
    async queryProductHunt(){
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
        `;
        this.client.setEndpoint(process.env.PRODUCT_HUNT_ENDPOINT);
        this.client.setHeader('content-type', 'application/json')
        this.client.setHeader('Authorization', `Bearer ${process.env.PRODUCT_HUNT_TOKEN}`)
        return this.client.request(query);
    }
}
