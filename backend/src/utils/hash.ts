import bcryptjs from "bcryptjs";

export const hashingPassword = (psswd: string, salt: number) =>
  bcryptjs.hashSync(psswd, salt);
