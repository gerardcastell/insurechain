import { BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { BackendUsersService } from '../users/backend-users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<BackendUsersService>;
  let fakeJwtService: Partial<JwtService>;
  beforeEach(async () => {
    const users: User[] = [];

    fakeUsersService = {
      create: (email, password) => {
        const user: User = {
          id: Math.floor(Math.random() * 9999),
          email,
          password,
        };
        users.push(user);
        return Promise.resolve(user);
      },
      findByEmail: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      findOneByEmail: (email: string) => {
        const filteredUser = users.find((user) => user.email === email);
        return Promise.resolve(filteredUser);
      },
    };

    fakeJwtService = {
      sign() {
        return 'asd.fdsfsdfs';
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: BackendUsersService,
          useValue: fakeUsersService,
        },
        { provide: JwtService, useValue: fakeJwtService },
      ],
    }).compile();

    service = module.get(AuthService);
  });
  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  // it('Create a new user with a salted and hashed password', async () => {
  it('Create a new user', async () => {
    const MOCK_DATA = {
      email: 'asdf@asdg.com',
      password: '12345abcd',
    };

    const user = await service.signup(MOCK_DATA.email, MOCK_DATA.password);

    expect(user.password).not.toEqual(MOCK_DATA.password);
    const [salt, hash] = user.password.split('.');
    const { email } = user;
    expect(user.email).toEqual(email);
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('Throws an error if user signs up with email that is in use', async () => {
    await service.signup('asa@assad.asd', 'asdf');
    await expect(service.signup('asa@assad.asd', 'asdf')).rejects.toThrow(
      BadRequestException
    );
  });

  it('Throws if sign in is called with an unused email', async () => {
    await expect(
      service.validateUser('asda@das.casd', 'asdasd')
    ).rejects.toThrow(NotFoundException);
  });

  it('returns null if an invalid password provided for signing in', async () => {
    await service.signup('otro@gmail.com', 'passworddd');
    const user = await service.validateUser(
      'otro@gmail.com',
      'invalid password'
    );
    expect(user).toEqual(null);
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('asda@asdad.asd', 'mypassword');
    const user = await service.validateUser('asda@asdad.asd', 'mypassword');
    expect(user).toBeDefined();
  });

  it('given a user returns an access_token', async () => {
    const { access_token } = await service.signIn({
      email: 'hola@dsa.com',
      id: 4,
    });
    expect(access_token).toBeDefined();
  });
});
