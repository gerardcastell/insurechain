import {
  BackendUtilsModule,
  BackendUtilsService,
} from '@insurechain/backend/utils';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { AuthService } from './services/auth/auth.service';
import { BackendUsersService } from './services/users/backend-users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<BackendUsersService>;
  let fakeAuthService: Partial<AuthService>;
  let fakeUtilsService: Partial<BackendUtilsService>;
  const MOCK_DATA = {
    email: 'asasd@asdas.com',
    name: 'Manolo',
    password: 'asdn33234',
  };
  beforeEach(async () => {
    fakeUsersService = {
      findOneById: (id: number) =>
        Promise.resolve({
          id,
          ...MOCK_DATA,
        } as User),
      findByEmail: (email: string) => {
        return Promise.resolve([
          { id: 1, email, password: 'asdasd', name: 'manolo' } as User,
        ]);
      },
    };
    fakeAuthService = {
      signIn: () => {
        return Promise.resolve({ access_token: 'kajsdoadoa' });
      },
      signup: (email, password) => {
        return Promise.resolve({ email, password });
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: BackendUsersService, useValue: fakeUsersService },
        { provide: BackendUtilsService, useValue: fakeUtilsService },
        JwtService,
      ],
      imports: [BackendUtilsModule],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const user = await controller.findUser(MOCK_DATA.email);
    expect(user).toBeDefined();
    expect(user.email).toEqual(MOCK_DATA.email);
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });
  it('findUser throws an error if user with given id is not found', async () => {
    jest.spyOn(fakeUsersService, 'findOneById').mockImplementation(() => null);
    try {
      await controller.findUser('1');
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });

  it('Signin retrieve a valid access token when for protected endpoints', async () => {
    const { access_token } = await controller.signIn(
      {
        email: 'asda@das.asd',
        password: 'asdasd',
      },
      {}
    );
    expect(access_token).toBeDefined();
  });
  it('Signup does not return a password', async () => {
    const userMock = {
      email: 'asda@das.asd',
      password: 'asdasd',
    };
    const user = await controller.createUser(userMock);
    expect(user).toBeDefined();
    expect(user.email).toEqual(userMock.email);
    expect(user).not.toHaveProperty('password');
  });
});
