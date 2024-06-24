import { ObjectType } from '@nestjs/graphql';
import { PaginatedConnection } from 'src/common/models/paginatedConnection.model';
import { UserModel } from 'src/users/models/user.model';

@ObjectType()
export class PaginatedUser extends PaginatedConnection(UserModel) {}
