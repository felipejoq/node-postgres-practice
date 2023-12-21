import bcrypt from "bcrypt";

export class Encoder {

  static async getHash(str){
    const salt = bcrypt.genSaltSync();
    return await bcrypt.hash(str, salt);
  }

  static async compareHash(str, hash){
    await bcrypt.compare(str, hash)
  }

}