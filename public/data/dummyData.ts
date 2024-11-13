// src/mocks/dummyUsers.ts

import { User } from "@/types";

export const dummyUsers: User[] = [
  {
    id: 1,
    username: "jdoe",
    firstname: "John",
    lastname: "Doe",
    email: "jdoe@example.com",
    role: 1, // Admin
    activated: 1,
    name: "John Doe",
    image: "/images/users/jdoe.png",
  },
  {
    id: 2,
    username: "asmith",
    firstname: "Alice",
    lastname: "Smith",
    email: "asmith@example.com",
    role: 0, // User
    activated: 0,
    name: "Alice Smith",
    image: "/images/users/asmith.png",
  },
  {
    id: 3,
    username: "bwayne",
    firstname: "Bruce",
    lastname: "Wayne",
    email: "bwayne@example.com",
    role: 1, // Admin
    activated: 1,
    name: "Bruce Wayne",
    image: "/images/users/bwayne.png",
  },
  {
    id: 4,
    username: "ckent",
    firstname: "Clark",
    lastname: "Kent",
    email: "ckent@example.com",
    role: 0, // User
    // activated is optional and omitted here
    name: "Clark Kent",
    // image is optional and omitted here
  },
  {
    id: 5,
    username: "dprince",
    firstname: "Diana",
    lastname: "Prince",
    email: "dprince@example.com",
    role: 1, // Admin
    activated: 1,
    name: "Diana Prince",
    image: "/images/users/dprince.png",
  },
  {
    id: 6,
    username: "tstark",
    firstname: "Tony",
    lastname: "Stark",
    email: "tstark@example.com",
    role: 0, // User
    activated: 1,
    name: "Tony Stark",
    image: "/images/users/tstark.png",
  },
  {
    id: 7,
    username: "pparker",
    firstname: "Peter",
    lastname: "Parker",
    email: "pparker@example.com",
    role: 0, // User
    activated: 0,
    name: "Peter Parker",
    image: "/images/users/pparker.png",
  },
  {
    id: 8,
    username: "ssummers",
    firstname: "Steve",
    lastname: "Summers",
    email: "ssummers@example.com",
    role: 1, // Admin
    activated: 1,
    name: "Steve Summers",
    image: "/images/users/ssummers.png",
  },
  {
    id: 9,
    username: "nromanoff",
    firstname: "Natasha",
    lastname: "Romanoff",
    email: "nromanoff@example.com",
    role: 0, // User
    activated: 1,
    name: "Natasha Romanoff",
    // image is optional and omitted here
  },
  {
    id: 10,
    username: "bwagner",
    firstname: "Barbara",
    lastname: "Wagner",
    email: "bwagner@example.com",
    role: 1, // Admin
    activated: 0,
    name: "Barbara Wagner",
    image: "/images/users/bwagner.png",
  },
];
