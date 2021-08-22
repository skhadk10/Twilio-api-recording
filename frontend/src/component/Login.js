import React from "react";

import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
const Login = ({
  user: { username, mobileNumber, verificationCode, verificationSent },
  handleOnChange,
  sendSmsCode,
  sentVerificationCode,
}) => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      styles={{ height: "100vh" }}
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Login into your account
        </Header>
        <Form onSubmit={handleOnSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="username"
              value={username}
              onChange={handleOnChange}
            />
            <Form.Input
              fluid
              name="mobileNumber"
              icon="mobile alternate"
              iconPosition="left"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={handleOnChange}
            />
            {verificationSent && (
              <Form.Input
                fluid
                name="verificationCode"
                icon="key"
                iconPosition="left"
                placeholder="Enter Your Code"
                value={verificationCode}
                onChange={handleOnChange}
              />
            )}
            <Button
              color="teal"
              fluid
              size="large"
              onClick={!verificationSent ? sendSmsCode : sentVerificationCode}
            >
              {!verificationSent ? "Login/SignUp" : "Enter Your Code"}
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
