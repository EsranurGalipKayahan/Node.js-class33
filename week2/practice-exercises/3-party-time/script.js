/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */
import fetch from "node-fetch";

const makeReservation = async () => {
  const body = { name: "Esranur Galip Kayahan", numberOfPeople: 3 };

  try {
    const response = await fetch(
      "https://reservation100-sandbox.mxapps.io/api/reservations",
      {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    );
    const jsonR = await response.json();
    console.log(jsonR);
  } catch (error) {
    console.error(error);
  }
};

makeReservation();
