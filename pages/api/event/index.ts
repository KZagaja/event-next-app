import { NextApiRequest, NextApiResponse } from "next";
import { dictionary } from "../../../dictionary/api/dictionary";
import { EventAPI } from "../../../types/api/event.types";
import { getOffset } from "../../../util/helpers/getOffset";
import { prisma } from "../../../util/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, eventDate }: EventAPI = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !eventDate ||
      firstName === "" ||
      lastName === "" ||
      email === ""
    ) {
      return res
        .status(400)
        .json({ message: dictionary.messages.incorrectData });
    }

    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        )
    ) {
      return res
        .status(400)
        .json({ message: dictionary.messages.invalidEmail });
    }

    try {
      const event = await prisma.event.create({
        data: {
          firstName,
          lastName,
          email,
          eventDate,
        },
      });

      return res.status(201).json(event);
    } catch {
      return res.status(500).send({ message: dictionary.messages.serverError });
    }
  }

  if (req.method === "GET") {
    const { page } = req.query;
    const offset = getOffset(page);

    try {
      const events: EventAPI[] = await prisma.event.findMany({
        take: 10,
        skip: offset,
      });

      const amountOfEvents: number = await prisma.event.count();

      const response = {
        events,
        amountOfEvents,
      };

      return res.status(200).json(response);
    } catch {
      return res.status(500).send({ message: dictionary.messages.serverError });
    }
  }
  return res.status(405).send({ message: dictionary.messages.invalidMethod });
}
