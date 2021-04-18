const data = [];

function shouldFail() {
  return Math.random() > 0.8;
}

const processData = (req, res) => {
  console.log(req.method);

  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    // // sometimes it will fail, this will cause a regression on the UI
    // if (!shouldFail()) {
    //   data.push(body.text);
    // }

    data.push(body.text);

    return res.status(200).json(data);
  }

  return res.status(200).json(data);
};

export default processData;
