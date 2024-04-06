// recipe.resolver.ts
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { RecipesArgs } from './recipe.args';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Resolver((of) => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query((returns) => Recipe)
  async recipe(@Args('id') id: string): Promise<Recipe> {
    console.log('recipe');
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  // @Query((returns) => [Recipe])
  // recipes(@Args() recipesArgs: string): Promise<Recipe[]> {
  //   console.log('recipes');
  //   return this.recipesService.findAll(recipesArgs);
  // }

  @Mutation((returns) => Recipe)
  async addRecipe(): /* @Args('newRecipeData') newRecipeData: NewRecipeInput,*/
  Promise<Recipe> {
    // const recipe = await this.recipesService.create(/* newRecipeData */);
    // return recipe;
    console.log('addRecipe');
    return { message: 'addRecipe' } as any;
  }

  @Mutation((returns) => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id);
  }
}
