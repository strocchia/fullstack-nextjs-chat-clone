import prisma from "../../../libs/getPrisma.js";

const tweets = (req, res) => {
  console.log(req.method);

  if (req.method === "GET") {
    return prisma.tweet
      .findMany({
        orderBy: { createdAt: "asc" }, // { createdAt: "desc" },
        include: {
          author: {
            select: { id: true, email: true, name: true, image: true },
            // select: { name: true },
          },
        },
      })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(405).json({ message: error.message });
      });
  } else if (req.method === "POST") {
    const { text, useremail } = JSON.parse(req.body);

    try {
      return prisma.tweet
        .create({
          data: {
            body: text,
            author: {
              connect: {
                email: useremail,
              },
            },
          },
        })
        .then((tweet) => res.status(200).json(tweet))
        .catch((error) => res.status(405).json({ message: error.message }));
    } catch (err) {
      console.log(err);
      res.status(405).json({ message: error.message });
    }
  }
};

export default tweets;
