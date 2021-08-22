import React from "react";
import { Container, Step } from "semantic-ui-react";

const CallProgress = () => {
  return (
    <Container>
      <Step.Group fluid>
        <Step
          icon="phone"
          title="ringing"
          description="+1 555-5555"
          completed
        />
        <Step
          icon="cogs"
          title="In queue"
          description="user waiting in queue"
          active
        />
        <Step
          icon="headphones"
          title="Answered"
          description="Answer By John"
          disabled
        />{" "}
        <Step icon="times" title="Hang up" description="Missed call" />
      </Step.Group>
    </Container>
  );
};

export default CallProgress;
