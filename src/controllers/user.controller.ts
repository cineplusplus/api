import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";

@Route("users")
export class UsersController extends Controller {
  @Get("{userId}")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<any> {
    return `${userId} + ${name}`;
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(@Body() requestBody: any): Promise<void> {
    this.setStatus(201); // set return status 201
    console.log(requestBody);
  }
}
