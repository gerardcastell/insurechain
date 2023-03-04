describe('Authentication test', () => {
  let accessToken: string;
  const randomEmail = `${(Math.random() + 1)
    .toString(36)
    .substring(10)}@email.com`;
  const randomPassword = (Math.random() + 1).toString().substring(10);

  it('Should create a new user', () => {
    cy.api({
      url: '/auth/signup',
      body: {
        email: randomEmail,
        password: randomPassword,
      },
      method: 'POST',
    }).as('signup');
    cy.get('@signup').should((response) => {
      const res = response as undefined as {
        status: number;
        body: Record<string, undefined>;
      };
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('email');
      expect(res.body).not.to.have.property('password');
      expect(res.body.email).to.eq(randomEmail);
    });
  });

  it('Should not be able to register the email already created', () => {
    cy.api({
      url: '/auth/signup',
      body: {
        email: randomEmail,
        password: randomPassword,
      },
      method: 'POST',
      failOnStatusCode: false,
    }).as('signupRepeated');
    cy.get('@signupRepeated').should((response) => {
      const res = response as undefined as {
        status: number;
        body: Record<string, undefined>;
      };
      expect(res.status).to.eq(400);
    });
  });

  it('Should signin with the user already created', () => {
    cy.api({
      url: '/auth/signin',
      body: {
        email: randomEmail,
        password: randomPassword,
      },
      method: 'POST',
    }).as('signup');
    cy.get('@signup').should((response) => {
      const res = response as undefined as {
        status: number;
        body: Record<string, undefined>;
      };
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('access_token');
      accessToken = res.body.access_token;
    });
  });

  it('Should not be able to signin with a bad password', () => {
    cy.api({
      url: '/auth/signin',
      body: {
        email: randomEmail,
        password: `${randomPassword}1234`,
      },
      method: 'POST',
      failOnStatusCode: false,
    }).as('signupError');
    cy.get('@signupError').should((response) => {
      const res = response as undefined as {
        status: number;
        body: Record<string, undefined>;
      };
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.eq('Unauthorized');
    });
  });

  it('Should get profile with the access token provided', () => {
    cy.api({
      url: '/auth/profile',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }).as('getProfile');
    cy.get('@getProfile').should((response) => {
      const res = response as undefined as {
        status: number;
        body: Record<string, undefined>;
      };
      expect(res.status).to.eq(200);
      expect(res.body.email).to.eq(randomEmail);
    });
  });

  it('Should not get profile with an incorrect access token', () => {
    cy.api({
      url: '/auth/profile',
      headers: {
        Authorization: `Bearer ${accessToken}1234`,
      },
      method: 'GET',
      failOnStatusCode: false,
    }).as('getProfile');
    cy.get('@getProfile').should((response) => {
      const res = response as undefined as {
        status: number;
        body: Record<string, undefined>;
      };
      expect(res.status).to.eq(401);
      expect(res.body).not.to.have.property('email');
    });
  });
});
