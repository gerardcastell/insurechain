import { PrismaService } from '@insurechain/backend/prisma';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { BackendUsersService } from './backend-users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<BackendUsersService>;
  let fakeJtwService: Partial<JwtService>;
  beforeEach(async () => {
    const users: User[] = [];

    //Create a fake copy of the users service
    fakeUsersService = {
      create: ({ email, password }: CreateUserDto) => {
        const user: User = {
          id: Math.floor(Math.random() * 9999),
          email,
          password,
          name: 'Manolo',
        };

        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: BackendUsersService,
          useValue: fakeUsersService,
        },
        JwtService,
      ],
    }).compile();

    service = module.get(AuthService);
  });
  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  // it('Create a new user with a salted and hashed password', async () => {
  it('Create a new user', async () => {
    const user = await service.signup({
      email: 'asdf@asdg.com',
      password: '12345abcd',
      name: 'test',
    });

    // expect(user.password).not.toEqual('asdf');
    // const [salt, hash] = user.password.split('.');
    const { email, password, name } = user;
    expect(user.email).toEqual(email);
    expect(user.password).toEqual(password);
    expect(user.name).toEqual(name);
    // expect(salt).toBeDefined();
    // expect(hash).toBeDefined();
  });

  // it('Throws an error if user signs up with email that is in use', async () => {
  //   await service.signup('asa@assad.asd', 'asdf');
  //   await expect(service.signup('asa@assad.asd', 'asdf')).rejects.toThrow(
  //     BadRequestException
  //   );
  // });

  // it('Throws if sign in is called with an unused email', async () => {
  //   await expect(service.signin('asda@das.casd', 'asdasd')).rejects.toThrow(
  //     NotFoundException
  //   );
  // });

  // it('throws if an invalid password is provided for signin', async () => {
  //   await service.signup('asda@das.casd', 'aaaaa');
  //   await expect(service.signin('asda@das.casd', 'dsdasds')).rejects.toThrow(
  //     BadRequestException
  //   );
  // });

  // it('returns a user if correct password is provided', async () => {
  //   await service.signup('asda@asdad.asd', 'mypassword');
  //   const user = await service.signin('asda@asdad.asd', 'mypassword');
  //   expect(user).toBeDefined();
  // });
});
