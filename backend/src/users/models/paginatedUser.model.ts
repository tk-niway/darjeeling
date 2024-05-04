import { ObjectType } from '@nestjs/graphql';
import { PaginatedConnection } from 'src/pagination/models/paginatedConnection.model';
import { User } from 'src/generated/user/user.model';

@ObjectType()
export class PaginatedUser extends PaginatedConnection(User) {}
