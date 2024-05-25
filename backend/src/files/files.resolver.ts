import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { Public } from 'src/authz/decorators/public.decorator';

@Resolver()
export class FilesResolver {
  constructor() {}

  @Public()
  @Mutation(() => Boolean)
  async upload(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<boolean> {
    console.log(`★start upload : ${JSON.stringify(file)}`);
    // const { readStream, ...another } = file;
    // console.log(`★start upload : ${JSON.stringify(another)}`);

    // const chunks = [];
    // readStream.on('data', (buf) => chunks.push(buf));
    // readStream.on('end', () => console.log(Buffer.concat(chunks).toString()));
    return true;
  }
}
