const error404 = (req, res) => {
  res.header("content-type", "text/html; charset=utf-8");
  res.render("error404", { title: "404 Not Found" });
};

export default {
  error404,
};
