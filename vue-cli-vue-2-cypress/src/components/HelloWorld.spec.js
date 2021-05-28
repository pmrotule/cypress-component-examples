import { mount } from "@cypress/vue";
import HelloWorld from "./HelloWorld.vue";
import rewiremock from "rewiremock/webpack";

rewiremock(() => import("@/helpers/fruit")).with({
  getColorOfFruits: () => ({
    apple: "green",
    orange: "orange",
  }),
});

describe("HelloWorld", () => {
  beforeEach(() => {
    rewiremock.enable();

    mount(HelloWorld, {
      propsData: {
        msg: "Hello Cypress!",
      },
    });
  });

  afterEach(() => rewiremock.disable());

  it("renders a message", () => {
    cy.get("h1").contains("Hello Cypress!");
  });

  it("renders the color of an apple", () => {
    cy.get("h2").contains("green");
  });
});
