// <reference types="cypress" //>

const URL = "127.0.0.1:8080"

context("Memotest", () => {

    before(() => {
        cy.visit("127.0.0.1:8080");
    });

    describe("juega al memotest", () => {
        const NUMERO_CARTAS = 16;
        it("se asegura que esten todas las cartas", () => {
            cy.get("#tablero").find(".card").should("have.length", NUMERO_CARTAS);
        });

        it("se asegura que las img sean distintas", () => {
            cy.get("#comenzar").click()
            cy.get(".front img").then(cartas => {
                let clasesOriginales = []
                cartas.each(function (i, carta) {
                    clasesOriginales.push(carta.src);
                });
                cy.visit(URL);
                cy.get("#comenzar").click()

                let clasesNuevas = []
                cy.get(".front img").then(cartas => {
                    let clasesNuevas = []
                    cartas.each(function (i, carta) {
                        clasesNuevas.push(carta.src);
                    });
                    cy.wrap(clasesOriginales).should("not.deep.equal", clasesNuevas);
                });
            });
        });

        describe("resuelve el juego", () => {
            let mapaDePares, listaDePares;

            it("generar error seleccionando 2 cartas diferentes", () => {

                cy.get(".front img").then(imagenes => {
                    mapaDePares = obtenerMapaDePares(imagenes)
                    console.log(mapaDePares)
                    listaDePares = Object.values(mapaDePares);
                
                cy.get(listaDePares[0][0]).parents(".card").click();
                cy.get(listaDePares[1][0]).parents(".card").click();
                cy.wait(1700)

                cy.get(".invisible").should("not.exist")
                })
            })



            it("resolver juego", () => {
                listaDePares.forEach((par) => {
                    cy.get(par[0]).parents(".card").click();
                    cy.get(par[1]).parents(".card").click();
                    cy.wait(1700)
                });
                cy.get(".invisible").should("have.length", NUMERO_CARTAS)
            })

        });
    })
})

function obtenerMapaDePares(imagenes) {

    let pares = {};

    imagenes.each((i, imagen) => {
        const imagenSrc = imagen.src

        if (pares[imagenSrc]) {
            pares[imagenSrc].push(imagen);
        } else {
            pares[imagenSrc] = [imagen]
        }
    });
    console.log(pares);
    return pares;
}



