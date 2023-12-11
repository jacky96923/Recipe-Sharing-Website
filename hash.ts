import { compareSync, hashSync } from "bcryptjs";

//const ROUND = 12;

export async function hashPassword(password: string): Promise<string> {
  //return hash(password, ROUND);
  return await hashSync(password);
}

export async function comparePassword(option: {
  password: string;
  password_hash: string;
}): Promise<boolean> {
  console.log("[hash]", option);
  //console.log(await hashSync(option.password_hash));
  return await compareSync(
    option.password,
    //await hashSync(option.password_hash)
    option.password_hash
  );
}
