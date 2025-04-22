import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): void {
    console.log(process.env.DATABASE_HOST);
    console.log(process.env.DATABASE_PORT);
    console.log(process.env.DATABASE_USERNAME);
    console.log(process.env.DATABASE_NAME);
    console.log(process.env.DATABASE_PASSWORD);
    console.log(process.env.DATABASE_AUTOLOADENTITIES);
    console.log(process.env.DATABASE_SYNCHRONIZE);
    console.log(typeof process.env.DATABASE_PORT);
    console.log(typeof process.env.DATABASE_AUTOLOADENTITIES);
    console.log(typeof process.env.DATABASE_SYNCHRONIZE);
  }
}
