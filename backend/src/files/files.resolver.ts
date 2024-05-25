import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { Public } from 'src/authz/decorators/public.decorator';
import { FilesService } from 'src/files/files.service';

@Resolver()
export class FilesResolver {
  constructor(private filesService: FilesService) {}

  @Public()
  @Mutation(() => Boolean)
  async upload(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    console.log(`★start upload : ${JSON.stringify(file)}`);
    const result = this.filesService.store(file);

    if (!result) {
      throw new Error('Internal Server Error');
    }

    return true;
  }
}
