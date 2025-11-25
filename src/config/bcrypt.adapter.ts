import { hashSync, compareSync, genSaltSync } from "bcryptjs";

export const bcryptAdapter = {
  hash: async (password: string) => {
    const salt = genSaltSync(10);

    return hashSync(password, salt);
  },

  compare: async (password: string, hash: string) => {
    return compareSync(password, hash);
  },
};
