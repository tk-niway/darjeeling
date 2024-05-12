import { ObjectType } from '@nestjs/graphql';
import { PaginatedConnection } from 'src/lib/models/paginatedConnection.model';
import { User } from 'src/generated/user/user.model';

@ObjectType()
export class PaginatedUser extends PaginatedConnection(User) {}
