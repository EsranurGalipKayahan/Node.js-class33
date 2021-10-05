import { ERROR_PAGE } from "../sources/constants.js";
export const handleErrorPage = (req, res) => {
  res.render("errorPage", { title: ERROR_PAGE });
};
