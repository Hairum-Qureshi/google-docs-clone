import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    AuthModule,
    FirebaseModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
