describe("Cats", function() {
  beforeEach(function() {
    cy.task("taskTruncateTables") // truncate the tables before any test setup
  })

  it("CREATE: a cat and then shows it", function() {
    cy.visit('/cats')
    cy.get("#name").type("test-name")
    cy.get("#breed").type("test-breed")
    cy.get("#owner").type("test-owner")
    cy.get("#submit-button").click()
    cy.get("#cats-list")
      .should("contain", "Name: test-name")
      .should("contain", "Breed: test-breed")
      .should("contain", "Owner: test-owner")
  })

  it("READ: shows the current cats", function() {
    cy.task("taskCreateCat") // insert 1 record into the cats table
    cy.visit('/cats')
    cy.get("#cats-list")
      .should("contain", "Name: test-name")
      .should("contain", "Breed: test-breed")
      .should("contain", "Owner: test-owner")
  })

  it("DELETE: deletes a specific cat", function() {
    cy.task("taskCreateCat")
    cy.visit('/cats')
    cy.get("#cat-0")
      .should("contain", "Name: test-name")
      .should("contain", "Breed: test-breed")
      .should("contain", "Owner: test-owner")
    cy.get('#cat-0-delete').click()
    cy.get('#cat-0').should("not.exist")
  })

  it("can comment on a cat", function() {
    cy.task("taskCreateCat")
    cy.visit('/cats')
    cy.get("#cat-0-comment-textbox").type('lovely whiskers!')
    cy.get("#cat-0-comment-submit").click()
    cy.get('#cat-0-comments').should("contain", 'lovely whiskers!')
  })
})
